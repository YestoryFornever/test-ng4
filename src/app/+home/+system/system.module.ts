import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';
import { SystemRouting } from './system.routing';

import { SystemService } from './system.service';

import { GlobalManagerModule } from './subs/global-manager/global-manager.module';

import { CmmnModule } from '../homepage/common/cmmn.module';
@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		RouterModule.forChild(SystemRouting),
		GlobalManagerModule,
		CmmnModule
	],
	providers: [SystemService],
})
export class SystemModule {
	public static SystemRouting = SystemRouting;
}
