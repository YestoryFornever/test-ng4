import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GlobalManagerRouting } from './subs/global-manager/global-manager.routing';
// 如果从属于homepage模块，需在homepage.routing引入
export const SystemRouting: Routes = [
	...GlobalManagerRouting,
];
