import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { AuthRoleManageAuthorizationService } from './services/auth-role-manage-authorization.service';
import { Role } from '../../classes/role';
@Component({
	selector: 'alphain-auth-role-manage-authorization',
	templateUrl: 'auth-role-manage-authorization.component.html',
	styleUrls: [
		'./auth-role-manage-authorization.component.scss',
		'../../../../../../scss/header.scss',
		'../../../../../../scss/pagination.scss',
		'../../../../../../scss/table.scss'
	],
	providers:[AuthRoleManageAuthorizationService]
})
export class AuthRoleManageAuthorizationComponent implements OnInit {
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router
	){}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let code = +params['code'];
		});
	}
	//tabs
	public alertMe():void {
		console.warn("warn!");
	};
	public removeTabHandler(/*tab:any*/):void {
		console.log('Remove Tab handler');
	};
	// 分页
	height = '312px';
	msgNumbers = [{Number:'5'},{Number:'7'},{Number:'10'},{Number:'15'},{Number:'55'}];
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
}