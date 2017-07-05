import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import {DataTableModule} from 'primeng/primeng';
import { RdShowLiveStreamingListComponent }  from './subs/rdShow-liveStreaming/rdShow-liveStreaming-list/rdShow-liveStreaming-list.component'
import { RdShowLiveStreamingEditComponent }  from './subs/rdShow-liveStreaming/rdShow-liveStreaming-edit/rdShow-liveStreaming-edit.component'
import { LiveStreamingComponent } from './live-streaming.component'
import { LiveStreamingDetialComponent } from './subs/rdShow-liveStreaming/rdShow-liveStreaming-detial/rdShow-liveStreaming-detial.component'
import { CalendarModule,PickListModule, TreeModule,TreeNode,EditorModule,SharedModule} from 'primeng/primeng';
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule  } from 'ng2-bootstrap/ng2-bootstrap';
import { TimeChangePipe } from'./subs/pies/secondToTime.pies'
import { showTypePies } from './subs/pies/showType.pies'
import { LiveStreamingRouting } from './live-streaming-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		HttpModule,
		RouterModule.forChild(LiveStreamingRouting),
		DataTableModule,
		FroalaEditorModule,FroalaViewModule,
		CalendarModule,PickListModule, TreeModule,EditorModule,SharedModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		RdShowLiveStreamingListComponent,
		RdShowLiveStreamingEditComponent,
		LiveStreamingComponent,
		LiveStreamingDetialComponent,
		TimeChangePipe,
		showTypePies
	]
})
export class LiveStreamingModule { }