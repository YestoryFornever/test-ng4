import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import {UserBackComponent} from './user-back.component';
import {UserBackDetailComponent} from'./subs/user-back-detail/user-back-detail.component';
import {UserBackListComponent} from'./subs/user-back-list/user-back-list.component';
// import {SnsShareAddComponent} from'./subs/sns-share-add/sns-share-add.component'
import {InfoGroupEditComponent} from './subs/info-group-edit/info-group-edit.component'
import {InfoGroupListComponent} from './subs/info-group-list/info-group-list.component'
import {SendInfoComponent} from'./subs/send-info/send-info.component'
import {SendInfoDetialComponent} from './subs/send-info-detial/send-info-detial.component'
import {SendInfoListComponent} from './subs/send-info-list/send-info-list.component'
import {TimingInfoListComponent} from './subs/timing-info-list/timing-info-list.component'
import { CalendarModule,PickListModule, TreeModule,TreeNode} from 'primeng/primeng';

import { AlertModule,TabsetConfig,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule,  } from 'ng2-bootstrap/ng2-bootstrap';

import { UserBackRouting } from './user-back-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(UserBackRouting),
		CalendarModule,PickListModule, TreeModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [ 
		UserBackComponent,
		UserBackDetailComponent,
		UserBackListComponent,
		InfoGroupEditComponent,
		InfoGroupListComponent,
		SendInfoComponent,
		SendInfoDetialComponent,
		SendInfoListComponent,
		TimingInfoListComponent
	],
	providers: [
		TabsetConfig
	]
})
export class UserBackModule { }