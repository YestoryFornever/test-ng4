import { Component,ElementRef, ViewChild,OnInit,AfterViewInit,OnChanges,OnDestroy,ChangeDetectorRef,trigger,state,style,transition,animate,AfterViewChecked } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { SnsManagementService }  from './../sns-management-services/sns-management.services';
import { ActivatedRoute, Router }   from '@angular/router';
import { Message} from 'primeng/primeng';
import * as Highcharts from 'highcharts'
import {INCONFIG} from '../../../../../../../public/in.config';
@Component({
	selector: 'sns-statistics-management',
	templateUrl: './sns-statistics-management.component.html',
	styleUrls: ['./sns-statistics-management.component.scss'],
	providers: [SnsManagementService],
})

export class SnsStatisticsComponent implements OnInit{ 
	constructor(private changeDetectorRef:ChangeDetectorRef,
				private snsManagementService:SnsManagementService,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	ngOnInit(){
  		this.getDate()
  		this.en = {
            firstDayOfWeek: 0,
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        };
	}
	en:any

	errorMessage:any
	default:any={
		begin_date:'',
		count_type:'1',
		source:'',
		cur_page:'1',
		show_count:10
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
	           		format = args.Y+'-'+ args.M
	           	}
	           // format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
	starttime:any
	xData:any=[]
	yData:any=[]
	data:any={}
	datalist:any=[]
	now:any = new Date()
	sevenDayAgo:any= this.now.getTime()-3600*1000*24*7
	tenmouthAgo:any=this.now.getTime()-3600*1000*24*7*30*10
	getDate(){
		this.xData=[]
		this.yData=[]
		if(this.default.count_type==1){
			this.default.begin_date =this.format(this.starttime,'D')
		}
		if(this.default.count_type==2){
			this.default.begin_date =this.format(this.starttime,'M')
		}
		if(!this.starttime&&this.default.count_type==1){
			var date =new Date(this.sevenDayAgo)
			this.default.begin_date = this.format(date,'D')
		}
		if(!this.starttime&&this.default.count_type==2){
			var date =new Date(this.tenmouthAgo)
			this.default.begin_date = this.format(date,'M')
		}
		this.snsManagementService.countView(this.default)
		.subscribe(
		infoList => {  
						// console.log(infoList)
						if(infoList.status==0){
							console.log(infoList.data.list)
							for (var i in infoList.data.list){
								this.xData.push(infoList.data.list[i].cur_date)
								this.yData.push(infoList.data.list[i].view_cnt)	
							}
								console.log(this.xData)
								console.log(this.yData)
								 this.setOption()
						}else if(infoList.status==-5){
							console.log('session已超时')
						}
						else{
							
							if(infoList.msg){
								alert(infoList.msg);
							}
						}
					},
		error => {	this.errorMessage = error;
			alert("服务器连接失败！")
				}
		);
	}

// Echart
// countView
 chartData:any
  setOption(){
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
      text: '资讯浏览量统计',
      x: 'center'
    },
    tooltip: {
       trigger: 'axis',
      formatter: "{a} <br/>{b} : {c} 次"
    },
    legend: {
      orient: 'vertical',
      left: 'left',

      // data:this.xData
    },
    xAxis: {
	  gridIndex: 0,
	  type: 'category',
	  // data: this.xData,
	  data:["一月","二月","三月"]
    },
    yAxis: 
    {
	  gridIndex: 0,
	  type: 'value',
	   axisLabel: {
            formatter: '{value} 次'
        }
    },
    series:{
      name: '访问来源',
      type: 'line',
      // data: this.yData,
      data:[22,33,44]
    }
  };
	this.chartData.series.data = this.yData.reverse()
	this.chartData.xAxis.data = this.xData.reverse()
  }

}