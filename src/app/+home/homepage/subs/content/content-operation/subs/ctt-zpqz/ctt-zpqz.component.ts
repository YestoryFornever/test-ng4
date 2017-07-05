// import {INCONFIG} from '../../../../../../../../public/in.config';
import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContentOperationService } from '../../content-operation.service';
@Component({
	selector: 'ctt-zpqz',
	templateUrl: './ctt-zpqz.component.html',
	styleUrls: ['./ctt-zpqz.component.scss'],
})
export class CttZpqzComponent implements OnInit{
	constructor(
		private contentOperationService:ContentOperationService,
		private changeDetectorRef:ChangeDetectorRef
	){}
	userInfo:any;
	errorMsg:any;
	ngOnInit(){
	}
}
