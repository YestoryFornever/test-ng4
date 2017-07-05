/*rolefilter*/
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'roleId'
})
export class roleId implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="主承";
		if(str==2)
			result ="联承";
		if(str==3)
			result ="在团";
		if(str==4)
			result ="不在团";
		if(str==5)
			result ="投资";
		return result;
	}
}