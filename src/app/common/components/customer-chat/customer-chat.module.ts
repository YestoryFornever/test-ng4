import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../../app-common.module';
import { 
	UserMsgService,
	EaseMobService
} from'../../net-services';
import { ChatWindowService } from './chat-window/chat-window.service';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { UserMsgComponent } from './users-msg/user-msg.component';
@NgModule({
	exports:[
		UserMsgComponent,
		ChatWindowComponent
	],
	imports: [
		AppCommonModule,
		FormsModule,
		CommonModule
	],
	declarations: [
		ChatWindowComponent,
		UserMsgComponent
	],
	entryComponents: [
		ChatWindowComponent
	],
	providers: [
		UserMsgService,
		EaseMobService,
		ChatWindowService
	]
})
export class CustomerChatModule
{}


