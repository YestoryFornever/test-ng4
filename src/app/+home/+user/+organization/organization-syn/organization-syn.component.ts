import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style} from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { NetCrmService } from '../../../../common/net-services/net-crm.service'
import {INCONFIG} from '../../../../public/in.config';


@Component({
	selector: 'organization-syn',
	templateUrl: './organization-syn.component.html',
	styleUrls: [
				'./organization-syn.component.scss',
				'../../../../common/scss/typical-list/header.scss',
				'../../../../common/scss/typical-list/order.scss',
				'../../../../common/scss/typical-list/condition.scss',
				'../../../../common/scss/typical-list/table.scss',
				],
	// providers:[NetCrmService]
})
export class OrganizationSynComponent implements OnInit{
	private UserInfo:any;
	constructor(
				public netCrmService:NetCrmService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router) {}
	ngOnInit(){
		// this.getPositionList()
	}
}