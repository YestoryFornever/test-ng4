import { Component, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectorRef } from '@angular/core';
import {NgStyle} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { GroupCheckList}  from './classes/group-check';
import { GroupCheckService } from './services/group-check.service'
@Component({
    selector: 'group-check',
    templateUrl: './group-check.component.html', 
    styleUrls: ['./group-check.component.scss'],
     providers: [
       GroupCheckService     
    ]
})
export class GroupCheckComponent implements OnInit{ 
    phone:any='';
    color = '#fff';
    height = '312px';
    groupCheckList:any;errorMessage:string;msgNumber:any;totals:any;
    groupGrpid:any;groupMessage:any={};groupMemberList:any;checkgroup:any;
//注册服务
 constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private groupCheckService:GroupCheckService,
    //private excelExportService:ExcelExportService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    ){}

 //初始化
    ngOnInit(){
        this.activatedRoute.params.forEach((params:Params)=>{
            let groupGrpid = params['groupGrpid'];
            this.groupGrpid=groupGrpid;
        });
        this.postcheckListMsge();
    }
default:any={ 
  groupGrpid:'',
  usrEStatus:'',
  createTime:'',
  pageNum:1,
  pageSize:10 
}

//http
 postcheckListMsge() {
    this.default.groupGrpid=this.groupGrpid;
    this.groupCheckService.postcheckListMsge(this.default)
        .subscribe(
            groupCheckList =>{
                if(groupCheckList.status==0){
                    
                    if(groupCheckList.data.list[0].groupTp==1){
                        groupCheckList.data.list[0].groupTp="官方群";
                    }else{
                        groupCheckList.data.list[0].groupTp="普通群";
                    }
                    //群状态
                    if(groupCheckList.data.list[0].eStatus==0){
                        groupCheckList.data.list[0].eStatus='正常';
                    }else if(groupCheckList.data.list[0].eStatus==1){
                        groupCheckList.data.list[0].eStatus='解散';
                    }else{
                        groupCheckList.data.list[0].eStatus='冻结';
                    }
                    this.groupMessage=groupCheckList.data.list[0];
                    for(let lists in groupCheckList.data.list[1]){
                        if(groupCheckList.data.list[1][lists].usrAhr==0){
                            groupCheckList.data.list[1][lists].usrAhr="群主";
                        }else if(groupCheckList.data.list[1][lists].usrAhr==1){
                            groupCheckList.data.list[1][lists].usrAhr="管理员";
                        }else{
                            groupCheckList.data.list[1][lists].usrAhr="普通成员"; 
                        }
                        //群成员状态（用户状态)
                        if(groupCheckList.data.list[1][lists].usrEStatus==1){
                             groupCheckList.data.list[1][lists].usrEStatus='正常';
                        }else if(groupCheckList.data.list[1][lists].usrEStatus==3){
                             groupCheckList.data.list[1][lists].usrEStatus='冻结';
                        }
                           
                    }
                    this.groupMemberList=groupCheckList.data.list[1];
                    this.totals=groupCheckList.data.page.totalResult;            
                    // console.log(this.groupMemberList);
                    //this.totals=this.groupBuiltList.length;
                }else{
                    if(groupCheckList){
                        alert(groupCheckList.msg);
                    }
                
                }
                             
            },
            error => this.errorMessage = <any>error
        );         
};

checkPaging(){
    this.currentPage = 1;//无法同时修改当前页和每页总数
    this.changeDetectorRef.detectChanges();
}
//跳转编辑群成员
memberFun(){
     this.router.navigate(['../../group-edit-member',this.groupMessage.groupGrpid],{relativeTo:this.activatedRoute}); 
}

//跳转编辑群信息
msssageFun(){
     this.router.navigate(['../../group-edit-message',this.groupMessage.groupGrpid],{relativeTo:this.activatedRoute}); 
}

//解散群
dissolve(){
    this.groupCheckService.postcheckgroup({groupGrpid:this.groupGrpid,eStatus:'1'})
        .subscribe(
            checkgroup =>{
                if(checkgroup.status==0){
                    // console.log(checkgroup);
                    this.postcheckListMsge();

                }else{
                    if(checkgroup){
                        alert(checkgroup.msg);
                    }
                  
                }
                             
            },
            error => this.errorMessage = <any>error
        );
}

//冻结群
freeregroup(){
    this.groupCheckService.postcheckgroup({groupGrpid:this.groupGrpid,eStatus:'2'})
        .subscribe(
            checkgroup =>{
                if(checkgroup.status==0){
                    // console.log(checkgroup);
                    this.postcheckListMsge();
                }else{
                    if(checkgroup){
                        alert(checkgroup.msg);
                    }
                  
                }
                             
            },
            error => this.errorMessage = <any>error
        );
}
//冻结的群
frozenUser(fro:any){
    if(fro.checked==true){
         this.checkPaging()
         this.default.eStatus='3';//用户状态 3 冻结
         this.default.createTime="";
         this.postcheckListMsge();
    }else{
         this.checkPaging()
         this.default.createTime="";
         this.default.eStatus='1';//用户状态 3 正常
         this.postcheckListMsge();
    }

}

//默认排序
defaultSort(fro:any){
    if(fro.checked==true){
        fro.checked=false;
    }
    this.checkPaging()
    this.default.createTime="";
    this.default.usrEStatus='';
    this.postcheckListMsge();
} 
//按照时间顺序排序
//顺序排
defaultTimeAsc(fro:any){  
    if(fro.checked==true){
        fro.checked=false;
    }
    this.checkPaging()
    this.default.createTime="0";
    this.default.usrEStatus='';
    this.postcheckListMsge();
}
//倒序排
defaultTimeDesc(fro:any){    
    if(fro.checked==true){
        fro.checked=false;
    }
    this.checkPaging()
    this.default.createTime="1";
    this.default.usrEStatus='';
    this.postcheckListMsge();
}
// 分页
msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
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
          this.height = Number*40+120+'px';
          this.currentPage = 1;//无法同时修改当前页和每页总数
          this.changeDetectorRef.detectChanges();
          this.itemsPerPage = Number;
          this.height = Number*40+120+'px';
          var num:number = Number*1;
         this.default.pageSize=num;
         this.postcheckListMsge();

    };
    public pageNumChange(event:any){
       this.totalPages = event;     
    }
    public setPage(pageNo:number):void {
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
      this.default.pageNum = event.page;   
      this.postcheckListMsge();
    };


}