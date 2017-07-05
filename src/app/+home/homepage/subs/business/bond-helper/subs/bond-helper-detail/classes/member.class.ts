export class Member{
	constructor(teamId){
		this.teamId = teamId;
		this.teamDtlid = '0';
		this.rgstmblphNo = '';
		this.instId = '';
		this.instNm = '';
		this.qqNo = '';
		this.qqName = '';
		this.chnbondAhr = '0';
		this.astaffEstatus = '0';
		this.userId = '';
		this.userName = '';
		this.ofrAcc = '';
	}
	teamId:string;
	teamDtlid:string;
	rgstmblphNo:string;//手机号
	instId:string;//机构id
	instNm:string;
	qqNo:string;
	qqName:string;
	chnbondAhr:string;
	astaffEstatus:string;
	userId:string;
	userName:string;
	ofrAcc:string;//报价账户
}