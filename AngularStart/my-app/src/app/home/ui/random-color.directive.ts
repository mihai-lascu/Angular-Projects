import {Directive, HostBinding} from '@angular/core';

@Directive({
	selector: '[randomColor]',
	standalone: true
})
export class RandomColorDirective {
	@HostBinding('style.backgroundColor') color = `#${Math.floor(
		Math.random() * 16777215
	).toString(16)}`;
}
