import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router ,Params}   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CoinGoldDetailServices }  from '../../services/coin-gold-detail.services';
import {INCONFIG} from '../../../../../../../../../public/in.config';

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'coin-gold-list',
	templateUrl: './coin-list.component.html',
	styleUrls: ['./coin-list.component.scss','../../../../../../scss/typical-list/card.scss'],
	providers: [CoinGoldDetailServices]
})
export class CoinListComponent implements OnInit{

	height= 'auto';

	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private coinGoldDetailServices:CoinGoldDetailServices,

		private activatedRoute:ActivatedRoute,
        private router:Router,

		// private versionManagementService:VersionManagementService
	){}	
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}

	ngOnInit(){

		this.activatedRoute.params.forEach((params:Params)=>{
			let phone = params['phone'];
			this.default.phone = phone;
			this.getGoldDetailList();
			this.getSumCoinDetail();
		})
		this.mon = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
        };
    }
    private IP:string = INCONFIG.getIP()

    userInfo:any={
		businessCardUrl:'',
		userName:'',
		loginName:'',
		department:'',
		position:''
	}
	html:any
	getUserInfo(id:any){
		var ID={userId:id+''}
		this.coinGoldDetailServices
			.getUserProfileInfo(ID)
			.subscribe(
				result=>{
					if(!result.data.businessCardUrl){
						result.data.businessCardUrl='../../../../../../../../../public/images/showCard.jpg'
					}
					if(!result.data.userName){
						result.data.userName='暂无姓名'
					}
					if(!result.data.loginName){
						result.data.loginName='暂无'
					}
					if(!result.data.department){
						result.data.department='暂无'
					}
					if(!result.data.position){
						result.data.position='暂无'
					}
				
				this.userInfo=result.data
				this.html=`<div class="card"><img class="imgCard" src="`+this.userInfo.businessCardUrl+`"></div><div><div class="userTitle">`+this.userInfo.userName+' '+this.userInfo.loginName+`</div><div><div class="userInfo">机构：`+this.userInfo.organizationFullName+`</div><div class="userInfo">部门： `+this.userInfo.department+`</div><div class="userInfo">职位： `+this.userInfo.position+`</div></div></div>`
				},
				error=>this.errorMessage = error
			);
	}
    mon:any={
        monthNames:[]
    };


	errorMessage:any;
	page:any;
	myStartTime:any;
	myEndTime:any;
	typeArr :any =[];
	default:any={ 
		pageNum:'1',
		pageSize:'10',
		detailType:"",
		sortType:"",
		orderBy:'',
		phone:"",
		startTime:"",
		endTime:"",
	}	
	// 去空格
	trim(str:any) { //删除左右两端的空格　　
	  return str.replace(/(^\s*)|(\s*$)/g,"");　　
	}
	//获取金币明细列表
	goldDetailLists:any =[];

	getGoldDetailList(){
		console.log(this.default);
		this.default.detailType ="";
		this.default.endTime  ="";
		this.default.startTime =""; 
		if(this.myStartTime  ){
                this.default.startTime = (Date.parse( this.myStartTime ));
        }
        if(this.myEndTime ){
                 this.default.endTime = (Date.parse( this.myEndTime )-0 +  1000*24*3600);
        }
        if(this.default.phone){
        	 this.default.phone = this.trim (this.default.phone );
        }else{
        	this.default.phone=''
        }

		this.typeArr = [];
		for (var i in this.checkModel) {
			if(this.checkModel[i] == true){
				this.typeArr.push( i.substring(1) );
				this.default.detailType = this.typeArr.join(",");
			}
		}

		console.log(this.default);

		this.coinGoldDetailServices.goldDetailList(this.default)
	        .subscribe( 
	            goldList =>{
	            	if(goldList.status == "0"){
	            		// this.currentPage = 1;//无法同时修改当前页和每页总数
						// this.changeDetectorRef.detectChanges();
						this.goldDetailLists = goldList.data.list;
						this.page            =  goldList.data.page;
						this.totalItems      = this.page.totalResult;
	            		this.getSumCoinDetail();

	            	}else{
	            		alert("请求超时");
	            	}
	                console.log(goldList);
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	sumCoinLists:any =[];
	// 获取金币明细总额
	getSumCoinDetail(){
		
		// //console.log(this.search);
		this.coinGoldDetailServices.goldSumCoinDetail(this.default)
	        .subscribe( 
	            sumCoinList =>{
	            	if(sumCoinList.status == "0"){
	            		this.sumCoinLists = sumCoinList.data;
	            	}else{
	            		alert("请求超时");
	            	}
	            	
	                console.log(sumCoinList);
	                
	               
	            },
	            error => this.errorMessage = <any>error
	        );
	}

	
	public checkModel:any = {
		a101: false, 
		b102: false, 
		c103: false,
		d104:false,
		e105:false,
		f106:false,
		g107:false,
		h108:false,
		i109:false,
		j110:false,
		k111:false,
		l112:false,
		m113:false,
		n114:false,
		o115:false,
		p116:false,
		q117:false,
		r118:false,
		s119:false,
		t120:false,
		u121:false,
		v122:false,
		w123:false,
		x124:false,
		y125:false,
		z126:false

	};
	checkAll:any = "checked";
	checkAllCon(){
		// if(this.checkAll=="checked"){
			this.checkModel.a101=false
			this.checkModel.b102=false
			this.checkModel.c103=false
			this.checkModel.d104=false
			this.checkModel.e105=false
			this.checkModel.f106=false
			this.checkModel.g107=false
			this.checkModel.h108=false
			this.checkModel.i109=false
			this.checkModel.j110=false
			this.checkModel.k111=false
			this.checkModel.l112=false
			this.checkModel.m113=false
			// this.checkAll=true

		// }
	}
	clickCon(){
		this.checkAll="noCheck";
		//console.log('看见')
	}
// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'40'},{Number:'50'}];
	// 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getGoldDetailList();
		
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst()
		this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	
	public pageNumChange(event:any,allcheck:any){
		
		this.default.pageSize = this.itemsPerPage;
		// this.getUserBackList();
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		// this.getUserBackList();
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.pageNum = event.page;
		this.getGoldDetailList();
		
		// this.onSearch();
	};

	toDetial(){
		
		// //console.log(newId);
	   this.router.navigate(['../coin-issue'],{relativeTo:this.activatedRoute}); 
	}
	// 查询
	onSubmit(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getGoldDetailList();
	}
// 导出
	exportExcelList(){

        let str:any ='';
		// console.log( this.order)
        for(let i in this.default){
            if(this.default[i]==""){
                this.default[i]= '';
            }else{
            	str += '&' + i + '=' +this.default[i];
            }
        }
        str                  = str.substr(1);
        let url              = this.IP + 'goldcoin/coindetail/export?'+str;
        window.location.href = url;
        console.log(url)
	}
// 排序
	Order(ord:any,type:any){
		this.default.sortType = ord
		this.default.orderBy = type
		this.turnFirst()
	}
}