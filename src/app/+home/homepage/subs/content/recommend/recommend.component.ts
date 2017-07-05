import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RecommendService } from './recommend.component.service'
import {INCONFIG} from '../../../../../../public/in.config';

@Component({
	selector: 'recommend_component',
	templateUrl: './recommend.component.html',
	styleUrls: ['./recommend.component.scss'],
	providers: [RecommendService]
})

export class RecommendComponent implements OnInit{
	constructor(
				private recommendService:RecommendService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,
        		){}
	ngOnInit(){
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			       };
		this.turnFirst()
	}
	en:any
	contentType:any=[{id:1,name:'资讯'},{id:2,name:'直播'},{id:3,name:'债券行情'},{id:4,name:'报价'},{id:5,name:'人脉'},{id:6,name:'动态'},{id:7,name:'视频'},{id:8,name:'日报'},{id:9,name:'雷区'},{id:10,name:'特别推荐'},]
// 分页
	msgNumbers = [{Number:'30'},{Number:'20'},{Number:'10'},{Number:'50'},{Number:'80'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 30;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		// this.changeDetectorRef.detectChanges();
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.listHomeRecom()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.conList.show_count=this.itemsPerPage;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
	}
// 翻页
	pageChanged(event:any):void {
		this.currentPage = event.page;
		this.conList.cur_page = event.page;	
		// allcheck.checked = false;
		this.listHomeRecom()
	};
	errorMessage:any
// 查询列表
homeList:any=[]
conList:any={
	type:'1',
	time_begin:'',
	time_end:'',
	cur_page:'1',
	show_count:'30',
}
endDate:any=new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
startDate:any=new Date(new Date(new Date().toLocaleDateString()).getTime())
listHomeRecom(){
	if(this.conList.type==6||this.conList.type==10){
		this.conList.time_begin = this.format(this.startDate)
		this.conList.time_end = this.format(this.endDate)
	}else{
		this.conList.time_begin = null
		this.conList.time_end = null
	}
	this.recommendService
		.listHomeRecom(this.conList)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.homeList = infoList.data.list
				this.totalItems = infoList.data.page.totalResult
				this.totalPages =infoList.data.page.totalPage
			}else{
				alert(infoList.msg)
			}					
		},
		error => {	
					this.errorMessage = error;
				}
		);
}
// 设置参数
	setPrams(win:any){
		this.overOh=false
		this.getRecomParams()
		win.show()
	}

	Prams:any={
		obj_type1:0, 
		obj_type2:0, 
		obj_type3:0, 
		obj_type4:0, 
		obj_type5:0, 
		obj_type6:0, 
		obj_type7:0, 
		obj_type8:0, 
		obj_type9:0, 
		obj_type10:0, 
	}
	all:any=0
	getRecomParams(){
		this.recommendService
		.getRecomParams(null)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.Prams = infoList.data
				// debugger
					this.all= this.Prams.obj_type1*1+this.Prams.obj_type2*1+this.Prams.obj_type3*1+this.Prams.obj_type4*1+this.Prams.obj_type5*1+this.Prams.obj_type6*1+this.Prams.obj_type7*1+this.Prams.obj_type8*1+this.Prams.obj_type9*1+this.Prams.obj_type10*1
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	
					this.errorMessage = error;
				}
		);
	}
	overOh:boolean=false
	clsa(input:any){
		this.all= this.Prams.obj_type1*1+this.Prams.obj_type2*1+this.Prams.obj_type3*1+this.Prams.obj_type4*1+this.Prams.obj_type5*1+this.Prams.obj_type6*1+this.Prams.obj_type7*1+this.Prams.obj_type8*1+this.Prams.obj_type9*1+this.Prams.obj_type10*1
		if(this.all>100){
			// input.style.color='red'
			// this.all= '超过100'
			this.overOh=true
		}else{
			this.overOh=false
		}
	}
	// 设置参数
	setRecomParams(win:any){
		if(this.all<=100){
		this.recommendService
		.setRecomParams(this.Prams)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('设置成功！')
				win.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	
					this.errorMessage = error;
				}
		);
		}else{
			alert('概率合计不能大于100')
		}
	}
	showList:any=[true,false,false]
	isRe:any=false
	showClick(i:any){
		this.showList[i]=!this.showList[i]
	}
	changeClick(i:any){
		this.showList[i] =!this.showList[i]
	}
	// 时间排序
	timeUp:any=false
	timeDown:any=false
	timeNotChoose:any=true
	// 分类排序
	stateNotChoose:any=true
	stateUp:any=false
	stateDown:any=false
	// 点击量排序
	clickUp:any=false
	clickDown:any=false
	clickNotChoose:any=false
	ordBy(name:any,ord:any){
		
		if(name=='state'){
			// this.default.order_by='state '+ord+',begin_time desc'
			this.timeNotChoose = true
			this.clickNotChoose = true
			this.stateNotChoose = false
			if(ord=='asc'){
				this.stateUp=true
				this.stateDown=false
			}else{
				this.stateUp=false
				this.stateDown=true
			}
		}
		if(name=='begin_time'){
			// this.default.order_by=name+' '+ord
			this.clickNotChoose = true
			this.stateNotChoose = true
			this.timeNotChoose = false
			if(ord=='asc'){
				this.timeUp=true
				this.timeDown=false
			}else{
				this.timeUp=false
				this.timeDown=true
			}
		}
		if(name=='click_num'){
			// this.default.order_by=name+' '+ord
			this.clickNotChoose = false
			this.stateNotChoose = true
			this.timeNotChoose = true
			if(ord=='asc'){
				this.clickUp=true
				this.clickDown=false
			}else{
				this.clickUp=false
				this.clickDown=true
			}
		}
		// this.rdShowListIN()

	}
	recommend(btn:any){
		btn.innerHTML = '取消推荐'
	}
	mouseleave(btn:any){
		btn.innerHTML = '特别推荐'
	}
	recommend2(btn:any){
		btn.innerHTML = '特别推荐'
		btn.style.color = "#000"
	}
	mouseleave2(btn:any){
		btn.innerHTML = '取消推荐'
		btn.style.color = "#fff"
	}
	recommend3(btn:any){
		btn.innerHTML = '非要闻'
	}
	mouseleave3(btn:any){
		btn.innerHTML = '要闻'
	}
	recommend4(btn:any){
		btn.innerHTML = '要闻'
		btn.style.color = "#000"
	}
	mouseleave4(btn:any){
		btn.innerHTML = '非要闻'
		btn.style.color = "#fff"
	}
	addToSp:any={
			obj_type:'',
			obj_id:'',
			is_special:1,
			source_id:''
		}
// 添加到要闻
	infoTo(content:any){
		var obj={data_type:2,ids:content.obj_id}
		this.recommendService.infoTo(obj)
			.subscribe(
				deleted => {  	
							console.log(deleted);
							if(deleted.status==0){
								alert("添加成功");
								this.listHomeRecom();
							}else{
								if(deleted.msg){
									alert(deleted.msg)
								}
							}									
						},
			error => this.errorMessage = error
			);
	}
// 移除要闻
	infoDel(content:any){
		var obj={data_type:2,data_id:content.important_id}
		this.recommendService.infoDel(obj)
			.subscribe(
				deleted => {  	
							console.log(deleted);
							if(deleted.status==0){
								alert("操作成功");
								this.listHomeRecom();
							}else{
								if(deleted.msg){
									alert(deleted.msg)
								}
							}									
						},
			error => this.errorMessage = error
			);
	}
// 添加特别推荐
	addRecomSource(content:any){

		this.addToSp.source_id = content.source_id
		this.addToSp.obj_id = content.obj_id
		this.addToSp.obj_type = content.obj_type
		this.addToSp.is_special = 1
		this.recommendService.addRecomSource(this.addToSp)
			.subscribe(
				deleted => {  	
							console.log(deleted);
							if(deleted.status==0){
								alert("添加成功");
								this.listHomeRecom();
							}else{
								if(deleted.msg){
									alert(deleted.msg)
								}
							}									
						},
			error => this.errorMessage = error
			);
	}

	delCon:any={
		source_id:'',
		del_special:''
	}
// 删除推荐
content:any={
	source_id:'',
	}
mum:any
delShow(content:any,mum:any,del:any){
	debugger
	this.content.source_id = content.source_id
	this.mum = mum
	del.show()
}
	delRecomSource(content:any,num:any,del:any){
		this.delCon.source_id = content.source_id
		this.delCon.del_special = num
		this.recommendService.delRecomSource(this.delCon)
			.subscribe(
				deleted => {  	
							console.log(deleted);
							if(deleted.status==0){
								alert("操作成功");
								if(del){del.hide()}
								
								this.listHomeRecom();
							}else{
								if(deleted.msg){
									alert(deleted.msg)
								}
								
							}									
						},

			error => this.errorMessage = error
			);
	}

format(format:any){
	if(format){
			format = new Date(format)
				 var args = {
	           	   Y: format.getFullYear(),
	               M: format.getMonth() + 1,
	               d: format.getDate(),
	               h: format.getHours(),
	               m: format.getMinutes(),
	               s: format.getSeconds(),
	           	};
	           	if(args.M<10){
	           		args.M=0+''+args.M
	           	}
	           	if(args.d<10){
	           		args.d=0+''+args.d
	           	}
	           	if(args.h<10){
	           		args.h=0+''+args.h
	           	}
	           	if(args.m<10){
	           		args.m=0+''+args.m
	           	}
	           	if(args.s<10){
	           		args.s=0+''+args.s
	           	}
	           
	           	format = args.Y+'-'+ args.M +'-'+args.d
	           
	  }         
	 return  format        
}	
	ListTo(){
		
			// this.router.navigate(['../../sns-conformity-sweeping'],{relativeTo:this.activatedRoute}); 
	
			// this.router.navigate(['../sns-conformity-sweeping'],{relativeTo:this.activatedRoute}); 
		
	}	
	addShare(){
		this.router.navigate(['../sns-share-management/sns-share-list'],{relativeTo:this.activatedRoute}); 
	}
}