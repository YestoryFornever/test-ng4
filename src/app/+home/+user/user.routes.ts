import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAdministrateComponent } from './user-administrate/user-administrate.component';
import { UserApproveComponent } from './user-approve/user-approve.component';
import { UserApproveHistoryComponent } from './user-approve-history/user-approve-history.component';
import { UserLogComponent } from './user-log/user-log.component';
import { UserOperateComponent } from './user-operate/user-operate.component';
import { UserVipComponent } from './user-vip/user-vip.component';

export const routes = [
  { path: '', component: UserComponent,
    children: [
      { path: 'user-edit', loadChildren: './+user-edit#UserEditModule' },
      { path: 'user-relation', loadChildren: './+user-relation/user-relation.component.module#UserRelationComponentModule' },
      { path: 'user-administrate', component: UserAdministrateComponent },
      { path: 'user-approve', component: UserApproveComponent, },
      { path: 'user-approve-history', component: UserApproveHistoryComponent, },
      { path: 'user-back', loadChildren: './+user-back/user-back.module#UserBackModule' },
      { path: 'user-form', loadChildren: './+user-form/user-form.component.module#UserFormComponentModule' },
      { path: 'user-list', component: UserListComponent, },
      {
        path: 'user-list/:orgid',
        component: UserListComponent
      },
      {
        path: 'user-list/:orgid/:depid',
        component: UserListComponent
      },
      { path: 'user-log', component: UserLogComponent, },
      { path: 'user-operate', component: UserOperateComponent, },
      { path: 'user-vip', component: UserVipComponent },
    ],
  },
];
