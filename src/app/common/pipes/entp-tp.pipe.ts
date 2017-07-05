import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'entpTp'
})
export class EntpTpPipe implements PipeTransform {
	constructor() {}
	transform(entpTp:any) {
		let result:string = entpTp;
		if(entpTp==0)
			result ="--";
		if(entpTp==1)
			result ="央企";
		if(entpTp==2)
			result ="国企";
		if(entpTp==3)
			result ="民企";
		if(entpTp==4)
			result ="其他";
		return result;
	}
}