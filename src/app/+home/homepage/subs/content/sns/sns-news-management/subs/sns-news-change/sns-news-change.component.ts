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
	selector: 'sns-news-change',
	templateUrl: './sns-news-change.component.html',
	styleUrls: ['./sns-news-change.component.scss'],
	providers: [SnsManagementService],
})
export class SnsNewsChangeComponent implements OnInit{
		constructor(
					private snsManagementService:SnsManagementService,
					private changeDetectorRef:ChangeDetectorRef,
					private activatedRoute:ActivatedRoute,
        			private router:Router){}
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}
	ngOnInit(){
		this.allSourceList()
		this.NFX_Newstype_Source()
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.ID.info_id = id
			// console.log(id)
			this.getInfoDetails()
		})
	};

private userId:any = INCONFIG.getUserInfo()

	// 获取资讯详情
	getDetial:any
	ID = {
		info_id:0
	};
	comment:any={
		info_id:0,
		cur_page:1,
		show_count:10
	}
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
	errorMessage:any
// 获取详情
	getInfoDetails(){
		console.log(this.ID)
		this.snsManagementService.getinfoContent(this.ID)
								.subscribe(
								detial => {
									this.getDetial=detial
									if(detial.status==0){
										// console.log(detial);

									this.detial=detial.data;
										var reg4 = new RegExp("4");
										var reg3 = new RegExp("3");
										var reg5 = new RegExp("5");
										
										if(reg4.test(this.detial.category)){
											this.sc4="4"
											
											
										}
										if(reg3.test(this.detial.category)){
											this.sc3="3"
										}
										if(reg5.test(this.detial.category)){
											this.sc5="5"
										}
									this.detial.source_time=this.format(new Date(this.detial.source_time));	
									}else if(detial.status==-5){
										console.log('session已超时');
									}
									else{
										if(detial.msg){
											alert(detial.msg)
										}
									}
								},
								error => this.errorMessage = error
								);
	
	}

allSourceList(){
		var obj={
			state:0,
			cur_page:1,	
			show_count:100000,
		}
		this.snsManagementService.listSource(obj)
								.subscribe(
								listSource => {  
												// console.log(infoList)
												if(listSource.status==0){													
													this.companylist = listSource.data.list;
												}else{
													if(listSource.msg){
													}
												}
											},

								error => {	this.errorMessage = error;
											alert("服务器连接失败！")
											// this.hideLoad = true;
		         //            				this.hideList = false;
										}
								);
	}
//即时搜索
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});
	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = true;
	public typeaheadNoResults:boolean = true; 
	sourceMove={
		s_name:'',
		s_id:''
	}
	public typeaheadOnCompanys(e:any):void{
		
	   this.detial.source_id = e.item.s_id;//id 赋值给隐藏的input。获取公司id 
	}
	companylist:any;
	partlist:any=[];
	NFX_Newstype_Source(){
	var obj = {
		businTypeID:'ZNFX_Newstype_Source'
	}

	this.snsManagementService.NFX_Newstype_Source(obj)
								.subscribe(
								source => {  
												
												// console.log(source);
													if(source.status==0){												
														// this.resouce=source.data
													}else if(source.status==-5){
													console.log('session已超时')
												}
													else{
														if(source.msg){
															alert(source.msg)
														}
													}
													// this.infoList=infoList;									
												},
								error => this.errorMessage = error
								);														
}

	blurCompany(cm:any){
		cm.value=''
		this.default.source_id=''
	}
// 保存修改
sc3:any=""
sc4:any=""
sc5:any=""
default:any={
		iid: "" ,
		title:"",
		source:'',
		auth:'',
		content:'',
		source_path:'',
		source_id:'',
		source_time:'',
		category:'',
		edit_cause:'',
		edit_note:'',
		uid:''
	}
infoUpdate(save:any){
	this.default.category=""
	this.default.iid = this.detial.iid;
	this.default.title = this.detial.title;
	this.default.source_ok = this.detial.source_ok;
	// this.default.source_id = this.sourceMove.s_id;
	this.default.content = this.detial.content;
	this.default.auth = this.detial.auth;
	this.default.source_path = this.detial.source_path;
	this.default.uid = this.userId.id
	this.default.source_id = this.detial.source_id;
	this.default.source_time = this.format(new Date(this.detial.source_time));
	this.default.source = this.detial.source
	if(this.sc3=="3"){
		this.default.category+="3,"
	}
	if(this.sc4=="4"){
		this.default.category+="4,"
	}
	if(this.sc5=="5"){
		this.default.category+="5,"
	}
	if(this.detial.is_tip==1){
		this.default.edit_cause="被举报"
	}else{
		this.default.edit_cause="无"
	}
	if(this.default.title==''){
		alert('请添加标题')
		return false
	}
	if(this.default.source_ok==''){
		this.default.source_id=''
		alert('请添加来源正确名')
		return false
	}
	if(this.default.content==''){
		alert('请添加内容')
		return false
	}
	if(this.default.auth==''){
		alert('请添加作者')
		return false
	}
	if(this.default.source_path==''){
		alert('请添加来源路径')
		return false
	}
	if(this.default.source_time==''){
		alert('时间不能不空')
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
	   this.router.navigate(['../../sns-news-list'],{relativeTo:this.activatedRoute}); 
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
	           	// format = args.Y+'-'+ args.M +'-'+args.d
	           format = args.Y+'-'+ args.M +'-'+args.d+'T'+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
}