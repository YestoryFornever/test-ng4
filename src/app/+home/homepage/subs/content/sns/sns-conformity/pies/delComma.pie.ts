import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'delComma'
})
export class delCommaPipe implements PipeTransform {
	constructor() {}
	transform(url:string) {
		var reg=/,$/g;
		var str = url.replace(reg,"")
	　return str;
	}
}