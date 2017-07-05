
import { Component,ViewChild,OnInit,ChangeDetectorRef,Input,ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup ,NgForm} from '@angular/forms';
import { ActivatedRoute, Router ,Params}   from '@angular/router';//
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { TypeaheadModule,AlertModule,ButtonsModule,TooltipModule} from 'ng2-bootstrap/ng2-bootstrap';
// import { ExcelExportService } from '../../../../services/excel-export.service'; 
/*import { ModalDirective } from 'modal.component.ts';*/

import { UserLogServices } from './services/user-log.services'
@Component({
	selector: 'user-log',
	templateUrl: './user-log.component.html',
	styleUrls: ['./user-log.component.scss'],  
    providers: [
        UserLogServices
    ]//注册服务器
 
})
export class UserLogComponent implements OnInit{
    color = '#fff';
    height = '312px';

    msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];


//set用户列表 

    aa(aa:any){
        // console.log(aa)
    }
    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private userLogServices:UserLogServices,
        private activatedRoute:ActivatedRoute,
        private router:Router,
        ){}
//初始化
    ngOnInit(){
        this.getFnModuleList();
        this.getBusinessOperationsList();
        this.getUserLogList();
        
    }
    onSubmit(){
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.getUserLogList();
    }
    msgNumber:any;

    userLogLists:any =[];
    errorMsg:string;
    page:any;
    myStartTime:any;
    myEndTime:any;
    default:any= {
        pageNum:1,
        pageSize:10,
        phoneNum:'',
        userName:'',
        moduleName:'',
        operationName:'',
        status:'',
        logStartTime:'',
        logEndTime:'',

    };
    // 去空格
    trim(str:any) { //删除左右两端的空格　　
        return str.replace(/(^\s*)|(\s*$)/g, "");　　
    }
    // 获取用户日志列表
    getUserLogList(){
        this.default.logEndTime ="";
        this.default.logStartTime ="";
        if(this.myStartTime  ){
            if(this.myEndTime ){
                this.default.logStartTime = this.makeTemp( this.myStartTime )-28800000;
            }else{
                
                alert("请填写结束时间");
                return false;
            }
        }
        if(this.myEndTime ){
            if(this.myStartTime ){
                 this.default.logEndTime = this.makeTemp( this.myEndTime) +57599000 ;
            }else{
                // + parseInt('86400000')
                alert("请填写开始时间");
                return false;
            }
        }
        if(parseInt(this.default.logEndTime) - parseInt(this.default.logStartTime) <0){
            alert("请确保结束时间大于开始时间 ");
            

        }

        this.default.userName = this.trim( this.default.userName );
        this.default.phoneNum = this.trim( this.default.phoneNum );
        // console.log(this.default);
        
        this.userLogServices.userLogList(this.default)
            .subscribe(
                userLogList => {
                         // console.log(userLogList);
                    if(userLogList.status == "0"){

                       // this.page = userLogList.data.page;
                        if(userLogList.data.page){
                            this.page = userLogList.data.page;
                            this.totalItems = this.page.totalResult;
                        }
                       

                        this.userLogLists = userLogList.data.list;

                      for (let i in this.userLogLists) {
                            if(this.userLogLists[i].status=="0"){
                                this.userLogLists[i].status = "成功";

                            }else{
                                this.userLogLists[i].status = "失败";
                            }
                            
                            this.userLogLists[i].logTime=this.tempToTime( this.userLogLists[i].logTime );
                         } 
                      // console.log(userLogList);
                    }
                      
                },
                error => this.errorMsg = <any>error
            );
    }
    
    // 转化时间
    tempToTime(temp:any){
        // var date = new Date();
        // var time =  date.();
        // return time;
        // return temp;
        return new Date( temp ).toLocaleString().split("/").join("-"); 
        // .replace(/年|月/g, "-").replace(/日/g, " ")    
    }
    //生成时间戳
    makeTemp(time:any){
        // var newTime:any = new Date( time );
         // var  temp = (Date.parse(time)/1000) ;
         // var temp2 = (temp + parseInt('57599'))+ '';
        return  (Date.parse(time) );
    }

    // businTypeID:FUNCTIONAL_MODULE
    fnModuleObj:any ={
        businTypeID:'FUNCTIONAL_MODULE'
    }
    FnList:any =[];
    //获取 功能模块 列表
    getFnModuleList( ){
        // this.obj.businTypeID = 'FUNCTIONAL_MODULE';
        this.userLogServices.fnModuleList(this.fnModuleObj)
            .subscribe(
                FnList => {
                     if(FnList.status == "0"){
                        this.FnList= FnList.data;
                    }
                    // console.log(this.FnList);
                    
                },
                error => this.errorMsg = <any>error
            );
    }
    // businTypeID:OPERATION_TYPE
    busObj:any ={
        businTypeID:'OPERATION_TYPE'
    }
    businessList:any =[];
    //获取 业务操作 列表
    getBusinessOperationsList(){
        // this.obj.businTypeID = 'OPERATION_TYPE';
        this.userLogServices.fnModuleList(this.busObj)
            .subscribe(
                businessList => {
                      
                    if(businessList.status == "0"){
                        this.businessList= businessList.data;
                    }
                     // console.log(this.businessList);
                       
                },
                error => this.errorMsg = <any>error
            );
    };
    addZero(dateTime:any){
       let arr =  dateTime.split("-");
       for (let i in arr) {
           if(arr[1]>0){
                return false;
           }else{
                arr[1] = "0"+ arr[1];
           }
           if(arr[2]>0){
                return false;
           }else{
                arr[2] = "0"+ arr[2];
           }
       }
       return  dateTime;
    };
    // 查询
    // search:any ={
    //     phoneNum:'',
    //     userName:'',
    //     moduleName:'',
    //     operationName:'',
    //     status:'',
    //     logStartTime:'',
    //     logEndTime:'',
    //     pageNum:this.default.pageNum,
    //     pageSize:this.default.pageSize,

    // };
    
    // onSearch(search:any){
    //     // if(search.responseStatus=="全部"){
    //     //     search.responseStatus ='';
    //     // }
        

    //     // if(search.operationName == "全部"){
    //     //     search.operationName ='';
    //     // }
    //     // if(search.moduleName == "全部"){
    //     //     search.moduleName ='';
    //     // }
    //     if(search.logStartTime !="" ){
    //         var  start = search.logStartTime;
    //         search.logStartTime = this.makeTemp( search.logStartTime);
    //     }
    //     if(search.logEndTime!="" ){
    //         var  end = search.logEndTime;
    //         search.logEndTime = this.makeTemp( search.logEndTime);
    //     }
    //     console.log(search);

        
    //     this.userLogServices.userLogList(search)
    //         .subscribe(
    //             searchList => {
                      
    //                 if(searchList.status == "0"){
    //                     // this.search.logEndTime = this.tempToTime(this.search.logEndTime).substring(0,11);
    //                     // this.search.logStartTime = this.tempToTime(this.search.logStartTime).substring(0,11);
    //                     // search.logEndTime = end;
    //                     // search.logStartTime = start;
    //                     console.log(this.search.logEndTime);
                        
    //                     this.userLogLists= searchList.data.list;

    //                     this.page = searchList.data.page;

    //                     this.totalItems = this.page.totalResult;
                        
    //                     for (let i in this.userLogLists) {
    //                         if(this.userLogLists[i].status=="0"){
    //                             this.userLogLists[i].status = "成功";

    //                         }else{
    //                             this.userLogLists[i].status = "失败";
    //                         }
                            
    //                         this.userLogLists[i].logTime=this.tempToTime( this.userLogLists[i].logTime );
    //                      } 
                        
    //                 }
    //                  console.log(searchList);
                       
    //             },
    //             error => this.errorMsg = <any>error
    //         );
    // }

    

    public firstText:string = '首页';
    public lastText:string = '末页';
    public previousText:string = '<';
    public nextText:string = '>';
    public maxSize:number = 5;
    public totalItems:number;
    public itemsPerPage:number = 10;
    public currentPage:number=1;
    public totalPages:number;
    public turnFirst(){
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.getUserLogList();
        
        
    }
    public sizeData(Number:any){
        this.height = Number*40+40+'px';
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.itemsPerPage = Number;
        this.turnFirst()
        this.height = Number*40+120+'px';
        var listBody:any = document.getElementById("listBody");     
        var tr:any = document.createElement('tbody')
        var num:number = Number*1;  
    };
    
    public pageNumChange(event:any,allcheck:any){
        
        this.default.pageSize = this.itemsPerPage;
        // this.getUserBackList();
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        // this.getUserBackList();
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.default.pageNum = event.page;
        this.getUserLogList();
       
        
        // this.onSearch();
    };
} 

