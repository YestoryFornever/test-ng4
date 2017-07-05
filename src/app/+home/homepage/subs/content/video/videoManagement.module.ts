import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { RouterModule } from '@angular/router';
import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import {DataTableModule} from 'primeng/primeng';
import { CalendarModule,PickListModule, TreeModule,TreeNode,EditorModule,SharedModule} from 'primeng/primeng';
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule  } from 'ng2-bootstrap/ng2-bootstrap';

// import  = require("");
import {VideoManagementComponent} from './videoManagement.component'
import {VideoListComponent} from './video-list/video-list.component'
import { VideoDetialComponent } from './video-detial/video-detial.component';
import { videoType } from './pipe/videoType.pipe'

import { VideoManagementRouting } from './videoManagement-routing.module';
@NgModule({
	imports: [
CommonModule,
FormsModule,
		
		HttpModule,
		RouterModule.forChild(VideoManagementRouting),
		DataTableModule,
		FroalaEditorModule,FroalaViewModule,
		CalendarModule,PickListModule, TreeModule,EditorModule,SharedModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		VideoManagementComponent,
		VideoListComponent,
		VideoDetialComponent,
		videoType
	]
})
export class VideoManagementModule { }