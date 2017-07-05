import { Member } from './member.class'
export class Detail{
	constructor(){
		this.tmList = [];
	}
	teamNm:string;
	teamMenm:string;
	teamEstatus:string;
	bndgqqGroup:string;
	createTime:string;
	crtPsn:string;
	outQQList:Array<QQItem>;
	tmList:Array<Member>;
}
class QQItem{
	constructor(){}
	qqGroupNum:string;
	qqGroupStatus:string;
}