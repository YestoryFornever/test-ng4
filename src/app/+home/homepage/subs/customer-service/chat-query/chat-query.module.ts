import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,AutoCompleteModule} from 'primeng/primeng';
import { ChatQueryRouting } from './chat-query.routing';

import { ChatQueryComponent } from './chat-query.component';
import { ChatQueryService } from './chat-query.service';

import { CmmnModule } from '../../../common/cmmn.module';
@NgModule({
	imports: [
		RouterModule.forChild(ChatQueryRouting),
		CommonModule,
		FormsModule,
		HttpModule,
		CmmnModule,

		CalendarModule,
		AutoCompleteModule
	],
	declarations: [
		ChatQueryComponent,
	],
	providers: [ChatQueryService],
})
export class ChatQueryModule {}
