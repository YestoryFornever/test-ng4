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
import { SelectItem } from 'primeng/primeng';

@Component({
	selector: 'crm-contactList',
	templateUrl: './crm-contactList.component.html',
	styleUrls: [
				'./crm-contactList.component.scss',
				'../../../common/scss/typical-list/order.scss',
				'../../../common/scss/typical-list/header.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/table.scss',
				],
	// providers:[NetCrmService]
})
export class ContactListComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {
				this.fullnameTypeAhead = new TypeAhead();
				this.contactLv = [{label:'全部', value:'0'},{label:'重要', value:'1'},{label:'一般', value:'2'},{label:'无关', value:'3'}];
	}
	ngOnInit(){
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
     	this.netCrmService
        .getOrgListByShortName({value:this.default.company})
        .then((res:any)=>{
			if(res.status==0){
				observer.next(res.data)
			}else{
				var arr=[]
				observer.next(arr)
			}
			
		})
   		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
   		this.queryContactList()
   		this.getDeps();
	}
	errorMessage:any
	fullnameTypeAhead:any
	default:any={
			userId:'0',
			pageNumber:'1',
			pageSize:'30',
		}	
	pageParams:any={
			maxSize:5,
			totalItems:0,
			currentPage:1,
			itemsPerPage:30,
			totalPages:1,
		}
	errorMsg:any
/*获取部门*/
	deps:any=[]
	getDeps(){
		this.netCrmService
			.getDeps(null)
			.then(
				(deps:any) => {
					// debugger;
					this.deps = deps.data;
				},
				error => this.errorMsg = <any>error
			);
	}
	public depsOnSelect(e:any):void {
		console.log('设置部门为:', e.value);
		//debugger;
		this.default.department = e.item.departmentName
		this.default.departmentId = e.item.departmentId;
	}	
// 获取联系人列表
	contactList:any=[]
	queryContactList(){	
		this.default.pageNumber = this.pageParams.currentPage
		this.default.pageSize = this.pageParams.itemsPerPage
     	this.netCrmService
        .queryContactList(this.default)
        .then((res:any)=>{
			if(res.status==0){
				this.pageParams.totalItems = res.data["total"];
				this.contactList = res.data.voList
			}else{
				alert(res.msg)	
			}
		}),
		error => this.errorMsg = <any>error
	}
	contactLv: SelectItem[];
	choose:any = '请选择'
	selectedcontactLv: string[]=['1'];
	public turnFirst(){
		this.pageParams.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryContactList()
	}
/*公司失焦清空*/
	public blurCompany(el:any,e:any){
		if(!this.default.companyId){
			el.value = "";
			this.default.company = "";
			this.default.organizationFullName=''
		}
	}
	public changeCompany(el:any,e:any){
		this.default.companyId = "";
	}
	public orgsOnSelect(e:any):void {
		console.log('设置公司为:', e.value);
		this.default.companyId = e.item.organizationId;
		this.default.organizationFullName = e.item.organizationFullName
	}
// switch
	onChange(event:any){
		console.log(event)
	}
// 跳转到详情
	turnToDetial(id:any){
		if(id){
			this.router.navigate(['../contact-edit',id],{relativeTo:this.activatedRoute});
		}else{
			this.router.navigate(['../contact-edit'],{relativeTo:this.activatedRoute});
		}
	}
}