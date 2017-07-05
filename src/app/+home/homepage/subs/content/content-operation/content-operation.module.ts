import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';
import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';

import { ContentOperationComponent } from './content-operation.component';
import { CmmnTitleComponent } from './subs/cmmn-title/cmmn-title.component';

import { ContentOperationService } from './content-operation.service';

import { ContentType } from './pipes/content-type.pipe';
import { CmmnModule } from '../../../common/cmmn.module';

import { CttZxComponent } from './subs/ctt-zx/ctt-zx.component';
import { CttWdComponent } from './subs/ctt-wd/ctt-wd.component';
import { CttDtComponent } from './subs/ctt-dt/ctt-dt.component';
import { CttGhComponent } from './subs/ctt-gh/ctt-gh.component';
import { CttZmtComponent } from './subs/ctt-zmt/ctt-zmt.component';
import { CttHdComponent } from './subs/ctt-hd/ctt-hd.component';
import { CttZpqzComponent } from './subs/ctt-zpqz/ctt-zpqz.component';
import { CttHypxComponent } from './subs/ctt-hypx/ctt-hypx.component';
import { CttSpComponent } from './subs/ctt-sp/ctt-sp.component';
@NgModule({
	declarations: [
		ContentOperationComponent,
		CmmnTitleComponent,
		ContentType,
		CttZxComponent,
		CttWdComponent,
		CttDtComponent,
		CttGhComponent,
		CttZmtComponent,
		CttHdComponent,
		CttZpqzComponent,
		CttHypxComponent,
		CttSpComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		RouterModule,
		CalendarModule,
		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot(),
		CmmnModule
	],
	exports:[CmmnTitleComponent],
	providers: [ContentOperationService],
})
export class ContentOperationModule { }