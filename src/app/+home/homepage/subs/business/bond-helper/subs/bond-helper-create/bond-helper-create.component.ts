import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BondHelperService } from '../../bond-helper.service';
import { Condition } from './classes/condition.class';
@Component({
	selector: 'bond-helper-create',
	templateUrl: './bond-helper-create.component.html',
	styleUrls: [
		'./bond-helper-create.component.scss',
		'../../../../../scss/typical-list/header.scss',
		'../../../../../scss/db-col-form.scss',
	],
})
export class BondHelperCreateComponent implements OnInit{
	constructor(
		private bondHelperService:BondHelperService,
		private changeDetectorRef:ChangeDetectorRef,
		private location:Location,
		private activatedRoute:ActivatedRoute,
		private router:Router
	){}
	condition:Condition = new Condition();
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
	public goBack(){
		this.location.back();
	}
	public saveTeam(){
		let param = {
			teamId: 0,
			teamNm: this.condition.teamNm,
			bndgqqGroup: this.condition.bndgqqGroup,
			teamEstatus: this.condition.teamEstatus
		};
		this.bondHelperService.saveTeam(param)
			.subscribe(
				(res)=>{
					if(res.status==0){
						alert(res.msg);
						this.cancel();
					}
				},
				(err)=>{
					console.warn(err)
				}
			);
	}
	public cancel(){
		this.router.navigate(['../bond-helper-list'],{relativeTo:this.activatedRoute});
	}
}
