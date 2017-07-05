import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'
import { RouterModule } from '@angular/router';

import { BondDistributionComponent } from './bond-distribution.component'
import { BondDistributionListComponent } from './bond-distribution-management/bond-distribution-list/bond-distribution-list.component'
import { BondDetialComponent } from './bond-distribution-management/bond-detial/bond-detial.component'
import { BondDistributionPandectComponent } from './bond-distribution-management/bond-distribution-pandect/bond-distribution-pandect.component'
import { SubscribeDetialComponent } from './bond-distribution-management/subscribe-detial/subscribe-detial.component'
import { SubscribeDetialUserComponent } from './bond-distribution-management/user-subscribe-detial/user-subscribe-detial.component'
import { CheckOrgComponent } from './role-configuration/check-org/check-org.component'
import { RoleManagementComponent } from './role-configuration/role-management-list/role-management-list.component';
import { BondAnalysisList } from './bond-distribution-management/bond-analysis/bond-analysis-list/bond-analysis.component'
import { BondDictionaryManagement } from './bond-distribution-management/bond-analysis/bond-dictionary-management/bond-dictionary-management.component'
import { Ng2Echarts } from 'ng2-echarts';
import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CalendarModule,PickListModule, TreeModule,TreeNode} from 'primeng/primeng';

import { BondInfoComponent } from './bond-distribution-management/common/bond-info/bond-info.component';
import { FirstBidInfoComponent } from './bond-distribution-management/common/first-bid-info/first-bid-info.component';
import { SwitchBtnsComponent } from './bond-distribution-management/common/switch-btns/switch-btns.component';

import { CmmnModule } from '../../../common/cmmn.module';
import { BondDistributionRouting } from './bond-distribution-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(BondDistributionRouting),
		CmmnModule,
		CalendarModule,PickListModule, TreeModule,
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		BondDistributionComponent,
		BondDistributionListComponent,
		BondDetialComponent,
		SubscribeDetialUserComponent,
		BondAnalysisList,
		BondDictionaryManagement,
		// BondDistributionPandectComponent,
		SubscribeDetialComponent,
		CheckOrgComponent,
		RoleManagementComponent,
		// Ng2Echarts,
		BondInfoComponent,
		FirstBidInfoComponent,
		SwitchBtnsComponent,
	]
})
export class BondDistribtionComponentModule { }