
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { VideoManagementService } from '../videoManagement.services'
import {INCONFIG} from '../../../../../../../public/in.config';

@Component({
	selector: 'video-list',
	templateUrl: './video-list.component.html',
	styleUrls: [
				'./video-list.component.scss',
				'../../../../../homepage/scss/typical-list/header.scss',
				'../../../../../homepage/scss/typical-list/table.scss',
				'../../../../../homepage/scss/typical-list/condition.scss',
				'../../../../../homepage/scss/typical-list/order.scss',
				],
	providers: [VideoManagementService]
})
export class VideoListComponent implements OnInit{
	private UserInfo:any;
	constructor(private sanitizer: DomSanitizer,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private videoManagementService:VideoManagementService,
        		private router:Router) {}
	ngOnInit(){
		// debugger
		
this.UserInfo = INCONFIG.getUserInfo()
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
			       this.turnFirst()
			       this.queryUserList()
	}
	errorMessage:any
	type:any= '0'
	en:any
// 查询列表
listCon:any={
	time_begin:'',
	time_end:'',
	op_uid:'',
	title:'',
	is_tip:'',
	cur_page:'1',
	show_count:'30',
}
is_tip:any=false

// if(is_tip)
ischecked:any=[]
videoList:any=[]
listVideo(){
	if(this.is_tip){
		this.listCon.is_tip=1
	}else{
		this.listCon.is_tip=0
	}
	this.listCon.time_begin = this.format(this.startDate)
	this.listCon.time_end = this.format(this.endDate)
		this.videoManagementService.listVideo(this.listCon)
	        .subscribe( 
	            videoList =>{
	            	if(videoList.status=="0"){
	            		this.videoList = videoList.data.list
	            		for(var i=0;i<=this.videoList.length;i++){
	            			this.ischecked.push({isChecked:0})
	            		}
	            		this.totalItems = videoList.data.page.totalResult
						this.totalPages = videoList.data.page.totalPage	
	            	}else{
	            		alert(videoList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
}
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
		setTimeout(function() {
		if(this.is_tip){
			this.listCon.is_tip=1
		}else{
			this.listCon.is_tip=0
		}
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.listVideo()
	}.bind(this),0)
		// this.changeDetectorRef.detectChanges();
		
	}
	public sizeData(Number:any){
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.listCon.show_count=this.itemsPerPage;
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
		this.listCon.cur_page = event.page;	

		this.listVideo()
	};
	userList:any=[]
queryUserList(){
	this.videoManagementService.queryUserList()
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		this.userList = userList.data.list
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
}
//开关
	list:any={
		isEnabled:'',
		configImageId:'',
	};

endDate:any = new Date()
startDate:any = new Date(Date.parse(this.endDate)-6*24*3600*1000)
changeOnOff(list:any,state:any){
	list.isEnabled = !list.isEnabled;
	var obj:any={
		data_type:4,
		ids:'',
		op_type:''
	}
	obj.ids = list.video_id
	obj.op_type = state
	this.videoManagementService.infoRelease(obj)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('操作成功！')
	            		 this.turnFirst()
	            	}else{
	            		alert(userList.msg);
	            		this.turnFirst()
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
// 发布、撤回视频  infoRelease
 infoRelease(id:any){
 
 }
 checked(k:any){
 	for(var i=0;i<=this.videoList.length;i++){
	   this.ischecked[i].isChecked=0
	 }
	  this.ischecked[k].isChecked=1
 }
// 删除视频
infoDel(id:any){
	var obj:any={
		data_type:4,
		data_id:''
	}
	obj.data_id = id
	this.videoManagementService.infoDel(obj)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('删除成功！')
	            		this.turnFirst()
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
}
// /上传图片的字段
	 addVideo:any={
		title:'',
		note:'',
		url_id:'',
		url:'',
		logo:'',
		source:'',
		times:'',
		url_type:'1'
	 }
	img:any={
		src:''
	}
	file_ipt:any;
	fileChange(input:any,umbnail:any,e:any){
		// debugger
		this.file_ipt = input;
		if(this.file_ipt.files[0]){
	    	this.img.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_ipt.files[0]));
		}
	}
saving:any =false
	saveVideo(view:any){
		if(this.addVideo.title==''){
			alert('标题不能为空')
			return false
		}
		// if(this.addVideo.note==''){
		// 	alert('描述不能为空')
		// 	return false
		// }
		// debugger
		if(this.addVideo.url_type==1){
			if(this.addVideo.url_id==''){
				alert('视频ID串不能为空')
				return false
			}
		}else{
			if(this.addVideo.url==''){
				alert('视频链接不能为空')
				return false
			}
		}
		if(this.addVideo.times==''){
			alert('视频时长不能为空')
			return false
		}
		var  fd= new FormData();
	    fd.append('u_id',this.UserInfo.id);
	    fd.append('title',this.addVideo.title);
	    fd.append('note',this.addVideo.note);
		fd.append('url_id',this.addVideo.url_id);
		fd.append('source','后台');
		fd.append('times',this.addVideo.times);
		fd.append('url',this.addVideo.url);
		fd.append('url_type',this.addVideo.url_type)
		if(this.file_ipt&&this.file_ipt.files[0]){
			fd.append('photo',this.file_ipt.files[0]);
		}else{
			alert('背景图不能为空')
			return false
		}
		this.saving=true
 		this.videoManagementService.saveVideo(fd)
			.subscribe(
			Article =>{
	            if(Article.status==0){
	                alert("发布成功")
	                this.listVideo()
	                 this.addVideo={
						title:'',
						note:'',
						url_id:'',
						url:'',
						logo:'',
						source:'',
						times:'',
						url_type:'1'
					 }
					this.img.src=''
					if(this.file_ipt){
						this.file_ipt.value=''
					}
					view.hide()
					this.saving=false
	            }else{
	            	if(Article.msg){
	                	alert(Article.msg);
	                	}
	                }   
	                this.saving=false        
	            },
			error => this.errorMessage = error
        );        
	}
		// var  fd= new FormData();
		// this.sendMsg.begin_time = this.format(this.dataPicker)
	 //    fd.append('live_id',this.sendMsg.live_id);
	 //    fd.append('live_no ',this.sendMsg.live_no);
	 //    fd.append('live_id_zs',this.sendMsg.live_id_zs);
	 //    fd.append('his_id',this.sendMsg.his_id);
		// fd.append('his_url',this.sendMsg.his_url);
		// fd.append('ulist_hide',this.sendMsg.ulist_hide);
		//  fd.append('share_note',this.sendMsg.share_note);
		// // debugger
		// // fd.append('logo','');
		// if(this.file_ipt&&this.file_ipt.files[0]){
		// 	fd.append('logo',this.file_ipt.files[0]);
		// }else{
		// 	fd.append('logo','');
		// }
		
		// fd.append('phone',this.sendMsg.phone);
		// fd.append('name',this.sendMsg.name);
		// fd.append('begin_time ',this.sendMsg.begin_time);
		// fd.append('locale',this.sendMsg.locale);
		// fd.append('title',this.sendMsg.title);
		// fd.append('note',this.sendMsg.note);
		// if(this.sendMsg.his_times)
		// fd.append('his_times',this.sendMsg.his_times);
		// fd.append('authority',this.sendMsg.authority);
		// fd.append('user_limit',this.sendMsg.user_limit);
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
	turnDetial(id:any){
		this.router.navigate(['../video-detial',id],{relativeTo:this.activatedRoute}); 
	}
	// 排序
	Order(ord:any,type:any){
		this.listCon.orderby = ord+' '+type
		if(this.is_tip ==1){
			this.turnFirst()
		}else{
			this.listVideo()
		}
		
	}
	viewShow(view:any,file_ipt:any){
		
		
		 this.addVideo={
						title:'',
						note:'',
						url_id:'',
						url:'',
						logo:'',
						source:'',
						times:'',
						url_type:'1'
					 }
					 view.show()
					 file_ipt.value=''
					 this.img.src=''
	}
}