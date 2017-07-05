import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { ActivatedRoute, Router }   from '@angular/router';//
import { DomSanitizer } from '@angular/platform-browser';
import {CalendarModule,PickListModule} from 'primeng/primeng';

import {INCONFIG} from '../../../../../../../public/in.config';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule,AlertModule,ButtonsModule,TooltipModule} from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserRechargeLogServices } from './services/user-recharge-log.service';

@Component({
	selector: 'user-recharge-log',
	templateUrl: './user-recharge-log.component.html',
	styleUrls: ['./user-recharge-log.component.scss'],
	providers: [
        UserRechargeLogServices
    ]
})
export class UserRechargeLogComponent {
    color = '#fff';
    height = '312px';
    errorMsg:any;
    aa(event:any){
        console.log(event)
    }
    private IP:string = INCONFIG.getIP()
    msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private activatedRoute:ActivatedRoute,
        private sanitizer: DomSanitizer,
        private calendarModule: CalendarModule,
        private userRechargeLogServices: UserRechargeLogServices,
        private router:Router,
        ){}
	//初始化
	ngOnInit(){
        this.getUserRechargeList();
        this.mon = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
        };
    }
    mon:any={
        monthNames:[]
    };
    default:any ={
        payType:"",
        status:"",
        orderNo:"",
        tradeNo:"",
        phone:"",
        startTime:"",
        endTime:"",
        pageNum:"1",
        pageSize:"10",

    }
    startTime:any;
    endTime:any;
    userRechargeList:any;//接收 返回的数据列表
    // 获取用户充值列表
    getUserRechargeList(){
        this.timeAndSpace();
        // if(this.startTime){
        //     this.default.startTime = Date.parse( this.startTime);
        // }
        // if(this.endTime){
        //     this.default.endTime = Date.parse( this.endTime);
        // }
        // this.default.orderNo = this.trim( this.default.orderNo );
        // this.default.tradeNo = this.trim( this.default.tradeNo );
        // this.default.phone   = this.trim( this.default.phone );
        console.log(this.default)
        this.userRechargeLogServices.userRechargeList(this.default)
            .subscribe(
                res =>{
                    if(res.status == 0){
                        this.userRechargeList = res.data.list;
                        this.totalItems       = res.data.page.totalResult;
                        this.getInfo();
                    }else{
                        alert('请求信息失败');
                    }
                    console.log(res)
                },
                error => this.errorMsg = <any>error
            );
    }
    infoList:any={
        amount:"",
        totalCoin:"",
        totalCash:"",

    };// 接收统计信息
    // 统计信息
    getInfo(){

        this.userRechargeLogServices.totalInfo(this.default)
            .subscribe(
                res =>{
                    if(res.status == 0){
                        console.log(res)
                        this.infoList = res.data;
                    }
                },
                error => this.errorMsg = <any>error
            );
    }
    // 导出表格
    exportExcelList(){
        debugger
        this.timeAndSpace();
        let str:string ='';
        for(let i in this.default){
            if(this.default[i]==""){
                this.default[i]= '';
            }
            str += '&' + i + '=' +this.default[i];
        }
        str                  = str.substr(1);
        let url              = this.IP + 'goldcoin/userrecharge/export?'+str;
        window.location.href = url;
 
    }
    timeAndSpace(){

        if(this.startTime){
            this.default.startTime = Date.parse( this.startTime);
        }else{
            this.default.startTime = '';
        }
        if(this.endTime){
            this.default.endTime = Date.parse( this.endTime)+86399000;
        }else{
            this.default.endTime = '';

        }
        this.default.orderNo = this.trim( this.default.orderNo );
        this.default.tradeNo = this.trim( this.default.tradeNo );
        this.default.phone   = this.trim( this.default.phone );
    }
    // 去空格
    trim(str:any) { //删除左右两端的空格　　
        return str.replace(/(^\s*)|(\s*$)/g, "");　　
    }

// 分页
    public firstText:string    = '首页';
    public lastText:string     = '末页';
    public previousText:string = '<';
    public nextText:string     = '>';
    public maxSize:number      = 5;
    public totalItems:number;
    public itemsPerPage:number = 10;
    public currentPage:number  =1;
    public totalPages:number;
    public turnFirst(){
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.getUserRechargeList();

    }
    public sizeData(Number:any){
        this.height       = Number*40+40+'px';
        this.currentPage  = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.itemsPerPage = Number;
        this.turnFirst()
        this.height       = Number*40+120+'px';
        var listBody:any  = document.getElementById("listBody");
        var tr:any        = document.createElement('tbody')
        var num:number    = Number*1;
    };

    public pageNumChange(event:any,allcheck:any){
        this.default.pageSize = this.itemsPerPage;
        this.totalPages       = event;
    }
    public setPage(pageNo:number):void {
        this.currentPage      = pageNo;
    };
    public pageChanged(event:any,allcheck:any):void {
        this.default.pageNum  = event.page;
        this.getUserRechargeList();
    };
// 名片
     userInfod:any={
        businessCardUrl:'',
        userName:'',
        loginName:'',
        department:'',
        position:''
    }
    html:any
    getUserInfo(id:any){
        var ID={userId:id+''}
        this.userRechargeLogServices
            .getUserProfileInfo(ID)
            .subscribe(
                result=>{
                    if(!result.data.businessCardUrl){
                        result.data.businessCardUrl='../../../../../../../public/images/showCard.jpg'
                    }
                    if(!result.data.userName){
                        result.data.userName='暂无姓名'
                    }
                    if(!result.data.loginName){
                        result.data.loginName='暂无'
                    }
                    if(!result.data.department){
                        result.data.department='暂无'
                    }
                    if(!result.data.position){
                        result.data.position='暂无'
                    }
                
                this.userInfod=result.data
                },
                error=>this.errorMsg = error
            );
    }
}