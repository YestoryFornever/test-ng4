import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import {ActionManageDetialComponent} from './subs/action-manage-detial/action-manage-detial.component';
import {ActionManageListComponent} from './subs/action-manage-list/action-manage-list.component'
import {ActionManageComponent} from './action-manage.component'
import {CalendarModule} from 'primeng/primeng';

import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule  } from 'ng2-bootstrap/ng2-bootstrap';

import { ActionManageRouting } from './action-manage-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(ActionManageRouting),
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
		,CalendarModule
	],
	declarations: [
		ActionManageListComponent,
		ActionManageComponent,
		ActionManageDetialComponent
	]
})
export class ActionManageModule { }