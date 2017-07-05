import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserEditComponent } from './user-edit.component';
import { FileUploadComponent } from './subs/file-upload/file-upload.component';

import { ButtonsModule,TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CalendarModule } from 'primeng/primeng';

import { SafeUrlPipe } from '../../../pipes/safeurl.pipes';
import { ApproveStatusPipe } from './pipes/approve-status.pipe';
import { UserStatusPipe } from './pipes/user-status.pipe';
import { VisitStatusPipe } from './pipes/visit-status.pipe';
import { AlertModule,DatepickerModule,CollapseModule,RatingModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routes } from './user-edit.routes';
@NgModule({
	imports: [
		CommonModule,
	    FormsModule,
	    RouterModule.forChild(routes),

		ButtonsModule,
		TypeaheadModule,
		CalendarModule,
		AlertModule,
		DatepickerModule,
		CollapseModule,
		RatingModule,
		PaginationModule,
		ModalModule,
		TabsModule,
		TooltipModule
	],
	declarations: [
		UserEditComponent,
		FileUploadComponent,

		SafeUrlPipe,
		ApproveStatusPipe,
		UserStatusPipe,
		VisitStatusPipe
	]
})
export class UserEditModule { 
	public static routes = routes;
}