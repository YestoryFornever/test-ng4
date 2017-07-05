import {Routes} from '@angular/router';
import {ContactsComponent} from "./contacts.component";
import {UsersListComponent} from "./subs/users-list.component";
import {NumbersManageComponent} from "./subs/numbers-manage.component";
import {DataStatisticsComponent} from "./subs/data-statistics.component";
import {ChatSearchComponent} from "./subs/chat-search.component";
export const ContactsRouting: Routes = [{
  path: 'contacts',
  component: ContactsComponent,
  children: [
    {
      path: '',
      redirectTo: 'contacts-list',
      pathMatch: 'full'
    },
    {
      path: 'contacts-list',
      component: UsersListComponent
    },
    {
      path: "numbers-manage",
      component: NumbersManageComponent
    },
    {
      path: "data-statistics",
      component: DataStatisticsComponent
    },
    {
      path: "chat-search",
      component: ChatSearchComponent
    },
    // {
    //     path: 'user-detail/:id',
    //     component: ContactsDetailComponent
    // },
    // {
    //     path: "contacts-add",
    //     component: ContactsAddComponent
    // },
    // {
    //     path: "contacts-manage",
    //     component: ContactsManageComponent
    // }
  ]
}];


