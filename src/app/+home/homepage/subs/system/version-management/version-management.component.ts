import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { VersionManagementService } from './services/version-management.service';

import { verCondition } from './classes/version';
@Component({
	selector: 'version-management',
	templateUrl: './version-management.component.html',
	styleUrls: ['./version-management.component.scss'],
	providers: [VersionManagementService]
})
export class VersionManagementComponent implements OnInit{ 
	
		

	en: any;
	versionId:any;
	versionNumber:any;
	versionName:any;
	upgradeDescription:any;
	downloadAddress:any;
	mandatoryUpgradeFlag:any;
	versionType:any ='3';
	versionState:any ='1';
	releaseTime:any;
	startDate:any;
	endDate:any;
	
	addVersion:any;
	modifyVersion:any;
	versionLists:any;
	errorMessage: string;

	condition:verCondition;

	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private versionManagementService:VersionManagementService
	){
		this.condition = new verCondition();
	}

	ngOnInit(){
		console.log(1);
		this.en = {
            firstDayOfWeek: 0,
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        };
		this.versionId='';
		// this.versionType='3';
		// this.versionState='1';
		this.mandatoryUpgradeFlag='2';
		this.lookupVersionList();
		// this.downloadAddress='http://';
	};

	//http
	lookupVersionList(){
		//版本列表
		this.condition.releaseStartTime = (Date.parse(this.startDate));
		this.condition.releaseEndTime = (Date.parse(this.endDate));
		this.condition.versionType = this.versionType;
		this.condition.versionState = this.versionState;
		this.versionId = '';
		this.condition.versionId = '';
		this.versionManagementService.lookupVersionList(this.condition)
			.subscribe(
				result =>{
					// debugger;
					console.log(result.data);
					if(result.status=="0"){
						this.versionLists = result.data.list;
						this.condition.totalItems = result.data.page.totalResult;
						for(let i in result.data.list){
							if(result.data.list[i].versionType=='1'){
								this.versionLists[i].versionType="PC端";
							}else if(result.data.list[i].versionType=='2'){
								this.versionLists[i].versionType="WEB";
							}else if(result.data.list[i].versionType=='3'){
								this.versionLists[i].versionType="android";
							}else if(result.data.list[i].versionType=='4'){
								this.versionLists[i].versionType="ios";
							}
							if(result.data.list[i].mandatoryUpgradeFlag=='1'){
								this.versionLists[i].mandatoryUpgradeFlag='是';
							}else if(result.data.list[i].mandatoryUpgradeFlag=='2'){
								this.versionLists[i].mandatoryUpgradeFlag='否';
							}
							if(result.data.list[i].versionState=='0'){
								this.versionLists[i].versionState='无效';
							}else if(result.data.list[i].versionState=='1'){
								this.versionLists[i].versionState='有效';
							}
							
							var newDateCreateTime = new Date();
							newDateCreateTime.setTime(result.data.list[i].createTime);
							this.versionLists[i].createTime=newDateCreateTime.toLocaleString();
							var newDateReleaseTime = new Date();
							newDateReleaseTime.setTime(result.data.list[i].releaseTime);
							this.versionLists[i].releaseTime=newDateReleaseTime.toLocaleString();
							var newDateUpdateTime = new Date();
							newDateUpdateTime.setTime(result.data.list[i].updateTime);
							this.versionLists[i].updateTime = newDateUpdateTime.toLocaleString();
						}
					}else{
						if(result.msg){
							alert(result.msg);
						}
					  
					}
				},
				error => this.errorMessage = <any>error
			);
	}
	addwin(add:any,retime:any){

	}
	 addNew:any={
	 			versionType:'',
				versionNumber:'',
				versionName:'',
				releaseTime:'',
				mandatoryUpgradeFlag:'',
				upgradeDescription:'',
				downloadAddress:'',
				versionState:'',
				createTime:''
	 }
	 releaseTimeAdd:any
	 addTime:any
	addVersionList(hideWindow:any){
		//添加版本信息.
		var data = new Date()
		console.log(this.addNew)
		if(this.addTime==''){
			 alert("请选择正确版本发布时间")
			  return false
		}
		this.addNew.createTime = Date.parse(data.toString())*1
		this.addNew.releaseTime = (Date.parse(this.addTime))*1;
		// this.addNew.mandatoryUpgradeFlag = this.mandatoryUpgradeFlag;
		// this.addNew.versionNumber = this.versionNumber;
		// this.addNew.versionName = this.versionName;
		// this.addNew.downloadAddress = this.downloadAddress;
		// this.addNew.upgradeDescription = this.upgradeDescription;
		// this.versionId = '';
		// this.addNew.versionId = '';
		
		if(this.addNew.versionType==''){
             alert("请选择版本种类")
             return false
		}
		if(this.addNew.versionNumber==''){
			 alert("请填写版本号")
			  return false
		}
		if(this.addNew.versionName==''){
             alert("请填写版本名称")
             return false
		}
		
		if(this.addNew.mandatoryUpgradeFlag==''){
             alert("请选择强制升级标志")
             return false
		}
		if(this.addNew.upgradeDescription==''){
			 alert("请填写升级内容描述")
			  return false
		}
		if(this.addNew.downloadAddress==''){
			 alert("请填写升级包下载地址")
			  return false
		}
		if(this.addNew.versionState==''){
			 alert("请选择版本状态")
			  return false
		}
		this.versionManagementService.addVersionInfor(this.addNew)
			.subscribe(
				addVersion =>{
					console.log(addVersion);
					if(addVersion.status==0){
						this.lookupVersionList()
						alert("添加成功")
						this.addVersion=addVersion.data;
					}else{
						if(addVersion.msg){
							 alert(addVersion.msg);
						}
					}			 
				},
				error => this.errorMessage = <any>error
			);
			this.addNew={
	 			versionType:'',
				versionNumber:'',
				versionName:'',
				releaseTime:'',
				mandatoryUpgradeFlag:'',
				upgradeDescription:'',
				downloadAddress:'',
				packetSize:'',
				versionState:'',
				createTime:''
	 }
			hideWindow.hide();
			this.addTime=''
	}
 save:any = {
 			versionId:'',
			versionType:'',
			versionNumber:'',
			versionName:'',
			releaseTime:'',
			mandatoryUpgradeFlag:'',
			upgradeDescription:'',
			downloadAddress:'',
			packetSize:'',
			versionState:'',
			createTime:'',
			// pageNum:1,
			// pageSize:10
		}
	modifyVersionList(hideWindow:any,retime:any){
		 
//修改版本信息
		// debugger;
		console.log(this.save)
		this.save.versionId = this.versionId
		this.save.releaseTime = this.releaseTime
		if(this.startTime==''){
			 alert("请选择版本发布时间")
			  return false
		}
		// debugger
		// this.save.releaseTime = (Date.parse(retime.value))*1;
		this.save.releaseTime = Date.parse(this.startTime.toString())*1
		var afternoon = this.version.createTime.match(/[\u4E00-\u9FA5]+/)

		var data = new Date(this.version.createTime.replace(/[\u4E00-\u9FA5]+/,""))
		this.save.createTime = this.versionLists.createTime
		// this.save.createTime = Date.parse(data.toString())*1
		// this.save.createTime = Date.parse(this.startTime.toString())*1
		console.log(this.startTime)
		console.log(this.save.createTime)
		// if(afternoon[0]=="下午"){
		// 	this.save.createTime+=(3600*1000*12)
		// 	console.log(this.save.createTime)
		// }
		 if(this.save.versionType==''){
             alert("请选择版本种类");
             return false
		}
		if(this.save.versionNumber==''){
			 alert("请填写版本号")
			  return false
		}
		if(this.save.versionName==NaN){
             alert("请填写版本名称")
             return false
		}
		
		if(this.save.mandatoryUpgradeFlag==''){
             alert("请选择强制升级标志")
             return false
		}
		if(this.save.upgradeDescription==''){
			 alert("请填写升级内容描述")
			  return false
		}
		if(this.save.downloadAddress==''){
			 alert("请填写升级包下载地址")
			  return false
		}
		if(this.save.versionState==''){
			 alert("请选择版本状态")
			  return false
		}
		 console.log(this.save)
		this.versionManagementService.modifyVersionInfor(this.save)
			.subscribe(       	
				modifyVersion =>{
					console.log(modifyVersion);
					if(modifyVersion.status==0){
						this.lookupVersionList()
						alert("修改成功")
						this.modifyVersion=modifyVersion.data;
					}else{
						if(modifyVersion.msg){
							  alert(modifyVersion.msg);
						}
					
					}
								 
				},
				error => this.errorMessage = <any>error
			);hideWindow.hide();
			this.startTime=''
	}
	version:any
	getVersionId(trId:any,id:any,version:any){
		var trAll=document.getElementsByTagName('tr');
		for(var i=0;i<trAll.length;i++){
			trAll[i].style.backgroundColor="rgb(255, 255, 255)";
		}
		trId.style.backgroundColor= "#adcce9";
		
		this.versionId = id;
		this.version = version
		console.log(version);
		this.condition.versionId = id;
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
	           format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
	startTime:any
	modifyList(showWindow:any,reTIme:any){
		if(this.versionId==''){
			alert('请先点击选择需要修改的条目');
		}else{
			showWindow.show();
			console.log(this.version)
							if(this.version.versionType=="PC端"){
								this.save.versionType="1";
							}else if(this.version.versionType=='WEB'){
								this.save.versionType="2";
							}else if(this.version.versionType=='android'){
								this.save.versionType="3";
							}else if(this.version.versionType=='ios'){
								this.save.versionType="4";
							}
							if(this.version.mandatoryUpgradeFlag=='是'){
								this.save.mandatoryUpgradeFlag='1';
							}else if(this.version.mandatoryUpgradeFlag=='否'){
								this.save.mandatoryUpgradeFlag='2';
							}
							if(this.version.versionState=='无效'){
								this.save.versionState='0';
							}else if(this.version.versionState=='有效'){
								this.save.versionState='1';
							}
							this.save.upgradeDescription = this.version.upgradeDescription
									this.save.packetSize = this.version.packetSize
							// document.getElementById("retime").value()
							var afternoon = this.version.releaseTime.match(/[\u4E00-\u9FA5]+/)
							if(afternoon=="下午"){
								// debugger
								var times = new Date(this.version.releaseTime.replace(/[\u4E00-\u9FA5]+/,""))
								var Mtime = new Date(Date.parse(times+'')+3600*12*1000)
								this.startTime = new Date(this.format(Mtime))
							}else{
								// debugger
								var times  = new Date(this.version.releaseTime.replace(/[\u4E00-\u9FA5]+/,""))
								var Mtime = new Date(Date.parse(times+'')*1)
								this.startTime = new Date(this.format(Mtime))
							}
							
							this.save.downloadAddress = this.version.downloadAddress 
							this.save.versionNumber = this.version.versionNumber
							this.save.versionName = this.version.versionName
							// this.version.releaseTime.split()
							this.releaseTime = this.version.releaseTime.split(' ')[0].replace(/\//g,'-').split('-')
							if(this.releaseTime[1].split('').length<2){
								this.releaseTime[1] = "0"+this.releaseTime[1]
								console.log(this.releaseTime)
							
							// reTIme.valueAsDate = this.releaseTime
							// reTIme.value=this.releaseTime
							
							}
							if(this.releaseTime[2].split('').length<2){
								this.releaseTime[2] = "0"+this.releaseTime[2]
								console.log(this.releaseTime)
							
							// reTIme.valueAsDate = this.releaseTime
							// reTIme.value=this.releaseTime
							
							}
							this.releaseTime=this.releaseTime.join('-')
							this.save.releaseTime = this.releaseTime
							console.log(this.releaseTime)
		}
	}
	turnFirst(){
		this.condition.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.lookupVersionList();
	}
	// 分页
	msgNumbers = [10,20,30,50];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';

	public sizeData(num:any){
		this.condition.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.condition.itemsPerPage = num;
		this.lookupVersionList();
	};
	public pageChanged(event:any):void {
		this.condition.currentPage = event.page;
		this.lookupVersionList();
	};
	public pageNumChange(event:any){
		// debugger;
		this.condition.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.condition.itemsPerPage = pageNo;
	};
}