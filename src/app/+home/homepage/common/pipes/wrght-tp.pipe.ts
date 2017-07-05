import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'wrghtTp'
})
export class wrghtTp implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="含权";
		if(str==2)
			result ="不含权";
		return result;
	}
}