import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate,AfterContentChecked,AfterViewChecked, AfterViewInit,AfterContentInit,OnDestroy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserCoinServices }  from './service/coin-user-detail.service';
import { ActivatedRoute, Router }   from '@angular/router';

import {INCONFIG} from '../../../../../../../public/in.config';

@Component({
	selector: 'coin-user-detail',
	templateUrl: './coin-user-detail.component.html',
	styleUrls: ['./coin-user-detail.component.scss'],
	providers: [UserCoinServices]
})
export class CoinUserDetailComponent implements OnInit{
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private userCoinServices:UserCoinServices,
				private activatedRoute:ActivatedRoute,
        		private router:Router){}
	ngOnInit(){

		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.changeFirstPage()
	};
	en:any
	 // 分页
	 msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){	
		this.itemsPerPage = Number;
		this.changeFirstPage()
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 

	};
	private IP:string = INCONFIG.getIP()

	startDate:any
	endDate:any
	default:any = {
		phone:'',
		timeStart:'',
		timeEnd:'',
		orderBy:'updateTime',
		sortType:'DESC',
		pageNum:'1',
		pageSize:'10'
	}
	errorMessage:any
	commentList:any=[]
	listCoinUser(){
		if(this.startDate){
			this.default.timeStart=this.startDate.getTime()
		}else{
			this.default.timeStart=''
		}
		if(this.endDate){
			this.default.timeEnd=this.endDate.getTime()+24*3600*1000-1
		}else{
			this.default.timeEnd=''
		}
		this.userCoinServices.userstatistic(this.default).subscribe(
			result => {  
							if(result.status==0){
								this.commentList = result.data.list ;
								this.totalItems = result.data.page.totalResult;
							}else{
								if(result.msg){
									alert(result.msg);
								}
							}								
						},

			error => {	this.errorMessage = error;
				alert("服务器连接失败！")
						}
			);
	}
	changeFirstPage(){
		this.currentPage = 1;
		this.changeDetectorRef.detectChanges();
		this.listCoinUser()
	}

	public pageNumChange(event:any,allcheck:any){
		// debugger
		this.default.pageSize = this.itemsPerPage;
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
		// this.listComment()	
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.pageNum = event.page;
		this.listCoinUser()
	};
	// 名片
	 userInfod:any={
		businessCardUrl:'',
		userName:'',
		loginName:'',
		department:'',
		position:''
	}
	html:any
	getUserInfo(id:any){
		var ID={userId:id+''}
		this.userCoinServices
			.getUserProfileInfo(ID)
			.subscribe(
				result=>{
					if(!result.data.businessCardUrl){
						result.data.businessCardUrl='../../../../../../../public/images/showCard.jpg'
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
				
				this.userInfod=result.data
				},
				error=>this.errorMessage = error
			);
	}
	orderClick(orderBy:any,sortType:any,arrow:any){
		this.default.sortType=sortType
		this.default.orderBy=orderBy
		var arrList:any= document.getElementsByClassName('ordered')
		for(var i=0;i<arrList.length;i++){
			arrList[i].style.color="#000"
		}
		arrow.style.color='bule'
		this.changeFirstPage()
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
        let url              = this.IP + 'goldcoin/statistic/export?'+str;
        window.location.href = url;
        console.log(url)
	}
}