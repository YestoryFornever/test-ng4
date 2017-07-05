import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NetUserService } from '../../net-services/net-user.service'

@Component({
	selector: 'province-city',
	templateUrl: 'province-city.component.html',
	styleUrls: [
		'./province-city.component.scss',
		'../../scss/typical-list/condition.scss'
	],
})
export class provinceCityComponent implements OnInit {
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		// private sanitizer: DomSanitizer,
		// private activatedRoute:ActivatedRoute,
		// private router:Router,
		// private netUserService:NetUserService,
	){}
	ngOnInit(){
		this.getOrgCategory1List()
	}
	
	errorMessage:any
	OrgCategory1List:any=[]
	OrgCategory2List:any=[]
	@Output() provinceOut = new EventEmitter();
	ObjUserOrgListCon:any={
		orgClass1:'',
		orgClass2:''
	}
	provinceChange() {
   		 this.provinceOut.emit(this.ObjUserOrgListCon);
	}
	getOrgCategory1List(){
		// this.netUserService.getOrgCategory1List(null)
		// .then((res:any)=>{
		// 	this.OrgCategory1List = res.data;
		// },error => this.errorMessage = error)

			this.OrgCategory1List = [{cname:'北京',cid:'1'}];
	}
	getOrgCategory2List(){
		this.OrgCategory2List=[{cname:'北京',cid:'1'}]
		// this.netUserService.getOrgCategory2List({cid:this.ObjUserOrgListCon.orgClass1})
		// .then((res:any)=>{
		// 	if(res.data){
		// 		this.OrgCategory2List = res.data;
		// 	}else{
		// 		this.OrgCategory2List=[]
		// 	}
		// },error => this.errorMessage = error)
	}
	changeOrgClass1(){
		this.provinceChange()
		this.ObjUserOrgListCon.orgClass2=''
		if(this.ObjUserOrgListCon.orgClass1){
			this.getOrgCategory2List()
		}else{
			this.OrgCategory2List=[]
		}	
	}
	changeOrgClass2(){
		this.provinceChange()
	}
}