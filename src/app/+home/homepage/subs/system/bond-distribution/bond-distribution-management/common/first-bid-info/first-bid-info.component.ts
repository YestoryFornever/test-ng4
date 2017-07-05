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
	selector: 'first-bid-info',
	templateUrl: './first-bid-info.component.html',
	styleUrls: ['./first-bid-info.component.scss'],
	providers: [BondDistributionService]
})
export class FirstBidInfoComponent implements OnInit{
	constructor(
		private bondDistributionService:BondDistributionService,
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	@Input()issuId:any;
	@Input()dstrBondId:any;
	errorMessage:any;
	baseInfo:any={
		sbrbTnum:"",//客户申购总量（单位元）
		sbrbIntrtLwrLmt:"",//客户申购利率下限（单位1）
		sbrbIntrtUpLm:"",//客户申购利率上限（单位1）
		whlTmsNum:"",//客户申购全场倍数
		bdyTmsNum:"",//客户申购边际倍数
		bdyIntrt:""//客户申购边际利率（单位1）
	};
	ngOnInit(){
		this.bondDistributionService.getCustSbrbStat({
			issuId:this.issuId,
			dstrBondId:this.dstrBondId
		}).subscribe(
			res => {
				console.log(res,'getCustSbrbStat');
				this.baseInfo = res.data;
			},
			error => {
				this.errorMessage = error;
			}
		);
	}
}
