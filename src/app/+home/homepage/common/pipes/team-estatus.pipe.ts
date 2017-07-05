import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'teamEstatus'
})
export class teamEstatusPipe implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="生效";
		if(str==0)
			result ="无效";
		return result;
	}
}