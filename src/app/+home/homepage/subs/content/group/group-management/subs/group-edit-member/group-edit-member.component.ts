import { Component, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectorRef } from '@angular/core';
import {NgStyle} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { GroupEditMemberList} from './classes/group-edit-member';
import { GroupEditMemberService } from './services/group-edit-member.service'
@Component({
    selector: 'group-edit-member',
    templateUrl: './group-edit-member.component.html',
    styleUrls: ['./group-edit-member.component.scss'],
    providers: [
       GroupEditMemberService     
    ]
})
export class GroupEditMemberComponent implements OnInit{ 
    phone:any='';
    color = '#fff';
    height = '312px';
    errorMessage: string;
    groupEditMemberList:any;
    msgNumber:any;
    groupid:any;
    groupMemberList:any=[];
    totals:any;
    totals2:any;
    groupmemberName:any;
    groupmemberName2:any;
    grouplikeList:any;
    addArray:any=[];
    addlist:any;
    amendUsrAhr:any;
    groupID:any;
    listlength:any=0;addArray2:any=[];
//注册服务
 constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private groupEditMemberService:GroupEditMemberService,
    //private excelExportService:ExcelExportService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    ){}

 //初始化
    ngOnInit(){
         this.activatedRoute.params.forEach((params:Params)=>{
            let groupid = params['groupid'];
            this.groupid=groupid;
        });
        this.postgroupListMsge();
        
    }

default:any={ 
    groupGrpid:'',
    usrNm:'',
    pageNum:1,
    pageSize:5 
}
groupedit:any={
    groupMgtStaffNum:0
}
//http
//本群搜索
 postgroupListMsge() {
    this.default.groupGrpid=this.groupid;
    this.groupEditMemberService.postgroupListMsge(this.default)
        .subscribe(
            groupEditMemberList =>{
                if(groupEditMemberList.status==0){
                    this.groupedit.groupMgtStaffNum='';
                    for(let lists in groupEditMemberList.data.list[1]){
                        if(groupEditMemberList.data.list[1][lists].usrEStatus==1){
                             groupEditMemberList.data.list[1][lists].usrEStatus='正常';
                        }else if(groupEditMemberList.data.list[1][lists].usrEStatus==3){
                             groupEditMemberList.data.list[1][lists].usrEStatus='冻结';
                        }
                        if(groupEditMemberList.data.list[1][lists].usrAhr==1){
                           ++this.groupedit.groupMgtStaffNum; 
                        }
                    }
                    this.groupID=groupEditMemberList.data.list[0].groupGrpid;
                    this.groupMemberList=groupEditMemberList.data.list[1];
                    this.totals=groupEditMemberList.data.page.totalResult;
                }else{
                    if(groupEditMemberList){
                        alert(groupEditMemberList.msg);
                    }
                    
                }
                

            },
            error => this.errorMessage = <any>error
    );          
};
// 去空格
  trim(str:any) { //删除左右两端的空格　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }
//模糊搜索本群用户
searchMember(){
    this.currentPage = 1;//无法同时修改当前页和每页总数
    this.changeDetectorRef.detectChanges();
    this.default.usrNm=this.trim(this.default.usrNm);
    this.postgroupListMsge();
}

//模糊查询非本群成员
likedata:any={
        groupGrpid:'',
        userName:'',
        pageNum:1,
        pageSize:5 
 }
like(){
    this.groupEditMemberService.postcheckMsge(this.likedata)
        .subscribe(
            grouplikeList =>{
                if(grouplikeList.status==0){
                    if(grouplikeList.data!=null){
                       this.grouplikeList=grouplikeList.data.list;
                       this.totals2=grouplikeList.data.page.totalResult; 
                    }else{
                        alert(grouplikeList.msg);
                    }

                }else{
                    alert(grouplikeList.msg);
                }
               
            },
            error => this.errorMessage = <any>error
    );  
}
//非本群成员搜索
searchMember2(){
    this.currentPage2 = 1;//无法同时修改当前页和每页总数
    this.changeDetectorRef.detectChanges();
    this.likedata.groupGrpid=this.groupid;
    this.likedata.userName=this.trim(this.likedata.userName)
    this.like();
}
//添加
addgruopid:any;
addGroupperson(id:any,list:any,e:any,add:any){
    e.stopPropagation();
    this.addgruopid=id; 
    this.addlist={
       groupGrpid:this.groupID,
       userId:list.userId,
       usrAhr:list.usrAhr,
       usrNm:list.userName,
       usrEStatus:'0'
    };
    this.addArray=[],
    this.addArray.push(this.addlist);
    add.disabled=true;
    console.log(this.addArray);
    this.groupEditMemberService.postallMsge({"userList":this.addArray})
        .subscribe(
            groupallList =>{
                if(groupallList.status==0){
                    this.postgroupListMsge();
                }else{
                    if(groupallList){
                       alert(groupallList.msg);
                    }
                }
            },
            error => this.errorMessage = <any>error
    );

}
//删除
unadd(listcannel:any,i:any,e:any,alllist:any){
    e.stopPropagation();
    alllist.splice(i,1);
    this.addlist={
       groupGrpid:this.groupID,
       userId:listcannel.userId,
       usrAhr:listcannel.usrAhr,
       usrNm:listcannel.userName,
       usrEStatus:'1'
    };
    this.addArray=[],
    this.addArray.push(this.addlist);
    console.log(this.addArray);
    this.groupEditMemberService.postallMsge({"userList":this.addArray})
        .subscribe(
            groupallList =>{
                if(groupallList.status==0){
                    this.postgroupListMsge();
                }else{
                    if(groupallList){
                       alert(groupallList.msg);
                    }
                }
            },
            error => this.errorMessage = <any>error
    );

}

//群成员权限修改
usrAhrchange(ziji:any,list:any,e:any,allLa:any){
    e.stopPropagation();
    list.usrAhr=ziji.value;
    this.addlist={
       groupGrpid:this.groupID,
       userId:list.userId,
       usrAhr:list.usrAhr,
       usrNm:list.userName,
       usrEStatus:'2'
    };
    this.groupedit.groupMgtStaffNum='';
    for(let li in allLa){
       if(allLa[li].usrAhr=='1'){
       ++this.groupedit.groupMgtStaffNum; 
    } 
    } 
    
    this.addArray2.push(this.addlist);
    console.log(this.addArray2);

}
//提交保存修改
groupallList:any;
submitgrouplist(brn:any,add:any){
    brn.disabled=true;
    console.log(this.addArray2);
    this.groupEditMemberService.postallMsge({"userList":this.addArray2})
        .subscribe(
            groupallList =>{
                if(groupallList.status==0){
                    this.router.navigate(['../../group-check',this.groupid],{relativeTo:this.activatedRoute}); 
                   brn.disabled=false;       
                }else{
                    if(groupallList){
                       alert(groupallList.msg);
                    }
                    
                    brn.disabled=false; 
                }
               
            },
            error => this.errorMessage = <any>error
    ); 
}

// 分页
msgNumbers = [{Number:'5'},{Number:'10'},{Number:'15'},{Number:'20'}];
    public firstText:string = '首页';
    public lastText:string = '末页';
    public previousText:string = '<';
    public nextText:string = '>';
    public maxSize:number = 5;
    public totalItems:number;
    public itemsPerPage:number = 5;  
    public itemsPerPage2:number = 5;
    public currentPage:number=1;
    public currentPage2:number=1;
    public totalPages:number; 
    public totalPages2:number; 
    public sizeData(Number:any){
          this.height = Number*40+120+'px';
          this.currentPage = 1;//无法同时修改当前页和每页总数
          this.changeDetectorRef.detectChanges();
          this.itemsPerPage = Number;
          this.height = Number*40+120+'px';
          var num:number = Number*1;
         this.default.pageSize=num;
         this.postgroupListMsge();

    };
      public sizeData2(Number:any){
          this.height = Number*40+120+'px';
          this.currentPage2 = 1;//无法同时修改当前页和每页总数
          this.changeDetectorRef.detectChanges();
          this.itemsPerPage2 = Number;
          this.height = Number*40+120+'px';
          var num:number = Number*1;
          alert(num);
          this.likedata.pageSize=num;
          console.log(this.likedata.pageSize)
          this.like();

    };
    public pageNumChange(event:any){
       this.totalPages = event;     
    }
     public pageNumChange2(event:any){
       this.totalPages2 = event;     
    }
   /* public setPage(pageNo:number):void {
        this.currentPage = pageNo;
    };
     public setPage(pageNo:number):void {
        this.currentPage2 = pageNo;
    };*/
// 翻页
    pageChanged(event:any,allcheck:any):void {
      this.default.pageNum = event.page;   
      this.postgroupListMsge();
    };
    pageChanged2(event:any,allcheck:any):void {
      this.likedata.pageNum = event.page;   
      this.like();
    };


}