import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';
@Component({
	selector: 'sns-source-list.componment',
	templateUrl: './sns-source-list.componment.html',
	styleUrls: ['./sns-source-list.componment.scss',
				'../../../../../../scss/typical-list/condition.scss',
				'../../../../../../scss/typical-list/header.scss',
				'../../../../../../scss/typical-list/order.scss',
				'../../../../../../scss/typical-list/table.scss',],
	providers: [SnsManagementService]
})
export class SnsSourceListComponent implements OnInit{
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(private changeDetectorRef:ChangeDetectorRef,
		private snsManagementService:SnsManagementService,
		private activatedRoute:ActivatedRoute,
		private sanitizer: DomSanitizer,
		private router:Router){}

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			console.log(id)
			this.sourceList()	
			this.allSourceList()		
		})
	}
	detial:any ={
		pictureUrl:''
	}
// 跳转
	toChange(newsId:any,suorceName:any){
		this.router.navigate(['../sns-source-detial',newsId,suorceName],{relativeTo:this.activatedRoute}); 
	}

	en: any;
	default:any={	s_name:'',
					state:0,
					cur_page:1,	
					show_count:10,
				}
	// 资讯来源列表
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.sourceList()
	}
	errorMessage:any
	sourceLists:any
	sourceList(){
		this.default.state = this.state 
		this.snsManagementService.listSource(this.default)
								.subscribe(
								listSource => {  
												// console.log(infoList)
												if(listSource.status==0){
													this.totalItems = listSource.data.page.totalResult
													this.sourceLists=listSource.data.list;
													this.companylist = listSource.data.list;
													this.totalItems = listSource.data.page.totalResult
													// this.hideList = false;
													console.log(this.companylist);
													// this.hideLoad = true;
												}else{
													if(listSource.msg){
														alert(listSource.msg);
													}
													// this.hideList = false;
													// this.hideLoad = true;
												}
											},

								error => {	this.errorMessage = error;
											alert("服务器连接失败！")
											// this.hideLoad = true;
		         //            				this.hideList = false;
										}
								);
	}
	Allcompanylist:any
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
													this.Allcompanylist = listSource.data.list;
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
		
	   this.sourceMove.s_id = e.item.s_id;//id 赋值给隐藏的input。获取公司id 
	   console.log( this.sourceMove.s_id)
	}
	blurCompany(cm:any){
		cm.value = ''
	}
// 转移别名
	moveDetialId:any
	moveDetialName:any
	moveNameWin(moveName:any,sourceId:any,sourceName:any,cm:any){
		this.moveDetialId = sourceId;
		this.moveDetialName = sourceName
		cm.value = ''
		moveName.show()

	}
	MoveSource(win:any,cm:any){
		if(cm.value==''){
			alert("请输入目标资讯来源")
			this.sourceMove.s_id='';
			return false
		}
		var obj={
			s_id:'',
			d_id:''
		}
		obj.s_id = this.moveDetialId;
		obj.d_id = this.sourceMove.s_id
		this.snsManagementService.moveSourceAlias(obj)
								.subscribe(
								listSource => {  
												// console.log(infoList)
												if(listSource.status==0){
													alert("转移成功")
													this.sourceList()
													win.hide()
													// this.hideLoad = true;
												}else{
													if(listSource.msg){
														alert(listSource.msg);
													}
													// this.hideList = false;
													// this.hideLoad = true;
												}
											},

								error => {	this.errorMessage = error;
											alert("服务器连接失败！")
											// this.hideLoad = true;
		         //            				this.hideList = false;
										}
								);
	}
//新增来源
	new:any={
		src:''
	}
	addWin(addNews:any,file_add:any){
		this.addDetial.s_name='';
		file_add.value='';
		this.new.src=''
		addNews.show()
	}
	fileChangeAdd(input:any,umbnail:any,e:any){
		if(input.files[0]){
	    	this.new.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(input.files[0]));
		}
	}
	addDetial:any={
			s_name:''
	}
	addSource(changeName:any,file_add:any){
		console.log(this.addDetial)
		if(file_add.value==''){
			alert("请添加LOGO");
			return false
		}

		var  fd= new FormData();
		fd.append('s_id',0);
	    fd.append('s_name',this.addDetial.s_name);
		fd.append('s_logo',file_add.files[0]);
		
	

	    console.log(fd)
		this.snsManagementService.saveSource(fd)
								.subscribe(
								saveSource => {  
												// console.log(infoList)
												if(saveSource.status==0){	
													console.log(saveSource);
													alert("保存成功！")
													this.sourceList()
													changeName.hide()
												}else{
													if(saveSource.msg){
														alert(saveSource.msg);
													}
												}
											},
								error => {	this.errorMessage = error;
									alert("服务器连接失败！")
											}
								);
	}
	addHide(addNews:any,file_change:any){
		addNews.hide()
	}
// 修改来源
	sorceDetial:any={
		s_id:'',
		s_name:'',
		s_state:'',
		info_cnt:'',
		alias_cnt:'',
		s_logo:'',
	}
	winHide(wind:any){
		wind.hide()
	}
	once:any=1;
	changeSorce(change:any,source:any,file_change:any){
		this.new.src =''
		file_change.value=''
		this.sorceDetial = source
		this.once = 1;
		change.show()
	}
	file_ipt:any;
	// 图片加载
	file_iptC:any
	fileChangeOther(input:any,umbnail:any,e:any){
		this.file_iptC = input;
		if(this.file_iptC.files[0]){
			this.once = 0;
	    	this.new.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_iptC.files[0]));
		}
	}
	
	saveSource(changeName:any,file_change:any){
		// if(file_change.value==''){
		// 	alert("请添加LOGO");
		// 	return false
		// }

		var  fd= new FormData();
	    fd.append('s_id',this.sorceDetial.s_id);
	    fd.append('s_name',this.sorceDetial.s_name);
	    if(file_change.files[0]){
			 fd.append('s_logo',file_change.files[0]);
		}else{
			 fd.append('s_logo','');
		}
	   

	    console.log(fd)
		this.snsManagementService.saveSource(fd)
								.subscribe(
								saveSource => {  
												// console.log(infoList)
												if(saveSource.status==0){	
													console.log(saveSource);
													alert("保存成功！")
													this.sourceList()
													changeName.hide()
												}else{
													if(saveSource.msg){
														alert(saveSource.msg);
													}
												}
											},
								error => {	this.errorMessage = error;
									alert("服务器连接失败！")
											}
								);
	}
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
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.default.show_count = Number;
		this.turnFirst();
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 
		
	};
	public pageNumChange(event:any){
		// this.default.pageSize=this.itemsPerPage;
		
		console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		console.log(pageNo);
		this.currentPage = pageNo;
		// this.serch()
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.default.cur_page = event.page;
		this.sourceList()
	};

	state:any = '0'
}