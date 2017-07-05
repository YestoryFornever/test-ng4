import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthRoleManageComponent } from './auth-role-manage.component';
import { AuthRoleManageAuthorizationComponent } from './subs/auth-role-manage-authorization/auth-role-manage-authorization.component';

import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule  } from 'ng2-bootstrap/ng2-bootstrap';
import { CalendarModule,PickListModule ,TreeModule,TreeNode} from 'primeng/primeng';
import { AuthRoleManageRouting } from './auth-role-manage-routing.module';
@NgModule({
	imports: [
FormsModule,
		CommonModule,
		RouterModule.forChild(AuthRoleManageRouting),
		AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule,
		CalendarModule,PickListModule,TreeModule

	],
	declarations: [
		AuthRoleManageComponent,
		AuthRoleManageAuthorizationComponent
	]
})
export class AuthRoleManageModule { }