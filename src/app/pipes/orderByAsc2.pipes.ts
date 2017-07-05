import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderByAsc2'
})
export class OrderByAscPipe2 implements PipeTransform {
	constructor() {}
	transform(arr:any) {
		// debugger
		arr.reverse()
		console.log(arr);
		return arr
	}
}