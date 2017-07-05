import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'conType'
})
export class conType implements PipeTransform {
	constructor() {}
	transform(url:string) {
		let result:string;
		switch(url){
			case "1":result="重要";break;
			case "2":result="一般";break;
			case "3":result="无关";break;
			
		}
		return result;
	}
}