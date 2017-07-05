import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import {CustomerManageAllocationComponent} from './subs/customer-manage-allocation/customer-manage-allocation.component';
import {CustomerManageListComponent} from './subs/customer-manage-list/customer-manage-list.component'
import {CustomerManageSerchComponent} from './subs/customer-manage-serch/customer-manage-serch.component'
import {CustomerManageComponent} from './customer-manage.component'

import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule  } from 'ng2-bootstrap/ng2-bootstrap';

import { CustomerManageRouting } from './customer-manage-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(CustomerManageRouting),
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		CustomerManageAllocationComponent,
		CustomerManageListComponent,
		CustomerManageSerchComponent,
		CustomerManageComponent
	]
})
export class CustomerManageModule {  }