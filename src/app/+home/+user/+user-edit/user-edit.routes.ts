import { UserEditComponent } from './user-edit.component';

export const routes = [
  { path: '', component: UserEditComponent },
  {
		path: ':id',
		component: UserEditComponent
	},
	{
		path: ':id/:userType',
		component: UserEditComponent
	},
];
