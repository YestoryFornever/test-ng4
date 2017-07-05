
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
// import { rdShowLiveStreamingService } from '../../../services/rdShow-liveStreaming.services'

@Component({
	selector: 'video-management',
	templateUrl: './videoManagement.component.html',
	// styleUrls: ['./'],
	// providers: [rdShowLiveStreamingService]
})
export class VideoManagementComponent implements OnInit{

	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				// private rdShowLiveStreamingService:rdShowLiveStreamingService,
        		private router:Router) {}
	ngOnInit(){

	}
}