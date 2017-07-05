/*rolefilter*/
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'suTypePipe'
})
export class SuTypePipe implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="爱奇艺";
		if(str==2)
			result ="万视";
		if(str==3)
			result ="七牛";
		return result;
	}
}