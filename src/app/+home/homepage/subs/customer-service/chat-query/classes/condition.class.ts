export class Condition{
	constructor(){
		this.orgNm = '';
		this.endTime = new Date();
		this.startTime = new Date(Date.parse(String(this.endTime))-6*24*3600*1000);
		this.sortType = 'DESC';
		this.orderBy = 'cTime';
		this.username='';
		this.customImNum='';
		this.customImId='';
		this.msg='';
	}
	orgNm:string;
	username:string;
	customImNum:string;
	customImId:string;
	startTime:Date;
	endTime:Date;
	msg:string;
	orderBy:string;
	sortType:string;
}