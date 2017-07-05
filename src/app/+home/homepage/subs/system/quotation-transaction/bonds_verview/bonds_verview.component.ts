import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { BondsVerviewService } from './services/bonds_verview.service';

@Component({
	selector: 'bonds_verview',
	templateUrl: './bonds_verview.component.html',
	styleUrls: ['./bonds_verview.component.scss'],
	providers: [BondsVerviewService]
})
export class BondsVerviewComponent implements OnInit {
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private bondsVerviewService:BondsVerviewService,
        private activatedRoute:ActivatedRoute,
        private router:Router
	){}

	ngOnInit(){	
        this.BondEMAllView();
        //this.BondEMRatio();
        //this.BondEMTrend();
        this.date = {
            firstDayOfWeek: 0,
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        };
    };
    date:any;
    userMsges:any[];
    error:any;
    errorMessage: string;
    query(){
        if(this.starttime>this.endtime || this.starttime>this.now){
            alert('请输入正确的查询信息'); 
        }else{
            this.BondEMTrend();
        }
    }
    GaoMath(month:any){
        if(month==1||month==2||month==3){
            month=1;
        }
        if(month==4||month==5||month==6){
            month=2;
        }
        if(month==7||month==8||month==9){
            month=3;
        }
        if(month==10||month==11||month==12){
            month=4;
        }
        return month;
    }
    format (format:any,statue:any) {
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
                   if(statue=="D"){
                       format = args.Y+'-'+ args.M +'-'+args.d 
                   }
                   if(statue=="M"){
                       format = args.Y+'年'+'-'+ args.M+'月'
                   }
                   if(statue=="Y"){
                       format = args.Y
                   }
                   if(statue=="Z"){
                       format = args.M
                   }
            }
           return format;
       };

    now:any = new Date();     //获取今天时间
    sevenDayAgo:any= this.now.getTime()-3600*1000*24*6;
    oneYearAgo:any=this.now.getTime()-3600*1000*24*7*30*12;
    starttime:any=new Date(this.sevenDayAgo);
    endtime:any=this.now;
    myStartTime:any=new Date(this.sevenDayAgo);
    myEndTime:any=this.now;
    default:any={
        loginName:"",
        userName:"",
        date:1,
        sortType:"",
        orderBy:"",
        count_type:1,
        begin_date:''
    };
    default1:any={
        begin_date:'2016-10-21',
        count_type:1,
        source:1,
        cur_page:1,
        show_count:10
    }
    default2:any={
        timeRang:1
    }
    default3:any={
        Num:'',
        People:'',
        ListSize:'',
        bondTdNum:'',
        bondTdPeople:'',
        bondPeople:'',
        bondDealSize:'',
        bondDealNum:'',
        bondDealPeople:'',
    }
  //获取报价总览数据
    BondEMAllView(){
    this.default3.bondSize ='';
    this.default3.Num='';
    this.default3.ListSize='';
    this.default3.bondPeople='';
    this.default3.bondDealSize='';
    this.default3.bondDealNum='';
    this.default3.bondDealPeople='';
    this.default3.bondTdNum='';
    this.default3.bondTdPeople='';
        this.bondsVerviewService.getBondEMAllView(this.default2)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.userMsges = userMsges.data;
                            this.default3.bondSize = userMsges.data.bondTdSize;
                            this.default3.Num=((userMsges.data.bondNum)/100000000).toFixed(3);
                            this.default3.ListSize=userMsges.data.bondListSize;
                            this.default3.bondPeople=userMsges.data.bondPeople;
                            this.default3.bondDealSize=userMsges.data.bondDealSize;
                            this.default3.bondDealNum=(userMsges.data.bondDealNum)/100000000;
                            this.default3.bondDealPeople=userMsges.data.bondDealPeople;
                            this.default3.bondTdNum=((userMsges.data.bondTdNum)/100000000).toFixed(3);
                            this.default3.bondTdPeople=userMsges.data.bondTdPeople;
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
    default6:any={
       bondOfrDayStar:'',
       bondOfrDayEnd:'',
       timeRang:-1
    }
 //报价趋势数据
    BondEMTrend(){
        this.data7=[];
        this.bondListSize=[];
        this.bondDealSize=[];
        this.bondNum=[];
        this.bondDealNum=[];
        this.bondPeople=[];
        this.bondDealPeople=[];
        this.default6.bondOfrDayStar=this.format(this.starttime,'D');
        this.default6.bondOfrDayEnd=this.format(this.endtime,'D');  
        this.bondsVerviewService.getBondEMTrend(this.default6)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.userMsges = userMsges.data;
                            this.hideLoad = true;
                            this.hideList = false;
                            this.MathDate();
                            this.Square();
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
    data7:any=[];
    number:any=[];
    number1:any=[];
    number2:any=[];
    number3:any=[];
    aaa:any=10+'';
    MathDate(){
       if(this.default6.timeRang==-1){
           for(var i=0;i<this.userMsges.length;i++){
            this.number[i]=new Date(this.userMsges[i].bondOfrDay);
            this.number1[i]=this.format(this.number[i],'D');
            this.data7[i]=this.number1[i];
           }
           if(this.data7==''){
               console.log(this.data7); 
               alert('查询结果无数据');
           }else{
            console.log(this.data7);   
           }
       }
       if(this.default6.timeRang==1){
           for(var i=0;i<this.userMsges.length;i++){
            this.number[i]=new Date(this.userMsges[i].bondOfrDay);
            this.number1[i]=this.format(this.number[i],'D');
            this.data7.push('第'+(i+1)+'周');
           }
           if(this.data7==''){
               console.log(this.data7); 
               alert('查询结果无数据');
           }else{
            console.log(this.data7);   
           }
       }
       if(this.default6.timeRang==2){
           for(var i=0;i<this.userMsges.length;i++){
            this.number[i]=new Date(this.userMsges[i].bondOfrDay);
            this.number1[i]=this.format(this.number[i],'M');
            this.data7[i]=this.number1[i];
           }
           if(this.data7==''){
               console.log(this.data7); 
               alert('查询结果无数据');
           }else{
            console.log(this.data7);   
           }
       }
       if(this.default6.timeRang==3){
           for(var i=0;i<this.userMsges.length;i++){
            this.number[i]=new Date(this.userMsges[i].bondOfrDay);
            this.number1[i]=this.format(this.number[i],'Y');
            this.number2[i]=this.format(this.number[i],'Z')*1;
            console.log(this.number2[i]);
            this.number3[i]=this.GaoMath(this.number2[i]);
            console.log(this.number3[i]);
            this.data7.push(this.number1[i]+'年第'+this.number3[i]+'季度');
           }
           if(this.data7==''){
               console.log(this.data7); 
               alert('查询结果无数据');
           }else{
            console.log(this.data7);   
           }
       }
       if(this.default6.timeRang==4){
           for(var i=0;i<this.userMsges.length;i++){
            this.number[i]=new Date(this.userMsges[i].bondOfrDay);
            this.number1[i]=this.format(this.number[i],'Y');
            this.data7[i]=this.number1[i]+'年';
           }
           if(this.data7==''){
               console.log(this.data7); 
               alert('查询结果无数据');
           }else{
            console.log(this.data7);   
           }
       }
       for(var i=0;i<this.userMsges.length;i++){
        this.bondListSize.push(this.userMsges[i].bondListSize);
        this.bondDealSize.push(this.userMsges[i].bondDealSize);
        this.bondNum.push(((this.userMsges[i].bondNum)/100000000).toFixed(3));
        this.bondDealNum.push(((this.userMsges[i].bondDealNum)/100000000).toFixed(3));
        this.bondPeople.push(this.userMsges[i].bondPeople);
        this.bondDealPeople.push(this.userMsges[i].bondDealPeople);
        }
    }
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
// Echart
//成交趋势
    chartData:any;
    chartData1:any;
    chartData2:any;
    bondListSize:any=[];
    bondDealSize:any=[];
    bondNum:any=[];
    bondDealNum:any=[];
    bondPeople:any=[];
    bondDealPeople:any=[];
  Square(){
    this.chartData={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '报价-成交趋势(笔数)',
        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:['报价笔数','成交笔数']

    },
    xAxis: {
        gridIndex: 0,
        type: 'category',
        data:this.data7
    },
    yAxis: 
    {
        gridIndex: 0,
        type: 'value',
        name:'笔数(笔)',
        nameLocation:'middle',
        nameGap:30
    },
    series:[{
        name: '报价笔数',
        type: 'line',
        data: this.bondListSize
    },
    {
        name: '成交笔数',
        type: 'line',
        data: this.bondDealSize
    }]
  };
    this.chartData1={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '报价-成交趋势(数量)',
        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:['报价数量','成交数量']

    },
    xAxis: {
        gridIndex: 0,
        type: 'category',
        data: this.data7
    },
    yAxis: 
    {
        gridIndex: 0,
        type: 'value',
        axisLabel: {
            formatter: '{value} 亿'
        }
    },
    series:[{
        name: '报价数量',
        type: 'line',
        data: this.bondNum
    },
    {
        name: '成交数量',
        type: 'line',
        data: this.bondDealNum
    }]
  };
  this.chartData2={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '报价-成交趋势(数量)',
        x: 'center'
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:['报价人数','成交人数']

    },
    xAxis: {
        gridIndex: 0,
        type: 'category',
        data: this.data7
    },
    yAxis: 
    {
        gridIndex: 0,
        type: 'value',
        name:'人数(人)',
        nameLocation:'middle',
        nameGap:30
    },
    series:[{
        name: '报价人数',
        type: 'line',
        data: this.bondPeople
    },
    {
        name: '成交人数',
        type: 'line',
        data: this.bondDealPeople
    }]
  };
}
default4:any={
    bondOfrDayStar:'',
    bondOfrDayEnd:''
}
// 失去焦点
    blurCompany(cm:any){
        cm.value ='';
        this.starttime="";
    }
//报价占比查询
query1(){
    if(this.myStartTime>this.myEndTime || this.myStartTime>this.now){
        alert('请输入正确的查询信息');
    }else{
        this.BondEMRatio();
    }
}
//获取报价维度占比数据
    BondEMRatio(){
        this.default4.bondOfrDayStar=this.format(this.myStartTime,'D');
        this.default4.bondOfrDayEnd=this.format(this.myEndTime,'D');   
        this.bondsVerviewService.getBondEMRatio(this.default4)
            .subscribe(
            userMsges => {console.log(userMsges)
                        if(userMsges.status==0){
                            this.userMsges = userMsges.data;
                            this.default5.buySize=userMsges.data.buySize;
                            this.default5.buyNum=userMsges.data.buyNum/1;
                            this.default5.sellSize=userMsges.data.sellSize;
                            this.default5.sellNum=userMsges.data.sellNum/1;
                            this.default5.validSize=userMsges.data.validSize;
                            this.default5.validNum=userMsges.data.validNum/1;
                            this.default5.dealSize=userMsges.data.dealSize;
                            this.default5.dealNum=userMsges.data.dealNum/1;
                            this.default5.revokeSize=userMsges.data.revokeSize;
                            this.default5.revokeNum=userMsges.data.revokeNum/1;
                            this.default5.rsRag1Size=userMsges.data.rsRag1Size;
                            this.default5.rsRag1Num=userMsges.data.rsRag1Num/1;
                            this.default5.rsRag2Size=userMsges.data.rsRag2Size;
                            this.default5.rsRag2Num=userMsges.data.rsRag2Num/1;
                            this.default5.rsRag3Size=userMsges.data.rsRag3Size;
                            this.default5.rsRag3Num=userMsges.data.rsRag3Num/1;
                            this.default5.rsRag4Size=userMsges.data.rsRag4Size;
                            this.default5.rsRag4Num=userMsges.data.rsRag4Num/1;
                            this.default5.rsRag5Size=userMsges.data.rsRag5Size;
                            this.default5.rsRag5Num=userMsges.data.rsRag5Num/1;
                            this.default5.rsRag6Size=userMsges.data.rsRag6Size;
                            this.default5.rsRag6Num=userMsges.data.rsRag6Num/1;
                            this.default5.rsRag7Size=userMsges.data.rsRag7Size;
                            this.default5.rsRag7Num=userMsges.data.rsRag7Num/1;
                            this.default5.rsRag8Size=userMsges.data.rsRag8Size;
                            this.default5.rsRag8Num=userMsges.data.rsRag8Num/1;
                            this.default5.rsRag9Size=userMsges.data.rsRag9Size;
                            this.default5.rsRag9Num=userMsges.data.rsRag9Num/1;
                            this.default5.bondTpGZSize=userMsges.data.bondTpGZSize;
                            this.default5.bondTpGZNum=userMsges.data.bondTpGZNum/1;                           
                            this.default5.bondTpYPSize=userMsges.data.bondTpYPSize;
                            this.default5.bondTpYPNum=userMsges.data.bondTpYPNum/1;                           
                            this.default5.bondTpJRZSize=userMsges.data.bondTpJRZSize;
                            this.default5.bondTpJRZNum=userMsges.data.bondTpJRZNum/1;                           
                            this.default5.bondTpDFZSize=userMsges.data.bondTpDFZSize;
                            this.default5.bondTpDFZNum=userMsges.data.bondTpDFZNum/1;                           
                            this.default5.bondTpDRSize=userMsges.data.bondTpDRSize;
                            this.default5.bondTpDRNum=userMsges.data.bondTpDRNum/1;                           
                            this.default5.bondTpZPSize=userMsges.data.bondTpZPSize;
                            this.default5.bondTpZPNum=userMsges.data.bondTpZPNum/1;                           
                            this.default5.bondTpQYZSize=userMsges.data.bondTpQYZSize;
                            this.default5.bondTpQYZNum=userMsges.data.bondTpQYZNum/1;                           
                            this.default5.bondTpTYCDSize=userMsges.data.bondTpTYCDSize;
                            this.default5.bondTpTYCDNum=userMsges.data.bondTpTYCDNum/1;                           
                            this.default5.bondTpGSZSize=userMsges.data.bondTpGSZSize;
                            this.default5.bondTpGSZNum=userMsges.data.bondTpGSZNum/1; 
                            this.default5.bondTpQTSize=userMsges.data.bondTpQTSize;
                            this.default5.bondTpQTNum=userMsges.data.bondTpQTNum/1; 
                            this.hideLoad = true;
                            this.hideList = false;
                            this.Radius();
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
//饼图获取数据
  radius1:any;
  radius2:any;
  radius3:any;
  radius4:any;
  radius5:any;
  radius6:any;
  radius7:any;
  radius8:any;
  default5:any={
      buySize:'',
      buyNum:'',  
      sellSize:'',
      sellNum:'',
      validSize:'',
      validNum:'', 
      revokeSize:'',
      revokeNum:'',   
      dealSize:'',
      dealNum:'',
      rsRag1Size:'',
      rsRag2Size:'',
      rsRag3Size:'',
      rsRag4Size:'',
      rsRag5Size:'',
      rsRag6Size:'',
      rsRag7Size:'',
      rsRag8Size:'',
      rsRag9Size:'',
      rsRag1Num:'',
      rsRag2Num:'',
      rsRag3Num:'',
      rsRag4Num:'',
      rsRag5Num:'',
      rsRag6Num:'',
      rsRag7Num:'',
      rsRag8Num:'',
      rsRag9Num:'',
      bondTpGZSize:'',
      bondTpGZNum:'',
      bondTpYPSize:'',
      bondTpYPNum:'',
      bondTpJRZSize:'',
      bondTpJRZNum:'',
      bondTpDFZSize:'',
      bondTpDFZNum:'',
      bondTpDRSize:'',
      bondTpDRNum:'',
      bondTpZPSize:'',
      bondTpZPNum:'',    
      bondTpQYZSize:'',
      bondTpQYZNum:'',     
      bondTpTYCDSize:'',
      bondTpTYCDNum:'',    
      bondTpGSZSize:'',
      bondTpGSZNum:'',
      bondTpQTSize:'',
      bondTpQTNum:'',
  }
  Radius(){
    this.radius1={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '方向占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:['卖出','买入']
    },
    series : [
        {
            name: '方向占比',
            type: 'pie',
            radius : '55%',
            //label: {                //显示方式在元素内部显示
            //    normal: {
            //        position: 'inner'
            //    }
            //},
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.sellSize, name:'卖出'},
                {value:this.default5.buySize, name:'买入'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius2={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '方向金额占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:['卖出','买入']
    },
    series : [
        {
            name: '方向金额占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.sellNum, name:'卖出'},
                {value:this.default5.buyNum, name:'买入'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius3={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '报价状态占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'45%',
        data:['有效','成交','撤销']
    },
    series : [
        {
            name: '报价状态占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.validSize, name:'有效'},
                {value:this.default5.dealSize, name:'成交'},
                {value:this.default5.revokeSize, name:'撤销'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius4={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '报价状态金额占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'45%',
        data:['有效','成交','撤销']
    },
    series : [
        {
            name: '报价状态金额占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.validNum, name:'有效'},
                {value:this.default5.dealNum, name:'成交'},
                {value:this.default5.revokeNum, name:'撤销'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius5={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '剩余期限占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'30%',
        data:['<=3M','3~6M','6~9M','9~12M','1~3Y','3~5Y','5~7Y','7~10Y','>10Y']
    },
    series : [
        {
            name: '剩余期限占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.rsRag1Size, name:'<=3M'},
                {value:this.default5.rsRag2Size, name:'3~6M'},
                {value:this.default5.rsRag3Size, name:'6~9M'},
                {value:this.default5.rsRag4Size, name:'9~12M'},
                {value:this.default5.rsRag5Size, name:'1~3Y'},
                {value:this.default5.rsRag6Size, name:'3~5Y'},
                {value:this.default5.rsRag7Size, name:'5~7Y'},
                {value:this.default5.rsRag8Size, name:'7~10Y'},
                {value:this.default5.rsRag9Size, name:'>10Y'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius6={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '剩余期限金额占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'30%',
        data:['<=3M','3~6M','6~9M','9~12M','1~3Y','3~5Y','5~7Y','7~10Y','>10Y']
    },
    series : [
        {
            name: '剩余期限金额占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.rsRag1Num, name:'<=3M'},
                {value:this.default5.rsRag2Num, name:'3~6M'},
                {value:this.default5.rsRag3Num, name:'6~9M'},
                {value:this.default5.rsRag4Num, name:'9~12M'},
                {value:this.default5.rsRag5Num, name:'1~3Y'},
                {value:this.default5.rsRag6Num, name:'3~5Y'},
                {value:this.default5.rsRag7Num, name:'5~7Y'},
                {value:this.default5.rsRag8Num, name:'7~10Y'},
                {value:this.default5.rsRag9Num, name:'>10Y'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius7={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '债券类型占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'25%',
        data:['国债','央票','金融债','地方债','短融','中票','企业债','同业存单','公司债','其他']
    },
    series : [
        {
            name: '债券类型占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.bondTpGZSize, name:'国债'},
                {value:this.default5.bondTpYPSize, name:'央票'},
                {value:this.default5.bondTpJRZSize, name:'金融债'},
                {value:this.default5.bondTpDFZSize, name:'地方债'},
                {value:this.default5.bondTpDRSize, name:'短融'},
                {value:this.default5.bondTpZPSize, name:'中票'},
                {value:this.default5.bondTpQYZSize, name:'企业债'},
                {value:this.default5.bondTpTYCDSize, name:'同业存单'},
                {value:this.default5.bondTpGSZSize, name:'公司债'},
                {value:this.default5.bondTpQTSize, name:'其他'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
    this.radius8={
    theme: '',
    event: [
      {
        type: "click",
        cb: function (res:any) {
          console.log(res);
        }
      }
    ],
    title: {
        text: '债券类型金额占比',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'25%',
        data:['国债','央票','金融债','地方债','短融','中票','企业债','同业存单','公司债','其他']
    },
    series : [
        {
            name: '债券类型金额占比',
            type: 'pie',
            radius : '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:[
                {value:this.default5.bondTpGZNum, name:'国债'},
                {value:this.default5.bondTpYPNum, name:'央票'},
                {value:this.default5.bondTpJRZNum, name:'金融债'},
                {value:this.default5.bondTpDFZNum, name:'地方债'},
                {value:this.default5.bondTpDRNum, name:'短融'},
                {value:this.default5.bondTpZPNum, name:'中票'},
                {value:this.default5.bondTpQYZNum, name:'企业债'},
                {value:this.default5.bondTpTYCDNum, name:'同业存单'},
                {value:this.default5.bondTpGSZNum, name:'公司债'},
                {value:this.default5.bondTpQTNum, name:'其他'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]};
}

// 分页
 height:any;
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
    public turnFirst(){
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        // this.getRoles();  
    }
    public sizeData(Number:any){
    	this.itemsPerPage = Number;
        this.height = this.itemsPerPage*38+38+'px';
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.turnFirst()
        this.height = this.itemsPerPage*38+120+'px';
        var listBody:any = document.getElementById("listBody");     
        var tr:any = document.createElement('tbody');
        var num:number = this.itemsPerPage*1;  
    };
    
    public pageNumChange(event:any,allcheck:any){
        // this.changeDetectorRef.detectChanges();
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        // this.getUserBackList();
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
    };
//列标题切换
    first1:any;first2:any;first3:any;first4:any;
    Change1(){
       this.first1=document.getElementsByClassName('f1');
       this.first1[0].style.color="#fff";
       this.first1[0].style.backgroundColor="#337ab7";
       this.first2=document.getElementsByClassName('f2');
       this.first2[0].style.color="#337ab7";
       this.first2[0].style.backgroundColor="#fff";
       this.first3=document.getElementsByClassName('f3');
       this.first3[0].style.color="#337ab7";
       this.first3[0].style.backgroundColor="#fff";
       this.first4=document.getElementsByClassName('f4');
       this.first4[0].style.color="#337ab7";
       this.first4[0].style.backgroundColor="#fff";
       this.default2.timeRang=1;
       this.BondEMAllView();
    }
    Change2(){
       this.first2=document.getElementsByClassName('f2');
       this.first2[0].style.color="#fff";
       this.first2[0].style.backgroundColor="#337ab7";
       this.first1=document.getElementsByClassName('f1');
       this.first1[0].style.color="#337ab7";
       this.first1[0].style.backgroundColor="#fff";
       this.first3=document.getElementsByClassName('f3');
       this.first3[0].style.color="#337ab7";
       this.first3[0].style.backgroundColor="#fff";
       this.first4=document.getElementsByClassName('f4');
       this.first4[0].style.color="#337ab7";
       this.first4[0].style.backgroundColor="#fff";
       this.default2.timeRang=2;
       this.BondEMAllView();
    }
    Change3(){
       this.first3=document.getElementsByClassName('f3');
       this.first3[0].style.color="#fff";
       this.first3[0].style.backgroundColor="#337ab7";
       this.first2=document.getElementsByClassName('f2');
       this.first2[0].style.color="#337ab7";
       this.first2[0].style.backgroundColor="#fff";
       this.first1=document.getElementsByClassName('f1');
       this.first1[0].style.color="#337ab7";
       this.first1[0].style.backgroundColor="#fff";
       this.first4=document.getElementsByClassName('f4');
       this.first4[0].style.color="#337ab7";
       this.first4[0].style.backgroundColor="#fff";
       this.default2.timeRang=3;
       this.BondEMAllView();
    }
    Change4(){
       this.first4=document.getElementsByClassName('f4');
       this.first4[0].style.color="#fff";
       this.first4[0].style.backgroundColor="#337ab7";
       this.first2=document.getElementsByClassName('f2');
       this.first2[0].style.color="#337ab7";
       this.first2[0].style.backgroundColor="#fff";
       this.first3=document.getElementsByClassName('f3');
       this.first3[0].style.color="#337ab7";
       this.first3[0].style.backgroundColor="#fff";
       this.first1=document.getElementsByClassName('f1');
       this.first1[0].style.color="#337ab7";
       this.first1[0].style.backgroundColor="#fff";
       this.default2.timeRang=4;
       this.BondEMAllView();
    }
    c1:any;
    c2:any;
    c3:any;
    Changecon1(){
       this.c1=document.getElementsByClassName('content1');
       this.c1[0].style.display="block";
       this.c2=document.getElementsByClassName('content2'); 
       this.c2[0].style.display="none";
       this.c3=document.getElementsByClassName('content3'); 
       this.c3[0].style.display="none"; 
       this.Change1();
    }
    Changecon2(){
       this.c1=document.getElementsByClassName('content1');
       this.c1[0].style.display="none";
       this.c2=document.getElementsByClassName('content2'); 
       this.c2[0].style.display="block";
       this.c3=document.getElementsByClassName('content3'); 
       this.c3[0].style.display="none"; 
       this.starttime=new Date(this.sevenDayAgo);
       this.endtime=this.now;
       this.default6.timeRang=-1;
       this.BondEMTrend(); 
    }
    Changecon3(){
       this.c1=document.getElementsByClassName('content1');
       this.c1[0].style.display="none";
       this.c2=document.getElementsByClassName('content2'); 
       this.c2[0].style.display="none";
       this.c3=document.getElementsByClassName('content3'); 
       this.c3[0].style.display="block"; 
       this.myStartTime=new Date(this.sevenDayAgo);
       this.myEndTime=this.now;
       this.BondEMRatio();      //Echart中div如果是隐藏的，那么先不初始化echart
    }
}