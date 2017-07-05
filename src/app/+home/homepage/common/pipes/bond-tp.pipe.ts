import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'bondTp'
})
export class bondTp implements PipeTransform {
	constructor() {}
	transform(str:any) {
		let result:string = str;
		if(str==1)
			result ="利率债";
		if(str==2)
			result ="国债";
		if(str==3)
			result ="央票";
		if(str==4)
			result ="金融债";
		if(str==5)
			result ="地方债";
		if(str==6)
			result ="信用债";
		if(str==7)
			result ="短融";
		if(str==8)
			result ="中票";
		if(str==9)
			result ="企业债";
		if(str==10)
			result ="公司债";
		if(str==11)
			result ="同业存单";
		if(str==99)
			result ="其他";
		return result;
	}
}