// import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from '../../content-operation.service';
@Component({
	selector: 'ctt-hd',
	templateUrl: './ctt-hd.component.html',
	styleUrls: ['./ctt-hd.component.scss'],
})
export class CttHdComponent implements OnInit{
	constructor(
		private contentOperationService:ContentOperationService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
}
