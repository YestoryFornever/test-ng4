import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CalendarModule,PickListModule} from 'primeng/primeng';
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AuditDetailsComponent } from'./subs/audit-details/audit-details.component';
import { OrderByAscPipe } from '../../../../../../pipes/orderByAsc.pipes';

import { CoinCommodityExchangeAuditRouting } from './coin-commodity-exchange-audit-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(CoinCommodityExchangeAuditRouting),
		TooltipModule,
		CalendarModule,PickListModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule
	],
	declarations: [
		AuditDetailsComponent,
		OrderByAscPipe
	]
})
export class CoinCommodityExchangeAuditModule { }
