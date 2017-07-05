import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'visitStatus'
})
export class VisitStatusPipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="未回访";break;
			case "2":result="已回访";break;
		}
		return result;
	}
}