import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';

import { ChatQueryRouting } from './chat-query/chat-query.routing';
import { ChatQueryModule } from './chat-query/chat-query.module';

import { CmmnModule } from '../../common/cmmn.module';
@NgModule({
	declarations: [
		// CustomerServiceComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		CmmnModule,
		RouterModule.forChild(ChatQueryRouting),

		ChatQueryModule
	],
	// providers: [CustomerServiceService],
})
export class CustomerServiceModule {}
