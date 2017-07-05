import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orgAllocationType'
})
export class orgAllocationType implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="已分配";break;
			case "0":result="未分配";break;
		}
		return result;
	}
}