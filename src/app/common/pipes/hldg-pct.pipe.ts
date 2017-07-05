/*dotFilter*/
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'hldgPct'
})
export class hldgPct implements PipeTransform {
	constructor() {}
	transform(dot:any) {
		let reg =  /^[0-9]+.?[0-9]*$/
		if(dot ){
			if(reg.test(dot)){
				dot = dot*100+'';
				let two =dot.split('.')[1]? dot.split('.')[1] :'0';
				two =  two.length>4 ? two :( two + "0000");
				dot = dot.split('.')[0]+ "." + ( two.substr(0,2) );
			}
		}
		return dot ;
	}
}