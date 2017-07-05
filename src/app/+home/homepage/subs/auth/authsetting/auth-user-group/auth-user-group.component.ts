import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { AuthUserGroupService } from './services/auth-user-group.service';
import { Group } from './classes/groups';
@Component({
	selector: 'alphain-auth-user-group',
	templateUrl: 'auth-user-group.component.html',
	styleUrls: [
		'./auth-user-group.component.scss',
		'../../../../scss/header.scss',
		'../../../../scss/table.scss',
		'../../../../scss/pagination.scss'
	],
	providers:[AuthUserGroupService]
})
export class AuthUserGroupComponent implements OnInit {
	constructor(private authUserGroupService:AuthUserGroupService,private changeDetectorRef:ChangeDetectorRef) {
	}
	ngOnInit(){
		this.getGroups();
	}

	groupName:string;
	errorMsg:string;
	groups:Group[];
	groupsLength:number;
	getGroups(){
		this.authUserGroupService.getGroups(
			this.groupName
		).subscribe(
			groups => this.groups = groups,
			error => this.errorMsg = <any>error
		);
	}
	// ��ҳ
	height = '312px';
	msgNumbers = [{Number:'5'},{Number:'7'},{Number:'10'},{Number:'15'},{Number:'55'}];
	public firstText:string = '��ҳ';
	public lastText:string = 'ĩҳ';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=100;
	public itemsPerPage:number = 5;
	public currentPage:number=1;
	public totalPages:number;
	public sizeData(Number:any){
		this.height = Number*40+120+'px';
		this.currentPage = 1;//�޷�ͬʱ�޸ĵ�ǰҳ��ÿҳ����
		this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
	};
	// ��ҳ
	public pageChanged(event:any,allcheck:any):void {
		//console.log(event);
	};
	public pageNumChange(event:any){
		//console.log(event);
		this.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
}