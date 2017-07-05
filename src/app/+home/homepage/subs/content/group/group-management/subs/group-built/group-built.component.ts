import { Component, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectorRef } from '@angular/core';
import {NgStyle} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router }   from '@angular/router';//
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { GroupBuiltList}  from './classes/group-built';
import { GroupBuiltService } from './services/group-built.service'
@Component({
    selector: 'group-built',
    templateUrl: './group-built.component.html',
    styleUrls: ['./group-built.component.scss'],
     providers: [
       GroupBuiltService     
    ]
})
export class GroupBuiltComponent implements OnInit{ 
    phone:any='';
    color = '#fff';
    height = '312px';
    grouplikeList:any;
    errorMessage: string;
    msgNumber:any;
    totals2:any; 
    totals:any; 
    groupMemberList:any=[];
    listlength:any=0;
    addArray2:any=[];
    addlist2:any;
    file_ipt:any;usID:any=[];
    submitted:boolean;groupid:any;
    editgroup:NgForm;
    @ViewChild('editgroup') currentForm:NgForm;qun:boolean=false;
    imghead:boolean=false;addlist:any;addArray:any=[];qunzhu:boolean=false;groupMember:boolean=false;

//注册服务
 constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private groupBuiltService:GroupBuiltService,
    //private excelExportService:ExcelExportService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private sanitizer: DomSanitizer,
    ){
     this.submitted = false;
 }

 //初始化
ngOnInit(){
    //this.postgroupListMsge();
    //this.postgroupsearchMsge();
}
//上传图片的字段
groupupdate:any={
   groupGid:'',
   ringlGroupid:'',
   groupGrpNm:'',
   groupMgtStaffNum:0,
   groupDsc:'',
   groupType:'',
   groupheadAdr:''
}

//模糊查询非本群成员
likedata:any={
        userName:'',
        pageNum:1,
        pageSize:5 
 }
like(){
    this.groupBuiltService.postcheckMsge(this.likedata)
        .subscribe(
            grouplikeList =>{
                if(grouplikeList.status==0){
                    if(grouplikeList.data!=null){
                       this.grouplikeList=grouplikeList.data.list;
                       //searchzi.disabled=false;
                       console.log(this.grouplikeList);
                       this.totals2=grouplikeList.data.page.totalResult; 
                    }else{
                        alert(grouplikeList.msg);
                        //searchzi.disabled=true;
                    }

                }else{
                    if(grouplikeList){
                        alert(grouplikeList.msg);
                    }
                   
                }
               
            },
            error => this.errorMessage = <any>error
    );  
}

// 去空格
  trim(str:any) { //删除左右两端的空格　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }
//非本群成员搜索
ungroupSubmit(){
    this.currentPage2 = 1;//无法同时修改当前页和每页总数
    this.changeDetectorRef.detectChanges();
    this.likedata.userName=this.trim(this.likedata.userName);
    this.like();
}
//获取管理员数量
usrAhrLength(listArray:any){
  this.groupupdate.groupMgtStaffNum=0;
    for(let index in listArray){
        if(listArray[index].usrAhr*1==1){
            this.groupupdate.groupMgtStaffNum+=1;  
        }
    }  
}
//添加
addgruopid:any;

zhen:boolean=false;
addGroupperson(id:any,list:any,e:any,add:any,k:any){
    e.stopPropagation();
    this.addgruopid=id;
    //sessionStorage.setItem("userId",JSON.stringify(this.usID));
   /* if(this.usID.indexOf(list.userId)!=-1){
        alert('不能重复选择成员');
        return false;
    }else{
        this.groupMemberList.push(list);
    }*/
    this.groupMemberList.push(list);
    this.usID.push(list.userId); 
    this.listlength=this.groupMemberList.length; 
    this.usrAhrLength(this.groupMemberList);
    add.disabled=true;
    this.qun=false;
    this.groupMember=false;
    this.qunzhu=false;
}
//删除
unadd(listcannel:any,i:any,e:any,alllist:any){
    e.stopPropagation();
    alllist.splice(i,1);
    this.listlength=alllist.length;
    this.usrAhrLength(alllist);

}
//群成员权限修改
usrAhrchange(ziji:any,list:any,e:any,allLa:any){
    e.stopPropagation();
    list.usrAhr=ziji.value;
    this.usrAhrLength(allLa);
    this.groupMember=false;
    this.qun=false;
    this.qunzhu=false;

}
//提交保存修改
groupallList:any;
bulitNewgroup(brn:any,ty:any,fileinput:any,imghead:any,add:any){
    console.log(this.groupMemberList);
    this.addArray=[];
    if(this.groupMemberList.length>0){
        for(let list in this.groupMemberList){
            this.addlist={
                userId:this.groupMemberList[list].userId,
                usrAhr:this.groupMemberList[list].usrAhr,
                usrNm:this.groupMemberList[list].userName,
            },
           this.addArray.push(this.addlist);  
           if(this.groupMemberList[list].usrAhr=='3'){
             this.groupMember=true;
             this.qun=false;
             this.qunzhu=false;
             return false;
           }
        };

    }else{
       this.qun=true;
       this.groupMember=false;
       this.qunzhu=false;
       return false;
    }
    if(ty.checked==true){
        this.groupupdate.groupType='1';
    }else{
        this.groupupdate.groupType='0';
    }
    brn.disabled=true;
    this.groupupdate.groupGrpNm=this.trim(this.groupupdate.groupGrpNm);
    this.groupupdate.groupDsc=this.trim(this.groupupdate.groupDsc);
    var  fd= new FormData();          
    fd.append('groupGrpNm',this.groupupdate.groupGrpNm);
    fd.append('groupDsc',this.groupupdate.groupDsc);
    fd.append('groupTp',this.groupupdate.groupType);
    fd.append('groupHead',this.file_ipt.files[0]);
    fd.append('userList',JSON.stringify(this.addArray));
    this.groupBuiltService.postupdateimgMsge(fd)
        .subscribe(
            groupallList =>{
                if(groupallList.status==0){ 
                    this.groupid=groupallList.data.groupGrpid;
                    alert(groupallList.msg);
                    add.disabled=false;
                    this.router.navigate(['../group-check',this.groupid],{relativeTo:this.activatedRoute}); 
                    brn.disabled=false; 
                }else{
                    if(groupallList){
                        alert(groupallList.msg);
                    }
                 
                    brn.disabled=false; 
                }   
            },
            error =>{
                brn.disabled=true;
            }
    );
}
//图片上传
fileChange(input:any,umbnail:any,e:any){
    this.file_ipt = input;
    this.groupupdate.groupheadAdr= '';
    if(this.file_ipt.files[0]){
       this.groupupdate.groupheadAdr = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_ipt.files[0]));
    }
}
// 分页
msgNumbers = [{Number:'5'},{Number:'10'},{Number:'15'},{Number:'20'}];
    public firstText:string = '首页';
    public lastText:string = '末页';
    public previousText:string = '<';
    public nextText:string = '>';
    public maxSize:number = 5;
    public totalItems:number;
    public itemsPerPage:number =5;  
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

    };
      public sizeData2(Number:any){
          this.height = Number*40+120+'px';
          this.currentPage2 = 1;//无法同时修改当前页和每页总数
          this.changeDetectorRef.detectChanges();
          this.itemsPerPage2 = Number;
          this.height = Number*40+120+'px';
          var num:number = Number*1;
          this.likedata.pageSize=num;
          this.like();

    };
    public pageNumChange(event:any){
       this.totalPages = event;     
    }
     public pageNumChange2(event:any){
       this.totalPages2 = event;     
    }
// 翻页
    pageChanged(event:any,allcheck:any):void {
     
    };
    pageChanged2(event:any,allcheck:any):void {
      this.likedata.pageNum = event.page;   
      this.like();
    };
//tr点击
trcolor:any;
userListId(userList:any,e:any){
    e.stopPropagation();//阻止冒泡； 
    this.trcolor=userList.style.backgroundColor;
    var tr=document.getElementsByTagName('tr');
    
     if(this.trcolor=="rgb(255, 255, 255)"){ 
         for(var i=0;i<tr.length;i++){
         tr[i].style.backgroundColor="rgb(255, 255, 255)";
         }
         userList.style.backgroundColor="rgb(231, 231, 231)";
    }else{
        
         userList.style.backgroundColor="rgb(255, 255, 255)";
    }  
   
} 






}