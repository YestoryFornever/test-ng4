import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule }     from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IndexComponent } from './subs/index/index.component';
import { SnsShareManagementModule} from './subs/content/sns/sns-share-management/sns-share-management.module'
import { SnsNewsFlashManagementModule} from './subs/content/sns/sns-news-flash-management/sns-news-flash-management.module'
import { SnsNewsManagementModule } from './subs/content/sns/sns-news-management/sns-news-management.module';
import { SnsSourceManagementModule } from './subs/content/sns/sns-source-management/sns-source-management.module'
import { GroupManagementModule } from './subs/content/group/group-management/group-management.module'
// import { UserEditModule } from './subs/auth/user/user-edit/user-edit.module';
// import { UserOperateComponent } from './subs/auth/user/user-operate/user-operate.component'
// import { UserBackModule } from './subs/auth/user/user-back/user-back.module';
// import { UserLogComponent } from './subs/auth/user/user-log/user-log.component';
// import { UserRelationComponentModule } from './subs/auth/user/user-relation/user-relation.component.module'
// import { UserRelationComponent } from './subs/auth/user/user-relation/user-relation.component'
import { InvoiceManagementComponent } from './subs/content/coin/invoice-management/invoice-management.component';
import { InvoiceManagementModule } from './subs/content/coin/invoice-management/invoice-management.module';
import { CoinCommodityExchangeAuditModule } from './subs/content/coin/coin-commodity-exchange-audit/coin-commodity-exchange-audit.module';
import { CoinGoldDetailModule } from './subs/content/coin/coin-gold-detail/coin-gold-detail.module';
import { ContentOperationModule } from './subs/content/content-operation/content-operation.module';

import {CoinGiftManagementComponent} from './subs/content/coin/coin-gift-management/coin-gift-management.component';
import {CoinCommodityExchangeAuditComponent} from './subs/content/coin/coin-commodity-exchange-audit/coin-commodity-exchange-audit.component';
import {CoinGoldDetailComponent} from './subs/content/coin/coin-gold-detail/coin-gold-detail.component';
import {CoinGoldStatisticsComponent} from './subs/content/coin/coin-gold-statistics/coin-gold-statistics.component';
import {CoinShufflingFigureManagementComponent} from './subs/content/coin/coin-shuffling-figure-management/coin-shuffling-figure-management.component';
import {CoinStoresGoodsManagementComponent} from './subs/content/coin/coin-stores-goods-management/coin-stores-goods-management.component';
import {CoinUserDetailComponent} from './subs/content/coin/coin-user-detail/coin-user-detail.component'

import { UserRechargeLogComponent } from './subs/content/coin/user-recharge-log/user-recharge-log.component';
import { UserCommunicationComponentModule } from './subs/system/user-communication/user-communication.component.module'
import { UserCommunicationComponent } from'./subs/system/user-communication/user-communication.component'

import { CacheManagementComponent } from './subs/system/cache-management/cache-management.component'

import { HomepageComponent } from '../homepage/homepage.component';
import { NavDynamicComponent } from './subs/frame/nav-dynamic/nav-dynamic.component';
import { NavMapComponent } from './subs/frame/nav-map/nav-map.component';
// import { UserListComponent } from './subs/auth/user/user-list/user-list.component';
// import { UserApproveComponent } from './subs/auth/user/user-approve/user-approve.component';
// import { UserApproveHistoryComponent } from './subs/auth/user/user-approve-history/user-approve-history.component';
import { OrganizationStatisticsComponent } from './subs/auth/organization/organization-statistics/organization-statistics.component'
// import { UserAdministrateComponent } from './subs/auth/user/user-administrate/user-administrate.component';
import { OrganizationListComponent } from './subs/auth/organization/organization-list/organization-list.component';
import { OrganizationDetialComponent } from './subs/auth/organization/organization-detial/organization-detial.component'
import { OrganizationCombineComponent } from './subs/auth/organization/organization-combine/organization-combine.component'
import { AuthDataItemComponent } from './subs/auth/authsetting/auth-data-item/auth-data-item.component';
import { AuthMenuBtnSettingComponent } from './subs/auth/authsetting/auth-menu-btn-setting/auth-menu-btn-setting.component';
import { AuthRoleManageModule } from './subs/auth/authsetting/auth-role-manage/auth-role-manage.module';
import { AuthUserGroupComponent } from './subs/auth/authsetting/auth-user-group/auth-user-group.component';
import { PermissionGroupComponent } from './subs/auth/authsetting/permission-group/permission-group.component';
import { SnsTagsManagementComponent} from './subs/content/sns/sns-tags-management/sns-tags-management.component';
import { SnsCommentsHistoryComponent} from './subs/content/sns/sns-comments-history/sns-comments-history.component';
import { SnsPicsManagementComponent} from './subs/content/sns/sns-pics-management/sns-pics-management.component';
import { SnsStatisticsComponent } from './subs/content/sns/sns-statistics-management/sns-statistics-management.component'
import { SnsConformityModule } from './subs/content/sns/sns-conformity/sns-conformity.module'
import { SnsQuestionAnswerModule } from './subs/content/sns/sns-question-answer/sns-question-answer-detial.module'
import { GroupManagementComponent} from './subs/content/group/group-management/group-management.component';

// import { UserVipComponent } from './subs/auth/user/user-vip/user-vip.component';
import { UserInfoComponent} from './subs/system/user-info/user-info.component';

import { BondDistribtionComponentModule } from './subs/system/bond-distribution/bond-distribution.module'
import { VersionManagementComponent} from './subs/system/version-management/version-management.component';
import { ParameterSetComponent} from './subs/system/apply-set/parameter-set/parameter-set.component';
import { LookQuotationComponent} from './subs/system/quotation-transaction/quotation/quotation.component';
import { CustomerHangComponent} from './subs/system/quotation-transaction/customerhang/customerhang.component';
import { BondsVerviewComponent} from './subs/system/quotation-transaction/bonds_verview/bonds_verview.component';
import { BondDistributionPandectComponent } from './subs/system/bond-distribution/bond-distribution-management/bond-distribution-pandect/bond-distribution-pandect.component';

import { BadListComponent} from './subs/content/vchart/bad-list/bad-list.component'
import { AwardManagementComponent} from './subs/content/vchart/award-managerment/award-managerment.component'
import { BannerManagementComponent} from './subs/content/vchart/banner-management/banner-management.component'
import { UserManagementComponent} from './subs/content/vchart/user-management/user-management.component'
// import { UserFormComponentModule } from './subs/auth/user/user-form/user-form.component.module'
// import { UserFormComponent } from './subs/auth/user/user-form/user-form.component'
// import { CustomerManageComponent } from './subs/auth/customer/customer-manage/customer-manage.component'
// import { ContactManageComponent } from './subs/auth/customer/contact-manage/contact-manage.component'
// import { ActionManageComponent } from './subs/auth/customer/action-manage/action-manage.component'
import { CrmGroupComponent } from './subs/auth/customer/crmGroup-manage/crmGroup-manage.component'
import { CustomerManageModule } from './subs/auth/customer/customer-manage/customer-manage.module'
import { ActionManageModule } from './subs/auth/customer/action-manage/action-manage.module'
import { ContactManageModule } from './subs/auth/customer/contact-manage/contact-manage.module'
import { LiveStreamingModule } from './subs/content/liveStreaming/live-streaming.module'
import { CapitalDistributionComponent } from './subs/system/capital-distribution/capital_distribution.component'
import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';

import { RecommendComponent } from './subs/content/recommend/recommend.component';
import { VideoManagementModule } from './subs/content/video/videoManagement.module'

import { CmmnModule } from './common/cmmn.module';
import { BusinessModule } from './subs/business/business.module'

import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,
	BsDropdownModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,
	TabsModule,TooltipModule,
	BsDropdownConfig,
	PaginationConfig,
	TooltipConfig,
	TabsetConfig
} from 'ng2-bootstrap';
import { CalendarModule,PickListModule, TreeModule,TreeNode,AutoCompleteModule,FileUploadModule} from 'primeng/primeng';

import { TfPipe } from '../../pipes/tf.pipes';
import { TimePipe } from '../../pipes/time.pies'
import { recommendTypePipe } from '../../pipes/recommendType.pies'
import { NumAddCommaPipe } from '../../pipes/numAddComma.pipes';
import { Status3Pipe } from '../../pipes/status3.pipes';
import { QuillModule } from 'ngx-quill';
import { Ng2Echarts} from 'ng2-echarts';
import {ContactsModule} from "./subs/content/contacts/contacts.module";
// import ECharts = echarts.ECharts;
// import EChartOption = echarts.EChartOption;
import { homepageRouting } from './homepage-routing.module';
@NgModule({
	imports: [
FormsModule,
		FroalaEditorModule,
		FroalaViewModule,
		CommonModule,
		HttpModule,	
		// UserEditModule,
		AuthRoleManageModule,
		RouterModule.forChild(homepageRouting),
		CmmnModule,

		GroupManagementModule,
		// UserFormComponentModule,
		InvoiceManagementModule,
		CoinCommodityExchangeAuditModule,
		CoinGoldDetailModule,
		// UserBackModule,
		// UserRelationComponentModule,
		UserCommunicationComponentModule,
		ActionManageModule,
		ContactManageModule,
		CustomerManageModule,
		SnsNewsFlashManagementModule,
		SnsShareManagementModule,
		SnsSourceManagementModule,
		SnsNewsManagementModule,
		SnsConformityModule,
		SnsQuestionAnswerModule,
		LiveStreamingModule,
		BondDistribtionComponentModule,
		ContentOperationModule,
		// BusinessModule, // 这个模块会引起死循环
		VideoManagementModule,
		QuillModule,
		AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,
		BsDropdownModule.forRoot(),
		RatingModule,TypeaheadModule,PaginationModule,
		ModalModule.forRoot(),
		TabsModule,TooltipModule,
		CalendarModule,PickListModule,TreeModule,AutoCompleteModule,FileUploadModule,
		ContactsModule
	],
	declarations: [
		IndexComponent,
		HomepageComponent,
		NavDynamicComponent,
		NavMapComponent,
		// UserListComponent,
		// UserApproveComponent,
		// UserApproveHistoryComponent,
		OrganizationListComponent,
		OrganizationStatisticsComponent,
		AuthDataItemComponent,
		AuthMenuBtnSettingComponent,
		AuthUserGroupComponent,
		SnsTagsManagementComponent,	
		SnsStatisticsComponent,	
		VersionManagementComponent,
		PermissionGroupComponent,
		LookQuotationComponent,
		CustomerHangComponent,
		BondsVerviewComponent,



		OrganizationDetialComponent,
		OrganizationCombineComponent,
		// UserAdministrateComponent,
		UserInfoComponent,
		ParameterSetComponent,	
		SnsCommentsHistoryComponent,
		// UserLogComponent,
		// UserVipComponent,
		// UserFormComponent,
		// UserRelationComponent,
		// UserOperateComponent,
		CrmGroupComponent,
		BadListComponent,
		BannerManagementComponent,
		AwardManagementComponent,
		UserManagementComponent,
		UserCommunicationComponent,
		CoinGiftManagementComponent,
		CoinCommodityExchangeAuditComponent,
		CoinGoldDetailComponent,
		CoinGoldStatisticsComponent,
		CoinShufflingFigureManagementComponent,
		CoinStoresGoodsManagementComponent,
		CoinUserDetailComponent,
		CacheManagementComponent,
		UserRechargeLogComponent,
		InvoiceManagementComponent,
		SnsPicsManagementComponent,
		CapitalDistributionComponent,
		BondDistributionPandectComponent,
		RecommendComponent,
		NumAddCommaPipe,
		TfPipe,
		TimePipe,
		recommendTypePipe,
		Status3Pipe,
		Ng2Echarts,
	],
	providers: [
		BsDropdownConfig,
		PaginationConfig,
		TooltipConfig,
		TabsetConfig
	]
})
export class HomepageModule { }