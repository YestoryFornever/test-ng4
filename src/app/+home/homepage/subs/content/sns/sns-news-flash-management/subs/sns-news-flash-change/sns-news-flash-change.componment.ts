import { Component,ChangeDetectorRef, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectionStrategy } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule,TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';

import {INCONFIG} from '../../../../../../../../../public/in.config';
@Component({
	selector: 'sns-news-flash-change',
	templateUrl: './sns-news-flash-change.componment.html',
	styleUrls: ['./sns-news-flash-change.componment.scss'],
	providers: [SnsManagementService],
})
export class SnsNewsFlashChangeComponent implements OnInit{
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router){}
		private userId:any = INCONFIG.getUserInfo()

	ngOnInit(){
		var a:any = document.getElementsByClassName('wrapper')[0]
		a.scrollTop = 0
		window.scrollTo(0,0);
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.ID.info_id = id;
			this.getinfoContent()
			})
		this.NFX_Newstype_Source()

	}

	ID:any={
		info_id:''
	}
errorMessage:any

detial:any={
		iid: "" ,
		title:"",
		source:'',
		auth:'',
		content:'',
		source_path:'',
		view_cnt:'',
		comment_cnt:'',
		like_cnt:'',
		repost_cnt:'',
		tip_cnt:'',
		manage_cnt:'',
		category:'',
		source_time:'',
		create_time:'',
		is_tip:'',
		is_del:'',
		is_source_btn:'',
	};
getinfoContent(){
	console.log(this.ID)
	this.snsManagementService.getinfoContent(this.ID)
								.subscribe(
								info => {  
												// console.log(infoList)
												if(info.status==0){
													console.log(info)
												this.detial = info.data
												}else if(info.status==-5){
													console.log("session已超时")
												}
												else{
													if(info.msg){
														alert(info.msg)
													}
												}
											},
								error => {	
											this.errorMessage = error;
											alert("服务器连接失败！")
										}
								);
}

public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public resouce:Array<string> = [];
	// public tag:Array<string> = ["的","呃"];
	// public departments:Array<string> = ["飞","个","好"];
	public typeaheadOnSelect(e:any):void{
   this.default.source_id = e.item.businID;//id 赋值给隐藏的input。获取公司id 
}
// 获取来源
NFX_Newstype_Source(){
	var obj = {
		businTypeID:'ZNFX_Newstype_Source'
	}

	this.snsManagementService.NFX_Newstype_Source(obj)
								.subscribe(
								source => {  
												console.log(source);
													if(source.status==0){												
														this.resouce = source.data
													}else if(source.status==-5){
														console.log("session已超时")
													}
													else{
														console.log(source.msg)
													}
													// this.infoList=infoList;									
												},

								error => this.errorMessage = error
								);														
}

 default:any={
 	iid:0,
	source:'',
	content:'',
	category:2,
	edit_note:'',
	uid:''
 }	
infoUpdate(save:any){
	this.default.iid = this.detial.iid;
	this.default.source = this.detial.source;
	this.default.content = this.detial.note;
	this.default.uid =  this.userId.id
	if(this.default.source==''){
		alert('请添加来源');
		return false
	}
	if(this.default.content==''){
		alert('请添加内容');
		return false
	}
	console.log(this.default)
	this.snsManagementService.infoUpdate(this.default)
							 .subscribe(
							result => { 
								if(result.status==0){
									save.show();
								}else if(result.status==-5){
									console.log('session已超时')
								}else{
									if(result.msg){
										alert(result.msg)
									}
								}
							 },
							error => this.errorMessage = error
							);
}

// 路由到列表
	tolist(save:any){
		save.hide();
		// console.log(newId);
	   this.router.navigate(['../../sns-news-flash-list'],{relativeTo:this.activatedRoute}); 
	}
}