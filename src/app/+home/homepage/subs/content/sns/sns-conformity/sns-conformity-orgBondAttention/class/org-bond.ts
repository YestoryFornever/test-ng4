export class Organization{
	constructor(){
		this.insFulNm ='';
		this.bondNm   ='';
	}
	insFulNm:any;
	bondNm:any;
	reset(){
		this.insFulNm ='';
		this.bondNm   ='';
	}
}
export class OrgCondition{
	constructor(){
		this.insFulNm ='';
		this.bondNm   ='';
	}
	bondNm:any;
	insFulNm:any;
}
export class Modal_data_list{
	constructor(){
		this.org_id       ='';
		this.org_fullname = '';
		this.org_name     ='';
		this.bid          ='';
		this.bname        ='';
		this.bond_list    = '';

		this.shrtnm       ='';
		this.bondId       ='';

		this.insId        ='';
		this.insShtNm     ='';
		this.insFulNm     ='';

		this.is_show_bond = true;
		this.is_show_org  = true;
		this.is_org_zero  = true;
		this.modal_bond_list =[];
		this.modal_org_list ={};
		this.modal_table_list =[];
	}
	//发送 机构
	org_id:any;
	org_fullname: any;
	org_name:any;
	is_org_zero:any;
	is_show_org:any = true ;
	is_show_bond:any = true;
	modal_bond_list:any =[];
	modal_org_list:any ={};
	modal_table_list:any =[];
	//发送 债券
	bid:any;
	bname:any;
	//债券
	shrtnm:any;
	bondId:any;
	bond_list:any ;
	//机构
	insId:any;
	insShtNm:any;
	insFulNm:any;
	reset(){
		this.org_id       ='';
		this.org_fullname = '';
		this.org_name     ='';
		this.bid          ='';
		this.bname        ='';
		this.bond_list    = '';
		this.shrtnm       ='';
		this.bondId       ='';
		this.insId        ='';
		this.insShtNm     ='';
		this.insFulNm     ='';
		this.is_show_bond = true;
		this.is_org_zero  = true;
		this.is_show_org  = true;
		this.modal_bond_list =[];
		this.modal_org_list ={};
		this.modal_table_list =[];
	}


}
export class Org_json{
	constructor(){
		this.org_id       ='';
		this.org_name     ='';
		this.org_fullname ='';
	}
	org_id:any;
	org_fullname: any;
	org_name:any;
}
export class Bond_tags{
	constructor(){
		this.bid    ='';
		this.org_id ='';
		this.bname  ='';
	}
	org_id:any;
	bid:any;
	bname:any;
}
