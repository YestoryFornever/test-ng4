import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
import { 
	AlertModule,
	DatepickerModule,
	ButtonsModule,
	CollapseModule,
	RatingModule,
	TypeaheadModule,
	PaginationModule,
	ModalModule,
	TabsModule ,
	TooltipModule
} from 'ng2-bootstrap';
import { CalendarModule,PickListModule, TreeModule,TreeNode} from 'primeng/primeng';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';

import { BtnsComponent } from './components/btns/btns.component';
import { PageComponent } from './components/page/page.component';
import { FileUploadComponent } from'./components/file-upload/file-upload.component'
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
import { SafeUrlPipe } from './pipes/safeurl.pipe';

import { provinceCityComponent } from './components/province-city/province-city.component'
import { 
	StorageService,
	ProxyRequestService,
	UserStatusService,
	UserAuthService,
	CanLoginIn,
	MenuService,
} from './app-services';

import { 
	NetCrmService,
	NetUserService
} from'./net-services'
@NgModule({
	exports:[
		BtnsComponent,
		PageComponent,
		provinceCityComponent,
		FileUploadComponent,
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
		SafeUrlPipe,
		JWBootstrapSwitchModule,
		CalendarModule, PickListModule, TreeModule,
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	imports: [
		FormsModule,
		CommonModule,
		HttpModule,
		PaginationModule,
		ButtonsModule
	],
	declarations: [
		BtnsComponent,
		PageComponent,
		provinceCityComponent,
		FileUploadComponent,
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
		SafeUrlPipe,
	],
	providers: [
		StorageService,
		ProxyRequestService,
		NetCrmService,
		UserStatusService,
		UserAuthService,
		NetUserService,
		CanLoginIn,
		MenuService
	]
})
export class AppCommonModule { }