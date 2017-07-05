import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { FileUploadComponent } from '../../common/components/file-upload/file-upload.component';
import { AppCommonModule } from '../../common/app-common.module'
import { orgAllocationType } from './pipe/orgAllocationType.pipe'
import { actionType } from './pipe/actionType.pipe'
import { conType } from './pipe/conType.pipe'
import { 
  TypeaheadModule,
  AlertModule,
  ButtonsModule,
  TooltipModule,
  CollapseModule,
  PaginationModule,
  ModalModule,
  DatepickerModule,
  TabsModule,
  TooltipConfig
} from 'ng2-bootstrap';
import { 
  MultiSelectModule,
  CalendarModule,
  PickListModule, 
  TreeModule,
  TreeNode,
  AutoCompleteModule,
  FileUploadModule 
} from 'primeng/primeng';
import { routes } from './crm.routes';

import { CrmComponent } from './crm.component'
import { ContactListComponent } from './crm-contactList/crm-contactList.component'
import { ContactEditComponent } from './crm-contactEdit/crm-contactEdit.component'
import { ClientListComponent  } from './crm-clientList/crm-clientList.component'
import { SetPositionComponent } from './crm-setPosition/crm-setPosition.component'
import { CrmAllocationOrgComponent } from './crm-allocationOrg/crm-allocationOrg.component'
import { CrmActionListComponent } from './crm-actionList/crm-actionList.component'
import { CrmActionAddComponent } from './crm-actionAdd/crm-actionAdd.component'

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    CrmComponent,
    ContactEditComponent,
    ContactListComponent,
    ClientListComponent,
    SetPositionComponent,
    CrmAllocationOrgComponent,
    CrmActionListComponent,
    CrmActionAddComponent,
    // FileUploadComponent,
    orgAllocationType,
    actionType,
    conType
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
    AppCommonModule,
    MultiSelectModule,
    CalendarModule,
    PickListModule, 
    TreeModule,
    AutoCompleteModule,
    FileUploadModule 
  ],
})
export class CrmModule {
  public static routes = routes;
}
