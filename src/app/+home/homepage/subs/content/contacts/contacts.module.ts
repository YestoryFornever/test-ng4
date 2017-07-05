import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule}     from '@angular/http';

import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {AngularEchartsModule} from "ngx-echarts";
import {
  DataTableModule,
  CalendarModule,
  PickListModule,
  TreeModule,
  TreeNode,
  EditorModule,
  SharedModule,
  SelectButtonModule,
  InputTextModule,
  AutoCompleteModule,
  CheckboxModule,
  ConfirmDialogModule,
  ConfirmationService,
  DialogModule,
  FileUploadModule
} from 'primeng/primeng';
import {
  AlertModule,
  CarouselModule,
  DatepickerModule,
  ButtonsModule,
  CollapseModule,
  RatingModule,
  TypeaheadModule,
  PaginationModule,
  ModalModule,
  TabsModule,
  TooltipModule,
  BsDropdownModule
} from 'ng2-bootstrap/ng2-bootstrap';
import {ContactsComponent} from "./contacts.component";
import {contactsServices} from "./contacts.services";
import {ContactsRouting} from './contacts.routing.modules';
import {UsersListComponent} from "./subs/users-list.component";
import {NumbersManageComponent} from "./subs/numbers-manage.component";
import {DataStatisticsComponent} from "./subs/data-statistics.component";
import {ChatSearchComponent} from "./subs/chat-search.component";
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(ContactsRouting),
    FormsModule,
    CalendarModule, PickListModule, TreeModule, EditorModule,
    AlertModule, CarouselModule, DatepickerModule, ButtonsModule, CollapseModule, RatingModule, TypeaheadModule, PaginationModule, ModalModule, TabsModule, TooltipModule,
    DataTableModule,
    SharedModule,
    SelectButtonModule,
    InputTextModule,
    AutoCompleteModule,
    CheckboxModule,
    BsDropdownModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
    AngularEchartsModule
  ],
  declarations: [
    ContactsComponent,
    UsersListComponent,
    NumbersManageComponent,
    DataStatisticsComponent,
    ChatSearchComponent
  ],
  providers: [
    contactsServices,
    ConfirmationService
  ]
})
export class ContactsModule {
}
