import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthRoleManageComponent } from './auth-role-manage.component';
import { AuthRoleManageAuthorizationComponent } from './subs/auth-role-manage-authorization/auth-role-manage-authorization.component';
export const AuthRoleManageRouting: Routes = [
	{
		path: 'auth-role-manage',
		component: AuthRoleManageComponent
	},
	{
		path: 'auth-role-manange-authorization/:code',
		component: AuthRoleManageAuthorizationComponent
	}
];
