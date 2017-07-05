import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule  } from 'ng2-bootstrap/ng2-bootstrap';
import { CmmnModule } from'../../../../../homepage/common/cmmn.module'

import { RouterModule } from '@angular/router';
import { CalendarModule,PickListModule } from 'primeng/primeng';
import { CoinIssueComponent } from'./subs/coin-issue/coin-issue.component';
import { CoinListComponent } from './subs/coin-list/coin-list.component';
import { CoinPermissionsComponent } from './subs/coin-permissions/coin-permissions.component'
import { NumAddCommaPipe2 } from '../../../../../../pipes/numAddComma2.pipes';

import { CoinGoldDetailRouting } from './coin-gold-detail-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		CmmnModule,
		HttpModule,
		RouterModule.forChild(CoinGoldDetailRouting),
		CalendarModule,PickListModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		CoinIssueComponent,
		CoinListComponent,
		CoinPermissionsComponent,
		NumAddCommaPipe2
	]
})
export class CoinGoldDetailModule { }
