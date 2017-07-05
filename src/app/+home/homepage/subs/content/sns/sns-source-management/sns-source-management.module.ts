import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import {SnsSourceListComponent} from './subs/sns-source-list/sns-source-list.componment'
import {SnsSourceDetialComponent} from'./subs/sns-source-detial/sns-source-detial.componment'
import {SnsSourceManagementComponent} from'./sns-source-management.componment'

import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SnsSourceManagementRouting } from './sns-source-management-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(SnsSourceManagementRouting),
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		SnsSourceListComponent,
		SnsSourceDetialComponent,
		SnsSourceManagementComponent,
	]
})
export class SnsSourceManagementModule { }