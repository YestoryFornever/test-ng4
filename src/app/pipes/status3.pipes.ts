import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'status3'
})
export class Status3Pipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="有效";break;
			case "2":result="无效";break;
			case "3":result="待确认";break;
		}
		return result;
	}
}