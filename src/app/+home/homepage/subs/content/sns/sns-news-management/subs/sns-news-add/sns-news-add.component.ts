import { Component, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectionStrategy } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule,TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';
import {INCONFIG} from '../../../../../../../../../public/in.config';
@Component({
	selector: 'sns-news-add',
	templateUrl: './sns-news-add.component.html',
	styleUrls: ['./sns-news-add.component.scss'],
	providers: [SnsManagementService],
})
export class SnsNewsAddComponent implements OnInit{
	constructor(private snsManagementService:SnsManagementService,private activatedRoute:ActivatedRoute,
        		private router:Router) {}

	ngOnInit(){
	this.NFX_Newstype_Source()
	this.allSourceList()
	};
 
private userId:any = INCONFIG.getUserInfo()

 errorMessage:any
 default:any={
	title:'',
	source_id:'',
	source:'',
	auth:'',
	content:'',
	source_path:'',
	source_time:'',
	uid:''
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
	companylist:any;
	partlist:any=[];
// 筛选条件  
	public typeaheadOnCompanys(e:any):void{
		
	   this.sourceMove.s_id = e.item.businID;//id 赋值给隐藏的input。获取公司id 
	   console.log( this.sourceMove.s_id)
	}
	blurCompany(cm:any){
		cm.value = ''
		this.sourceMove.s_id=''
	}


infoAdd(add:any){
	this.default.source_time=this.default.source_time.replace('T',' ')
	// this.default.source = this.sourceMove.s_name
	this.default.source_id = this.sourceMove.s_id
	console.log(this.default)
	if(this.default.title==''){
		alert("请填写资讯标题")
		return false
	}
	if(this.default.content==''){
		alert("请填写资讯正文")
		return false
	}
	if(this.default.source==''){
		alert("请填写资讯来源原始名")
		return false
	}
	if(this.default.source_id==''){
		alert("请填写资讯来源正确名")
		return false
	}
	if(this.default.auth==''){
		alert("请填写资讯作者")
		return false
	}
	if(this.default.source_path==''){
		this.default.source_id=''
		alert("请填写资讯来源链接")
		return false
	}
	if(this.default.source_time==''){
		alert("请填写资讯源时间")
		return false
	}

	this.default.uid = this.userId.id
	this.snsManagementService.infoAdd(this.default)
								.subscribe(
								info => {  
												// console.log(infoList)
												if(info.status==0){
													add.show()
												}else if(info.status==-5){
													console.log('session已超时')
												}
												else{
													if(info.msg){
														alert(info.msg)
													}
												}
											},

								error => {	this.errorMessage = error;
											alert("服务器连接失败！")
										}
								);
}

resouce:any
NFX_Newstype_Source(){
	var obj = {
		businTypeID:'ZNFX_Newstype_Source'
	}

	this.snsManagementService.NFX_Newstype_Source(obj)
								.subscribe(
								source => {  
												
												console.log(source);
													if(source.status==0){												
														this.resouce=source.data
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

	

}