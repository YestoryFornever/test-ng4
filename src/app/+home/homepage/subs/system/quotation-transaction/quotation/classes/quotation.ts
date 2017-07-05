export class lookQuotation{
	constructor(){
		
			this.userName="";
			this.loginName="";
			this.organizationFullName="";
			this.drc="";
			this.bondShtrm="";
			this.rsdtrm="";
			this.num="";
			this.yldrto="";
			this.netprc="";
			this.rmrk="";
			this.ofrEStatus=""
			this.ofrDt="";//挂牌时间
			this.gpType="";
			this.gohUserNm="";
			this.bondTp="";
			this.state="";//状态
			this.organizationType="";
			// this.description="";
			this.bondOfrDayStar=""
			this.bondOfrDayEnd=""
			this.order="";
			// this.bondFullName="";
			
			// this.boneCode="";
			
			this.organizationId="";
			this.bondOfrId="";
			this.bondCd="";
			this.gohUserId="";
			this.bondid="",
			this.bondSize=""
			
			
			
	}
	order:any;
	bondSize:any;
	organizationType:string;
	bondTp:string;
	userName:string;
	loginName:string;
	// roleName:string;
	// description:string;
	state:string;
	copyPermissionGroupIndex:boolean;
	copyUserIndex:boolean;
	organizationFullName:string;
	drc:string;
	// bondFullName:string;
	bondShtrm:string;
	// boneCode:string;
	rsdtrm:string;
	num:string;
	yldrto:string;
	netprc:string;
	rmrk:string;
	ofrEStatus:string;
	ofrDt:string;
	gpType:string;
	gohUserNm:string;
	organizationId:string;
	bondOfrId:string;
	bondCd:string;
	gohUserId:string;
	bondid:string;
	bondOfrDayStar:string;
	bondOfrDayEnd:string;
}
/*
export class OrderCondition{
	constructor(){
	
	this.organizationType={
			// 机构类型
        "all":true,
        "a001": false, 
        "a002": false, 
        "a003": false,
        "a004":false,
        "a005":false,
        "a006":false,
        "a007":false,
        "a008":false,
        "a009":false,
        "a010":false,
	};
	this.organizationFullName="";
	this.userName="";
	this.loginName="";
	this.bondTp={
		// 债券类型
        "b0":true,
        "b1":false,
        "b2":false,
        "b3":false,
        "b4":false,
        "b5":false,
        "b6":false,
        "b7":false,
        "b8":false,
        "b9":false,
        "b10":false,
	};
	this.rsdtrm={
		// 剩余期限
        "all":true,
        "c001":false,
        "c002":false,
        "c003":false,
        "c004":false,
        "c005":false,
        "c006":false,
        "c007":false,
        "c008":false,
        "c009":false,
	};
	this.bondShtrm="";
	this.ofrEStatus={
		 // 报价状态
        "all":true,
        "d001":false,
        "d002":false,
        "d003":false,
	};
	// this.direction={
		// 方向
 //        "all":true,
 //        "e001":false,
 //        "e002":false,
 //        "e003":false,
	// };
	this.drc=""
	this.ofrDt={
		beginTime:"",
		lastTime:""
	};
	this.gpType={
		// 挂牌类型
        "all":true,
        "f001":false,
        "f002":false,
        "f003":false,
	};


	
			this.num="";
			this.yldrto="";
			this.netprc="";
			this.rmrk="";
			// this.ofrEStatus=""
			this.ofrDt="";//挂牌时间
			// this.gpType="";
			this.gohUserNm="";
			this.state="";//状态
			
			this.bondOfrDayStar=""
			this.bondOfrDayEnd=""
			
			// this.bondFullName="";
			
			// this.boneCode="";
			
			this.organizationId="";
			this.bondOfrId="";
			this.bondCd="";
			this.gohUserId="";
			this.bondid=""


	}
	organizationType:Object;
	bondTp:Object;
	userName:string;
	loginName:string;
	// roleName:string;
	// description:string;
	state:string;
	copyPermissionGroupIndex:boolean;
	copyUserIndex:boolean;
	organizationFullName:string;
	drc:string;
	// bondFullName:string;
	bondShtrm:string;
	// boneCode:string;
	rsdtrm:Object;
	num:string;
	yldrto:string;
	netprc:string;
	rmrk:string;
	ofrEStatus:Object;
	ofrDt:Object;
	gpType:Object;
	gohUserNm:string;
	organizationId:string;
	bondOfrId:string;
	bondCd:string;
	gohUserId:string;
	bondid:string;
	bondOfrDayStar:string;
	bondOfrDayEnd:string;
	statusAll(){
		this.organizationType={
		"all":true,
        "a001": false, 
        "a002": false, 
        "a003": false,
        "a004":false,
        "a005":false,
        "a006":false,
        "a007":false,
        "a008":false,
        "a009":false,
        "a010":false,
		};
	};
	statusOthers(){
		// obj["all"]=false;
		this.organizationType["all"]=false;
	}
status2All(){
		this.bondTp={
		// 债券类型
        "all":true,
        "b001":false,
        "b002":false,
        "b003":false,
        "b004":false,
        "b005":false,
        "b006":false,
        "b007":false,
        "b008":false,
        "b009":false,
        "b010":false,
	};
};
status2Others(){
	this.bondTp["all"]=false;
}

status3All(){
		this.rsdtrm={
		// 剩余期限
        "all":true,
        "c001":false,
        "c002":false,
        "c003":false,
        "c004":false,
        "c005":false,
        "c006":false,
        "c007":false,
        "c008":false,
        "c009":false,
	};
};
status3Others(){
	this.rsdtrm["all"]=false;
}

status4All(){
		this.ofrEStatus={
		 // 报价状态
        "all":true,
        "d001":false,
        "d002":false,
        "d003":false,
	};
};
status4Others(){
	this.ofrEStatus["all"]=false;
}

status5All(){
		this.gpType={
		// 挂牌类型
        "all":true,
        "f001":false,
        "f002":false,
        "f003":false,
	};

	};

status5Others(){
	this.gpType["all"]=false;
}

getDate(){
		let date = new Date();
		let month:any = date.getMonth() + 1;
		let day:any = date.getDate();
		return [
			date.getFullYear(),
			(month>9 ? '' : '0') + month,
			(day>9 ? '' : '0') + day
		].join('-');
	}
}*/