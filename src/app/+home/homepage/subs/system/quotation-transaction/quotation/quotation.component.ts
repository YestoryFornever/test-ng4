import { Component, ChangeDetectorRef,Input, SimpleChanges,ViewChild,OnInit,trigger,state,style,transition,animate ,OnChanges} from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { LookQuotationService } from './services/quotation.service';
import {CalendarModule,PickListModule} from 'primeng/primeng';
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule  } from 'ng2-bootstrap/ng2-bootstrap';

import { lookQuotation } from './classes/quotation';
@Component({
	selector: 'quotation',
	templateUrl: './quotation.component.html',
	styleUrls: [
		'./quotation.component.scss',
		'../../../../scss/header.scss',
		'../../../../scss/table.scss',
		'../../../../scss/condition.scss',
		'../../../../scss/pagination.scss'


	],
	providers: [LookQuotationService]
})
export class LookQuotationComponent implements OnInit{ 
    errorMsg:string;
    order:lookQuotation;
    totals:any;
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private LookQuotationService:LookQuotationService
	){
        this.order = new lookQuotation();
        // this.condition = new OrderCondition();
	}
	aaa:any =false;
	ngOnInit(){
        this.height='38px';
        this.height1='38px';
        this.color ='#bfa'
		this.getBondLists();
        
        // this.search();
       // this.NegtprcDtlList();
        // this.getIssuerByFullNames();
        // this.changed(this.date);
		this.mon = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
        };

	};
	 mon:any={
        monthNames:[]
    };

// **********************
// obj1:any=this.condition.organizationType;

// 剩余期限
changeStatus2(obj:any){
    // this.rsdtrm.all = false;
        obj.a=false;

    }
changeStatus2All(obj:any){
    // debugger;
    for(var i in obj){
        obj[i]=false;
        if(i=="a"){
            obj[i]=true;
        }
    }
}
height:any;
height1:any;
// 报价状态

date:any=new Date();
myStartTime:any=this.date;
myEndTime:any=this.date
// 默认日期
// myStartTime:any=this.changeGet();
 // myEndTime:any=this.changeGet();
 // changed(str:any){
 //     var str0=str.toLocaleString();
 //     var str1=str.toLocaleTimeString();
 //     str=str.replace('str1'," ");
 //     var arr=str.split();
 //     str=arr.join("-")
 //     console.log(str);
 // }
// str="Fri Feb 17 2017 11:06:53 GMT+0800 (中国标准时间)";
get(str:any){
    var str1:any;
     str1=str.replace('(中国标准时间)',"");
       var data=new Date(str1);
       var y=data.getFullYear();
        var m=data.getMonth()+1;
        var  d=data.getDate();
        var t:any;
        var s:any;
        if(m<=9){
            t='0'+m;
        }else{
          t=m+'';
        }
        if(d<10){
            s='0'+d;
        }else {
            s=d+'';
        } 
    //     return y+"-"+m+"-"+d
    var str2 = y+"-"+t+"-"+s ;
    return str2

 }
    userMsges:any[];
    userMsges1:any[];
    error:any;
    errorMessage: string;
    default9:any={
        bondOfrid:''
    };
    default8:any={
        bondShrtnm:'',
        bondCd:'',
        yldrto:'',
        num:'',
        negtNum:'',
        drc:''
    }
        ofrUserNm:any=[];
        ofrUserOrgnitn:any=[];
        negtprcUserNm:any=[];
        negtprcUserOrgnitn:any=[];
        negtprcEStatusN:any=[];
  //获取议价记录列表
    NegtprcDtlList(){
        this.info=[];
        this.info1=[];
        this.info2=[];
        this.number=[]
        this.ofrUserNm=[];
        this.ofrUserOrgnitn=[];
        this.negtprcUserNm=[];
        this.negtprcUserOrgnitn=[];
        this.LookQuotationService.getNegtprcDtlList(this.default9)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.userMsges = userMsges.data.negtprcDtlList;
                            this.userMsges1 = userMsges.data;
                            this.default8.bondShrtnm=userMsges.data.bondShrtnm;
                            this.default8.bondCd=userMsges.data.bondCd;
                            this.default8.yldrto=(userMsges.data.yldrto*100).toFixed(4);
                            this.default8.num=userMsges.data.num*1;
                            this.default8.negtNum=userMsges.data.negtNum;
                            this.default8.drc=userMsges.data.drc;
                            this.change5();
                            this.change2();
                            this.change4();
                            this.hideLoad = true;
                            this.hidelist = false;
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hidelist = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("服务器连接失败！")
                            this.hideLoad = true;
                            this.hidelist = false;
                        }        
            ); 
    }
    red:any;
    string:any=[];
    change5(){
        if(this.default8.drc==-1){
            this.default8.drc='买入';
        }
        if(this.default8.drc==1){
            this.default8.drc='卖出';
    }
}
    change2(){
        //this.height='38px';
        for(var i=0;i<this.userMsges.length;i++){
        if(this.userMsges[i].negtprcEStatusN==1){
            this.userMsges[i].negtprcEStatusN='挂牌';
            //this.stylecolor=false;
        }else
        if(this.userMsges[i].negtprcEStatusN==2){
            this.userMsges[i].negtprcEStatusN='撤销';
            //this.stylecolor=false;
        }else
        if(this.userMsges[i].negtprcEStatusN==3){
            this.userMsges[i].negtprcEStatusN='交易';
            //this.stylecolor=false;
        }else
        if(this.userMsges[i].negtprcEStatusN==4){
            this.userMsges[i].negtprcEStatusN='议价中';
            //this.stylecolor=false;
        }else
        if(this.userMsges[i].negtprcEStatusN==5){
            this.userMsges[i].negtprcEStatusN='拒绝';
            //this.stylecolor=false;
        }else
        if(this.userMsges[i].negtprcEStatusN==6){
            this.userMsges[i].negtprcEStatusN='发送';
            //this.stylecolor=true;
            
        }else{
        (this.userMsges[i].negtprcEStatusN==7)
            this.userMsges[i].negtprcEStatusN='成交';
            this.string=this.userMsges[i];
            this.userMsges[i]=this.userMsges[0];
            this.userMsges[0]=this.string;
            //this.stylecolor=true;
        }
    }
}
    change1(){
        for(var i=0;i<this.userMsges.length;i++){
        this.ofrUserNm.push(this.userMsges[i].ofrUserNm);
        this.ofrUserOrgnitn.push(this.userMsges[i].ofrUserOrgnitn);
        this.negtprcUserNm.push(this.userMsges[i].negtprcUserNm);
        this.negtprcUserOrgnitn.push(this.userMsges[i].negtprcUserOrgnitn);
    }
}
    number:any=[];
    longer:any=[];
    longer1:any=[];
    change3(){
       for(var i=0;i<this.default8.negtNum;i++){
           this.number[i]=i+1;
       } 
    }
    info:any=[];
    info1:any=[];
    info2:any=[];
    info3:any=[];
    lll:any=[1];
    ddd:any=[];
    m:any=0;
    n:any=0;
    change4(){
        //debugger
        this.longer=[];
        this.longer1=[];
        for(var i=0;i<this.userMsges.length;i++){
            if(this.userMsges[i].negtprcRecList.length==0){
                this.longer.push(this.ddd);
                this.longer1.push(this.ddd);
            }else{
                 for(var j=0;j<this.userMsges[i].negtprcRecList.length;j++){
                 if(this.userMsges[i].negtprcRecList[j].drc==-1){
                     this.m=this.m+1;
                 }
                 if(this.userMsges[i].negtprcRecList[j].drc==1){
                     this.n=this.n+1;
                 }   
             } 
             console.log(this.m);  
             console.log(this.n); 
             if(this.m<this.n){
                for(var h=0;i<this.n-this.m;i++){
                    this.longer.push(this.lll);
                    this.longer1.push(this.ddd);
                    //console.log(this.longer);
                }
             }
             if(this.m>this.n){
                for(var h=0;i<this.m-this.n;i++){
                this.longer.push(this.ddd);
                this.longer1.push(this.lll);
                //console.log(this.longer);
                }
             }
             if(this.m=this.n){
                this.longer.push(this.ddd);
                this.longer1.push(this.ddd);
                //console.log(this.longer);
             } 
        }
        this.m=0;
        this.n=0;         
    }       
}
    add:any;
    tr:any;
    td:any; 
// 类管理
    hideLoad:any = true
    hidelist:any = true
    stylecolor:any=false
    ccc:any=false
    show:any
    setLoadClasses() {
        let classes =  {
        hide: this.hideLoad,      // true
        // show: !this.show, // false
          };
        return classes;
    }
    setListClasses(app:any) {
          let classes =  {
          red:app=='成交',
          b1:app=='拒绝',
          b2:app=='挂牌',
          b3:app=='撤销',
          b4:app=='交易',
          b5:app=='发送',
          b6:app=='议价中'  
        };
        return classes;
    }

    setClasses(app:any,app1:any) {
          let classes =  {
          red:app=='成交'&& app1==0,
          r1:app=='成交'&& app1==1,
          b1:app=='拒绝',
          b2:app=='挂牌',
          b3:app=='撤销',
          b4:app=='交易',
          b5:app=='发送',
          b6:app=='议价中',
        };
        return classes;
    }
    Tanchange(showbox:any,id:any){
        this.default9.bondOfrid=id;
        this.NegtprcDtlList();
        showbox.show();
        console.log(id);
    }
    color:any;

// changeGet(){
  
//         var date=new Date();
//         var y=date.getFullYear()+'';
//         var m=date.getMonth()+1+'';
//         var  d=date.getDate()+'';
//         if(m<='9'){
//             m='0'+m;
//         }
//         if(d<='09'){
//             d='0'+d;
//         }else{
//             d=d;
     
//     }
//     return y+"-"+m+"-"+d;
// }

// 单选
defaultFn(){
    this.default.drc = "" ;
}
defaultFns(){
  this.default.gpType = "" ;
}

// 查询报价列表
    default:any={
        organizationType:"",
        organizationId:"",
        // organizationFullName:"",
        userName:"",
        loginName:"",
        bondTp:"",
        rsdtRag:"",
        bondid:"",
        ofrEStatus:"",
        drc:"",
        bondOfrDayStar:"",
        bondOfrDayEnd:"",
        gpType:"",
        wthrgoh:'',
        order:"9",
        desc:"2",
        pageSize:"10",
        pageNum:'1'
    }

 organizationFullName:any; 
bondName:any
data:any;
message:any={
  bondSize:''
};
num:any;

orgArr :any =[];//机构类型
bondType:any=[];//债券类型
lastTime:any=[];//剩余期限
bondState:any=[];//报价状态
hangStype:any=[];//挂牌类型
  getBondLists(){
      console.log(this.myStartTime);
      // if(this.orgFullName==''){
      //   this.default.organizationId='';  
      // }
     this.default.bondOfrDayStar=this.get(this.myStartTime+'');
     this.default.bondOfrDayEnd=this.get(this.myEndTime+'');
      // this.default.bondOfrDayStar=this.changeGet(this.myStartTime);
      // this.default.bondOfrDayEnd=this.changeGet( this.myEndTime);
//债券类型

        this.bondType = [];
        this.default.bondTp=this.func(this.checkModel, this.bondType);
        // for (var i in this.checkModel) {
        //     if(this.checkModel[i] == true){
        //         this.bondType.push( i.substring(1) );
        //         this.default.bondTp = this.bondType.join(",");
        //     }
        // }
//机构类型
        this.orgArr = [];
        this.default.organizationType=this.func(this.organizationType, this.orgArr);
     
//剩余期限
        this.lastTime = [];
        this.default.rsdtRag=this.func(this.rsdtrm, this.lastTime);
// 挂牌类型
        //  this.hangStype = [];
        // this.default.gpType=this.func(this.gpType, this.hangStype);
// 报价状态
        this.bondState = [];
        this.default.ofrEStatus=this.func(this.ofrEStatus, this.bondState);
   // 升降序
   this.default.desc=this.descs;
   console.log(this.default);
      this.LookQuotationService
      .getBondList(this.default)
      .subscribe(
          result=>{
             if(result.status==0){
             console.log(result);
                 if(result.data.bondInfList){
                   this.data=result.data.bondInfList; 
                 }
                 this.totals=result.data.page.totalResult;
                  // this.totalItems=result.data.page.totalResult;
                 this.message=result.data;
                 if(this.message){
                         if(this.message.bondNum==''||this.message.bondNum==undefined ){

                         this.num=0;
                       }else{
                         // 亿元
                        this.num=parseFloat(this.message.bondNum)/100000000;
                       }
                       if(this.message.bondSize==''||this.message.bondSize==undefined){
                       this.message.bondSize=0;
                     }else{
                       this.message.bondSize=this.message.bondSize;
                     }
                 }
               
                 console.log(  this.message.bondSize);
                 
                 // 数量
                for(let i in this.data){

                  this.data[i].num=parseFloat(this.data[i].num)/10000;
                }
                 // 收益率
                 for(let i in this.data){
                  this.data[i].yldrto=parseFloat(this.data[i].yldrto)*100;
                }
                // 报价ID
                 for(let i in this.data){
                  this.data[i].bondOfrId=this.data[i].bondOfrId;
                }
                // 净价
                for(let i in this.data){
                  this.data[i].netprc=parseFloat(this.data[i].netprc).toFixed(2);
                }
                
                  // console.log( this.num);
                  // console.log(this.message['bondSize']);
                 // console.log(this.data);

                 for(let i in this.data){
                     if(this.data[i].drc==1){
                         this.data[i].drc="卖出"
                     }else if(this.data[i].drc==-1){
                          this.data[i].drc="买入"
                     }
                 }
                 // 报价状态
                   for(let i in this.data){
                    if(this.data[i].ofrEStatus==1){
                        this.data[i].ofrEStatus="有效"
                    }else if(this.data[i].ofrEStatus==3){
                        this.data[i].ofrEStatus="成交"
                    }else if(this.data[i].ofrEStatus==2){
                        this.data[i].ofrEStatus="撤销"
                    }
                }


                 // 挂牌类型
                for(let i in this.data){
                    if(this.data[i].gpType==1){
                        this.data[i].gpType="公开挂牌"
                    }else if(this.data[i].gpType==2){
                        this.data[i].gpType="定向发送"
                    }else if(this.data[i].gpType==3){
                        this.data[i].gpType="代挂"
                    }
                }
                
             }
          }
          )
    }
   func(obj:any,arr:any){
       this.checkedAll(obj);
       var str:any;
       for (var i in obj) {
             if(obj[i] == true){
                    if(arr.indexOf(obj[i])==-1){
                         arr.push( i.substring(1) );
                         }
                          
                          str = arr.join(",");
                      }
                  }
        return str;
      }
// 发行机构的10条
orc:any=[];//机构名、机构ID
data3:any=[];
orgFullName:any='';

fullName:any={
value:''
}
org_tags:any=false;

getIssuerByFullNames(){
  if(this.fullName.value==''){
         this.org_tags=false;
         this.default.organizationId=''
    }else if(this.fullName.value||this.fullName.value.length>0){
      this.org_tags=true;
    }
    
 this.LookQuotationService
        .OrganizationList(this.fullName) 
        .subscribe(
            companylist => {
                if(companylist.status==0){
                    this.orc=companylist.data; 
                    console.log(this.orc);
                 
                }
              
            } 
            // error => this.errorMessage = <any>error
        ); 
}
//公司失去焦点
// blurCompany(el:any,e:any){
//     if(!this.default.organizationId){
//        el.value = "";
//     } 
// }
// changeCompany(el:any,e:any){
 
//     this.default.organizationId = "";
// }

// changebond(el:any,e:any){

//   this.search();
//     console.log(el)
//     console.log(e)
// }
    // 代码或简称搜索
  aa:any ={
         keyword:''
       }
   
    filteredSingle:any;
    array1:any=[];
   tags:any=false;
search(){
  // debugger;
       if(this.aa.keyword==''){
         this.tags=false;
         this.default.bondid=''
    }else if(this.aa.keyword||this.aa.keyword.length>0){
      this.tags=true;
    }
      this.array1=[];
        // console.log(this.aa);
         this.LookQuotationService
          .searchBond(this.aa)
          .subscribe(
              result=>{

                this.filteredSingle=result.data;
                console.log(this.filteredSingle);
                for (let i in  this.filteredSingle){
                     
                     var  obj = {name:this.filteredSingle[i].bondCd+'/'+this.filteredSingle[i].bondShrtnm,
                                 id:this.filteredSingle[i].bondid
                                  };
                    
                       this.array1.push(obj)
                   }
                   // debugger;
                this.changeDetectorRef.detectChanges();
                console.log( this.array1);
              }
              )
    }
seleced(index:any,item:any,id:any){
  // console.log(item);
  // this.aa = item;
  this.aa.keyword = item.name;
   this.default.bondid = item.id;
       this.tags=!this.tags;
  

}
seleced_fullName(index:any,item:any,id:any){
  // this.fullName = item;
  // console.log(item.organizationId);
  this.default.organizationId = item.organizationId+'';
  // console.log(this.default.organizationId);
  this.fullName.value = item.organizationFullName;
  this.org_tags=!this.org_tags;
  
}
onSubmit(){
  // console.log(this.aa)
  // console.log(this.default)
  this.currentPage = 1;//无法同时修改当前页和每页总数
  this.changeDetectorRef.detectChanges();
  this.getBondLists();
  // this.default.bondid = '';
}
 



 // 查询债券类型多选
organizationType={
            // 机构类型
        "a":true,
        "a1":false, 
        "a2":false, 
        "a3":false,
        "a5":false,
        "a6":false,
        "a7":false,
        "a8":false,
        "a4":false,
        "a11":false,
        "a13":false,
    };
public checkModel={
        // 债券类型
        "a":true,
        "b1":false,
        "b2":false,
        "b3":false,
        "b4":false,
        "b5":false,
        "b6":false,
        "b7":false,
        "b8":false,
        "b9":false,
        "b10":false,
    };
   rsdtrm={
        // 剩余期限
        "a":true,
        "c1":false,
        "c2":false,
        "c3":false,
        "c4":false,
        "c5":false,
        "c6":false,
        "c7":false,
        "c8":false,
        "c9":false,
    };
   // gpType={
        // 挂牌类型
        // "a":true,
        // "f1":false,
        // "f2":false,
        // "f3":false,
    // };
    ofrEStatus={
         // 报价状态
        "a":true,
        "d1":false,
        "d2":false,
        "d3":false,
    };
// 代挂
flag:any=false;
dg(){
  this.flag=!this.flag;
   if(this.flag==true){
     this.default.wthrgoh="1"
   }else{
     this.default.wthrgoh="";
   }
  
 

}

checkedAll(obj:any){
       obj["a"]==false;
    }
 hideList:any =  true

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
  // companylist:any=[{organizationShortName:"亚联",organizationId:1}];
  partlist:any=[];
// 筛选条件  
  public typeaheadOnCompanys(e:any):void{
   this.default.organizationId = e.item.organizationId+'';//id 赋值给隐藏的input。获取公司id 
}
// public typeaheadOnDepartments(e:TypeaheadMatch):void{
    
//     this.default.departmentId = e.item.departmentId;
// } 
 public typeaheadOnCompany(e:any):void{
   console.log(e.item);
   this.default.bondid = e.item.id;//id 赋值给隐藏的input。获取公司id 
}
// 升降序
descs:any='2';
  orderSelect(order:any){
    this.default.order=order;
    if(this.descs=='1'){
      this.descs='2';
    }else if(this.descs=='2'){
       this.descs='1';
    }
    this.getBondLists();
  }

// orderSelectAll(){
   
//     if(this.descs=='1'){
//       this.descs='2';
//     }else if(this.descs=='2'){
//        this.descs='1';
//     }
//   }


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
          // this.height = Number*40+120+'px';
          this.currentPage = 1;//无法同时修改当前页和每页总数
          this.changeDetectorRef.detectChanges();
          this.itemsPerPage = Number;
          // this.height = Number*40+120+'px';
          var num:number = Number*1;
          this.default.pageSize=num;
          // this.default.loginDate=this.startdate+','+this.enddate;
          this.getBondLists(); 

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
      // this.default.loginDate=this.startdate+','+this.enddate;  
      this.getBondLists();  
    };

}