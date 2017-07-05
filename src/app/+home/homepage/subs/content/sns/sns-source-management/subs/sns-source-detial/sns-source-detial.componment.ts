import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';
@Component({
	selector: 'sns-source-detial.componment',
	templateUrl: './sns-source-detial.componment.html',
	styleUrls: ['./sns-source-detial.componment.scss'],
	providers: [SnsManagementService]
})
export class SnsSourceDetialComponent implements OnInit{

	constructor(private changeDetectorRef:ChangeDetectorRef,
		private snsManagementService:SnsManagementService,
		private activatedRoute:ActivatedRoute,
		private router:Router){}
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.Id = id;
		})
		this.activatedRoute.params.forEach((params:Params)=>{
			let sourceName = params['sourceName'];
			this.sourceName = sourceName;
		})
		this.sourceDetialList()
	}
	// 跳转
	toBack(){
	   this.router.navigate(['../../../sns-source-list'],{relativeTo:this.activatedRoute}); 
	}
	en: any;
	default:any={
				loginName:'',
				userName:'',	
				organizationId:'',
				departmentId:'',
				pageNum:1,
				pageSize:10,
				}
	errorMessage:any
	Id:any
	sourceName:any
// 查询别名详情列表
	sourceDetial:any={
			p_id:'',
			cur_page:1,
			show_count:10
	}
	sources:any=[]
	sourceDetialList(){
		this.sourceDetial.p_id = this.Id 
		this.snsManagementService.listSourceAlias(this.sourceDetial)
								.subscribe(
								saveSource => {  
												// console.log(infoList)
												if(saveSource.status==0){
													this.totalItems = saveSource.data.page.totalResult
													this.sources=saveSource.data.list
													console.log(saveSource)
												}else{
													this.totalItems = 0
													if(saveSource.msg){
														this.sources=[]
														alert(saveSource.msg);
													}
												}
											},
								error => {	this.errorMessage = error;
									alert("服务器连接失败！")
											}
								);
	}
// 新增别名
addNameObj:any={
	p_id:'',
	l_name:''
}
AddName(addName:any){
	this.addNameObj.l_name = ''
	addName.show()
}
addNameSave(addName:any,){
	this.addNameObj.p_id = this.Id
	this.snsManagementService.saveSourceAlias(this.addNameObj)
								.subscribe(
								saveSource => {  
												// console.log(infoList)
												if(saveSource.status==0){
													
													console.log(saveSource)
													this.sourceDetialList()
													addName.hide()
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
// 删除别名
deleteName:any={
	l_id:''
}
deleteNameSave(id:any){
 	this.addNameObj.l_id = id
	if(confirm("确定要删除吗？")){
		this.snsManagementService.delSourceAlias(this.addNameObj)
			.subscribe(
			saveSource => {  
												// console.log(infoList)
								if(saveSource.status==0){
									console.log(saveSource)
									alert("删除成功")
									this.sourceDetialList()
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
// deleteNameSave(){
// 	this.addNameObj.p_id = this.Id

// 	this.snsManagementService.delSourceAlias(this.addNameObj)
// 								.subscribe(
// 								saveSource => {  
// 												// console.log(infoList)
// 												if(saveSource.status==0){
// 													console.log(saveSource)
// 													alert("删除成功")
// 												}else{
// 													if(saveSource.msg){
// 														alert(saveSource.msg);
// 													}
// 												}
// 											},
// 								error => {	this.errorMessage = error;
// 									alert("服务器连接失败！")
// 											}
// 								);
}
 // 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.sourceDetialList()
	}
	public sizeData(Number:any){
		this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.sourceDetial.show_count=Number
		this.turnFirst();
		// this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 
		
	};
	public pageNumChange(event:any){
		// this.default.pageSize=this.itemsPerPage;
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		console.log(pageNo);
		this.currentPage = pageNo;
		this.sourceDetialList()
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.sourceDetial.cur_page = event.page;
		this.sourceDetialList()
	};
	winHide(addName:any){
		addName.hide()
	}
}