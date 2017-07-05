import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../common/net-services/net-crm.service'
import {INCONFIG} from '../../../../public/in.config';


@Component({
	selector: 'crm-setPosition',
	templateUrl: './crm-setPosition.component.html',
	styleUrls: [
				'./crm-setPosition.component.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/header.scss',
				'../../../common/scss/typical-list/condition.scss',
				'../../../common/scss/typical-list/condition.scss',
				],
	// providers:[NetCrmService]
})
export class SetPositionComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	ngOnInit(){
		this.getPositionList()
	}
	size:any="mini"
	positionList:any=[]
	getPositionList(){
		this.netCrmService.getPositionList(null)
		.then((res:any)=>{
			if(res.status==0){
				// debugger
				this.positionList = res.data;
			}else{
				alert(res.msg)
			}
		})
	}

// 编辑职位弹窗初始化
	positionId:any =''
	editShow(add:any,customer:any){
		// debugger
		add.show()
		this.positionCon.positionName='';
		this.positionCon.remark='';
		this.positionId=''
		if(customer){
			this.positionId = customer.positionId;
			this.positionCon.positionName = customer.positionName;
			this.positionCon.remark = customer.remark;
		}
		
	}
// 编辑岗位
	positionCon:any={
		positionId:'',
		positionName:'',
		remark:''
	}
	editPosition(add:any){
		if(this.positionId){
			this.positionCon.positionId = this.positionId;
			this.netCrmService.editPosition(this.positionCon)
			.then((res:any)=>{
				if(res.status==0){
					alert('编辑成功');
					this.positionCon.positionName='';
					this.positionCon.remark='';
					this.positionCon.positionId = undefined
					add.hide();
					this.getPositionList();
				}else{
					alert(res.msg)
				}
			})
		}else{
			this.positionCon.positionId = undefined
			this.netCrmService.addPosition(this.positionCon)
			.then((res:any)=>{
				if(res.status==0){
					alert('添加成功')
					this.positionCon.positionName=''
					this.positionCon.remark=''
					add.hide()
					this.getPositionList()
				}else{
					alert(res.msg)
					
				}
			})
		}
	}
// 修改状态
	onChange(event:any,position:any){
		this.positionStatue.state = event.currentValue*1
		this.positionStatue.positionId = position.positionId*1
		this.updateState()
	}
	positionStatue:any={
		positionId:'',
		state:''
	}
	updateState(){
		this.netCrmService.updateState(this.positionStatue)
		.then((res:any)=>{
			if(res.status==0){
				console.info('修改状态成功')
				// this.getPositionList();
			}else{
				alert(res.msg)
				this.getPositionList();
			}
		})
	}
}