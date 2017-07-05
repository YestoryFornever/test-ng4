import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { AuthMenuBtnSettingListService } from './services/auth-menu-btn-setting.service';
import { Organization } from './classes/organizations';
@Component({
	selector: 'alphain-auth-menu-btn-setting',
	templateUrl: 'auth-menu-btn-setting.component.html',
	styleUrls: [
		'./auth-menu-btn-setting.component.scss',
		'../../../../scss/header.scss'
	],
	providers:[AuthMenuBtnSettingListService]
})
export class AuthMenuBtnSettingComponent implements OnInit {
	constructor(private organizationListService:AuthMenuBtnSettingListService,private changeDetectorRef:ChangeDetectorRef) {}
	ngOnInit() {
	}
}