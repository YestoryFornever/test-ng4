import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule }     from '@angular/http';
import { RouterModule } from '@angular/router';

import { BondHelperRouting } from './bond-helper.routing';
import { CmmnModule } from '../../../common/cmmn.module';

import { BondHelperService } from './bond-helper.service';

import { BondHelperListComponent } from './subs/bond-helper-list/bond-helper-list.component';
import { BondHelperDetailComponent } from './subs/bond-helper-detail/bond-helper-detail.component';
import { BondHelperCreateComponent } from './subs/bond-helper-create/bond-helper-create.component';
@NgModule({
	imports: [
FormsModule,
		// RouterModule.forChild(BondHelperRouting),
		CmmnModule,
		CommonModule,
	],
	declarations: [
		BondHelperListComponent,
		BondHelperDetailComponent,
		BondHelperCreateComponent,
	],
	providers: [BondHelperService],
})
export class BondHelperModule { }