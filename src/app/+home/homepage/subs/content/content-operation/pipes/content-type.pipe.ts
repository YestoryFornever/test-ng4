import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'contentType'
})
export class ContentType implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="资讯";
		if(str==2)
			result ="问答";
		if(str==3)
			result ="动态";
		if(str==4)
			result ="干货";
		if(str==5)
			result ="自媒体";
		if(str==6)
			result ="活动";
		if(str==7)
			result ="招聘求职";
		if(str==8)
			result ="会议培训";
		if(str==9)
			result ="视频";
		return result;
	}
}