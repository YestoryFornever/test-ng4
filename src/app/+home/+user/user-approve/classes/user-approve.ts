export class UserMsge{
	name:string;
	company:string;
	section:string;
	phone:string;
	number:string;
	sendDate:string;
	recDate:string;
	approveMsg:string;
	approvePeople:string;
	approveTime:string;
}
export class Company{
	organizationId:string;
	organizationShortName:string;
}

// organizationId:公司ID
// organizationShortName:公司名称（简称）
// {name:'Ctursy',company:'亚联',section:'亚联之星',phone:'138888888',number:'010-8815988',sendDate:'2016-8-10',recDate:'2016-10-8',approveMsg:'注册新用户'}
// export class NavDynamic{
// 	group:string;
// 	items:Nav[];
// 	showNavDynamic:boolean;
// }