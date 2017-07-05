import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import {SnsShareManagementComponent} from './sns-share-management.componment'
import {SnsShareDetailsComponent} from'./subs/sns-share-detilas/sns-share-details.component'
import {SnsShareListComponent} from'./subs/sns-share-list/sns-share-list.component'
import {SnsShareAddComponent} from'./subs/sns-share-add/sns-share-add.component'
import {SuTypePipe} from './pipe/SuTypePipe.pipe'

import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SnsShareManagementRouting } from './sns-share-management-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(SnsShareManagementRouting),
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		SnsShareManagementComponent,
		SnsShareDetailsComponent,
		SnsShareListComponent,
		SnsShareAddComponent,
		SuTypePipe
	]
})
export class SnsShareManagementModule { }