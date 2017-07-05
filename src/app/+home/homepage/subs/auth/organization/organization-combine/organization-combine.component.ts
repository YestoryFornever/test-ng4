import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'organization-combine',
	templateUrl: './organization-combine.component.html',
	styleUrls: ['./organization-combine.component.scss'],
})
export class OrganizationCombineComponent implements OnInit{ 
	constructor(private sanitizer: DomSanitizer,
				// private changeDetectorRef:ChangeDetectorRef,
				private router:Router,
				private activatedRoute:ActivatedRoute
				// private rdShowLiveStreamingService:rdShowLiveStreamingService,
				){}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['ids'];	
			console.log(id)
		})
	};
	ids:any
	turnToList(){
		this.router.navigate(['../../organization-list'],{relativeTo:this.activatedRoute}); 
	}
}