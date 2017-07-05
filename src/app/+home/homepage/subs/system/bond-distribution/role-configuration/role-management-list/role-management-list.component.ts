import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { BondDistributionService } from '../../service/bond-distribution-service'

@Component({
	selector: 'role-management-list',
	templateUrl: './role-management-list.component.html',
	styleUrls: ['./role-management-list.component.scss'],
	providers: [BondDistributionService]
})

export class RoleManagementComponent implements OnInit{
	constructor(
				private bondDistributionService:BondDistributionService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let userId = params['userId'];
			let backId = params['backId'];
			// console.log(userId,backId);
		})
		this.turnFirst()
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
	public totalPages:number=1;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryInstList()
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
		this.con.pageSize=this.itemsPerPage;
		// this.queryInstList()
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.con.pageNum = event.page;	
		this.queryInstList()
	};
errorMessage:any
infoList:any=[]
 con:any={
			value:'',
			pageNum:'1',
			pageSize:'10',
			}
queryInstList(){
	this.bondDistributionService.queryInstList (this.con)
	  .subscribe(
            partlist => {   
            	
                if(partlist.status==0){
                  this.infoList =  partlist.data.list
                  this.totalItems = partlist.data.page.totalResult
                  this.totalPages =  partlist.data.page.totalPage
                  for(var i=0;i<this.infoList.length;i++){
                  	if(!this.infoList[i].instQualf){
                  		this.infoList[i].instQualf='4'
                  	}
                  	this.infoList[i].updateTime = this.format(new Date(this.infoList[i].updateTime)) 
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
    turnTo(id:any,orgName:any){
		this.router.navigate(['../check-org',id,orgName],{relativeTo:this.activatedRoute}); 
	}
}
