
import {INCONFIG} from '../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ChatQueryService } from './chat-query.service';

import { TypeAhead } from './classes/typeahead.class';
import { Condition } from './classes/condition.class';
import { Item } from './classes/item.class';

@Component({
	selector: 'chat-query',
	templateUrl: './chat-query.component.html',
	styleUrls: [
		'./chat-query.component.scss',
		'../../../scss/typical-list/header.scss',
		'../../../scss/typical-list/table.scss',
		'../../../scss/typical-list/condition.scss',
		'../../../scss/typical-list/order.scss'
	],
})
export class ChatQueryComponent implements OnInit{
	constructor(
		private chatQueryService:ChatQueryService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	ngOnInit(){
		this.getList();
		this.asynOrgNm();
		this.customlist();
		this.excelExport = `${INCONFIG.getIP()}imcustomservicem/exportchatlist?
			pageNum=${this.pageParams.currentPage}
			&pageSize=${this.pageParams.itemsPerPage}
			&orderBy=${this.condition.orderBy}
			&sortType=${this.condition.sortType}
			&orgName=${this.condition.orgNm}
			&userName=${this.condition.username}
			&customImId=${this.condition.customImId}
			&startTime=${this.condition.startTime?this.condition.startTime.getTime():""}
			&endTime=${this.condition.endTime?this.condition.endTime.getTime():""}
			&msg=${this.condition.msg}`;
	}
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

	list:Item[]=[];
	
	orgNmTypeAhead:TypeAhead = new TypeAhead();
	asynOrgNm(){
		this.orgNmTypeAhead.source = Observable.create((observer:any) => {
			this.chatQueryService
				.getOrgFullName(this.condition.orgNm)
				.subscribe(
					data => {
						observer.next(data)
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.orgNmTypeAhead.getStates(token));
	}
	blurOrgNm(e:any){
		this.condition.orgNm = '';
	}

	condition:Condition = new Condition();
	pageParams:any={ 
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:30,
		totalPages:0,
	}
	getList(){
		let param:any = {
			pageNum:this.pageParams.currentPage,
			pageSize:this.pageParams.itemsPerPage,
			orderBy:this.condition.orderBy,
			sortType:this.condition.sortType,
			orgName:this.condition.orgNm,
			userName:this.condition.username,
			customImId:this.condition.customImId,
			startTime:this.condition.startTime?this.condition.startTime.getTime():"",
			endTime:this.condition.endTime?this.condition.endTime.getTime():"",
			msg:this.condition.msg
		};
		console.log(param);
		this.chatQueryService.chatlist(param)
			.subscribe(
				res => {
					if(res&&res.status==0){
						this.list = res.data.list;
						this.pageParams.totalItems = res.data.page["totalResult"];
						this.changeDetectorRef.detectChanges();
					}
				},
				error => this.errorMsg = error
			);
	}

	cstrNms:any[] = [];
	customlist(){
		let param:any = {};
		this.chatQueryService.customlist(param)
			.subscribe(
				res => {
					if(res&&res.status==0){
						console.log(res.data);
						this.cstrNms = res.data;
						this.getLoginUser();
					}
				},
				error => this.errorMsg = error
			);
	}

	// 排序
	Order(ord:any,type:any){
		this.condition.orderBy = ord;
		this.condition.sortType = type;
		this.getList();
	}

	excelExport:string;
	/*获取用户信息*/
	getLoginUser(){
		this.chatQueryService
			.getLoginUser({}).subscribe(
				rslt => {
					if(rslt.status==0){
						if(rslt.data && rslt.data.otherInfo){
							this.condition.customImId = rslt.data.otherInfo.customsImId||"";
						}
					}
				},
				error => this.errorMsg = error
			);
	}
}
