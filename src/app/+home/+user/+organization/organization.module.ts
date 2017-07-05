import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { FileUploadComponent } from '../../../common/components/file-upload/file-upload.component';
import { AppCommonModule } from '../../../common/app-common.module'

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
  DropdownModule,
  AutoCompleteModule,
  FileUploadModule ,
  ToggleButtonModule
} from 'primeng/primeng';
import { routes } from './organization.routes';

import { OrganizationComponent } from './organization.component'
import { OrganizationListComponent } from './organization-list/organization-list.component'
import { OrganizationDetialComponent } from './organization-detial/organization-detial.component'
import { OrganizationSynComponent } from './organization-syn/organization-syn.component'

@NgModule({ 
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
   OrganizationComponent,
   OrganizationListComponent,
   OrganizationDetialComponent,
   OrganizationSynComponent,
   // FileUploadComponent,
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
    FileUploadModule ,
    DropdownModule,
    ToggleButtonModule
  ],
})
export class OrganizationModule {
  public static routes = routes;
}
