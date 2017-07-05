import { Component, ChangeDetectorRef,ViewChild,AfterViewInit,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service'

@Component({
	selector: 'sns-conformity-sweeping',
	templateUrl: './sns-conformity-sweeping-component.html',
	styleUrls: ['./sns-conformity-sweeping-component.scss'],
	providers: [SnsConformityServices]
})

export class SnsConformitySweeping implements OnInit{
	constructor(
		
				private snsConformityServices:SnsConformityServices,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
// 	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
// debugger
// 				let listState = <HTMLInputElement[]><any>document.getElementsByName("user");					
// 				for(var i=0;i<this.sweepLists.length;i++){
// 					if(this.sweepLists[i].is_important==1){
// 							listState[i].checked=true
// 					}
// 				}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let userId = params['userId'];
			let backId = params['backId'];
			// console.log(userId,backId);
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
		this.sweepList()
	}
	rdShowListIN(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.sweepList()
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
		this.sweepList()
	};
	detialTo(){
		this.router.navigate(['../../sns-news-management/sns-news-list'],{relativeTo:this.activatedRoute}); 
	}
	editTo(id:any){
		this.router.navigate(['../sns-conformity-sweeping-edit',id],{relativeTo:this.activatedRoute}); 
	}
	addTo(){
		this.router.navigate(['../sns-conformity-sweeping-edit'],{relativeTo:this.activatedRoute}); 
	}
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){

	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
			this.approve()
		};
approveNot:any=[]
approveY:any=[]

sended:any=true
unSended:any=false
canSend:any=false
notSend:any=false
haveOne:any = false
approve(){	
	// debugger
	this.approveNot=[]
	this.approveY=[]

	this.canSend=true
	this.notSend=true
	this.haveOne=false
		let listState = <HTMLInputElement[]><any>document.getElementsByName("user");
					
						// debugger	
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.haveOne = true
		 				if(this.sweepLists[i].release_state=='未发送'){
		 					this.unSended = false
		 					this.notSend = false
		 					// this.sended=true	
		 				}
		 				if(this.sweepLists[i].release_state=='已发送'){
		 					this.sended = false
		 					this.canSend = false

		 				}
		 				
					}
					if(this.canSend == true){
						this.sended = true
					}
					if(this.notSend == true){
						this.unSended = true
					}
					if(this.haveOne==false){
						this.sended = false
						this.unSended = false
					}
					if(this.sweepLists.length == 0){
						this.sended = false
						this.unSended = false
					}
				}
				// if(!haveOne){
				// 	this.sended=false
				// 	this.unSended=false
				// }	
				
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
	 			this.allow.push(this.sweepLists[i])
	 			if(this.sweepLists[i].is_important==1&&this.sweepLists[i].bond_tags.length==0){
	 				this.isNotAllow.push(this.sweepLists[i])
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
				this.sweepList()
				// this.sended=false
				// this.unSended=false
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	
					this.errorMessage = error;
					}
		);
	}
}
sendCon:any={
	ids:'',
	data_type:'3',
	op_type:'1',
}
sendSweeping(win:any){
	var ids:any=[]
	// debugger
	for(var i=0;i<this.allow.length;i++){
		ids.push(this.allow[i].sweep_id)
	}
	this.sendCon.ids=ids.join(',')
	this.snsConformityServices
		.infoRelease(this.sendCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('您选择的'+this.allow.length+'条资讯已成功发送，请移驾APP、WEB端查看。')
				this.sweepList()
				// this.sended=false
				// this.unSended=false
				win.hide()
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
	 			this.deles.push(this.sweepLists[i].sweep_id)
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
				this.sweepList()
				win.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
}
today:any= new Date()
errorMessage:any
startDate:any 
endDate:any 
startDate1:any = new Date()
endDate1:any = new Date()
// 列表
default:any={
	time_begin:'',
	time_end:'',
	title:'',
	sweep_id:'',
	cur_page:'1',
	show_count:'30',
}	
sweepLists:any=[]
	sweepList() {
		this.sended=true
		this.default.time_begin= this.format(this.startDate)// startDate:any
		this.default.time_end= this.format(this.endDate)
		this.default.time_begin_info= this.format(this.startDate1)// startDate:any
		this.default.time_end_info= this.format(this.endDate1)
// endDate:any
		this.snsConformityServices
		.sweepList(this.default)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.totalPages = infoList.data.page.totalPage
				this.totalItems = infoList.data.page.totalResult;
				this.sweepLists = infoList.data.list
				for(var i=0;i<this.sweepLists.length;i++){
					this.sweepLists[i].onames=''
					this.sweepLists[i].bondNames=''
					this.sweepLists[i].bad_point=this.sweepLists[i].bad_point*1
					if(this.sweepLists[i].release_state=='未发送'){
						this.sended=true	
						this.unSended = false
					}
					if(!this.sweepLists[i].bond_tags){
						this.sweepLists[i].bond_tags=[]
					}else{
						this.sweepLists[i].bond_tags=JSON.parse(this.sweepLists[i].bond_tags)
					}	
					for(var k =0;k<this.sweepLists[i].bond_tags.length;k++){
						this.sweepLists[i].onames += this.sweepLists[i].bond_tags[k].oname+','
						for(var j =0;j<this.sweepLists[i].bond_tags[k].bonds.length;j++){
							this.sweepLists[i].bondNames += this.sweepLists[i].bond_tags[k].bonds[j].bname+','
						}	
					}	
						
				}
				// this.approve()		
			}else{
				alert(infoList.msg)
				this.sweepLists=[]		

			}	
					
		},

		error => {	
			this.errorMessage = error;
			}
		);
	}
// 删除咨询
delCon={
			data_type:3,
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
	                 		this.sweepList()
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
