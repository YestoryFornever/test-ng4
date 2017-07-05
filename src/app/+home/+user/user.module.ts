import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { 
    AlertModule,
    DatepickerModule,
    ButtonsModule,
    CollapseModule,
    RatingModule,
    TypeaheadModule,
    PaginationModule,
    ModalModule,
    TabsModule,
    TooltipModule,
    TooltipConfig
} from 'ng2-bootstrap';
import {
  PickListModule,
  CheckboxModule,
  DropdownModule
} from 'primeng/primeng';
import { AppCommonModule } from 'app/common/app-common.module';
import { routes } from './user.routes';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAdministrateComponent } from './user-administrate/user-administrate.component';
import { UserApproveComponent } from './user-approve/user-approve.component';
import { UserApproveHistoryComponent } from './user-approve-history/user-approve-history.component';
import { UserLogComponent } from './user-log/user-log.component';
import { UserOperateComponent } from './user-operate/user-operate.component';
import { UserVipComponent } from './user-vip/user-vip.component';
import { OrganizationModule } from './+organization/organization.module'
@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    UserComponent,
    UserListComponent,
    UserAdministrateComponent,
    UserApproveComponent,
    UserApproveHistoryComponent,
    UserLogComponent,
    UserOperateComponent,
    UserVipComponent
  ],
  providers: [
    TooltipConfig,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TypeaheadModule,AlertModule,ButtonsModule,TooltipModule,
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    DatepickerModule,
    TabsModule,
    PickListModule,
    CheckboxModule,
    AppCommonModule,
    OrganizationModule,
    DropdownModule
  ],
})
export class UserModule {
  public static routes = routes;
}
