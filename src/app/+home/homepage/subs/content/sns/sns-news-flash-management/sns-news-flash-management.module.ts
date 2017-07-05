import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import {SnsNewsFlashManagementComponent} from './sns-news-flash-management.component'
import {SnsNewsFlashListComponent} from'./subs/sns-news-flash-list/sns-news-flash-list.component'

import {SnsNewsFlashChangeComponent} from'./subs/sns-news-flash-change/sns-news-flash-change.componment'


import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule  } from 'ng2-bootstrap/ng2-bootstrap';

import { SnsNewsFlashManagementRouting } from './sns-news-flash-management-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(SnsNewsFlashManagementRouting),
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule
	],
	declarations: [
		SnsNewsFlashManagementComponent,
		SnsNewsFlashListComponent,
		SnsNewsFlashChangeComponent
	]
})
export class SnsNewsFlashManagementModule { }