import { Component, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectorRef } from '@angular/core';
import {NgStyle} from '@angular/common';
import { ActivatedRoute, Router }   from '@angular/router';//
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { GroupSearchList }  from './classes/group-search';
import { GroupSearchService } from './services/group-search.service'
@Component({
    selector: 'group-search',
    templateUrl: './group-search.component.html',
    styleUrls: ['./group-search.component.scss'], 
    providers: [
       GroupSearchService     
    ]
})
export class GroupSearchComponent implements OnInit{ 
    phone:any='';
    color = '#fff';
    height = '312px';
    grouplist:any;
    errorMessage: string;
    msgNumber:any;
    createtime:any;
    totals:any;

//注册服务
 constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private groupSearchService:GroupSearchService,
    //private excelExportService:ExcelExportService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    ){}

 //初始化
    ngOnInit(){
        this.getgroupsearchMsge();
        //this.postgroupsearchMsge();
    } 
//时间戳转化
dateymd(dd:any){
    var da=new Date(dd);
    var year=da.getFullYear();
    var mon=da.getMonth()+1;
    var day=da.getDate();
    var xinqi=da.getDay();//星期几
    var hour=da.getHours();
    var minute=da.getMinutes();
    var aa=year+'/'+mon+'/'+day+' '+hour+':'+minute;
    return aa;
}

 default:any={ 
      groupGrpNm:'',//qunmingcheng
      groupTp:'1',
      groupaStaffTotNum:'',
      groupaStaffUplm:'',
      eStatus:'',
      createTime:'', 
      groupaStaffTotNumSort:'',
      pageNum:1,
      pageSize:10 
}
//http
 getgroupsearchMsge() {
    this.groupSearchService.searchGroupList(this.default).subscribe(
            groupSearchList => {
                if(groupSearchList.status==0){
                    this.grouplist=groupSearchList.data.list;
                    this.totals=groupSearchList.data.page.totalResult;
                }else{
                     if(groupSearchList){
                       alert(groupSearchList.msg);
                    }
                }
            },
            error => this.errorMessage = <any>error
        );        
    };

paging(){
    this.currentPage = 1;//无法同时修改当前页和每页总数
    this.changeDetectorRef.detectChanges();
}
// 去空格
  trim(str:any) { //删除左右两端的空格　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }
//搜索查询
onSubmit(ofg:any){
    ofg.checked=false;
    this.paging();
    this.default.groupTp='';
    this.default.groupGrpNm=this.trim(this.default.groupGrpNm);
    this.getgroupsearchMsge();
}


//checkout查询显示 
//官方群
officialGroup(ofg:any){
    if(ofg.checked==true){
        this.paging();
        this.default.groupTp='1';
        this.getgroupsearchMsge();

    }else{
        this.paging();
        this.default.groupTp='';
        this.getgroupsearchMsge();
    }
}

//冻结的群
frozenUser(fro:any,ofg:any,dis:any){
    if(fro.checked==true){
        dis.checked=false;
        this.paging();
        this.default.eStatus='2';
        this.getgroupsearchMsge();
    }else{
        this.paging();
        this.default.eStatus='';
        this.getgroupsearchMsge();
    }
}

//解散的群
dissolve(dis:any,fro:any,ofg:any,){
    if(dis.checked==true){
        fro.checked=false;
        this.paging();
        this.default.eStatus='1';
        this.getgroupsearchMsge();
    }else{
        this.paging();
        this.default.eStatus='';
        this.getgroupsearchMsge();
    }
}

trOrfal(ofg:any,fro:any,dis:any){
    if(fro.checked==true){
        fro.checked=false;
    }
    if(dis.checked==true){
        dis.checked=false;
    }
    if(ofg.checked==true){
        ofg.checked=false;
    } 
    this.default.groupTp='';
    this.default.eStatus='';
    this.default.groupaStaffTotNum='';
    this.default.groupaStaffUplm='';
    this.default.createTime="";
}
//默认排序
defaultSort(ofg:any,fro:any,dis:any){
   this.trOrfal(ofg,fro,dis);
   this.paging();
   this.getgroupsearchMsge();
}
//按照时间顺序排序
//顺序排
defaultTimeAsc(ofg:any,fro:any,dis:any){
    this.trOrfal(ofg,fro,dis);
    this.paging();
    this.default.createTime="0";
    this.default.groupaStaffTotNumSort="";
    this.getgroupsearchMsge();
}
//倒序排
defaultTimeDesc(ofg:any,fro:any,dis:any){
    this.trOrfal(ofg,fro,dis);
    this.paging();
    this.default.createTime="1";
    this.default.groupaStaffTotNumSort="";
    this.getgroupsearchMsge();
}

//按照人数排序 
//顺序排
defaultAsc(ofg:any,fro:any,dis:any){
    this.trOrfal(ofg,fro,dis);
    this.paging();
    this.default.groupaStaffTotNumSort="0";
    this.default.createTime='';
    this.getgroupsearchMsge(); 
 
}
//倒序排
defaultDesc(ofg:any,fro:any,dis:any){
    this.trOrfal(ofg,fro,dis);
    this.paging();
    this.default.groupaStaffTotNumSort="1";
    this.default.createTime='';
    this.getgroupsearchMsge();  
}
//通过人数查找群
peopleNum(){
    if(this.default.groupaStaffTotNum=='' || this.default.groupaStaffUplm==''){
        alert('开始人数和结束人数不能为空');
        return false;
    }
    if(this.default.groupaStaffTotNum*1 > this.default.groupaStaffUplm*1){
        alert('开始人数不能大于结束人数');
        return false;
    }
    this.paging();
    this.default.groupaStaffTotNum=this.trim(this.default.groupaStaffTotNum);
    this.default.groupaStaffUplm=this.trim(this.default.groupaStaffUplm);
    this.getgroupsearchMsge();  
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
          this.getgroupsearchMsge();

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
      this.getgroupsearchMsge();
    };

//群名查看群
checkgroup(groupid:any){
    this.router.navigate(['../group-check',groupid],{relativeTo:this.activatedRoute}); 
}

//群主名查看用户详情页
checkGroupMain(userId:any){
    this.router.navigate(['../../user-edit',userId],{relativeTo:this.activatedRoute}); 
}


 
 
}