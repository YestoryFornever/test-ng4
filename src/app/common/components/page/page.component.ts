import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Component({
	selector: 'page',
	templateUrl: 'page.component.html',
	styleUrls: [
		'./page.component.scss',
	],
})
export class PageComponent implements OnInit {
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	ngOnInit(){
		this.selectVal = this.pageObj.itemsPerPage;
	}
	selectVal:any;
	@Input()statistics:string='true';
	@Input()listNum:any=[10,20,30,50];
	// 分页
	@Input()firstText:string = '首页';
	@Input()lastText:string = '末页';
	@Input()previousText:string = '<';
	@Input()nextText:string = '>';
	@Input()pageObj:any = {
		maxSize:5,
		totalItems:NaN,
		currentPage:1,
		itemsPerPage:10,
		totalPages:NaN,
	};
	@Output()fnParent = new EventEmitter<string>();

	public sizeData(num:number){
		this.pageObj.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.pageObj.itemsPerPage = num;
		this.fnParent.emit();;
	};
	// 翻页
	public pageChanged(event:any):void {
		this.pageObj.currentPage = event.page;
		this.fnParent.emit();;
	};
	public pageNumChange(event:any){
		this.pageObj.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.pageObj.itemsPerPage = pageNo;
	};
}