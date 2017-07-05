import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2Echarts } from 'ng2-echarts';
import { BondDistributionService } from '../../service/bond-distribution-service'
// import { UserBackServices } from '../../services/user-back.services'
// import {Ng2Echarts,Ng2EchartsModule} from 'ng2-echarts'
@Component({
	selector: 'bond-distribution-pandect',
	templateUrl: './bond-distribution-pandect.component.html',
	styleUrls: ['./bond-distribution-pandect.component.scss'],
	providers: [BondDistributionService]
})

export class BondDistributionPandectComponent implements OnInit{
	constructor(
		
				private bondDistributionService:BondDistributionService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let userId = params['userId'];
			let backId = params['backId'];
			// console.log(userId,backId);
			this.getLttPct()
		})
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
           this.getDstrSmy(1)
	}
	en:any
	tm:any='0'
	data:any = [1,2,3,4,5,6,7]
	bondListSize:any=100
	bondDealSize:any=80
    today:any=new Date()
	startDate:any =new Date(Date.parse(this.today)-1000*3600*7*24)
    endDate:any= new Date()
    errorMessage:any
    detial:any={
        bondNumTal:'0',
        bondNumUsr:'0',
        issuAmtTal:'0',
        issuAmtUsr:'0',
        bondNumTalTd:'0',
        bondNumUsrTd: '0',
        issuAmtTalTd: '0',
        issuAmtUsrTd: '0'
    }
    getDstrSmy(x:any){
        var obj={enqrTp:x}
        this.bondDistributionService.getDstrSmy(obj).subscribe(
            res => {
              this.detial = res.data 
            },
            error => {
                this.errorMessage = error;
            }
        );
    }
    pieTpAmtList:any=[]
    pieTpAmtListData:any=[]
    pieTpAmtListName:any=[]

    pieTpNumList:any=[]
    pieTpNumListData:any=[]
    pieTpNumListName:any=[]

    pietrmAmtList:any=[]
    pietrmAmtListData:any=[]
    pietrmAmtListName:any=[]

    pietrmNumList:any=[]
    pietrmNumListData:any=[]
    pietrmNumListName:any=[]

    getLttPct(){
        this.pieTpAmtList=[]
        this.pieTpAmtListData=[]
        this.pieTpAmtListName=[]

        this.pieTpNumList=[]
        this.pieTpNumListData=[]
        this.pieTpNumListName=[]

        this.pietrmAmtList=[]
        this.pietrmAmtListData=[]
        this.pietrmAmtListName=[]

        this.pietrmNumList=[]
        this.pietrmNumListData=[]
        this.pietrmNumListName=[]
        var obj={stDt:this.format(this.startDate),edDt:this.format(this.endDate)}
        this.bondDistributionService.getLttPct(obj).subscribe(
            res => {
                       // debugger
             this.pieTpAmtList = res.data[0].tpAmtList
             this.pieTpNumList = res.data[0].tpNumList
             this.pietrmAmtList = res.data[0].trmAmtList
             this.pietrmNumList = res.data[0].trmNumList
                for(var i=0;i<this.pieTpAmtList.length;i++){
                   if(!this.pieTpAmtList[i].bondTp){
                        this.pieTpAmtList[i].bondTp='--'+i
                   }
                    if(this.pieTpAmtList[i].bondTp==1){
                        this.pieTpAmtList[i].bondTp='PPN'
                   }
                    if(this.pieTpAmtList[i].bondTp==2){
                        this.pieTpAmtList[i].bondTp='中票'
                   }
                    if(this.pieTpAmtList[i].bondTp==3){
                        this.pieTpAmtList[i].bondTp='短融'
                   }
                    if(this.pieTpAmtList[i].bondTp==4){
                        this.pieTpAmtList[i].bondTp='超短融'
                   }
                    if(this.pieTpAmtList[i].bondTp==5){
                        this.pieTpAmtList[i].bondTp='公司债'
                   }
                    if(this.pieTpAmtList[i].bondTp==6){
                        this.pieTpAmtList[i].bondTp='非公开'
                   }
                 
                   this.pieTpAmtListData.push({name:this.pieTpAmtList[i].bondTp,value:this.pieTpAmtList[i].issuAmt})
                   this.pieTpAmtListName.push(this.pieTpAmtList[i].bondTp)
                }
                for(var i=0;i<this.pieTpNumList.length;i++){
                  if(!this.pieTpNumList[i].bondTp){
                        this.pieTpNumList[i].bondTp='--'+i
                    }
                     if(this.pieTpNumList[i].bondTp==1){
                        this.pieTpNumList[i].bondTp='PPN'
                   }
                    if(this.pieTpNumList[i].bondTp==2){
                        this.pieTpNumList[i].bondTp='中票'
                   }
                    if(this.pieTpNumList[i].bondTp==3){
                        this.pieTpNumList[i].bondTp='短融'
                   }
                    if(this.pieTpNumList[i].bondTp==4){
                        this.pieTpNumList[i].bondTp='超短融'
                   }
                    if(this.pieTpNumList[i].bondTp==5){
                        this.pieTpNumList[i].bondTp='公司债'
                   }
                    if(this.pieTpNumList[i].bondTp==6){
                        this.pieTpNumList[i].bondTp='非公开'
                   }
                    this.pieTpNumListData.push({name:this.pieTpNumList[i].bondTp,value:this.pieTpNumList[i].bondNum})
                    this.pieTpNumListName.push(this.pieTpNumList[i].bondTp)
                }
                for(var i=0;i<this.pietrmAmtList.length;i++){
                    if(!this.pietrmAmtList[i].trm){
                        this.pietrmAmtList[i].trm='--'+i
                    }
                    this.pietrmAmtListData.push({name:this.pietrmAmtList[i].trm,value:this.pietrmAmtList[i].issuAmt})
                    this.pietrmAmtListName.push(this.pietrmAmtList[i].trm)
                } 
                for(var i=0;i<this.pietrmNumList.length;i++){
                    if(!this.pietrmNumList[i].trm){
                        this.pietrmNumList[i].trm='--'+i
                    }
                    this.pietrmNumListData.push({name:this.pietrmNumList[i].trm,value:this.pietrmNumList[i].bondNum})
                    this.pietrmNumListName.push(this.pietrmNumList[i].trm)
                }
                this.Square()
                console.log(this.pieTpAmtListName)
            },
            error => {
               this.errorMessage = error;
            }
        );
    }
chartData1:any
chartData2:any
chartData3:any
chartData4:any
Square(){
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
        text: '债券类型-发行规模',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}元 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:this.pieTpAmtListName
    },
    series : [
        {
            name: '发行规模',
            type: 'pie',
            radius : '55%',
            //label: {                //显示方式在元素内部显示
            //    normal: {
            //        position: 'inner'
            //    }
            //},
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:this.pieTpAmtListData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
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
        text: '债券类型-债券支数',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}支 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:this.pieTpNumListName
    },
    series : [
        {
            name: '债券支数',
            type: 'pie',
            radius : '55%',
            //label: {                //显示方式在元素内部显示
            //    normal: {
            //        position: 'inner'
            //    }
            //},
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:this.pieTpNumListData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
  this.chartData3={
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
        text: '债券期限-发行规模',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}元 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:this.pietrmAmtListName
    },
    series : [
        {
            name: '发行规模',
            type: 'pie',
            radius : '55%',
            //label: {                //显示方式在元素内部显示
            //    normal: {
            //        position: 'inner'
            //    }
            //},
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:this.pietrmAmtListData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
  this.chartData4={
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
        text: '债券期限-债券支数',
        x: 'center',
        top:30
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}支 ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:'50%',
        data:this.pietrmNumListName
    },
    series : [
        {
            name: '发行规模',
            type: 'pie',
            radius : '55%',
            //label: {                //显示方式在元素内部显示
            //    normal: {
            //        position: 'inner'
            //    }
            //},
            selectedMode: 'single',
            center: ['50%', '60%'],
            data:this.pietrmNumListData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };
}
format (format:any) {
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
                   // format = args.Y+'-'+ args.M +'-'+args.d
               format = args.Y+'-'+ args.M +'-'+args.d
            }
           return format;
       };
}
