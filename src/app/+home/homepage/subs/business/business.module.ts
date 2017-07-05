import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BusinessRouting } from './business.routing';
import { CmmnModule } from '../../common/cmmn.module';

import { BondHelperModule } from './bond-helper/bond-helper.module';
@NgModule({
	imports: [
CommonModule,
FormsModule,
		RouterModule.forChild(BusinessRouting),
		CmmnModule,
		BondHelperModule,
	],
	declarations: [

	]
})
export class BusinessModule {}