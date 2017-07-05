import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule  } from 'ng2-bootstrap/ng2-bootstrap';
import {CalendarModule,PickListModule} from 'primeng/primeng';
import { InvoiceDetailsComponent } from'./subs/invoice-details/invoice-details.component';
import { OrderByAscPipe2 } from '../../../../../../pipes/orderByAsc2.pipes';

import { InvoiceManagementRouting } from './invoice-management-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(InvoiceManagementRouting),
		CalendarModule,PickListModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule
	],
	declarations: [
		InvoiceDetailsComponent,
		OrderByAscPipe2
	]
})
export class InvoiceManagementModule { }
