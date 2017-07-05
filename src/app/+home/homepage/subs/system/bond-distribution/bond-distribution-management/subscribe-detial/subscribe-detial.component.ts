import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { BondDistributionService } from '../../service/bond-distribution-service'

@Component({
	selector: 'subscribe-detial',
	templateUrl: './subscribe-detial.component.html',
	styleUrls: ['./subscribe-detial.component.scss'],
	providers: [BondDistributionService]
})
export class SubscribeDetialComponent implements OnInit{
	constructor(
		private bondDistributionService:BondDistributionService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	ngOnInit(){
		// console.log(this.activatedRoute.params);
		this.activatedRoute.params.forEach((params:Params)=>{
			this.routeParams.dstrBondId = params['dstrBondId'];
			this.routeParams.issuId = params['issuId'];
			this.routeParams.enqrTp = params['enqrTp'];
		});
		this.getSbrbInfList();
		this.downloadDstrDetail=INCONFIG.getIP()+`bonddstr/exportSbrbInfList?
			dstrBondId=${this.routeParams.dstrBondId}&
			issuId=${this.routeParams.issuId}&
			rcptyInst=${this.conditions.rcptyInst}&
			rcptyUser=${this.conditions.rcptyUser}&
			sndrInst=${this.conditions.sndrInst}&
			sndrUser=${this.conditions.sndrUser}&
			sbrbChnl=${this.conditions.sbrbChnl}&
			sbrbEStatus=${this.conditions.sbrbEStatus}`;
	}
	routeParams:any = {
		dstrBondId:'',
		issuId:''
	}
	conditions:any = {
		rcptyInst:'',
		rcptyUser:'',
		sndrInst:'',
		sndrUser:'',
		sbrbChnl:['1','2','3','4'],
		sbrbChnlPattern:[
			{name:'平台',id:'1'},
			{name:'QQ',id:'2'},
			{name:'微信',id:'3'},
			{name:'录入',id:'4'},
		],
		sbrbEStatus:['3','4','7','5'],
		sbrbEStatusPattern:[
			{name:'新消息',id:'3'},
			{name:'已读',id:'4'},
			{name:'已拒绝',id:'7'},
			{name:'已撤销',id:'5'},
		]
	}
	pageParams:any={
		maxSize:5,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:10,
		totalPages:NaN,
	}
	/**
	 * 列表变量
	 * @type {any}
	 */
	list:any;
	errorMessage:any;
	/**
	 * 申购量和利率变量
	 */
	sbrbSmy:any={
		custSbrbTnum:"",//申购总量（单位元）
		sbrbIntrtLwrLmt:"",//申购利率下限（单位1）
		sbrbIntrtUpLm:"",//申购利率上限（单位1）
	};
	/**
	 * 获取申购详情
	 */
	getSbrbInfList(){
		let param = {
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
			rcptyInst:this.conditions.rcptyInst,
			rcptyUser:this.conditions.rcptyUser,
			sndrInst:this.conditions.sndrInst,
			sndrUser:this.conditions.sndrUser,
			sbrbChnl:this.conditions.sbrbChnl.join(','),
			sbrbEStatus:this.conditions.sbrbEStatus.join(','),
			pageNum:this.pageParams.currentPage,
			pageSize:this.pageParams.itemsPerPage,
		}
		console.log(param,'param');
		this.bondDistributionService.getSbrbInfList(param).subscribe(
			res => {
				console.log(res);
				if(res.data&&res.status=='0'){
					this.list  = res.data.list;
					this.sbrbSmy  = res.data.sbrbSmy;
					this.pageParams.totalItems = res.data.page["totalResult"];
					this.changeDetectorRef.detectChanges();
				}
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
	/**
	 * 导出表格
	 */
	downloadDstrDetail:any;
	exportSbrbInfList(){
		this.bondDistributionService.exportSbrbInfList({
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
			rcptyInst:this.conditions.rcptyInst,
			rcptyUser:this.conditions.rcptyUser,
			sndrInst:this.conditions.sndrInst,
			sndrUser:this.conditions.sndrUser,
			sbrbChnl:this.conditions.sbrbChnl,
			sbrbEStatus:this.conditions.sbrbEStatus,
		}).subscribe(
			res => {
				console.log(res)
			},
			error => {
				this.errorMessage = error
			}
		);
	}
	userSubDetail(item:any,flag:any){
		this.router.navigate(['../../../../subscribe-detial-user',
			this.routeParams.dstrBondId,
			this.routeParams.issuId,
			item[flag+'UserId'],
			item[flag+'TeamId'],
			item[(flag=='rcpty'?'sndr':'rcpty')+'TeamId'],
			item[flag+'UserRlId'],
			this.routeParams.enqrTp
		],{relativeTo:this.activatedRoute});
	}
	gotoBondDetail(){
		this.router.navigate(['../../../../bond-detial',
			this.routeParams.dstrBondId,
			this.routeParams.issuId,
			this.routeParams.enqrTp
		],{relativeTo:this.activatedRoute});
	}
}
