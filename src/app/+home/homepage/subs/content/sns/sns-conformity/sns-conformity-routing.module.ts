import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SnsConformity } from './sns-conformity.component'

import { SnsConformityChoiceness } from './sns-conformity-choiceness/sns-conformity-choiceness-component'

import { SnsConformityDaily } from './sns-conformity-daily/sns-conformity-daily-component'

import { SnsConformitySweeping } from './sns-conformity-sweeping/sns-conformity-sweeping-component'

import { SnsConformitySweepingEdit } from './sns-conformity-sweeping-edit/sns-conformity-sweeping-edit.component'

import { SnsConformityChoicenessEdit } from './sns-conformity-choiceness-edit/sns-conformity-choiceness-edit'

import { SnsConformityClassify } from './sns-conformity-classify/sns-conformity-classify.component'

import { SnsConformityOrgBondAttention } from './sns-conformity-orgBondAttention/sns-conformity-orgBondAttention.component'

export const SnsConformityRouting: Routes =[{
	path: 'sns-conformity',
	component: SnsConformity,
	children:[
		{
			path:'',
			redirectTo: 'sns-conformity-sweeping', 
			pathMatch: 'full'
		},
		{
			path:'sns-conformity-choiceness',
			component: SnsConformityChoiceness
		},{
			path:'sns-conformity-daily',
			component: SnsConformityDaily
		},{
			path:'sns-conformity-sweeping',
			component: SnsConformitySweeping
		},{
			path:'sns-conformity-sweeping-edit/:id',
			component: SnsConformitySweepingEdit
		},{
			path:'sns-conformity-sweeping-edit',
			component: SnsConformitySweepingEdit
		},{
			path:'sns-conformity-choiceness-edit',
			component: SnsConformityChoicenessEdit
		},{
			path:'sns-conformity-choiceness-edit/:id',
			component: SnsConformityChoicenessEdit
		},{
			path:'sns-conformity-classify',
			component: SnsConformityClassify
		},{
			path:'sns-conformity-orgBondAttention',
			component: SnsConformityOrgBondAttention
		}
		]
	}]