// import { INCONFIG } from '../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { DataExportService } from './data-export.service';

import { UserCondition } from './classes/user-condition.class';
import { OrgCondition } from './classes/org-condition.class';
import { CrmCondition } from './classes/crm-condition.class';

@Component({
	selector: 'data-export',
	templateUrl: './data-export.component.html',
	styleUrls: [
		'./data-export.component.scss',
		'../../../../../../common/scss/typical-list/header.scss',
		'../../../../../../common/scss/typical-list/condition.scss',
	],
	providers:[
		DataExportService
	]
})
export class DataExportComponent implements OnInit{
	constructor(
		private dataExportService:DataExportService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	ngOnInit(){}
	
	xxx:any;
	fn(){}
	errorMsg:string;
	calenderLocale:Object = {
		firstDayOfWeek: 0,
		dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
		dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
		monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
		monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	};
	
	userDownLoad:string;
	orgDownLoad:string;
	crmDownLoad:string;

	userCondition:UserCondition = new UserCondition();
	orgCondition:OrgCondition = new OrgCondition();
	crmCondition:CrmCondition = new CrmCondition();
}
