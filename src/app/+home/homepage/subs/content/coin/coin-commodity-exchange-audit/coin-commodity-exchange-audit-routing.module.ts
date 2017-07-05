import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuditDetailsComponent } from'./subs/audit-details/audit-details.component';
import { CoinCommodityExchangeAuditComponent } from'./coin-commodity-exchange-audit.component';

export const CoinCommodityExchangeAuditRouting: Routes =[
	{
		path: 'coin-commodity-exchange-audit',
		component: CoinCommodityExchangeAuditComponent,
	},
	{
		path:'audit-details/:goodsExchangesId/:statusCode/:userName/:phone',
		component: AuditDetailsComponent
	},
	{
		path:'audit-details/:goodsExchangesId',
		component: AuditDetailsComponent
	},
	{
		path:'audit-details',
		component: AuditDetailsComponent
	},
]

