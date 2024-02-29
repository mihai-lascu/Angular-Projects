import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'function',
    standalone: true
})
export class FunctionPipe implements PipeTransform {

    transform<T>(value: T, fn?: (el: T) => any): T | any {
        return fn ? fn(value) : value;
    }

}
