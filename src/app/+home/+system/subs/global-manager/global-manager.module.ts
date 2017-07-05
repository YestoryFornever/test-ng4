import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';
import { GlobalManagerRouting } from './subs/global-manager.routing';

import { DataExportComponent } from './subs/data-export/data-export.component';
import { GlobalManagerService } from './global-manager.service';

import { CmmnModule } from '../../../homepage/common/cmmn.module';
@NgModule({
	declarations: [
		DataExportComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		// RouterModule.forChild(GlobalManagerRouting),
		CmmnModule
	],
	providers: [GlobalManagerService],
})
export class GlobalManagerModule {}
