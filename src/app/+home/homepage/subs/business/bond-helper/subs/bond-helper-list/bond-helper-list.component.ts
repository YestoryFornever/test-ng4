import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute,Router,Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BondHelperService } from '../../bond-helper.service';
import { Condition } from './classes/condition.class';
@Component({
	selector: 'bond-helper-list',
	templateUrl: './bond-helper-list.component.html',
	styleUrls: [
		'./bond-helper-list.component.scss',
		'../../../../../scss/typical-list/header.scss',
		'../../../../../scss/typical-list/table.scss',
		'../../../../../scss/typical-list/condition.scss',
	],
})
export class BondHelperListComponent implements OnInit{
	constructor(
		private bondHelperService:BondHelperService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router: Router
	){}
	ngOnInit(){
		this.getList();
	}
	list:any;
	createTeam(){
		this.router.navigate(['../bond-helper-create'],{relativeTo:this.activatedRoute});
	}
	checkDetail(item:any){
		this.router.navigate(['../bond-helper-detail',{teamId:item.teamId}],{relativeTo:this.activatedRoute});
	}
	/*pageParams:any={
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:10,
		totalPages:0,
	}*/
	public condition:Condition = new Condition();
	getList(){
		let param = {
			qqNo: this.condition.qqNo,
			teamEstatus: this.condition.teamEstatus,
			userName: this.condition.userName,
			rgstmblphNo: this.condition.rgstmblphNo
		};
		this.bondHelperService.queryTeamList(param)
			.subscribe(
				(res)=>{
					if(res.status==0){
						this.list = res.data;
					}
				},
				(err)=>{
					console.warn(err)
				}
			);
	}
}
