import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule  } from 'ng2-bootstrap/ng2-bootstrap';

// import { ButtonsModule,DatepickerModule  } from 'ng2-bootstrap/ng2-bootstrap';
import {GroupManagementComponent} from './group-management.component';
import {GroupBuiltComponent} from './subs/group-built/group-built.component';
import {GroupCheckComponent} from './subs/group-check/group-check.component';
import {GroupSearchComponent} from './subs/group-search/group-search.component';
import {GroupEditMemberComponent} from './subs/group-edit-member/group-edit-member.component';
import {GroupEditMessageComponent} from './subs/group-edit-message/group-edit-message.component';
import { GroupManagementRouting } from './group-management-routing.module';
@NgModule({
    imports: [
FormsModule,
        CommonModule,
        RouterModule.forChild(GroupManagementRouting),
       AlertModule,DatepickerModule,ButtonsModule,CollapseModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,TabsModule
    ],
    declarations: [ 
        GroupManagementComponent,
        GroupBuiltComponent,
        GroupCheckComponent,
        GroupSearchComponent,
        GroupEditMemberComponent,
        GroupEditMessageComponent
    ]
})
export class GroupManagementModule{} 
