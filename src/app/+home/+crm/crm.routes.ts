
import{CrmComponent} from './crm.component'
import { ContactListComponent } from './crm-contactList/crm-contactList.component'
import { ContactEditComponent } from './crm-contactEdit/crm-contactEdit.component'
import { ClientListComponent  } from './crm-clientList/crm-clientList.component'
import { SetPositionComponent } from './crm-setPosition/crm-setPosition.component'
import { CrmAllocationOrgComponent } from './crm-allocationOrg/crm-allocationOrg.component'
import { CrmActionListComponent } from './crm-actionList/crm-actionList.component'
import { CrmActionAddComponent } from './crm-actionAdd/crm-actionAdd.component'
export const routes = [
  { path: '', component: CrmComponent,
    children: [
      { path: 'contact-list', component: ContactListComponent, },
      { path: 'contact-edit', component: ContactEditComponent },
      { path: 'contact-edit/:id', component: ContactEditComponent },
      { path: 'client-list', component: ClientListComponent },
      { path: 'set-position', component: SetPositionComponent },
      { path: 'crm-allocationOrg/:id/:name', component: CrmAllocationOrgComponent },
      { path: 'action-list', component: CrmActionListComponent },
      { path: 'action-add', component: CrmActionAddComponent },
      // { path: 'user-edit', loadChildren: './+user-edit#UserEditModule' },
      // { path: 'user-relation', loadChildren: './+user-relation/user-relation.component.module#UserRelationComponentModule' },
    ],
  },
];