import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule,BsDropdownConfig,PaginationConfig,TooltipConfig,TabsetConfig } from 'ng2-bootstrap';
import { CalendarModule,PickListModule, TreeModule,TreeNode,DropdownModule} from 'primeng/primeng';

import { BtnsComponent } from './subs/btns/btns.component';
import { PageComponent } from './subs/page/page.component';

import { bondTp } from './pipes/bond-tp.pipe';
import { hldgPct } from './pipes/hldg-pct.pipe';
import { intpymtFrq } from './pipes/intpymt-frq.pipe';
import { intrtTp } from './pipes/intrt-tp.pipe';
import { roleId } from './pipes/role-id.pipe';
import { sbjTp } from './pipes/sbj-tp.pipe';
import { wrghtTp } from './pipes/wrght-tp.pipe';
import { EntpTpPipe } from './pipes/entp-tp.pipe';
import { EnqrTpPipe } from './pipes/enqr-tp.pipe';
import { RealNmPipe } from './pipes/real-nm-status.pipe';
import { TrustHtmlPipe } from './pipes/trust-html.pipe';
import { teamEstatusPipe } from './pipes/team-estatus.pipe';

@NgModule({
	exports:[
		BtnsComponent,
		PageComponent,

		bondTp,
		hldgPct,
		intpymtFrq,
		intrtTp,
		roleId,
		sbjTp,
		wrghtTp,
		EntpTpPipe,
		EnqrTpPipe,
		RealNmPipe,
		TrustHtmlPipe,
		teamEstatusPipe,

		CalendarModule, PickListModule, TreeModule, DropdownModule,
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	imports: [
		FormsModule,
		CommonModule,
		HttpModule,
		PaginationModule.forRoot(),
		ButtonsModule.forRoot()
	],
	declarations: [
		BtnsComponent,
		PageComponent,

		bondTp,
		hldgPct,
		intpymtFrq,
		intrtTp,
		roleId,
		sbjTp,
		wrghtTp,
		EntpTpPipe,
		EnqrTpPipe,
		RealNmPipe,
		TrustHtmlPipe,
		teamEstatusPipe,
	],
	providers:[
		BsDropdownConfig,
		PaginationConfig,
		TooltipConfig,
		TabsetConfig
	]
})
export class CmmnModule { }