import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'contentTypePie'
})
export class contentTypePie implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="资讯";break;
			case "2":result="直播";break;
			case "3":result="债券行情";break;
			case "5":result="报价";break;
			case "6":result="人脉";break;
			case "7":result="动态";break;
			case "8":result="视频";break;
			case "9":result="日报";break;
			case "10":result="雷区";break;
		}
		return result;
	}
}