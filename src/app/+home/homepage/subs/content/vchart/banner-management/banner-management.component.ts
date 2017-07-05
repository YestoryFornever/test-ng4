import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { BannerManagementService } from './banner-management-service/banner-management.service'
@Component({
	selector: 'banner-management',
	templateUrl: './banner-management.component.html',
	styleUrls: ['./banner-management.component.scss'],
	providers: [BannerManagementService]
})

export class BannerManagementComponent implements OnInit{ 
	ngOnInit(){
		this.getBannerListPage()
	};
	public errorMessage:any;
	public newType:string = '1';
	constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private bannerManagementService:BannerManagementService,
    ){
 }
	msgNumbers = [{Number:'20'},{Number:'10'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number;
	public itemsPerPage:number = 20;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.getInfo()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any){
		// this.default.pageSize=this.itemsPerPage;
		// this.serch()
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		// this.currentPage = pageNo;
	};
	// 翻页
	pageChanged(event:any):void {
		 this.bad.pageNum = event.page
		 this.banner.pageNum = event.page
		this.getInfo()
	};
	// 类管理
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
	getNews:any = {
		imgSrc:''
	}


	//list状态切换
	public changeState = function(listState:any,state:any){

		console.log(listState.target.checked)
	
	}

//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('art');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
	//上传图片的字段
	file_ipt:any;
	 public new:any={
				type:'',
				title:'',
				introduce:'',
				link:'',
				src:''
			}

  	addNewsShow(addWindow:any,file:any){
  		 file.value=''
  		addWindow.show()
  	}
	fileChange(input:any,umbnail:any,e:any){
		this.file_ipt = input;
		if(this.file_ipt.files[0]){
	    	this.new.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_ipt.files[0]));
		}
	}
	addArticle(addNews:any,file_ipt:any){
		 if(!file_ipt.files[0]){
	    	alert("请选择图片")
	    	return false
	    }
	    debugger
		var  fd= new FormData();

		fd.append('articleType',this.newType);
	    fd.append('articleTitle',this.new.title);
	    fd.append('articleBrief',this.new.introduce);
	    fd.append('articleUrl',this.new.link);
	    fd.append('pictureUrl',this.file_ipt.files[0]);
	   
	    console.log(this.new)
	    console.log(this.file_ipt.files[0])
	    this.bannerManagementService.addArticle(fd)
	    						.subscribe(
           									Article =>{
											            if(Article.status==0){
											                console.log(Article)
											                alert("保存成功")
											                addNews.hide()
											                this.turnFirst()
											                this.new = {type:'',title:'',introduce:'',link:'',src:''}
											            }else{
											            	if(Article.msg){
											                	alert(Article.msg);
											                	}
											                }               
											            },
											            error => this.errorMessage = <any>error
        );        
	}
	head:any = "轮播图"
get(event:any){
	this.currentPage = 1
	this.itemsPerPage = 20
	if(event.heading=="负面"){
		this.head = "负面"
		this.getBadListPage()
	}
    if(event.heading=="轮播图"){
    	this.head = "轮播图"
    	this.getBannerListPage()
    }
}

// 根据tab获取信息
getInfo(){
	if(this.head =="负面"){
		this.getBadListPage()
	}else if(this.head =="轮播图"){
		this.getBannerListPage()
	}
}
// 获取负面列表
	bad = {
		articleType:1,
		pageNum:1,
		pageSize:20
	}
	
	badContent:any=[]
	getBadListPage(){
	// this.bad.pageNum = this.currentPage
	this.bad.pageSize = this.itemsPerPage
	this.bannerManagementService.getArticleListPage(this.bad)
		    						.subscribe(
	           									Article =>{
	           										console.log(Article)
												          if(Article.status ==0){
												          		this.badContent=Article.data.list

												          		this.totalItems = Article.data.page.totalResult
												          }else{
												          		alert(Article.msg)
												          }
												            },
												            error => this.errorMessage = <any>error
	        );        
	}
//获取轮播图
banner = {
		articleType:3,
		pageNum:1,
		pageSize:20
	}

	bannerContent:any=[]
	getBannerListPage(){
	// this.banner.pageNum = this.currentPage
	this.banner.pageSize = this.itemsPerPage
	this.bannerManagementService.getArticleListPage(this.banner)
		    						.subscribe(
	           									Article =>{
	           										console.log(Article)
												          if(Article.status ==0){
												          		this.bannerContent=Article.data.list

												          		this.totalItems = Article.data.page.totalResult
												          }else{
												          		alert(Article.msg)
												          }
												            },
												            error => this.errorMessage = <any>error
	        );        
	}
	// 上架
 badIds:any = ''
 bannerIds:any=''
 upShe:any={
 	state:1,
 	articleIds:''
 }
	upShelves(){
		let listState= <HTMLInputElement[]><any>document.getElementsByName("art");	
		console.log(listState)	
		console.log(this.badContent)		
				for(var i =0;i<listState.length;i++){
			 		if(listState[i].checked == true){
			 			if(this.head == "负面"){
							this.badIds += this.badContent[i].articleId+','	
						}else if(this.head == "轮播图"){
							this.bannerIds += this.bannerContent[i].articleId+','
						}
					
					}
				}
						if(this.head == "负面"){
							this.upShe.articleIds = this.badIds
						}else if(this.head == "轮播图"){
							this.upShe.articleIds = this.bannerIds 
						}
				console.log(this.upShe)
				this.bannerManagementService.upShelves(this.upShe)
									.subscribe(
												Article =>{
													console.log(Article)
												          if(Article.status ==0){
												          		alert('上架成功')
												          		this.getBadListPage()  
												          		this.getBannerListPage()
												          		this.badIds=''
												          		this.bannerIds =''   
												          }else{
												          		alert(Article.msg)
												          }
												            },
												            error => this.errorMessage = <any>error
	        );   
	}
	// 下架
	downShelves(){
		let listState= <HTMLInputElement[]><any>document.getElementsByName("art");				
				for(var i =0;i<listState.length;i++){
			 		if(listState[i].checked == true){
						if(this.head =="负面"){
							this.badIds += this.badContent[i].articleId+','	
						}else if(this.head =="轮播图"){
							this.bannerIds += this.bannerContent[i].articleId+','
						}
					}
				}
				if(this.head =="负面"){
					this.upShe.articleIds = this.badIds
				}else if(this.head =="轮播图"){
					this.upShe.articleIds = this.bannerIds 
				}
				console.log(this.upShe)
				this.bannerManagementService.downShelves(this.upShe)
		    						.subscribe(
	           									Article =>{
	           										console.log(Article)
												          if(Article.status ==0){
												          		alert('下架成功')
												          		this.badIds=''
												          		this.bannerIds =''
												          		this.getBadListPage()  
												          		this.getBannerListPage()
												          }else{
												          		alert(Article.msg)
												          }
												            },
												            error => this.errorMessage = <any>error
	        );   
	       
	}


	// 获取详情
	artID:any ={
		articleId:''
	}
	detial:any ={
	}
	once:any = 1;
	file_iptC:any
	fileChangeOther(input:any,umbnail:any,e:any){
		this.file_iptC = input;
		if(this.file_iptC.files[0]){
			this.once = 0;
	    	this.detial.pictureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_iptC.files[0]));
		}
	}
	getArticle(id:any,changeNews:any){
		this.once = 1;
    	this.artID.articleId = id
		this.bannerManagementService.getArticle(this.artID)
			    						.subscribe(
		           									Article =>{
		           												  // console.log(Article)
														          if(Article.status ==0){
														          		this.detial = Article.data
														          		console.log(this.detial)
														          		console.log(Article.data)
														          		changeNews.show()
														          }else{
														          		alert(Article.msg)
														          }
													            },
													            error => this.errorMessage = <any>error
		        );   
			
	}
	updateArticle(chengeWin:any,file_ipt:any){
		var  fd = new FormData();
		if(this.detial.articleBrief==''){
			this.detial.articleBrief=' '
		}
		fd.append('articleId',this.detial.articleId);
	    fd.append('articleType',this.detial.articleType);
	    fd.append('articleTitle',this.detial.articleTitle);
	    fd.append('articleBrief',this.detial.articleBrief);
	    fd.append('articleUrl',this.detial.articleUrl);
	    if(file_ipt.files[0]){
	    	 	fd.append('pictureUrl',file_ipt.files[0]);
	    	}else{
	    		fd.append('pictureUrl',this.detial.pictureUrl);
	    	}
	   
	    console.log(this.detial)
	    console.log(fd)
		this.bannerManagementService.updateArticle(fd)
			    						.subscribe(
		           									Article =>{
		           												  // console.log(Article)
														          if(Article.status ==0){
														          		alert("修改成功")
														          		this.getBadListPage()  
												          				this.getBannerListPage()
														          		// console.log(this.obj)
														          		chengeWin.hide()
														          		file_ipt.value=''
														          		// this.detial={}
														          }else{
														          		alert(Article.msg)
														          }
													            },
													            error => this.errorMessage = <any>error
		        );   
	}
	winHide(addNews:any,file_change:any){
		addNews.hide()
		this.detial={}
		// file_change.outerHTML = file_change.outerHTML
		this.new = {type:'',title:'',introduce:'',link:'',src:''}


	}
	// 删除
	deleteArticle(id:any){
		var obj={
			articleId:''
		}
		obj.articleId = id
		this.bannerManagementService.deleteArticle(obj)
			    						.subscribe(
		           									Article =>{
		           												  // console.log(Article)
														          if(Article.status ==0){
														          		alert("删除成功")
														          		let listState= <HTMLInputElement[]><any>document.getElementsByName("art");
														          		console.log(listState)
														          		if(listState.length<=0){
														          			this.turnFirst()
														          		}else{
														          			this.currentPage = 1;//无法同时修改当前页和每页总数
																			this.changeDetectorRef.detectChanges();
														          			this.getBadListPage()  
												          					this.getBannerListPage()
														          		}
														          		
														          	
														          }else{
														          		alert(Article.msg)
														          }
													            },
													            error => this.errorMessage = <any>error
		        );   
		
	}
	// 置顶
	topArticle(art:any){
		var obj={
			seqence:'',
			articleId:''
		}
		obj.seqence = art.seqence
		obj.articleId = art.articleId
		console.log(art)
		console.log(obj)
		this.bannerManagementService.topArticle(obj)
			    						.subscribe(
		           									Article =>{
		           												  // console.log(Article)
														          if(Article.status ==0){
														          		alert("置顶成功")
														          		this.getBadListPage()  
												          				this.getBannerListPage()
														          	
														          }else{
														          		alert(Article.msg)
														          }
													            },
													            error => this.errorMessage = <any>error
		        );   
		
	}


}