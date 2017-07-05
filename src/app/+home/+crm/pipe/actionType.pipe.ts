import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'actionType'
})
export class actionType implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="上门拜访";break;
			case "2":result="电话回访";break;
			case "3":result="集体培训";break;
			
		}
		return result;
	}
}