import { Component,ViewChild,OnInit,ChangeDetectorRef,Input,ChangeDetectionStrategy} from '@angular/core';
import { FormControl, FormGroup ,NgForm} from '@angular/forms';
import { ActivatedRoute, Router ,Params}   from '@angular/router';//
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
// import { TooltipModule } from 'ng2-bootstrap/components/tooltip';
// import { ExcelExportService } from '../../../../services/excel-export.service'; 
/*import { ModalDirective } from 'modal.component.ts';*/
import { TypeAhead } from './classes/typeahead';
import { UserListService } from './services/user-list.service'
@Component({
	selector: 'alphain-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],  
  providers: [
    UserListService,
  ]//注册服务器
 
})
export class UserListComponent implements OnInit{
    phone:any='';
    height = '312px';
    userlistId:any;return_list:any;//回访
    openFreeze_list:any;//解冻
    companylists:any=[];partlists:any=[];partlist:any='';
    visitUser:any='';realyStatus:any='';checkrealyStatus:any="";frozenmessage:any='';unfrozenmessage:any='';excellist:any='';
    Chls:any;upChls:any;totals:any;orgid:any;depid:any;id2:any;organizationName:string='';
    orid:Object;dptmt:Object;Cardhtml:any;unhtml:any;
    organizationht:any;depthml:any;psthml:any;defauleStarttime:any;defauleEndtime:any;
    ceshitime:any=this.getDeauftDate2('today');
    //set用户列表 
    fullnameTypeAhead:TypeAhead;
    userLists:any;
    companylist:any=[];
   // UserL:UserList; 
    errorMessage: string; 
    msgNumber:any;
    // autoCompleteRef:any
    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private userListService:UserListService,
        private activatedRoute:ActivatedRoute,
        private router:Router,
        ){
      this.fullnameTypeAhead = new TypeAhead();
    }

  
//初始化
ngOnInit(){
    this.activatedRoute.params.forEach((params:Params)=>{
            let orgid = params['orgid'];
            let depid = params['depid'];
            this.orgid=orgid;
            this.depid=depid;
        });
 
    this.postListMsges();
    if(!this.orgid){ 
      this.searchuserlist();      
    }  

// return this.userListService.getOrganizationListByShortName(obj)
    this.fullnameTypeAhead.source = Observable.create((observer:any) => {
      this.userListService
        .getOrganizationListByShortName({value:this.organizationName})
        .subscribe(
          data => observer.next(data.data),
          error => this.errorMessage = error
        );
    }).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
}


 // abbrTypeAhead:TypeAhead;
 default:any={ 
      userName:'',
      loginName:'',
      departmentId:'',
      organizationId:'',
      realCertifyState:'',
      userSource:'', 
      emailCertifyState:'',
      visitState:'' ,
      loginDate:'',
      pageNum:1,
      pageSize:10 
}
default2:any={
    loginDate2:''
}
// 去空格
  trim(str:any) { //删除左右两端的空格　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }
//http
searchuserlist(){
   if(this.organizationName==''){
        this.default.organizationId='';  
    }
    if(this.dptmt==''){
        this.default.departmentId='';
    } 
    if(this.default.loginDate!=''){
        this.default.loginDate=this.startdate+','+this.enddate;
    }

     //用户列表
    this.userListService.postListMsge(this.default)
        .subscribe(
            userLists =>{
                if(userLists.status==0){
                    this.userLists=userLists.data.list;
                    this.totals=userLists.data.page.totalResult;
                    for(var i =0 ;i<this.userLists.length;i++){
                       this.userLists[i].haveOwnCard = 1
                      if(this.userLists[i].businessCardAnnexUrl==null||this.userLists[i].businessCardAnnexUrl==undefined){
                          if(this.userLists[i].businessCardAnnexTwoUrl){
                             this.userLists[i].haveOwnCard = 2
                            this.userLists[i].businessCardAnnexUrl = this.userLists[i].businessCardAnnexTwoUrl
                          }
                      }
                    }
                    // console.log(this.default.loginDate);
                }else{
                    if(userLists){
                        alert(userLists.msg);
                    }
                }                 
            },
            error => this.errorMessage = <any>error
        );
}  
//公司失去焦点

blurCompany(el:any,e:any){
    if(!this.default.organizationId){
       el.value = "";
    } 
}
changeCompany(el:any,e:any){
    // this.postListMsges();
    this.default.organizationId = "";
}
blurDepartmentName(el:any,e:any){
    if(!this.default.departmentId){
       el.value = "";
    }
}
 public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }
 
  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }
changeDepartmentName(){
    this.default.departmentId='';
}
postListMsges(){
    //公司列表
    // this.userListService.OrganizationList(null) 
    //     .subscribe(
    //         companylist => {
    //             if(companylist.status==0){
    //                 this.companylists=companylist.data; 
    //               if(this.orgid){     
    //                     for(let xx in this.companylists){ 
    //                       if(this.orgid==this.companylists[xx].organizationId){
    //                         this.organizationName=this.companylists[xx].organizationShortName;
    //                        }
                        
    //                     }
    //                 };
    //                 if(this.orgid && !this.depid){     
    //                    this.default.organizationId=this.orgid;
    //                    this.searchuserlist();
    //                 }; 

    //             }else{   
    //                 if(companylist){
    //                     alert(companylist.msg);
    //                 }
    //             }
    //         }, 
    //         error => this.errorMessage = <any>error
    //     ); 
    //部门列表  
    this.userListService.DepartmentList(null) 
        .subscribe(
            partlist => {
                this.partlist= partlist;
                if(this.partlist.status==0){
                    this.partlist=this.partlist.data;
                    if(this.depid && this.orgid){     
                        for(let xx in this.partlist){ 
                          if(this.depid==this.partlist[xx].departmentId){
                            this.dptmt=this.partlist[xx].departmentName;
                           }
                        
                        }
                       this.default.departmentId=this.depid;
                       this.default.organizationId=this.orgid;

                       this.searchuserlist();
                    } 
                }else{
                    if(this.partlist){
                        alert(this.partlist.msg);
                    }
                  
                }
               
            },  
            error => this.errorMessage = <any>error
    ); 
     
  }
startdate:string="";
enddate:string="";

//时间戳转化
getDeauftDate(td:any,detailtime:any){
    var td=td,detailtime=detailtime;
    var day = new Date();
    if(td=='today'){
         day = new Date();
    }
    if(td=='beforeyesterday'){
        var today = new Date()
         day = new Date(Date.parse(today+'')-1000*3600*24*2);
    }
    if(detailtime){
         day = new Date(Date.parse(detailtime));
    }    
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = '';
    var MonthString = '';
    var DayString = '';
   //初始化时间
    Year       = day.getFullYear();
    Month      = day.getMonth()+1;
    Day        = day.getDate();
    if(Month<10){
        MonthString ='0'+Month
    }else{
        MonthString =''+Month
    }
    if(Day<10){
    DayString = '0'+ Day
    }else{
        DayString = ''+ Day
    }
    var  dateTime = Year+MonthString+DayString;
   return dateTime;
}
//时间戳转化
getDeauftDate2(td:any){
    var td=td;
    var day = new Date();
     if(td=='today'){
         day = new Date();
    }
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = '';
    var MonthString = '';
    var DayString = '';
   //初始化时间
    Year       = day.getFullYear();
    Month      = day.getMonth()+1;
    Day        = day.getDate();
    if(Month<10){
        MonthString ='0'+Month
    }else{
        MonthString =''+Month
    }
    if(Day<10){
    DayString = '0'+ Day
    }else{
        DayString = ''+ Day
    }
    var  dateTime2 = Year+"-"+MonthString+"-"+DayString+"T00:00";
    return dateTime2;
}
timebtn(){
    this.defauleStarttime='';
    this.defauleEndtime='';
    this.startdate='';
    this.enddate='';
    this.default.loginDate=this.startdate+','+this.enddate;  
}
timebtn2(){
    this.defauleStarttime='';
    this.defauleEndtime='';
    this.startdate=this.getDeauftDate('today','');
    this.enddate=this.getDeauftDate('today','');
    this.default.loginDate=this.startdate+','+this.enddate;
    // console.log(this.default.loginDate)
   
}
timebtn3(){
    this.defauleStarttime='';
    this.defauleEndtime='';
    this.startdate=this.getDeauftDate('beforeyesterday','');
    this.enddate=this.getDeauftDate('today','');
    this.default.loginDate=this.startdate+','+this.enddate;
    // console.log(this.default.loginDate)
   
}
starttimeChange(){
    this.startdate='';
    this.startdate=this.getDeauftDate('',this.defauleStarttime);
}
endtimeChange(){
    this.enddate='';
    this.enddate=this.getDeauftDate('',this.defauleEndtime);  
}
 //搜索查询
 onSubmit(){
      this.currentPage = 1;//无法同时修改当前页和每页总数
      this.changeDetectorRef.detectChanges();
      this.default.loginName=this.trim(this.default.loginName)
      this.default.userName=this.trim(this.default.userName)
      this.searchuserlist();
      
 }
//导出excel
exportExcel(query:any){
    this.userListService.exportUserLists(query) 
        .subscribe(
            excellist => {
                this.excellist= excellist;
                if(this.excellist.status==0){
                    this.excellist=this.excellist.data;
                    window.location.href=this.excellist;
                }else{
                    if(this.excellist){
                        alert(this.excellist.msg);
                    }
                  
                }
               
            },  
            error => this.errorMessage = <any>error
    ); 
}	

//修改
amend(userL:any,event:any){  
    event.stopPropagation();
    // console.log(userL);
    if(this.orgid&&this.depid){
      this.router.navigate(['../user-edit',userL.userId],{relativeTo:this.activatedRoute}); 
    }
     if(!this.orgid&&!this.depid){
      this.router.navigate(['../user-edit',userL.userId],{relativeTo:this.activatedRoute}); 
    }
    if(this.orgid&&!this.depid){
      this.router.navigate(['../../user-edit',userL.userId],{relativeTo:this.activatedRoute}); 
    }
    // this.router.navigate(['../user-edit',userL.userId],{relativeTo:this.activatedRoute}); 
}


//名片显示和隐藏
mousefun(card:any,a:any,e:any){
  card.style.display='block';
  this.Cardhtml=a;
 
}  
outfun(card:any){
    card.style.display='none';

}
//cardShow
cardurl:any;
nowUserId:any
haveOwnCard:any=1
cardShow(userCard:any,url:any,e:any,img:any,id:any,userLi:any){
  this.haveOwnCard=userLi.haveOwnCard
    e.stopPropagation();//阻止冒泡；
    // if (userLi.businessCardAnnexUrl==userLi.businessCardAnnexTwoUrl){
    //   userLi.haveOwnCard=2
    // }
    userCard.show();
    this.cardurl=url;
    this.current=0
    this.nowUserId = id
    img.style.transform = 'rotate(0deg)';

}
//显示和隐藏
public isCollapsed:boolean = false;//isCollapsed可更改

public collapsed(event:any):void {
	//console.log(event);
}

public expanded(event:any):void {
	//console.log(event);
}
//搜索的联动 公司和部门
public stateCtrl:FormControl = new FormControl();
public myForm:FormGroup = new FormGroup({
	state: this.stateCtrl
});
public customSelected:string = '';
// public usernameSelected:string = '';
// public dataSource:Observable<any>;
public asyncSelected:string = '';
public typeaheadLoading:boolean = false;
public typeaheadNoResults:boolean = false; 
public companys:Array<string>;
public departments:Array<string>;  
public typeaheadOnCompanys(e:any):void{
   this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
}
public typeaheadOnDepartments(e:any):void{
    
    this.default.departmentId = e.item.departmentId;
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
          this.default.loginDate=this.startdate+','+this.enddate;
          this.searchuserlist(); 

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
      this.default.loginDate=this.startdate+','+this.enddate;  
      this.searchuserlist();  
    };

//变更实名认证状态 和 回访状态 初始化
change:any={
  visitState:'',
  realCertifyState:'',
}

//回访
return_visit(userL:any,event:any,payReturn:any){
     event.stopPropagation();//阻止冒泡；
     this.return_list=userL;
     this.change.visitState=this.return_list.visitState;//默认回访状态
     payReturn.show();//弹框显示             
}
visitremark:any='';
visitdata:any;
visituser(userId:any,payReturn:any,btn:any){
    btn.disabled=true;
    this.visitdata={
        userId:userId,
        visitRemark:this.visitremark,
        visitState:this.change.visitState
    }
   
     this.userListService.visitUser(this.visitdata) 
        .subscribe(
            visitUser => {
                this.visitUser= visitUser;
                btn.disabled=false;
                if(this.visitUser.status==0){
                    payReturn.hide();
                    this.searchuserlist();
                    alert('回访成功');
                    this.visitremark='';
                }else{
                     if(this.visitUser){
                        alert(this.visitUser.msg);
                    }
                   
                }
                
        },  
        error => this.errorMessage = <any>error
      );   

}
//冻结或者解冻 
frozenRemark:any='';
frozendata:any;
open_freeze(userL:any,event:any,openFreeze:any){
     this.openFreeze_list=userL;
     event.stopPropagation();//阻止冒泡；
     openFreeze.show();//弹框显示   
              
}
frozenUserfun(openFreezelist:any,openFreeze:any,userbtn:any){
     userbtn.disabled=true;
     this.frozendata={
        userId:openFreezelist.userId,
        frozenRemark:this.frozenRemark
    }
    if(openFreezelist.userState=='1'){
        this.userListService.frozenUser(this.frozendata) 
            .subscribe(
                frozenmessage => {
                    this.frozenmessage= frozenmessage;
                     userbtn.disabled=false;
                    if( this.frozenmessage.status==0){
                       openFreeze.hide();
                       this.searchuserlist();
                       alert('冻结成功');
                       this.frozenRemark='';
                    }else{
                        if(this.frozenmessage){
                             alert(this.frozenmessage.msg);
                        }
                      
                    }
                   
            },  
            error => this.errorMessage = <any>error
        ); 
    }else{
       this.userListService.unFrozenUser(this.frozendata) 
            .subscribe(
                unfrozenmessage => {
                    this.unfrozenmessage= unfrozenmessage;
                     userbtn.disabled=false;
                    if( this.unfrozenmessage.status==0){
                       openFreeze.hide();
                       this.searchuserlist();
                       alert('解冻成功');
                       this.frozenRemark=''; 
                    }else{
                        if(this.unfrozenmessage){
                             alert(this.unfrozenmessage.msg);
                        }
                       
                    }   
            },  
            error => this.errorMessage = <any>error
       ); 
 
    }
    

}
authStatus_list:any;
gray:any="#dadada";
//变更认证状态
auth_status(userL:any,event:any,authStatus:any){
     event.stopPropagation();//阻止冒泡；
     this.authStatus_list=userL;
     this.change.realCertifyState=this.authStatus_list.realCertifyState;//默认实名认证状态
     //查看认证状态
     // console.log(this.change.realCertifyState);
     this.userListService.checkStauts({'userId':this.authStatus_list.userId}) 
        .subscribe(
            checkrealyStatus => {
                this.checkrealyStatus=checkrealyStatus;   
        },  
        error => this.errorMessage = <any>error
    ); 
    authStatus.show();//弹框显示   

}

//置灰.pp2
grayFUn(){
    this.gray='#333'; 
}
grayFUn2(){
    this.remarks='';
    this.gray='#dadada'; 
}
remarks:any='';
usdata:any;
authUserStatus(id:any,authStatus:any,btn2:any){
    if(this.change.realCertifyState=='1'){
      alert('您当前的认证状态是未认证');
      return false;
    }
    btn2.disabled=true;
    this.usdata={
        userId:id,
        status:this.change.realCertifyState,
        remarks:this.remarks,
    }
    this.userListService.realyAuth(this.usdata) 
        .subscribe(
            realyStatus => {
                btn2.disabled=false;
                if(realyStatus.status==0){
                    authStatus.hide();
                    alert('您已成功变更用户实名认证状态');
                    this.searchuserlist();
                    this.remarks='';
                }else{
                     if(realyStatus){
                        alert(realyStatus.msg);
                    } 
                }
                
        },  
        error => this.errorMessage = <any>error
    ); 
}

//tr点击
trcolor:any;
color = '#fff';
userListId(userList:any){
  var trAll=document.getElementsByTagName('tr');
    for(var i=0;i<trAll.length;i++){
      trAll[i].style.backgroundColor="rgb(255, 255, 255)";
    }
    userList.style.backgroundColor= "#d9edf7";
} 

//列标题设置
titlelist:any={
    phone:true,
    name:true,
    company:true,
    department:true,
    sex:'',
    job:'',
    contactnumber:'',
    worknumber:'',
    cpmpanyemail:'',
    seatof:'',
    nickname:'',
    birthday:'',
    hometown:'',
    qq:'',
    person:'',
    card:'',
    wechat:'',
    useroragin:'',
    userstatus:'',
    realmailbox:'',
    mailboxstatus:'',
    visitstatus:'',
    remarks:''
}
//全选
public states:boolean=false;
public allchecked(){
    /*if(this.states===false){
        for(let list in this.titlelist){
            if(list==="phone"||list==="name"||list==="company"||list==="department"){continue;}
            this.titlelist[list]=true;
        }
        this.states=true;
    }else{
        for(let list in this.titlelist){
            if(list==="phone"||list==="name"||list==="company"||list==="department"){continue;}
            this.titlelist[list]=false;
        }
        this.states=false; 
    }*/
}

  public type:string = 'success';
  public dismissible:boolean;
  public dismissOnTimeout:number;
//保存列标题设置
CHdata:any;
ColumnHead(e:any,title:any){
   e.stopPropagation();//阻止冒泡；
   title.show();
   this.CHdata={
     userId:'222',
     columnType:'1'
   }
   this.userListService.ColumnHeadingList(this.CHdata) 
            .subscribe(
                Chls => {
                    this.Chls= Chls;
                    if(this.Chls.status==0){  
                      this.Chls=this.Chls.data;
                       // console.log(this.Chls)
                    }else{
                        if(this.Chls){
                             alert(this.Chls.msg);
                        }
                       
                    }   
            },  
            error => this.errorMessage = <any>error
       ); 
}
columnheadlist:any;
titleall(titlelist:any,title:any){
/*  this.columnheadlist={
                      [
                      columnHeadId:'1',
                      showIndex:'2',
                      fieldType:'2',
                      showOrder:'3'
                      ]
                    }*/
    // console.log(this.columnheadlist);
    this.userListService.updateColumnHead(this.columnheadlist) 
            .subscribe(
                upChls => {
                    this.upChls= upChls;
                    if(this.upChls.status==0){  
                       // console.log(this.Chls)
                    }else{
                         if(this.upChls){
                             alert(this.upChls.msg);
                        }
                    }   
            },  
            error => this.errorMessage = <any>error
    ); 

    title.hide();
   
}
// 类管理
setLoadClasses(app:any) {
    // console.log(app)
      let classes =  {
        gary: app!=3,   
      };
    return classes;
  }
// 旋转
current:any=0
 turnRound(img:any,drc:number){
        this.current = (this.current+90*drc)%360;    
        if(this.current <0)  {
          this.current +=360
        }
        img.style.transform = 'rotate('+this.current+'deg)';

      }
 dealWitchPicture(userCard:any){
   var obj={
     userId:'',
      url:'',
      type:1,
      angle:'',
   }
   obj.userId= this.nowUserId  ;
   obj.url = this.cardurl;
   obj.angle = this.current
   obj.type = this.haveOwnCard
    this.userListService.dealWitchPicture(obj) 
            .subscribe(
                upChls => {
               
                    if(upChls.status==0){  
                       alert('保存成功')
                       userCard.hide()
                       this.searchuserlist()
                    }else{
                         if(upChls){
                             alert(upChls.msg);
                        }
                    }   
            },  
            error => this.errorMessage = <any>error
    ); 
 }
 
} 

