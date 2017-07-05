import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { AuthDataItemService } from './services/auth-data-item.service';
import { Organization } from './classes/organizations';
@Component({
	selector: 'alphain-auth-data-item',
	templateUrl: 'auth-data-item.component.html',
	styleUrls: [
		'./auth-data-item.component.scss',
		'../../../../scss/header.scss'
	],
	providers:[AuthDataItemService]
})
export class AuthDataItemComponent implements OnInit {
	constructor(private organizationListService:AuthDataItemService,private changeDetectorRef:ChangeDetectorRef) {
		this.dataSource = Observable.create((observer:any) => {
			// Runs on every search
			observer.next(this.organizationFullName);
		}).mergeMap((token:string) => this.getStatesAsObservable(token));
	}
	ngOnInit() {
		this.getOrganizations();
	}

	height = '312px';
	msgNumbers = [{Number:'5'},{Number:'7'},{Number:'10'},{Number:'15'},{Number:'55'}];

	errorMsg:string;
	organizations:Organization[];
	organizationsLength:number;
	getOrganizations(){
		this.organizationListService.getOrganizations(
			this.organizationFullName,
			this.organizationAbbreviation,
			this.organizationC1,
			this.organizationC2
		).subscribe(
			organizations => this.organizations = organizations,
			error => this.errorMsg = <any>error
		);
	}
	addOrganization(){}

	//typeahead
	organizationFullName:string="";
	organizationAbbreviation:string="";
	organizationC1:string;
	organizationC2:string;
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public dataSource:Observable<any>;
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public getStatesAsObservable(token:string):Observable<any> {
		let query = new RegExp(token, 'ig');
 
		return Observable.of(
			this.organizations.filter((state:any) => {
				return query.test(state.fullname);
			})
		);
	}
	public changeTypeaheadLoading(e:boolean):void {
		this.typeaheadLoading = e;
	}
	public changeTypeaheadNoResults(e:boolean):void {
		this.typeaheadNoResults = e;
	}
	public typeaheadOnSelect(e:any):void {
		//console.info('当前值:', e.value);
	}

	// 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=100;
	public itemsPerPage:number = 5;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){
		this.height = Number*40+120+'px';
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
	};
	// 翻页
	public pageChanged(event:any,allcheck:any):void {
		//console.log(event);
	};
	public pageNumChange(event:any){
		//console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};

	//添加机构
	isFinancial:string="true";
	//列标题设置
	listItem:Object={
		fullname:true,
		abbreviation:true,
		category:true,
		approveState:true,
		logo:true,
		address:true,
		address_detail:true,
		address_code:true,
		phone:true,
		isFinancial:true,
		backup:true,
		subsNum:true,
		population:true,
		source:true
	}
	colsSettingAll:boolean=false;
	cols_settingTrue(){
		for(let item in this.listItem){
			if(item==="fullname"||item==="abbreviation"||item==="category"||item==="approveState"){continue;}
			this.listItem[item]=true;
		}
		this.colsSettingAll=false;
	}
	cols_settingFalse(){
		for(let item in this.listItem){
			if(item==="fullname"||item==="abbreviation"||item==="category"||item==="approveState"){continue;}
			this.listItem[item]=false;
		}
		this.colsSettingAll=true;
	}
	//导出excel
	exportExcel(table:any, excel_helper:any){
		let name:string;
		let dt = new Date();
		let day = this.A0(dt.getDate());
		let month = this.A0(dt.getMonth() + 1);
		let year = dt.getFullYear();
		let hour = this.A0(dt.getHours());
		let mins = this.A0(dt.getMinutes());
		name = '机构列表' + year + month + day + hour + mins + '.xls';
		
		let table_text="<table border='2px'><tr bgcolor='#87AFC6'>";
		let textRange:any;
		let j=0;
		for(j = 0 ; j < table.rows.length ; j++)
		{
			table_text=table_text+table.rows[j].innerHTML+"</tr>";
		}
		table_text=table_text+"</table>";
		table_text= table_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
		table_text= table_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
		table_text= table_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

		let msie = window.navigator.userAgent.indexOf("MSIE ");
		let result:any;
		if (typeof msie !== "undefined" && msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))// If Internet Explorer
		{
			excel_helper.contentWindow.document.open("txt/html","replace");
			excel_helper.contentWindow.document.write(table_text);
			excel_helper.contentWindow.document.close();
			excel_helper.focus(); 
			result=excel_helper.contentWindow.document.execCommand("SaveAs", true, name);
		}else{
			let a = document.createElement('a');
			a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(table_text);
			a.download = name;
			a.click();

			//result = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table_text)); 
		}
		return (result);
	}
	private A0(num:any){
		return num>10?num.toString():("0"+num);
	}
}