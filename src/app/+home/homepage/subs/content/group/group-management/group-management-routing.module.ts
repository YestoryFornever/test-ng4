import { Routes } from '@angular/router';
import {GroupManagementComponent} from './group-management.component';
import {GroupBuiltComponent} from './subs/group-built/group-built.component';
import {GroupCheckComponent} from './subs/group-check/group-check.component';
import {GroupSearchComponent} from './subs/group-search/group-search.component';
import {GroupEditMemberComponent} from './subs/group-edit-member/group-edit-member.component';
import {GroupEditMessageComponent} from './subs/group-edit-message/group-edit-message.component';
export const GroupManagementRouting: Routes = [
    {
        path: 'group-management', 
        component: GroupManagementComponent,
        children:[
            {
                path:'',
                redirectTo: 'group-search',  
                pathMatch: 'full'
            },
            {
                path:'group-check',
                component: GroupCheckComponent
            },
            {
                path:'group-check/:groupGrpid',
                component: GroupCheckComponent
            },
            {
                path:'group-search',
                component: GroupSearchComponent
            },

            {
                path:'group-built',
                component: GroupBuiltComponent
            },
            {
                path:'group-edit-member',
                component: GroupEditMemberComponent
            },
            {
                path:'group-edit-member/:groupid',
                component: GroupEditMemberComponent
            },    
            {
                path:'group-edit-message',
                component: GroupEditMessageComponent
            },
            {
                path:'group-edit-message/:groupid',
                component: GroupEditMessageComponent
            },                 
            
        ]
    }
];
// export const GroupManagementRouting = RouterModule.forRoot(GroupManagementRoutes);