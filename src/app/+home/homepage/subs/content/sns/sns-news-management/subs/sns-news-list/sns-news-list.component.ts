import { Component,enableProdMode,ChangeDetectorRef, ViewChild,OnDestroy,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { News }  from '../../../classes/sns-management';
import { SnsManagementService }  from '../../../sns-management-services/sns-management.services';
import {INCONFIG} from '../../../../../../../../../public/in.config';
@Component({
	selector: 'sns-news-list',
	templateUrl: './sns-news-list.component.html',
	styleUrls: ['./sns-news-list.component.scss'],
	providers: [SnsManagementService]
})
export class SnsNewsListComponent implements OnInit,OnDestroy{
	color = '#fff';
	newsId:any;
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}

	ngOnInit(){
		this.NFX_Newstype_Source()
		if(sessionStorage.getItem("cur_page_list")){
			this.default = JSON.parse(sessionStorage.getItem("cur_page_list"))
			this.del = this.default.is_del;
			this.tip =  this.default.is_tip;
			this.currentPage = this.default.cur_page;
			this.totalItems = ~~sessionStorage.getItem("totalItems")
			this.itemsPerPage = this.default.show_count;
			this.changeDetectorRef.detectChanges();
			this.getinfoListInit()
			this.sourceMove.s_name = sessionStorage.getItem("s_name")
		}else{
			this.getinfoList()
		}
		
		this.allSourceList()
		// {"category":0,"time_begin":"","time_end":"","source_id":"","clust_id":"","is_tip":"","is_del":"","title":"","clust_tag":"","clust_date":"","clust_time":"","orderby":"release_time desc","cur_page":359,"show_count":10}
		// enableProdMode();
	};
	ngOnDestroy(){
		sessionStorage.setItem("cur_page_list", JSON.stringify(this.default))
		sessionStorage.setItem("s_name", this.sourceMove.s_name+'')
		sessionStorage.setItem("totalItems", this.totalItems+'')
	}
	isONibit:any
	private userId:any = INCONFIG.getUserInfo()

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
		
	   this.sourceMove.s_id = e.item.s_id;//id 赋值给隐藏的input。获取公司id 
	   // console.log( this.sourceMove.s_id)
	}
	blurCompany(cm:any){
		this.sourceMove.s_name=''
		this.sourceMove.s_id = ''
		cm.value = ''
	}
 // 去空格
	trim(str:any) { //删除左右两端的空格　　
		return str.replace(/(^\s*)|(\s*$)/g, "");　　
	}
// 分页
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=100;
	public itemsPerPage:number = 10;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getinfoList()
	}
	public sizeData(Number:any){
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst();
		this.height = Number*40+40+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
		public pageNumChange(event:any,allcheck:any){
			// debugger
		this.default.show_count = this.itemsPerPage;
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		// debugger
		this.default.cur_page = event.page;
		this.getinfoList();
	};
//list状态切换
 primaryState:boolean;
 checkbox:any = document.getElementsByName('user');
public changeState = function(listState:any,userList:any,newsId:any){
	

	if(listState.checked==true){
		// console.log(true)
		this.newsId=newsId;
		this.primaryState = true
	}else{
		// console.log(false)
		this.newsId=undefined;
		this.primaryState = false;
	}
	for(var i=0;i<this.checkbox.length;i++){
			this.checkbox[i].checked = false;
		}

	if(this.primaryState==true){
		listState.checked=true;
		// userList.style.background = 'rgb(255, 255, 150)';
	}else{
		listState.checked=false;
		// userList.style.background = 'rgb(255, 255, 255)';
	}
	// console.log(userList.style.background)
}


	
	

// 获取列表
error:any;
infoList:any=[];
page:any;
source:any='';
new:any;
del:any = '2';
tip:any = '2';
category:any='1';
clust_time:any = '0';
errorMessage:any;
default:any = {
   		category:0,
		time_begin:'',
		time_end:'',
		source_id:'',
		clust_id:'',
		is_tip:'',
		is_del:'',
		title:'',
		clust_tag:'',
		clust_date:'',
		clust_time:0,
		orderby:'release_time desc',
		cur_page:1,
		show_count:10
   }
// 查询资讯列表
noData:any=false
getinfoListInit(){
	// debugger
		this.hideList = true;
		this.hideLoad = false;
	this.snsManagementService.getinfoList(this.default)
		.subscribe(
		infoList => {  
						// console.log(infoList)
						if(infoList.status==0){
							this.infoList=infoList.data.list;
							this.changeDetectorRef.detectChanges();
							this.totalItems = infoList.data.page.totalResult;
							this.hideList = false;
							this.hideLoad = true;
							this.noData=false
						}else{
							this.infoList=[];
							this.totalItems=0;
							if(infoList.msg){
								this.noData=false
							}
							this.hideList = false;
							this.hideLoad = true;
						}
					},

		error => {	this.errorMessage = error;
			alert("服务器连接失败！")
					this.hideLoad = true;
    				this.hideList = false;
					}
		);
	}
getinfoList(){
		this.hideList = true;
		this.hideLoad = false;
// debugger
	this.default.source_id = this.sourceMove.s_id;
	console.log(this.sourceMove.s_name)
	if(this.sourceMove.s_name ==""){

		this.default.source_id='';
	}
	if(this.del=='1'){
		this.default.is_del='1'
	}else if(this.del=='0'){
		this.default.is_del='0'
	}else{
		this.default.is_del=''
	}
	if(this.tip=='1'){
		this.default.is_tip='1'
	}else if(this.tip=='0'){
		this.default.is_tip='0'
	}else{
		this.default.is_tip=''
	}
	if(this.clust_time=='0'){
		this.default.clust_time=''
	}else{
		this.default.clust_time=this.clust_time
	}

	// console.log(this.default)
	this.snsManagementService.getinfoList(this.default)
		.subscribe(
		infoList => {  
						// console.log(infoList)
						if(infoList.status==0){
							this.infoList=infoList.data.list;
							this.changeDetectorRef.detectChanges();
							this.totalItems = infoList.data.page.totalResult;
							this.hideList = false;
							this.hideLoad = true;
							this.noData=false
						}else{
							this.infoList=[];
							this.totalItems=0;
							this.noData=true
							this.hideList = false;
							this.hideLoad = true;
						}
					},

		error => {	this.errorMessage = error;
			alert("服务器连接失败！")
					this.hideLoad = true;
    				this.hideList = false;
					}
		);
	}

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
					}else{
						if(source.msg){
							alert(source.msg)
						}
					}
					// this.infoList=infoList;									
					},

		error => this.errorMessage = error
		);														
	}


del_cause:any
del_note:any
istip:any
// 删除资讯
deletedInfo(window:any){
	var obj = {
		p_type:1,
		p_id:'',
		del_cause:'',
		del_note:'',
		message:'',
		uid:'',
	}
	obj.p_id = this.deleteNew.iid
	obj.uid = this.userId.id
	

	obj.del_cause =	this.istip
	obj.del_note = this.del_note
	// console.log(obj)
	this.snsManagementService.snsDel(obj)
		.subscribe(
		deleted => {  
						
						// console.log(deleted);
						if(deleted.status==0){
							alert("删除成功");
							this.getinfoList();
						}else{
							if(deleted.msg){
								alert(deleted.msg)
							}
							
						}
						// this.infoList=infoList;									
					},

		error => this.errorMessage = error
		);
		window.hide();
		this.getinfoList()
		obj.del_cause='',
		obj.del_note='',
		obj.message=''
	}

//全选HTMLImageElement
checkboxs:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkboxs.length;i++){
				this.checkboxs[i].checked = allcheck.checked
			}
		};
approveNot:any=[]
approveY:any=[]
infoToCon:any={
	ids:"",
	data_type:"",
	types:"",
}
typingInfo(st:any){	
	this.approveNot=[]
	this.approveY=[]
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.approveY.push(this.infoList[i].iid)
					// if(this.infoList[i].aStaffInd==2){
					// 	this.approveNot.push(this.infoList[i].userName)
					// }
				}
			}
		this.infoToCon.ids = this.approveY.join(',')
		this.infoToCon.data_type = st
		this.snsManagementService
		.infoTo(this.infoToCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('添加成功！')
				this.totype(st)
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
}

//删除资讯弹窗
 deleteNew:any = {}
deleteNews(deleted:any,news:any){
	if(this.deleteNew.is_tip==1){
		this.istip="被举报"
	}else{
		this.istip="无"
	}
	deleted.show();
	this.deleteNew = news;
}
// 判定无问题
note:any
setTip(window:any){
	var obj = {
		p_type:2,
		p_id:'',
		note:'',
		uid:'',
	}
	obj.p_id = this.deleteNew.iid
	obj.note = this.note
	obj.uid = this.userId.id
	// console.log(obj)
	this.snsManagementService.setTip(obj)
		.subscribe(
		deleted => {  
						
						// console.log(deleted);
						if(deleted.status==0){
							alert("判定成功")
						}else{
							if(deleted.msg){
								alert(deleted.msg)
							}
							
						}
						// this.infoList=infoList;									
						},

		error => this.errorMessage = error
		);
		window.hide();
		// this.getinfoList();
		obj.note=''
	}
//路由跳转
toChange(newsId:any){
	this.newsId=newsId;
	console.log(this.newsId);
   this.router.navigate(['../sns-news-change',this.newsId],{relativeTo:this.activatedRoute}); 
}
toDetial(newId:any){
	this.newsId=newId;
	// console.log(newId);
   this.router.navigate(['../sns-news-details',newId],{relativeTo:this.activatedRoute}); 
}

totype(tr:any){
	if(tr==1){
   		this.router.navigate(['../../sns-conformity/sns-conformity-daily'],{relativeTo:this.activatedRoute}); 
	}
	if(tr==2){
		this.router.navigate(['../../sns-conformity/sns-conformity-choiceness'],{relativeTo:this.activatedRoute}); 
	}
	if(tr==3){
		this.router.navigate(['../../sns-conformity/sns-conformity-sweeping'],{relativeTo:this.activatedRoute}); 
	}
}
 onSelect(){
	// this.router.navigate(['/hero', hero.id]);
 }
	 // 类管理
	height:any = "440px"
	hideLoad:any = true
	hideList:any =  true
	show:any
		setLoadClasses() {
		  	let classes =  {
		    hide: this.hideLoad,      // true
		    // show: !this.show, // false
	  };
	  return classes;
	}
	setListClasses() {
		  	let classes =  {
		    hide: this.hideList,      // true
		    // show: !this.show, // false
	  };
	  return classes;
	}

}
