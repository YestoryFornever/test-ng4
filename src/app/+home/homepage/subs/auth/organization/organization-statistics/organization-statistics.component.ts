import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { OrganizationStatistiscsservice } from './services/organization-statistics.service';
import { Organization, OrgCondition } from './classes/organizations';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
//import { BannerManagementService } from './banner-management-service/banner-management.service'
@Component({
	selector: 'organization-statistics',
	templateUrl: './organization-statistics.component.html',
	styleUrls: [
        './organization-statistics.component.scss',
        '../../../../scss/header.scss',
        '../../../../scss/table.scss',
        '../../../../scss/condition.scss',
        '../../../../scss/pagination.scss'
    ],
	providers:[
        OrganizationStatistiscsservice
    ]
})
export class OrganizationStatisticsComponent implements OnInit{ 
    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private organizationStatistiscsservice:OrganizationStatistiscsservice,
        private sanitizer: DomSanitizer,
        private activatedRoute:ActivatedRoute,
        private router:Router
    ){}
	ngOnInit(){
        this.statisticList();
        this.postListMsges();
        //this.statisticList();
        this.orgCondition = new OrgCondition();
    };
    companylist:any=[];
    userMsges:any[];
    error:any;
    organizationName:any;
    errorMessage: string;
    postListMsges(){
//获取机构全称服务
    this.organizationStatistiscsservice.OrganizationList(null) 
        .subscribe(
            companylist => {
                this.companylist = companylist;//赋值给下拉列表
                if(this.companylist.status==0){
                    this.companylist=this.companylist.data;
                }else if(this.companylist.status==-5){
                    console.log('session已超时')
                }
                else{
                    if(this.companylist.msg){
                         alert(this.companylist.msg);
                    }
                }
            }, 
            error => this.errorMessage = <any>error
        );  
    }
 //获取机构统计列表
    statisticList(){
       if(this.organizationName== ''){
           this.default.organizationId='';
       }
       this.default1.organizationId=this.default.organizationId;
       console.log(this.default1.organizationId);
       this.organizationStatistiscsservice.StatisticsList(this.default1)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.userMsges = userMsges.data.list;
                            this.totalItems=userMsges.data.page.totalResult;
                            this.hideLoad = true;
                            this.hideList = false;
                        }else{
                            if(userMsges.msg){
                                alert(userMsges.msg);
                            }
                            this.hideLoad = true;
                            this.hideList = false;
                        }            
                },
                error => {  this.errorMessage = error;
                    alert("服务器连接失败！")
                            this.hideLoad = true;
                            this.hideList = false;
                        }        
            ); 
    }
    default1:any={  
            organizationId:'',
            typeId:0,
            pageNum:1,
            pageSize:10,
        }
    default:any={
            loginName:'',
            userName:'',    
            organizationId:'',
            departmentId:'',
            pageNum:1,
            pageSize:10,
         }
    total(){
       this.currentPage=1;
       this.statisticList();
    }
    change1(){
        this.default1.typeId=1;
        this.total();
    }
    change2(){
        this.default1.typeId=2;
        this.total();
    }
// 失去焦点
    blurCompany(cm:any){
        cm.value =''
        this.default.organizationName="";
        this.default.organizationId='';
    }
//即时搜索
    public stateCtrl:FormControl = new FormControl();
    public myForm:FormGroup = new FormGroup({
        state: this.stateCtrl
    });
    public customSelected:string = '';
    public dataSource:Observable<any>;
    public asyncSelected:string = '';
    public typeaheadLoading:boolean = false;
    public typeaheadNoResults:boolean = false; 
    public typeaheadOnCompanys(e:any):void{
        this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
    }
    orgCondition:OrgCondition;
    rightcolor:any;
    leftcolor:any;
    coatbody:any;
    coatbody1:any;
    height = '440px';
    msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
     // 分页
    public firstText:string = '首页';
    public lastText:string = '末页';
    public previousText:string = '<';
    public nextText:string = '>';
    public maxSize:number = 5;
    public totalItems:number;
    public itemsPerPage:number=10;              //每页显示数据条数
    public currentPage:number=1;                //当前页码
    public totalPages:number;
    public turnFirst(){
        this.currentPage = 1;                   //无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.statisticList();
    }
    public sizeData(Number:any){
        this.height = Number*40+40+'px';
        this.itemsPerPage = Number;
        this.turnFirst(); 
        var listBody:any = document.getElementById("listBody");        
        var tr:any = document.createElement('tbody')
        var num:number = Number*1;  
    }
    public pageNumChange(event:any){
        this.default1.pageSize=this.itemsPerPage;
        console.log(event);                     //输出总页数
        this.totalPages = event;
    }
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.default1.pageNum = event.page;
        console.log(event.page);
        this.statisticList();
    };

// 类管理
    hideLoad:any = true
    hideList:any = true
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
//table切换
    toChange(){
       this.leftcolor=document.getElementsByClassName('left');
       this.leftcolor[0].style.color="#fff";
       this.leftcolor[0].style.backgroundColor="#337ab7";
       this.rightcolor=document.getElementsByClassName('right');
       this.rightcolor[0].style.color="#337ab7";
       this.rightcolor[0].style.backgroundColor="#fff";
       this.coatbody=document.getElementsByClassName('coat');
       this.coatbody[0].style.display="block";
       this.coatbody1=document.getElementsByClassName('coat1');
       this.coatbody1[0].style.display="none";
       this.default1.typeId=0;
       this.total();
    }
    toChange1(){
       this.rightcolor=document.getElementsByClassName('right');
       //console.log(this.rightcolor);
       this.rightcolor[0].style.color="#fff";
       this.rightcolor[0].style.backgroundColor="#337ab7";
       this.leftcolor=document.getElementsByClassName('left');
       //console.log(this.leftcolor);
       this.leftcolor[0].style.color="#337ab7";
       this.leftcolor[0].style.backgroundColor="#fff";
       this.coatbody=document.getElementsByClassName('coat');
       this.coatbody[0].style.display="none";
       this.coatbody1=document.getElementsByClassName('coat1');
       this.coatbody1[0].style.display="block";
       this.default1.organizationId=''; 
       this.default1.typeId=1;
       this.orgCondition.approveStatus='0';
       this.total();
    }
    //列标题设置--->绿色--->白色
    listItem:Object={
        fullname:true,
        abbreviation:true,
        category:true,
        approveStatus:true,
        logo:true,
        address_detail:true,
        address_code:true,
        phone:true,
        isFinancial:true,
        backup:true,
        subsNum:true,
        population:true,
        source:true,
        createTime:true,
        updateTime:true,
        enterpriseNature:true,
        issuerShortName:true,
        issuerId:true,
        province:true,
        city:true,
        incategory:true
    }
}
