import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContentOperationComponent } from './content-operation.component';
import { CttZxComponent } from './subs/ctt-zx/ctt-zx.component';
import { CttWdComponent } from './subs/ctt-wd/ctt-wd.component';
import { CttDtComponent } from './subs/ctt-dt/ctt-dt.component';
import { CttGhComponent } from './subs/ctt-gh/ctt-gh.component';
import { CttZmtComponent } from './subs/ctt-zmt/ctt-zmt.component';
import { CttHdComponent } from './subs/ctt-hd/ctt-hd.component';
import { CttZpqzComponent } from './subs/ctt-zpqz/ctt-zpqz.component';
import { CttHypxComponent } from './subs/ctt-hypx/ctt-hypx.component';
import { CttSpComponent } from './subs/ctt-sp/ctt-sp.component';
export const ContentOperationRouting: Routes = [
	{
		path: 'content-operation',
		component: ContentOperationComponent,
		/*children:[
			{
				path:'',
				redirectTo: 'ctt-zx', 
				pathMatch: 'full'
			},
			{
				path: 'ctt-zx',
				component: CttZxComponent,
			},
			{
				path: 'ctt-wd',
				component: CttWdComponent
			},
			{
				path: 'ctt-dt',
				component: CttDtComponent
			},
			{
				path: 'ctt-gh',
				component: CttGhComponent
			},
			{
				path: 'ctt-zmt',
				component: CttZmtComponent
			},
			{
				path: 'ctt-hd',
				component: CttHdComponent
			},
			{
				path: 'ctt-zpqz',
				component: CttZpqzComponent
			},
			{
				path: 'ctt-hypx',
				component: CttHypxComponent
			},
			{
				path: 'ctt-sp',
				component: CttSpComponent
			},
		]*/
	},
];