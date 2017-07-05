import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'tf'
})
export class TfPipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		return url==="1"?"是":"否";
	}
}