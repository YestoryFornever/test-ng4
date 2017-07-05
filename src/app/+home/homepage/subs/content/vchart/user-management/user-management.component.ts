import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'user-management',
	templateUrl: './user-management.component.html',
	styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit{ 
	ngOnInit(){
	};
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
		// this.changeDetectorRef.detectChanges();
		// this.serch()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any){
		// this.default.pageSize=this.itemsPerPage;
		// this.serch()
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
	// 类管理
	hideLoad:any = true
	hideList:any =  true
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
}