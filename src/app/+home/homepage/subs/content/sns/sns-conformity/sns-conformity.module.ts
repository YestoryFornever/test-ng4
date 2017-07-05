import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';

import { SnsConformity } from './sns-conformity.component'

import { SnsConformityChoiceness } from './sns-conformity-choiceness/sns-conformity-choiceness-component'

import { SnsConformityDaily } from './sns-conformity-daily/sns-conformity-daily-component'

import { SnsConformitySweeping } from './sns-conformity-sweeping/sns-conformity-sweeping-component'

import { SnsConformitySweepingEdit } from './sns-conformity-sweeping-edit/sns-conformity-sweeping-edit.component'

import { SnsConformityChoicenessEdit } from './sns-conformity-choiceness-edit/sns-conformity-choiceness-edit'

import { SnsConformityClassify } from './sns-conformity-classify/sns-conformity-classify.component'

import { SnsConformityOrgBondAttention } from './sns-conformity-orgBondAttention/sns-conformity-orgBondAttention.component'

import { delCommaPipe } from './pies/delComma.pie'

import { Ng2Echarts } from 'ng2-echarts';
import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CalendarModule,PickListModule,RatingModule, TreeModule,TreeNode,ButtonModule} from 'primeng/primeng';
import { SnsConformityRouting } from './sns-conformity-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(SnsConformityRouting),
		// 
		CalendarModule,PickListModule, TreeModule,
		AlertModule,DatepickerModule,ButtonsModule,ButtonModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		SnsConformity,
		SnsConformityChoiceness,
		SnsConformityDaily,
		SnsConformitySweeping,
		SnsConformitySweepingEdit,
		SnsConformityChoicenessEdit,
		SnsConformityClassify,
		SnsConformityOrgBondAttention,
		delCommaPipe
	]
})
export class SnsConformityModule { }