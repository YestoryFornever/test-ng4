import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'approveStatus'
})
export class ApproveStatusPipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="未认证";break;
			case "2":result="待认证";break;
			case "3":result="认证通过";break;
			case "4":result="认证失败";break;
		}
		return result;
	}
}