import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'realNmStatus'
})
export class RealNmPipe implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="未认证";
		if(str==2)
			result ="待认证";
		if(str==3)
			result ="认证通过";
		if(str==4)
			result ="认证失败";
		return result;
	}
}