import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'enqrTp'
})
export class EnqrTpPipe implements PipeTransform {
	constructor() {}
	transform(enqrTp:any) {
		let result:string = enqrTp;
		if(enqrTp==1)
			result ="发行中";
		if(enqrTp==2)
			result ="明日发行";
		if(enqrTp==3)
			result ="未来发行";
		if(enqrTp==4)
			result ="未公告";
		return result;
	}
}