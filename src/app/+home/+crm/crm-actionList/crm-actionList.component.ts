import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../common/net-services/net-crm.service'
import { INCONFIG } from '../../../../public/in.config';
import { TypeAhead } from '../../../common/class/typeahead.ts';
@Component({
	selector: 'crm-actionList',
	templateUrl: './crm-actionList.component.html',
	styleUrls: [
				'./crm-actionList.component.scss',
				'../../../common/scss/typical-list/order.scss',
				'../../../common/scss/typical-list/header.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/table.scss',
				],
})
export class CrmActionListComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {
				this.fullnameTypeAhead = new TypeAhead();
	}
	ngOnInit(){
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
     	this.netCrmService
        .getOrgListByShortName({value:this.default.company})
        .then((res:any)=>{
        	debugger
			if(res.data){
				
				observer.next(res.data)
			}else{
				var arr=[]
				observer.next(arr)
			}
			
		})
   		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));

		this.cn = {
	            firstDayOfWeek: 0,
	            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
	            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
	            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
	            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	        };
	    this.searchActionList()
	}
	pageParams:any={
		maxSize:5,
		totalItems:0,
		currentPage:1,
		itemsPerPage:30,
		totalPages:1,
	}
	cn:any
	errorMessage:any
	fullnameTypeAhead:any
	default:any={
		pageNumber:'1',
		pageSize:'30',
	}
	actionList:any=[]
	searchActionList(){
		this.netCrmService.searchActionList(this.default)
		.then((res:any)=>{
			if(res.status==0){
				// debugger
				this.actionList = res.data
			}else{
				alert(res.msg)
			}
			
		},error => this.errorMessage = error)
	}
// 跳转到详情
	turnToDetial(){
		this.router.navigate(['../action-add'],{relativeTo:this.activatedRoute});
	}
}
