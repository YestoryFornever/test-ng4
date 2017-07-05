import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule} from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserBackServices } from '../../services/user-back.services'

@Component({
	selector: 'info-group-list',
	templateUrl: './info-group-list.component.html',
	styleUrls: ['./info-group-list.component.scss'],
	providers: [UserBackServices]
})
export class InfoGroupListComponent implements OnInit{
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userBackServices:UserBackServices,
        		private router:Router) {}
	ngOnInit(){
		this.userGroupList()
	}
// 分页
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
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
		this.userGroupList()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
		// allcheck.checked = false;
		this.userCon.pageCount=this.itemsPerPage;
		// this.color="#fff"
	
		this.totalPages = event;
		// this.userGroupList()
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.userCon.pageNum = event.page;	
		// allcheck.checked = false;
		// this.color="#fff";
		this.userGroupList()
	};
	turnTo(id:any){
		this.router.navigate(['../info-group-edit'],{relativeTo:this.activatedRoute}); 
	}
	update(id:any){
		this.router.navigate(['../info-group-edit',id],{relativeTo:this.activatedRoute}); 
	}
// 查询用户分组列表
	infoList:any=[]
	errorMessage:any
	userCon:any={
		pageNum:1,
		pageCount:10
	}
	userGroupList (){
		// this.userCon.pshTpid = this.listState
		// 机构位置（{{item.instLo}})   机构分类({{item.scmCntntGro.instClCar}})
		this.userBackServices.userGroupList (this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                	this.totalItems =  partlist.data.Page.totalResult
                    this.infoList =  partlist.data.ScmInfList
                  for(var i=0;i<this.infoList.length;i++){
                  	
                  	this.infoList[i].udtTm = this.format(new Date(this.infoList[i].udtTm))
                  	if(!partlist.data.ScmInfList[i].instLo&&partlist.data.ScmInfList[i].scmCntntGro.instClCar&&partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar){
                  		this.infoList[i].content ="机构分类("+partlist.data.ScmInfList[i].scmCntntGro.instClCar+")"  +"认证状态("+partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar+")" 
                  	}
                  	if(partlist.data.ScmInfList[i].instLo&&!partlist.data.ScmInfList[i].scmCntntGro.instClCar&&partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar){
                  		this.infoList[i].content =" 机构位置("+partlist.data.ScmInfList[i].instLo	+")"  +"认证状态("+partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar+")"
                  	}
                  	if(partlist.data.ScmInfList[i].instLo&&partlist.data.ScmInfList[i].scmCntntGro.instClCar&&partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar){
                  		 this.infoList[i].content =" 机构位置("+partlist.data.ScmInfList[i].instLo	+")   机构分类("+partlist.data.ScmInfList[i].scmCntntGro.instClCar+")" +"认证状态("+partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar+")" 
                  	}
                  	if(!partlist.data.ScmInfList[i].instLo&&partlist.data.ScmInfList[i].scmCntntGro.instClCar&&!partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar){
                  		this.infoList[i].content ="机构分类("+partlist.data.ScmInfList[i].scmCntntGro.instClCar+")"  
                  	}
                  	if(partlist.data.ScmInfList[i].instLo&&!partlist.data.ScmInfList[i].scmCntntGro.instClCar&&!partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar){
                  		this.infoList[i].content =" 机构位置("+partlist.data.ScmInfList[i].instLo	+")"
                  	}
                  	if(partlist.data.ScmInfList[i].instLo&&partlist.data.ScmInfList[i].scmCntntGro.instClCar&&!partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar){
                  		 this.infoList[i].content =" 机构位置("+partlist.data.ScmInfList[i].instLo	+")   机构分类("+partlist.data.ScmInfList[i].scmCntntGro.instClCar+")" 
                  	}
                  	if(partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar&&!partlist.data.ScmInfList[i].instLo&&!partlist.data.ScmInfList[i].scmCntntGro.instClCar){
                  		this.infoList[i].content ="认证状态("+partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar+")"
                  	}
                  	if(!partlist.data.ScmInfList[i].scmCntntGro.ctfnEStatusCar&&!partlist.data.ScmInfList[i].instLo&&!partlist.data.ScmInfList[i].scmCntntGro.instClCar){
                  		 this.infoList[i].content = "全部"
                  	}
                  }
                 
                }else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
	}
// 机构位置（{{item.instLo}})   机构分类({{item.scmCntntGro.instClCar}})
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
	           format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
}