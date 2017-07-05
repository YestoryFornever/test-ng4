import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { CustomerHangService } from './services/customerhang.service';

import { customerHang } from './classes/customerhang';
@Component({
	selector: 'customerhang',
	templateUrl: './customerhang.component.html',
	styleUrls: [
	'./customerhang.component.scss',
	'../../../../scss/header.scss',
		'../../../../scss/table.scss',
		'../../../../scss/condition.scss',
		'../../../../scss/pagination.scss'
	],
	providers: [CustomerHangService]
})
export class CustomerHangComponent { 
	
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

	condition:customerHang;

	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private CustomerHangService:CustomerHangService
	){
		this.condition = new customerHang();
	}

	ngOnInit(){
		console.log(1);
		
		this.versionId='';
		// this.versionType='3';
		// this.versionState='1';
		this.mandatoryUpgradeFlag='2';
		
	};
 search:any={
		pageSize:"10",
	 }
	
	
	// 分页
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
        
        this.search.pageSize = this.itemsPerPage+'';
        // this.getUserBackList();
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        // this.getUserBackList();
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.search.pageNum = event.page;
         // this.getRoles();
        // this.onSearch();
    };

}