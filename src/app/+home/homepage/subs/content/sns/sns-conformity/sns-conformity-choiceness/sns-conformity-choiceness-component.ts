import { Component, ChangeDetectorRef,ViewChild,AfterViewInit,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service'

@Component({
	selector: 'sns-conformity-choiceness',
	templateUrl: './sns-conformity-choiceness-component.html',
	styleUrls: ['./sns-conformity-choiceness-component.scss'],
	providers: [SnsConformityServices]
})

export class SnsConformityChoiceness  implements OnInit{
	constructor(
				private snsConformityServices:SnsConformityServices,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
		})
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
	val:number=3.5
	test:any
// 分页
	msgNumbers = [{Number:'30'},{Number:'20'},{Number:'10'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 30;
	public currentPage:number=1;
	public totalPages:number=1;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.importantList()
	}
	rdShowListIN(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.importantList()
	}
	public sizeData(Number:any){

		this.itemsPerPage = Number;
		this.default.show_count=this.itemsPerPage;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.currentPage = event.page;
		this.default.cur_page = event.page;	
		this.importantList()
	};
	detialTo(){
		this.router.navigate(['../../sns-news-management/sns-news-list'],{relativeTo:this.activatedRoute}); 
	}
	editTo(id:any){
		this.router.navigate(['../sns-conformity-choiceness-edit',id],{relativeTo:this.activatedRoute}); 
	}
	addTo(){
		this.router.navigate(['../sns-conformity-choiceness-edit'],{relativeTo:this.activatedRoute}); 
	}
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
approveNot:any=[]
approveY:any=[]

sended:any=false
unSended:any=false

approve(node:any,userVe:any){	
	this.approveNot=[]
	this.approveY=[]
	this.sended=true
	this.unSended=true
	 var haveOne=false
		let listState = <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			haveOne = true
		 				if(this.importantLists[i].release_state=='未发送'){
		 					this.unSended = false
		 				}
		 				if(this.importantLists[i].release_state=='已发送'){
		 					this.sended = false
		 				}
					}
				}
				if(!haveOne){
					this.sended=false
					this.unSended=false
				}
			}
isNotAllow:any=[]
allow:any=[]
sendSweep(info:any,add:any,not:any){
	this.isNotAllow=[]
	this.allow=[]
	if(!info){
		let listState = <HTMLInputElement[]><any>document.getElementsByName("user");				
		for(var i =0;i<listState.length;i++){
	 		if(listState[i].checked == true){
	 			this.allow.push(this.importantLists[i])
	 			if(this.importantLists[i].is_important==1&&this.importantLists[i].bond_tags.length==0){
	 				this.isNotAllow.push(this.importantLists[i])
	 			}
			}
		}
		
		if(this.isNotAllow.length==0){
			add.show()
			// 发送
		}else{
			not.show()
			// 取消
		}
	}else{
		if(info.is_important==1&&info.bond_tags.length==0){
			alert('你发送的资讯为重点关注，但是关联机构和个债为空，请补充')
			return false
		}
		this.sendCon.ids = info.sweep_id
		this.snsConformityServices
		.infoRelease(this.sendCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('您选择的资讯已成功发送，请移驾APP、WEB端查看。')
				this.importantList()
				this.sended=false
				this.unSended=false
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
}
sendCon:any={
	ids:'',
	data_type:'2',
	op_type:'1',
}
sendSweeping(id:any){
	this.sendCon.ids=id
	this.snsConformityServices
		.infoRelease(this.sendCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('发送成功')
				this.importantList()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	
}
deleCon:any={
	ids:'',
	data_type:'3',
	op_type:'2',
}
deles:any=[]
deleSweep(win:any){
	this.deles=[]
	let listState = <HTMLInputElement[]><any>document.getElementsByName("user");				
		for(var i =0;i<listState.length;i++){
	 		if(listState[i].checked == true){
	 			this.deles.push(this.importantLists[i].sweep_id)
			}
	}
	win.show()
}
deleSweeping(win:any){
	this.deleCon.ids=this.deles.join(',')
	this.snsConformityServices
		.infoRelease(this.deleCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('您选择的'+this.deles.length+'条资讯已成功撤回')
				this.sended=false
				this.unSended=false
				this.importantList()
				win.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
}
errorMessage:any
startDate:any
endDate:any
// 列表
default:any={
	time_begin:'',
	time_end:'',
	title:'',
	source:'',
	sweep_id:'',
	cur_page:'1',
	show_count:'30',
}	
importantLists:any=[]
	importantList() {
		this.default.time_begin= this.format(this.startDate)// startDate:any
		this.default.time_end= this.format(this.endDate)
// endDate:any
		this.snsConformityServices
		.importantList(this.default)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.totalPages = infoList.data.page.totalPage
				this.totalItems = infoList.data.page.totalResult;
				this.importantLists = infoList.data.list	
				for(var i=0;i<this.importantList.length;i++){
					this.importantLists[i].bad_point=this.importantLists[i].bad_point*1
					if(!this.importantLists[i].bond_tags){
						this.importantLists[i].bond_tags=[]
					}else{
						this.importantLists[i].bond_tags=JSON.parse(this.importantLists[i].bond_tags)
					}
				}
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
// 删除咨询
delCon={
			data_type:2,
			data_id:''
		}
	deleShwo(id:any,win:any){
		win.show()
		this.delCon.data_id = id
	}
	infoDel(win:any){
		this.snsConformityServices.infoDel(this.delCon)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 		alert('删除成功！')	               
	                 		this.importantList()
	                 		win.hide()
	                 }else{
	                 	alert(org.msg)
	                 }
	                },
	                error => this.errorMessage = error                 
	            );
	}
format (format:any) {
			if(format){
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
	           // format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
}
