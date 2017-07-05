import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import {CalendarModule,PickListModule} from 'primeng/primeng';

import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
//import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ParameterSetService } from './services/parameter-set.service';
@Component({
	selector: 'parameter-set',
	templateUrl: './parameter-set.component.html',
	styleUrls: ['./parameter-set.component.scss'],
	providers: [ParameterSetService]
})
export class ParameterSetComponent { 
	

	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private parameterSetService:ParameterSetService,
		private calendarModule:CalendarModule
	){}	
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}

	ngOnInit(){
		this.getApplicationList();
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

	//获取参数设置列表
	//
	myStartTime:any;
	myEndTime:any;
	applicationLists:any=[];
	errorMessage:any;
	warningValue:any;
	getApplicationList(){
		this.parameterSetService.applicationSetList(null)
			.subscribe(
				 applicationList => {
					console.log(applicationList);
					// debugger;
					if(applicationList.status==0){

						for (var i in applicationList.data.configList) {
							let start = applicationList.data.configList[i].activityStart;
							let end = applicationList.data.configList[i].activityEnd;
							if(start){
								applicationList.data.configList[i].activityStart = new Date(start);
							}
							if(end){
								applicationList.data.configList[i].activityEnd = new Date(end);
							}
						}
						this.applicationLists = applicationList.data.configList;
						this.warningValue = applicationList.data.warningValue;
						console.log(this.applicationLists)

					}else{
					  alert("获取信息失败");
					}
				},
				error => this.errorMessage = <any>error
			)
	};
	changeStatus(list:any,status:any){

		if(status == "isEnabled"){
			list.isEnabled = !list.isEnabled;
			list.allowActivity = false;
		}
		if(status == "allowActivity"){
			if(list.isEnabled==false){
				return false;
			}else{
				list.allowActivity = !list.allowActivity;

			}
		}

	}
	sendInfo:any={
		configList:[],
		warningValue:''

	}
	// saveList:any =[];
	saveApplicationSet(){
		this.sendInfo.configList =[];
		let lists:any = [
		] ;
		// console.log( this.applicationLists)
		for(let i in this.applicationLists){
			lists[i] = {
				coinConfigId:"",
				rewardCount:"",
				coinNomalNumber:"",
				coinActivityNumber:"",
				activityStart:"",
				activityEnd:"",
				allowActivity:"",
				isEnabled:"",
				message:"",
			};
			 // this.applicationLists[i];
			// console.log(this.applicationLists[i]['coinNomalNumber'])
			for(let j in lists[i]){
				console.log(lists[i][j])
				lists[i][j] = this.applicationLists[i][j];

			}
			if(lists[i].activityStart){
				lists[i].activityStart =Date.parse(lists[i].activityStart);
			}
			if(lists[i].activityEnd){
				lists[i].activityEnd =Date.parse(lists[i].activityEnd);
			}
			// lists[i].activityEnd =Date.parse(lists[i].activityEnd);
			if(lists[i].activityEnd<lists[i].activityStart){
				alert("请确保结束时间大于开始时间");
				// lists[i].activityStart =start;
				// lists[i].activityEnd =end;
				return false;

			}
			this.sendInfo.configList.push(lists[i]);
		}
			this.sendInfo.warningValue = this.warningValue;

		console.log(this.sendInfo.configList)
		console.log(this.sendInfo)
		this.parameterSetService.updateApplicationList(this.sendInfo)
			.subscribe(
				 applicationList => {
					if(applicationList.status==0){
						alert("修改成功");
					}else{
					  alert(applicationList.msg);
					}
				},
				error => this.errorMessage = <any>error
			)
	};

	// 恢复默认设置
	toDefault(myDefault:any){
		this.parameterSetService.defaultList(null)
			.subscribe(
				 applicationList => {
					console.log(applicationList);
					if(applicationList.status==0){
					  alert(applicationList.msg);
						myDefault.hide();
						this.getApplicationList();
					}else{
					  alert(applicationList.msg);
					  myDefault.hide();
					}
				},
				error => this.errorMessage = <any>error
			)
	}
}