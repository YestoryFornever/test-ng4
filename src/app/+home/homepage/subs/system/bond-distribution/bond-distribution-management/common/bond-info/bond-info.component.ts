// import {INCONFIG} from '../../../../../../../../../public/in.config';
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { BondDistributionService } from '../../../service/bond-distribution-service'

@Component({
	selector: 'bond-info',
	templateUrl: './bond-info.component.html',
	styleUrls: ['./bond-info.component.scss'],
	providers: [BondDistributionService]
})
export class BondInfoComponent implements OnInit{
	constructor(
		private bondDistributionService:BondDistributionService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	@Input()issuId:any;
	@Input()offering:boolean=true;
	@Input()enqrTp:any;
	errorMessage:any;
	baseInfo:any={
		bondNm:"",//"17上海仪电MTN001"
		dbtItmRtg:"",//"AA+"
		issuDtCrndayDys:0,//0
		issuNum:"",//"0.00"
		issuNumText:"",//"1500000000.00"
		lstDtCrndayDys:0,//0
		primUdwr:"",//"上海仪电(集团)有限公司"
		sbjRtg:"",//"AA+"
		sbrbIntrtLwrLmt:"",//"0.0000"
		sbrbIntrtLwrLmtBoder:"",//false
		sbrbIntrtUpLm:"",//"0.0000"
		sbrbIntrtUpLmBoder:"",//false
		trm:""//1096
	};
	ngOnInit(){
		//console.log(this.offering);
		this.bondDistributionService.getBondBarInfo({
			issuId:this.issuId,
		}).subscribe(
			res => {
				//console.log(res);
				this.baseInfo = res.data;
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
}
