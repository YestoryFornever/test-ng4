import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { BondDistributionService } from '../../service/bond-distribution-service'

@Component({
	selector: 'user-subscribe-detial',
	templateUrl: './user-subscribe-detial.component.html',
	styleUrls: ['./user-subscribe-detial.component.scss'],
	providers: [BondDistributionService]
})
export class SubscribeDetialUserComponent implements OnInit{
	constructor(
		private bondDistributionService:BondDistributionService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			this.routeParams.dstrBondId = params['dstrBondId'];
			this.routeParams.issuId = params['issuId'];
			this.routeParams.userId = params['userId'];
			this.routeParams.teamId = params['teamId'];
			this.routeParams.obTeamId = params['obTeamId'];
			this.routeParams.roleId = params['roleId'];
		});
		this.getUserDetail();
		this.getCustSbrbList();
		this.getSbrbList();
		this.downloadDstrCustom=INCONFIG.getIP()+`bonddstr/exportCustSbrbList?
			dstrBondId=${this.routeParams.dstrBondId}&
			issuId=${this.routeParams.issuId}&
			teamId=${this.routeParams.teamId}&
			obTeamId=${this.routeParams.obTeamId}`;
		this.downloadDstrHis=INCONFIG.getIP()+`bonddstr/exportSbrbList?
			dstrBondId=${this.routeParams.dstrBondId}&
			issuId=${this.routeParams.issuId}&
			teamId=${this.routeParams.teamId}&
			obTeamId=${this.routeParams.obTeamId}`;
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
		sbrbChnl:'',
		sbrbEStatus:'',
	}
	//列表变量
	customlist:any=[
		/*{
			createTime:"已截标",
			dlvTp:"上市",
			rcptyInstId:"3785",
			rcptyInstNm:"北京首都开发控股(集团)有限公司",
			rcptyTeamId:"5",
			rcptyTeamNm:"分销王",
			rcptyUserId:"114501",
			rcptyUserNm:"张旭超",
			rcptyUserRl:"投资",
			sbrbChnl:"录入",
			sbrbEStatus:"已读",
			sbrbId:"68503",
			sbrbIntrt:"450.0000",
			sbrbNum:"0.10",
			sellrMod:"折价",
			sndrInstId:"3785",
			sndrInstNm:"北京首都开发控股(集团)有限公司",
			sndrTeamId:"5",
			sndrTeamNm:"分销王",
			sndrUserId:"114501",
			sndrUserNm:"张旭超",
			sndrUserRl:"投资"
		}*/
	];
	customsbrbSmy:any={
		custSbrbTnum:'',
		sbrbIntrtLwrLmt:'',
		sbrbIntrtUpLm:''
	};//申购量和利率变量
	downloadDstrCustom:any;
	hislist:any;
	hissbrbSmy:any={
		sbrbTnum:'',
		sbrbIntrtLwrLmt:'',
		sbrbIntrtUpLm:'',
		mySbrbTnum:'',
		custSbrbTnum:'',
		winbidTnum:''
	};//申购量和利率变量
	downloadDstrHis:any;
	//错误消息
	errorMessage:any;
	//用户信息
	userInfo:any={
		organizationFullName:'',
		userName:'',
		contactPhone:''
	};
	getUserDetail(){
		this.bondDistributionService.getUserDetail({
			userId:this.routeParams.userId,
		}).subscribe(
			res => {
				console.log(res,'getUserDetail');
				this.userInfo = res.data;
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
	pageCustParams:any={
		maxSize:5,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:10,
		totalPages:NaN,
	}
	getCustSbrbList(){
		this.bondDistributionService.getCustSbrbList({
			teamId:this.routeParams.teamId,
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
			pageNum:this.pageCustParams.currentPage,
			pageSize:this.pageCustParams.itemsPerPage,
		}).subscribe(
			res => {
				console.log(res,'getCustSbrbList');
				this.customlist = res.data.list;
				this.customsbrbSmy = res.data.sbrbSmy;
				this.pageCustParams.totalItems = res.data.page["totalResult"];
				this.changeDetectorRef.detectChanges();
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
	pageParams:any={
		maxSize:5,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:10,
		totalPages:NaN,
	}
	getSbrbList(){
		this.bondDistributionService.getSbrbList({
			teamId:this.routeParams.teamId,
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
			obTeamId:this.routeParams.obTeamId,
			pageNum:this.pageParams.currentPage,
			pageSize:this.pageParams.itemsPerPage,
		}).subscribe(
			res => {
				console.log(res,'getSbrbList');
				this.hislist = res.data.list;
				this.hissbrbSmy = res.data.sbrbSmy;
				this.pageParams.totalItems = res.data.page["totalResult"];
				this.changeDetectorRef.detectChanges();
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
}
