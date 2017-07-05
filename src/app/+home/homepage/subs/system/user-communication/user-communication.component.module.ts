import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import { UserCommunicationDetialComponent } from './subs/user-communication-detial/user-communication-detial.component'
import { UserCommunicationListComponent } from './subs/user-communication-list/user-communication-list.component'
import { UserCommunicationRelationComponent } from './subs/user-communication-relation/user-communication-relation.component'
import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CalendarModule,PickListModule, TreeModule,TreeNode} from 'primeng/primeng';

import { UserCommunicationRouting } from './user-communication-routing.module';
@NgModule({
	imports: [
FormsModule,
		// SnsNewsManagementRouting,
		CommonModule,
		HttpModule,
		RouterModule.forChild(UserCommunicationRouting),
		CalendarModule,PickListModule, TreeModule,
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		UserCommunicationDetialComponent,
		UserCommunicationListComponent,
		UserCommunicationRelationComponent,
	]
})
export class UserCommunicationComponentModule { }