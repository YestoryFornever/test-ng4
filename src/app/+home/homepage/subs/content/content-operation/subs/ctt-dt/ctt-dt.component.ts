import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from '../../content-operation.service';
@Component({
	selector: 'ctt-dt',
	templateUrl: './ctt-dt.component.html',
	styleUrls: ['./ctt-dt.component.scss'],
})
export class CttDtComponent implements OnInit{
	constructor(
		private contentOperationService:ContentOperationService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
}
