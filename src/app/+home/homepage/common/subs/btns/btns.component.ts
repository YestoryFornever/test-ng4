import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,Input,ApplicationRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'btns',
	templateUrl: './btns.component.html',
	styleUrls: ['./btns.component.scss'],
})
export class BtnsComponent implements OnInit{
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private applicationRef:ApplicationRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	@Input()allName:String="全部";
	@Input()btnsModel:any;
	@Input()btnsPattern:any = [];
	ngOnInit(){
		let allChecked = true;
		this.btnsPattern.forEach((item:any)=>{
			allChecked=item['check']=this.btnsModel.includes(item['id']);
		});
		allChecked && this.clickAll();
	}
	allChecked:any = '0';
	
	clickAll(){
		this.allChecked = '0';
		this.btnsModel.length=0;
		this.btnsPattern.forEach((item:any)=>{
			item['check']=false;
			this.btnsModel.push(item['id']);
		});
	}
	clickOther(cur:any){
		this.allChecked = '1';
		this.btnsModel.length = 0;
		this.btnsPattern.forEach((item:any)=>{
			item['check'] && this.btnsModel.push(item['id']);
		});
	}
}
