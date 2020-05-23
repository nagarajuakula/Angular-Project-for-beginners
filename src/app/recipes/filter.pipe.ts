import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any, limit: number) {
        return value.toLowerCase().substr(0, limit);
    }
}
