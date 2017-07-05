/*entpTpfilter*/
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'sbjTp'
})
export class sbjTp implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="央企";
		if(str==2)
			result ="国企";
		if(str==3)
			result ="民企";
		if(str==4)
			result ="其他";
		return result;
	}
}