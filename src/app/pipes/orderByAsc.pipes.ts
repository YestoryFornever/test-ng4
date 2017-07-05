import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderByAsc'
})
export class OrderByAscPipe implements PipeTransform {
	constructor() {}
	transform(arr:any) {
		// debugger
		arr.reverse()
		console.log(arr);
		return arr
	}
}