import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filterNames'
})
export class FilterNamesPipe implements PipeTransform{
    transform(value: any) {
        if (value.length < 1 ) {
            return '';
        }

        return value.trim();
    }
}