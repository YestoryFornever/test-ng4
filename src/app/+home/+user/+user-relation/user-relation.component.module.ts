import { NgModule } from '@angular/core';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import { UserRelationListComponent } from './user-relation-list/user-relation-list.component'
import { UserRelationDetailComponent } from './user-relation-detial/user-relation-detial.component'
import { UserRelationPlateComponent } from './user-relation-plate/user-relation-plate.component'
import { UserRelationLogComponent } from './user-relation-log/user-relation-log.component'
import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,
	TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule,
	TabsetConfig
} from 'ng2-bootstrap/ng2-bootstrap';
import { CalendarModule,PickListModule, TreeModule,TreeNode} from 'primeng/primeng';
import { routes } from './user-relation-routing.module';
import { UserRelationComponent } from './user-relation.component';

@NgModule({
	imports: [
		// SnsNewsManagementRouting,
		CommonModule,
		FormsModule,
		HttpModule,
		RouterModule.forChild(routes),
		CalendarModule,PickListModule, TreeModule,
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		UserRelationComponent,
		UserRelationListComponent,
		UserRelationDetailComponent,
		UserRelationLogComponent,
		UserRelationPlateComponent
	],
	providers: [
		TabsetConfig
	]
})
export class UserRelationComponentModule { }