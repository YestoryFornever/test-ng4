import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { BondDistributionService } from '../../service/bond-distribution-service';

@Component({
	selector: 'bond-detial',
	templateUrl: './bond-detial.component.html',
	styleUrls: ['./bond-detial.component.scss'],
	providers: [BondDistributionService]
})
export class BondDetialComponent implements OnInit{
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
		});
		this.getBondDetail();
		this.getIssuerInfo();
		this.getBondCdr();
		this.getDstrUserList();
		this.getUwrtGrpList();
	}
	routeParams:any = {
		dstrBondId:'',
		issuId:''
	}
	errorMessage:String;
	bondInfo:any={
		bondNm:'',//债券名称
		issuNum:'',//发行量（无需格式化，直接显示）
		primUdwr:'',//主承销商
		trm:'',//期限
		bondTp:'',//债券类型
		wrghtTp:'',//含权类型
		repypnpMod:'',//还本方式
		intrtTp:'',//利率类型
		faceintrate:'',//票面利率
		baseIntrtNm:'',//基础利率名
		baseIntrt:'',//基础利率
		issuPrc:'',//发行价格
		intpymtFrq:'',//付息频率
	};
	getBondDetail(){
		let param = {
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
		}
		this.bondDistributionService.getBondDetail(param).subscribe(
			res => {
				this.bondInfo = res.data;
				console.log(res.data);
			},
			error => {
				this.errorMessage = error;
				//alert(error);
			}
		);
	}
	issuerInfo:any={
		issuSbj:'',//发行主体
		sbjTp:'',
		orgForm:'',//组织形式
		fstIdy:'',//一级行业
		secIdy:'',//二级行业
		prvc:'',//省份
		cityZon:'',//市区
		hldgShrh:'',//控股股东
		hldgShrhTp:'',//控股股东企业类型
		hldgPct:'',//控股比例（单位%）
		rgstCptl:'',//注册资本(单位元)
		actCntlr:'',//实际控制人
		actCntlrTp:'',//实际控制人企业类型
		oprtScop:'',//经营范围
	};
	getIssuerInfo(){
		let param = {
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
		}
		this.bondDistributionService.getIssuerInfo(param).subscribe(
			res => {
				this.issuerInfo = res.data;
				console.log(res.data);
			},
			error => {
				this.errorMessage = error;
				//alert(error);
			}
		);
	}
	bondCdr:any={
		inviteBeginDate:'',
		valueDay:'',
		valueDays:'',
		paymentDate:'',
		paymentDays:''
	};
	getBondCdr(){
		let param = {
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
		}
		this.bondDistributionService.getBondCdr(param).subscribe(
			res => {
				this.bondCdr = res.data;
				console.log(res.data);
			},
			error => {
				this.errorMessage = error;
				//alert(error);
			}
		);
	}
	friendsList:any=[];
	getDstrUserList(){
		let param = {
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
		}
		this.bondDistributionService.getDstrUserList(param).subscribe(
			res => {
				console.log(res,'getDstrUserList');
				this.friendsList = res.data;
			},
			error => {
				this.errorMessage = error;
				//alert(error);
			}
		);
	}
	buyersList:any=[
		/*{
			uwrtId:'1'//参销团ID
			uwrtShortNm:'1'//参销团简称
			uwrtFullNm:'1'//参销团全称
		},
		{
			uwrtId:'1'//参销团ID
			uwrtShortNm:'1'//参销团简称
			uwrtFullNm:'1'//参销团全称
		},
		{
			uwrtId:'1'//参销团ID
			uwrtShortNm:'1'//参销团简称
			uwrtFullNm:'1'//参销团全称
		},*/
	];
	getUwrtGrpList(){
		let param = {
			dstrBondId:this.routeParams.dstrBondId,
			issuId:this.routeParams.issuId,
		}
		this.bondDistributionService.getUwrtGrpList(param).subscribe(
			res => {
				this.buyersList = res.data;
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
	dateColor(d:any){
		if(!!d&&(new Date(d)).getTime()<(new Date().getTime()))
			return '#ccc';
	}
}
