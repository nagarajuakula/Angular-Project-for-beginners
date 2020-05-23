import {
  HttpInterceptor, HttpHandler, HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Customer } from './customer-dashboard/data/customer.model';
import { CustomerService } from './customer-dashboard/services/customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerInterceptor implements HttpInterceptor {

  private cache = new Map();
  private cachedResponse = new Subject<any>();
  constructor(private custService: CustomerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.reportProgress) {
      this.custService.isLoading = true;
    }
    // continue if not cachable.
    if (!this.isCachable(request)) {
      return next.handle(request).pipe(
        tap(response => {
          if (response instanceof HttpResponse) {
            let responseKey;
            this.cache.forEach(data => {
              for (let key in data.body) {
                if (request.url.includes(key)) {
                  responseKey = key;
                  break;
                }
              }
              responseKey = responseKey ? responseKey : response.body["name"];

              if (data.body[responseKey]) {
                if (request.method !== 'DELETE') {
                  // update existing data
                  data.body[responseKey] = request.body;
                } else {
                  // delete data
                  data.body[responseKey] = null;
                }
              } else {
                // adding new data
                data.body[responseKey] = request.body;
              }
            });
          }
        })
      );
    }

    const cachedResponse = this.cache.get(request.url);
    return cachedResponse ?
      of(cachedResponse) : this.sendRequest(request, next);
  }

  isCachable(request: HttpRequest<any>): boolean {
    if (request.method === 'GET') {
      return true;
    }
    return false;
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    // No headers allowed in npm search request
    const noHeaderReq = req.clone({ headers: new HttpHeaders() });

    return next.handle(noHeaderReq).pipe(
      tap(event => {
        // There may be other events besides the response.
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event); // Update the cache.
        }
      })
    );
  }
}