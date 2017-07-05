/*rateTpfilter*/
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'intrtTp'
})
export class intrtTp implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==0)
			result ="固定利率";
		if(str==1)
			result ="浮动利率";
		return result;
	}
}