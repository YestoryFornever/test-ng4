import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { CommonModule } from '@angular/common';
// import {SnsNewsManagementRouting} from './sns-news-management-routing.module'

import { RouterModule } from '@angular/router';
import {PickListModule} from 'primeng/primeng';
import { UserFormEditComponent } from './user-form-edit/user-form-edit.component'
import { UserFormListComponent } from './user-form-list/user-form-list.component'
import { UserFormAddUserComponent } from './user-form-addUser/user-form-addUser.component' 
import { UserFormAddFormComponent } from './user-form-addForm/user-form-addForm.component' 
import { UserFormVipComponent } from './user-form-vip/user-form-vip.component'
import { UserFormVipEditComponent } from './user-form-vipEdit/user-form-vipEdit.component'
import {AutoCompleteModule} from 'primeng/primeng';
import { AlertModule,TabsetConfig,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TimePipe } from '../../../../../../pipes/time.pies';
import { UserFormRouting } from './user-form-routing.module';
import { UserFormComponent } from './user-form.component';
import {AppCommonModule} from'../../../common/app-common.module'
@NgModule({
	imports: [
FormsModule,
		// SnsNewsManagementRouting,
		PickListModule,
		CommonModule,
		HttpModule,
		AppCommonModule,
		RouterModule.forChild(UserFormRouting),
		AutoCompleteModule,
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,TooltipModule
	],
	declarations: [
		UserFormEditComponent,
		UserFormListComponent,
		UserFormAddUserComponent,
		UserFormAddFormComponent,
		UserFormVipComponent,
		UserFormVipEditComponent,
		UserFormComponent
		// TimePipe
	],
	providers:[
	TabsetConfig
	]
})
export class UserFormComponentModule { }