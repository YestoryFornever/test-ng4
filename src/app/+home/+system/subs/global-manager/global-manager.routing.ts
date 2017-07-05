import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DataExportComponent } from './subs/data-export/data-export.component';
// 如果从属于homepage模块，需在homepage.routing引入
export const GlobalManagerRouting: Routes = [
	{
		path: 'data-export',
		component: DataExportComponent
	}
];
