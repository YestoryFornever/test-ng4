import {Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ContactsComponent} from "./contacts.component";
import {ContactsListComponent} from "./subs/contacts-list.component";
import {ContactsDetailComponent} from "./subs/contacts-detail.component";
import {ContactsAddComponent} from "./subs/contacts-add.component";
import {ContactsManageComponent} from "./subs/contacts-manage.component";
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
            component: ContactsListComponent
        },
        {
            path: 'contacts-detail/:id',
            component: ContactsDetailComponent
        },
        // {
        //     path: 'contacts-detail',
        //     component: ContactsDetailComponent
        // },
        {
            path: "contacts-add",
            component: ContactsAddComponent
        },
        {
            path: "contacts-manage",
            component: ContactsManageComponent
        }
    ]
}];




