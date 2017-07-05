import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'userType'
})
export class userTypePipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="官方账号";break;
			case "2":result="运营账号";break;
			case "3":result="大V账号";break;
			// case "3":result="冻结";break;
		}
		return result;
	}
}