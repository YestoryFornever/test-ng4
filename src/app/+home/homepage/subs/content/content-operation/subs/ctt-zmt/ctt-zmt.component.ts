// import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from '../../content-operation.service';
@Component({
	selector: 'ctt-zmt',
	templateUrl: './ctt-zmt.component.html',
	styleUrls: ['./ctt-zmt.component.scss'],
})
export class CttZmtComponent implements OnInit{
	constructor(
		private contentOperationService:ContentOperationService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
}
