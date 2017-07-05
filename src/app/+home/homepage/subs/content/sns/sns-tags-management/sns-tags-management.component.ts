import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'sns-tags-management',
	templateUrl: './sns-tags-management.component.html',
	styleUrls: ['./sns-tags-management.component.scss']
})
export class SnsTagsManagementComponent implements OnInit{ 
		constructor(private changeDetectorRef:ChangeDetectorRef){}

color = '#fff';
	height = '312px';
	msgNumbers = [{Number:'5'},{Number:'7'},{Number:'10'},{Number:'15'},{Number:'55'}];
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}
	ngOnInit(){
	};
 public stateCtrl:FormControl = new FormControl();

	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});

	public customSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false;
	public usernames:Array<string> = ["啊","吧","才"];
	public companys:Array<string> = ["的","呃"];
	public typeaheadOnSelect(e:any):void {
    console.log(e.item.value)
  }

// 分页
 public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=100;
	public itemsPerPage:number = 5;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){
		this.height = Number*40+120+'px';
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.height = Number*40+120+'px';
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody')
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any){
		//console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		allcheck.checked = false;
		this.color="#fff";
	};
//list状态切换

public changeState = function(listState:any,userList:any){
	if(listState.checked==true){
		userList.style.background = 'rgb(255, 255, 150)'

	}else{
		userList.style.background = 'rgb(255, 255, 255)'
	}
	console.log(userList.style.background)
}
//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
}