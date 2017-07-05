import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';


@Component({
	selector: 'sns-conformity',
	templateUrl: './sns-conformity.component.html',
	styleUrls: ['./sns-conformity.component.scss'],
	// providers: [UserBackServices]
})

export class SnsConformity{
	constructor(
		
				// private userBackServices:UserBackServices,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}

		
	}

