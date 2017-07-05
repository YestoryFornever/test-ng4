import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="正常";break;
			case "3":result="冻结";break;
		}
		return result;
	}
}