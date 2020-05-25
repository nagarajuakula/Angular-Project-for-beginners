import {
  HttpInterceptor, HttpHandler, HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { CustomerService } from '../customer-dashboard/services/customer.service';
import { RecipeService } from '../recipes/serivces/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map();
  constructor(private custService: CustomerService,
              private recipeService: RecipeService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl = request.url;
    let loadingRequest: string;
    if(request.reportProgress) {
      if(requestUrl.includes('customers/')) {
        this.custService.isLoading = true;
        loadingRequest = 'customers';
      } else  if(requestUrl.includes('recipes/')) {
        this.recipeService.isLoading = true;
        loadingRequest = 'recipes';
      }
    }
    // continue if not cachable.
    if (!this.isCachable(request)) {
      return next.handle(request).pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            let responseKey;
            this.cache.forEach(data => {
              for (let key in data) {
                if (requestUrl.includes(key)) {
                  responseKey = key;
                  break;
                }
              }

              responseKey = responseKey ? responseKey : response.body["name"];

              if (data[responseKey]) {
                if (request.method !== 'DELETE') {
                  // update existing data
                  data[responseKey] = request.body;
                } else {
                  // delete data
                  data[responseKey] = null;
                }
              } else {
                // adding new data
                data[responseKey] = request.body;
              }
            });
          }
        })
      );
    }

    const cachedResponse = this.cache.get(loadingRequest);
    return cachedResponse ?
      of(cachedResponse) : this.sendRequest(request, next, loadingRequest);
  }

  isCachable(request: HttpRequest<any>): boolean {
    if (request.method === 'GET') {
      return true;
    }
    return false;
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    loadingRequest?: string): Observable<HttpEvent<any>> {

    // No headers allowed in npm search request
    const noHeaderReq = req.clone({ headers: new HttpHeaders() });

    return next.handle(noHeaderReq).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse && event.body) {
          this.cache.set(loadingRequest, event.body); // Update the cache.
        }
      })
    );
  }
}