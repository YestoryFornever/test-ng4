import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../../common/net-services/net-crm.service'
import {INCONFIG} from '../../../../public/in.config';


@Component({
	selector: 'organization-detial',
	templateUrl: './organization-detial.component.html',
	styleUrls: [
				'./organization-detial.component.scss',
				'../../../../common/scss/typical-list/condition.scss',
				'../../../../common/scss/typical-list/header.scss',
				'../../../../common/scss/typical-list/table.scss',
				],
})
export class OrganizationDetialComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	ngOnInit(){
		// this.getPositionList()
	}
	orgIdefty:any=[{name:'用户目标机构',id:'1'},{name:'发债机构',id:'2'},{name:'外汇交易中心成员',id:'3'},{name:'承分销资质',id:'4'},{name:'评级机构',id:'5'},{name:'其他机构',id:'6'}]
	busniessTip:any=[{name:'法人机构',id:'1'},{name:'开展线下业务',id:'2'},{name:'是否金融机构',id:'3'},{name:'是否中债数据授权',id:'4'}]

	turnTo(){
		this.router.navigate(['../../organization-list'],{relativeTo:this.activatedRoute});
	}
	chartData:any
	selectedCity:any='中国农业银行股份有限公司'
	orgs:any=[{label: '中国农业银行股份有限公司', value: '中国农业银行股份有限公司2'},{label: '外汇交易中心成员', value: '中国asdasd'},{label: '开展线下业务', value: '中国asssszzz'}]

// 上传图片预览
user:any={
	info_card_url:'',
	info_card:''

}
formErrors:any = {
		'phone':'',
		'name':'',
		'company':'',
		'position':'',
		'contact':'',
		'work_contact':'',
		'mail':'',
		'work_address':'',
		'referrer_phonenum':'',
		'name_card_url':''
	}
	info_card_data = function(file_data:any){
		this.user.info_card = file_data;
	}
	info_card_url = function(file_url:any){
		this.user.info_card_url = file_url;
	}

}