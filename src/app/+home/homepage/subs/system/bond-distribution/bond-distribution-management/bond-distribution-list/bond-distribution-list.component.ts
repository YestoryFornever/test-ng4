import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { BondDistributionListServices } from './bond-distribution-list.service'
@Component({
	selector: 'bond-distribution-list',
	templateUrl: './bond-distribution-list.component.html',
	styleUrls: ['./bond-distribution-list.component.scss'],
	providers: [BondDistributionListServices]
})

export class BondDistributionListComponent implements OnInit{
	constructor(
		private bondDistributionListServices:BondDistributionListServices,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,


	){}

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let userId = params['userId'];
			let backId = params['backId'];
		})
		for(var i=0;i<this.creditType.length;i++){
			this.creditTypeList[i]={check:false}
		}
		for(var i=0;i<this.currIssuerCredit.length;i++){
			this.currIssuerCreditList[i]={check:false}
		}
		for(var i=0;i<this.issueTerm.length;i++){
			this.issueTermList[i]={check:false}
		}
		this.getQueryBondList();
	}
	/**
	 * 跳转到详情页面
	 */
	toDetail(item:any){
		this.router.navigate(['../subscribe-detial',item['dstrBondId'],item['issuId'],item['enqrTp']],{relativeTo:this.activatedRoute});
	}
	errorMessage:any ='';
	default:any ={
		enqrTp:'1',
		value:'',
		creditTypeList :[],
		issueTermList:[],
		currIssuerCreditList:[],
		pageNum:1,
		pageSize:10,
	}
	/**
	 * 模糊搜索
	 */
	bondListShow:any=false
	bondName:any=''
	bondNm:any={
		value:''
	}
	bondList:any=[]
	fuzzyMatchingForBond(){
		this.bondNm.value=this.bondName
		this.bondDistributionListServices.fuzzyMatchingForBond(this.bondNm)
	            .subscribe(
	            res => {
	            	console.log(res)
	                this.bondList  =  res.data;
	                },
	                error => this.errorMessage = error
	            );
	}
	BondSerch(val:any,id:any){
		this.bondListShow=false
	}
	closeBond(){
		this.bondListShow=false
	}
	/**
	 * 查询列表
	 *
	 */
	queryBondList :any =[];
	getQueryBondList(){
		this.beforeSearch();
		this.bondDistributionListServices.queryBondList(this.default)
            .subscribe(
	            res => {
	            	console.log(res)
	            	if(res.data && res.data.list){
	            		this.queryBondList  = res.data.list;
	            		for(let item of this.queryBondList){
	            			let num = (item.sbrbIntrtUpLm - item.sbrbIntrtLwrLmt);
	            			if(num == 0 || num ==100){
	            				item['two_line'] = true;
	            			}
	            		}
			            this.totalPages=res.data.page.totalPage;
			            this.totalItems =  res.data.page['totalResult'];
	            	}
	            },
	            error => this.errorMessage = error
            )
	}
	/**
	 * 发送前处理数据
	 */
	beforeSearch(){
		//债券期限
		if(this.all_issueTerm==0){
			this.default.issueTermList = [];
		}else{
			var issueTermList:any = []
			for(var i=0;i<this.issueTermList.length;i++){
				if(this.issueTermList[i].check){
					issueTermList.push(this.issueTerm[i].id)
				}
			}
			this.default.issueTermList=issueTermList;
		}
		//债券类型
		if(this.all_creditType==0){
			this.default.creditTypeList = [];
		}else{
			var creditTypeList:any = [];
			for(var i=0;i<this.creditTypeList.length;i++){
				if(this.creditTypeList[i].check){
					creditTypeList.push(this.creditType[i].id)
				}
			}
			this.default.creditTypeList=creditTypeList;
		}
		// 主体评级
		if(this.all_currIssuerCredit==0){
			this.default.currIssuerCreditList = [];
		}else{
			var currIssuerCreditList:any = [];
			for(var i=0;i<this.currIssuerCreditList.length;i++){
				if(this.currIssuerCreditList[i].check){
					currIssuerCreditList.push(this.currIssuerCredit[i].id)
				}
			}
			this.default.currIssuerCreditList=currIssuerCreditList;
		}
	}
	/**
	 * 发行状态
	 *
	 */
	enqrTpList:any = [
		{name:'发行中',id:1},
		{name:'明日发行',id:2},
		{name:'未来发行',id:3},
		{name:'未公告',id:4},
	]
	/**
	 * 债券期限
	 */
	all_issueTerm:any ='0';
	issueTermList:any=[];
	issueTerm:any = [
		{name:'1M',id:'1M'},
		{name:'3M',id:'3M'},
		{name:'6M',id:'6M'},
		{name:'9M',id:'9M'},
		{name:'1Y',id:'1Y'},
		{name:'3Y',id:'3Y'},
		{name:'5Y',id:'5Y'},
		{name:'7Y',id:'7Y'},
		{name:'10Y',id:'10Y'},
		{name:'>10Y',id:'>10Y'},
	]
	clickAll_issueTerm(){
		this.all_issueTerm = '0'
		for(var i=0;i<this.issueTerm.length;i++){
			this.issueTermList[i] = {check:false};
		}
	}
	clickOther_issueTerm(){
		this.all_issueTerm = '1'
	}
	/**
	 * 债券类型
	 */
	all_creditType:any ='0';
	creditTypeList:any=[];
	creditType:any = [
		{name:'短融',id:'3'},
		{name:'超短融',id:'4'},
		{name:'中票',id:'2'},
		{name:'PPN',id:'1'},
		{name:'公司债',id:'5'},
		{name:'非公开',id:'6'},
	]
	clickAll_creditType(){
		this.all_creditType = '0'
		for(var i=0;i<this.creditType.length;i++){
			this.creditTypeList[i] = {check:false};
		}
	}
	clickOther_creditType(){
		this.all_creditType = '1'
	}
	/**
	 * 主体评级
	 */
	all_currIssuerCredit:any ='0';
	currIssuerCreditList:any=[];
	currIssuerCredit:any = [
		{name:'AAA',id:'1'},
		{name:'AA+',id:'2'},
		{name:'AA',id:'3'},
		{name:'AA-',id:'4'},
		{name:'A+',id:'5'},
		{name:'其他',id:'99'},
	]
	clickAll_currIssuerCredit(){
		this.all_currIssuerCredit = '0'
		for(var i=0;i<this.currIssuerCredit.length;i++){
			this.currIssuerCreditList[i] = {check:false};
		}
	}
	clickOther_currIssuerCredit(){
		this.all_currIssuerCredit = '1'
	}

	// 分页
	msgNumbers:any = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number=1;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getQueryBondList();
	}
	public sizeData(Number:any){
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");
		var tr:any = document.createElement('tbody');
		var num:number = Number*1;
	};
	public pageNumChange(event:any,){

		this.default.pageSize=this.itemsPerPage;

	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.default.pageNum = event.page;
		this.getQueryBondList()
	};
}
