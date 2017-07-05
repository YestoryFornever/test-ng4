import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'showType'
})
export class showTypePies implements PipeTransform {
	constructor() {}
	transform(url:any) {
		let result:string;
		switch(url){
			case 1:result="直播中";break;
			case 2:result="未开始";break;
			case 3:result="已结束";break;
			case 4:result="马上开始";break;
		}
		return result;
	}
}