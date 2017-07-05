import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'numAddComma'
})
export class NumAddCommaPipe implements PipeTransform {
	constructor() {}
	transform(number:any) {
		// debugger
		let result = '', counter = 0;
		number = (number || 0).toString();
		if(number<0){
			number = number.toString().slice(1)
			console.log(111)
			 for (var i = number.length - 1; i >= 0; i--) {
		        counter++;
		        result = number.charAt(i) + result;
		        if (!(counter % 3) && i != 0) { result = ',' + result; }
		    }
		    return '-'+result;
		}else{
			for (var i = number.length - 1; i >= 0; i--) {
		        counter++;
		        result = number.charAt(i) + result;
		        if (!(counter % 3) && i != 0) { result = ',' + result; }
		    }
		    return  result;
		}

		// return url==="1"?"是":"否";
	}
}