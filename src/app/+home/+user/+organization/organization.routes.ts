
import { OrganizationComponent } from './organization.component'
import { OrganizationListComponent } from './organization-list/organization-list.component'
import { OrganizationDetialComponent } from './organization-detial/organization-detial.component'
import { OrganizationSynComponent } from './organization-syn/organization-syn.component'

export const routes = [
  { path: '', component: OrganizationComponent,
    children: [
      { path: 'organization-list', component: OrganizationListComponent, },
      { path: 'organization-detial/:id', component: OrganizationDetialComponent },
      { path: 'organization-syn', component: OrganizationSynComponent },
      // { path: 'user-edit', loadChildren: './+user-edit#UserEditModule' },
      // { path: 'user-relation', loadChildren: './+user-relation/user-relation.component.module#UserRelationComponentModule' },
    ],
  },
];