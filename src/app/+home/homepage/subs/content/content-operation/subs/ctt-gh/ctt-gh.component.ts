// import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from '../../content-operation.service';
@Component({
	selector: 'ctt-gh',
	templateUrl: './ctt-gh.component.html',
	styleUrls: ['./ctt-gh.component.scss'],
})
export class CttGhComponent implements OnInit{
	constructor(
		private contentOperationService:ContentOperationService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
}
