/*intpymtFrqfilter*/
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'intpymtFrq'
})
export class intpymtFrq implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="每月";
		if(str==2)
			result ="每季度";
		if(str==3)
			result ="每半年";
		if(str==4)
			result ="每年";
		if(str==5)
			result ="到期还本付息";
		return result;
	}
}