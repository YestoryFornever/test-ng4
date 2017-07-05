import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
// import { BannerManagementService } from './banner-management-service/banner-management.service'
@Component({
	selector: 'user-relation',
	templateUrl: './user-relation.component.html',
	styleUrls: ['./user-relation.component.scss'],
	// providers: [BannerManagementService]
})
export class UserRelationComponent implements OnInit{ 
	ngOnInit(){
	};
}