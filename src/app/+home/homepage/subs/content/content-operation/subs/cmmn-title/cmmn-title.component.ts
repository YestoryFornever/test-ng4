import { Component, OnInit, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from '../../content-operation.service';
@Component({
	selector: 'cmmn-title',
	template: `
	<div class="header">
		<span class="head icon">|</span><span class="head" >{{cmmn}}</span>
		<!--<div class="btnHeader head">
			<button class="btn btn-primary" (click)="editOrgPop(organization_edit)">添加机构</button>
			<button class="btn btn-primary" (click)="exportExcel(excel_helper)">异常机构数据导出</button>
			<button class="btn btn-primary" (click)="updateOrgInstitutionData()">立即同步发行机构</button>
		</div>-->
	</div>`,
	styles: [`
	.header{
		overflow: hidden;
		height: 60px;
		border-bottom:solid 1px #e1e7eb; 
	}
	.header span{
		font:600 14px "微软雅黑";
		color: #333;
		line-height: 60px;
		margin-left: 16px;
	}
	.header .icon{
		font-size: 16px;
		color:#f44336;
	}
	.header .head{
		float: left;
	}
	.header .btnHeader{
		height: 32px;
		margin-left: 50px;
		margin-top: 14px;
	}
	.header .btnHeader .btn{
		margin-right: 10px;
	}`],
})
export class CmmnTitleComponent implements OnInit{
	constructor(private contentOperationService:ContentOperationService){}
	@Input()cmmn:string;
	ngOnInit(){
	}
}