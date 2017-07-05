import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

import { BondHelperService } from '../../bond-helper.service';
import { Detail } from './classes/detail.class';
import { Member } from './classes/member.class';
@Component({
	selector: 'bond-helper-detail',
	templateUrl: './bond-helper-detail.component.html',
	styleUrls: [
		'./bond-helper-detail.component.scss',
		'../../../../../scss/typical-list/header.scss',
		'../../../../../scss/typical-list/table.scss',
		'../../../../../scss/db-col-form.scss',
	],
})
export class BondHelperDetailComponent implements OnInit{
	constructor(
		private bondHelperService:BondHelperService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router
	){}
	errorMsg:any;
	detail:Detail = new Detail();
	routeParam:any={
		teamId:''
	};
	ngOnInit(){
		this.activatedRoute.params
			.forEach((params: Params) => {
				this.routeParam.teamId = params['teamId']
			});
			console.log(this.routeParam.teamId);
		this.queryTeamDetail();
	}
	calenderLocale:Object = {
		firstDayOfWeek: 0,
		dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
		dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
		monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
		monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	};
	/**
	 * [queryTeamDetail 刷新团队详情]
	 */
	public queryTeamDetail(){
		this.bondHelperService.queryTeamDetail({
			teamId:this.routeParam.teamId
		}).subscribe((res)=>{
			if(res.status==0){
				console.log(res.data);
				this.detail = res.data;
				res.data.outQQList
					.map((item)=>{
							item.qqGroupStatus = ""+item.qqGroupStatus;
							return item;
						});
					this.calcActivedMember();
			}
		},(err)=>{
			console.error(err);
		});
	}
	/**
	 * [cancel 取消编辑团队]
	 */
	public cancel(){
		this.router.navigate(['../bond-helper-list'],{relativeTo:this.activatedRoute});
	}
	/**
	 * [editTeam 编辑团队]
	 */
	public editTeam(){
		let param = {
			teamId:this.routeParam.teamId,
			teamNm:this.detail.teamNm,
			bndgqqGroup:this.detail.bndgqqGroup,
			teamEstatus:this.detail.teamEstatus
		};
		console.log(param);
		this.bondHelperService.saveTeam(param).subscribe((res)=>{
			if(res.status==0){
				alert(res.msg);
				this.queryTeamDetail();
			}
		},(err)=>{
			console.error(err);
		});
	}
	/**
	 * [saveQQgroup 保存关联外部QQ群]
	 */
	refOutQQGrp(){
		let tmparr = this.detail.outQQList.map(item=>item.qqGroupNum);
		var isDuplicate = tmparr.some(function(item, idx){ 
			return tmparr.indexOf(item) != idx 
		});
		if(isDuplicate){
			alert("QQ群号重复");
			return false;
		}
		let param = {
			teamId:this.routeParam.teamId,
			groupList:this.detail.outQQList,
		};
		// console.log(param);
		this.bondHelperService
			.refOutQQGrp(param)
			.subscribe((res)=>{
				if(res.msg){
					alert(res.msg);
				}
				if(res.status==0){
					this.queryTeamDetail();
				}
			},(err)=>{
				console.error(err);
			});
	}
	/**
	 * [addQQGroupItem 添加QQ群项]
	 */
	addQQGroupItem(){
		this.detail.outQQList.push({
			qqGroupNum:'',
			qqGroupStatus:'0'
		});
	}
	/**
	 * [addMember 添加团队成员]
	 */
	addMember(){
		let newMember = new Member(this.routeParam.teamId);
		this.detail.tmList.push(newMember);
	}
	saveMember(xxx:any){
		let param = {
			teamId:this.routeParam.teamId,
			teamDtlid:xxx.teamDtlid,
			rgstmblphNo:xxx.rgstmblphNo,
			instId:xxx.instId,
			instNm:xxx.instNm,
			qqNo:xxx.qqNo,
			qqName:xxx.qqName,
			chnbondAhr:xxx.chnbondAhr,
			astaffEstatus:xxx.astaffEstatus,
			userId:xxx.userId,
			ofrAcc:xxx.ofrAcc,
		};
		this.bondHelperService.saveTeamMe(param)
			.subscribe((res)=>{
				if(res){
					alert(res.msg);
					this.queryTeamDetail();
				}
			},(err)=>{
				console.error(err);
			});
	}
	editMember(xxx:any){
		let param = {
			teamId:this.routeParam.teamId,
			teamDtlid:xxx.teamDtlid,
			rgstmblphNo:xxx.rgstmblphNo,
			instId:xxx.instId,
			instNm:xxx.instNm,
			qqNo:xxx.qqNo,
			qqName:xxx.qqName,
			chnbondAhr:xxx.chnbondAhr,
			astaffEstatus:xxx.astaffEstatus,
			userId:xxx.userId,
			ofrAcc:xxx.ofrAcc,
		};
		this.bondHelperService.saveTeamMe(param)
			.subscribe((res)=>{
				if(res){
					alert(res.msg);
					this.queryTeamDetail();
				}
			},(err)=>{
				console.error(err);
			});
	}
	delMember(xxx:any){
		let param = {
			teamDtlid:xxx.teamDtlid
		};
		this.bondHelperService.delTeamMe(param)
			.subscribe((res)=>{
				if(res){
					alert(res.msg);
					this.queryTeamDetail();
				}
			},(err)=>{
				console.error(err);
			});
	}
	/**
	 * [calcActivedMember 计算生效成员人数]
	 */
	activedMembers:number=0;
	calcActivedMember(){
		this.activedMembers = this.detail.tmList.reduce((pre,cur)=>{
			let n = cur.astaffEstatus=='0'?0:1;
			return pre+n;
		},0);
	}

	changeAstaffEstatus(){
		this.calcActivedMember();
	}

	getUserInfo(e:any,xxx:any){
		if(e.length==11){
			let i = 0;
			this.detail.tmList.forEach(item=>{if(item.rgstmblphNo == e)i++});
			if(i>1){
				alert('手机号重复');
				xxx.rgstmblphNo="";
				xxx.userId = '';
				xxx.userName = '';
				xxx.instId = '';
				xxx.instNm = '';
			}else{
				let param = {
					loginName:e
				};
				this.bondHelperService.getUserDetailByLoginName(param)
					.subscribe((res)=>{
						if(res.status==0){
							console.log(xxx);
							let user = res.data;
							xxx.userId = user.userId;
							xxx.userName = user.userName;
							xxx.instId = user.organizationId;
							xxx.instNm = user.organizationFullName;
						}
					},(err)=>{
						console.error(err);
					});
				}
		}else{
			xxx.userId = '';
			xxx.userName = '';
			xxx.instId = '';
			xxx.instNm = '';
		}
	}
}
