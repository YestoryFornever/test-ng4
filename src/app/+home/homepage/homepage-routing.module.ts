import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { IndexComponent } from './subs/index/index.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { NavDynamicComponent } from './subs/frame/nav-dynamic/nav-dynamic.component';
// import { UserEditComponent } from './subs/auth/user/user-edit/user-edit.component';
// import { UserListComponent } from './subs/auth/user/user-list/user-list.component';
// import { UserApproveComponent } from './subs/auth/user/user-approve/user-approve.component';
// import { UserApproveHistoryComponent } from './subs/auth/user/user-approve-history/user-approve-history.component';
import { OrganizationListComponent } from './subs/auth/organization/organization-list/organization-list.component';
import { AuthDataItemComponent } from './subs/auth/authsetting/auth-data-item/auth-data-item.component';
import { AuthMenuBtnSettingComponent } from './subs/auth/authsetting/auth-menu-btn-setting/auth-menu-btn-setting.component';
import { AuthUserGroupComponent } from './subs/auth/authsetting/auth-user-group/auth-user-group.component';
import { SnsTagsManagementComponent } from './subs/content/sns/sns-tags-management/sns-tags-management.component';
import { SnsCommentsHistoryComponent } from './subs/content/sns/sns-comments-history/sns-comments-history.component';
import { SnsNewsManagementComponent } from './subs/content/sns/sns-news-management/sns-news-management.component';
import { SnsPicsManagementComponent } from './subs/content/sns/sns-pics-management/sns-pics-management.component';
import { SnsStatisticsComponent } from './subs/content/sns/sns-statistics-management/sns-statistics-management.component'
import { GroupManagementComponent } from './subs/content/group/group-management/group-management.component'
// import { SnsNewsFlashManagementRouting } from './subs/content/sns/sns-news-flash-management/sns-news-flash-management-routing.moudle'
// import { GroupManagementRoutes } from './subs/content/group/group-management/group-management-routing.module'
// import { SnsSourceManagementRou} from './subs/auth/authsetting/auth-role-manage/auth-role-manage-routing.module';
// import { authRoleManageRouting nent } from './subs/auth/user/user-administrate/user-administrate.component';
import { PermissionGroupComponent } from './subs/auth/authsetting/permission-group/permission-group.component';
// import { UserAdministrateComponent } from './subs/auth/user/user-administrate/user-administrate.component';

// import { CoinCommodityExchangeAuditRouting } from './subs/content/coin/coin-commodity-exchange-audit/coin-commodity-exchange-audit-routing.module';
// import { CoinGoldDetailRouting } from './subs/content/coin/coin-gold-detail/coin-gold-detail-routing.module';
// import { InvoiceManagementRouting } from './subs/content/coin/invoice-management/invoice-management-routing.module';
import { OrganizationStatisticsComponent } from './subs/auth/organization/organization-statistics/organization-statistics.component'
import { OrganizationDetialComponent } from './subs/auth/organization/organization-detial/organization-detial.component'
import { OrganizationCombineComponent } from './subs/auth/organization/organization-combine/organization-combine.component'


// import { UserBackRouting } from './subs/auth/user/user-back/user-back-routing.module';
// import { UserLogComponent  } from './subs/auth/user/user-log/user-log.component';
// import { UserFormComponentRouting } from './subs/auth/user/user-form/user-form-routing.module'
// import { UserRelationRouting } from './subs/auth/user/user-relation/user-relation-routing.module'

// import { SnsShareManagementRouting } from './subs/content/sns/sns-share-management/sns-share-management-routing.module';
// import { SnsNewsManagementRouting } from'./subs/content/sns/sns-news-management/sns-news-management-routing.module';
import { ContentOperationRouting } from'./subs/content/content-operation/content-operation-routing.module';

import { BadListComponent } from './subs/content/vchart/bad-list/bad-list.component'
import { AwardManagementComponent } from './subs/content/vchart/award-managerment/award-managerment.component'
import { BannerManagementComponent } from './subs/content/vchart/banner-management/banner-management.component'
import { UserManagementComponent } from './subs/content/vchart/user-management/user-management.component'

import { UserInfoComponent } from './subs/system/user-info/user-info.component';
// import { UserFormComponent } from './subs/auth/user/user-form/user-form.component';
// import { UserVipComponent } from './subs/auth/user/user-vip/user-vip.component';
import { UserCommunicationComponent } from'./subs/system/user-communication/user-communication.component'

import { VersionManagementComponent } from './subs/system/version-management/version-management.component';
import { ParameterSetComponent } from './subs/system/apply-set/parameter-set/parameter-set.component';
import { LookQuotationComponent } from './subs/system/quotation-transaction/quotation/quotation.component';
import { CustomerHangComponent } from './subs/system/quotation-transaction/customerhang/customerhang.component';
// import { BondDistributionComponent} from './subs/system/quotation-transaction/bond_distribution/bond_distribution.component';
import { BondsVerviewComponent} from './subs/system/quotation-transaction/bonds_verview/bonds_verview.component';


import { CoinGiftManagementComponent } from './subs/content/coin/coin-gift-management/coin-gift-management.component';
import { CoinCommodityExchangeAuditComponent } from './subs/content/coin/coin-commodity-exchange-audit/coin-commodity-exchange-audit.component';
import { CoinGoldDetailComponent } from './subs/content/coin/coin-gold-detail/coin-gold-detail.component';
import { CoinGoldStatisticsComponent } from './subs/content/coin/coin-gold-statistics/coin-gold-statistics.component';
import { CoinShufflingFigureManagementComponent } from './subs/content/coin/coin-shuffling-figure-management/coin-shuffling-figure-management.component';
import { CoinStoresGoodsManagementComponent } from './subs/content/coin/coin-stores-goods-management/coin-stores-goods-management.component';
import { CoinUserDetailComponent } from './subs/content/coin/coin-user-detail/coin-user-detail.component'
import { UserRechargeLogComponent } from './subs/content/coin/user-recharge-log/user-recharge-log.component';
import { InvoiceManagementComponent } from './subs/content/coin/invoice-management/invoice-management.component';
// import { UserCommunicationRouting } from './subs/system/user-communication/user-communication-routing.module'
import {CacheManagementComponent} from './subs/system/cache-management/cache-management.component'
import { UserCommunicationComponentModule } from './subs/system/user-communication/user-communication.component.module'
import { CapitalDistributionComponent } from './subs/system/capital-distribution/capital_distribution.component'
// import { UserOperateComponent } from './subs/auth/user/user-operate/user-operate.component'

import { CrmGroupComponent } from './subs/auth/customer/crmGroup-manage/crmGroup-manage.component'
// import { CustomerManageRouting } from './subs/auth/customer/customer-manage/customer-manage-routing.module'
// import { ContactManageRouting } from './subs/auth/customer/contact-manage/contact-manage-routing.moudule'
// import { ActionManageRouting } from './subs/auth/customer/action-manage/action-manage-routing.module'
// import { BondDistribtionRouting } from './subs/system/bond-distribution/bond-distribution-routing.module'
// import { SnsConformityRouting } from './subs/content/sns/sns-conformity/sns-conformity-management-routing.module'
import { RecommendComponent } from './subs/content/recommend/recommend.component'
// import { SnsQuestionAnswerRouting } from './subs/content/sns/sns-question-answer/sns-question-answer.module.routing'
// import { ErrorComponent } from '../error/error.component';
// import { VideoManagementRouting } from './subs/content/video/videoManagement-routing.module'

import { CustomerServiceRouting } from'./subs/customer-service/customer-service.routing';

// import { LiveStreamingRouting } from './subs/content/liveStreaming/live-streaming-routing.module';
// import {ContactsRouting} from "./subs/content/contacts/contacts.routing.module";
export const homepageRouting: Routes = [
	{
		path: '',
		component: HomepageComponent,
		children:[
			{
				path:'',
				redirectTo: 'index', 
				pathMatch: 'full'
			},
			{
				path: 'index',
				component: IndexComponent
			},

			// {
			// 	path: 'user-list',
			// 	component: UserListComponent
			// },
			// {
			// 	path: 'user-list/:orgid',
			// 	component: UserListComponent
			// },
			// {
			// 	path: 'user-list/:orgid/:depid',
			// 	component: UserListComponent
			// },
			// {
			// 	path: 'user-approve',
			// 	component: UserApproveComponent
			// },
			// {
			// 	path: 'user-approve-history',
			// 	component: UserApproveHistoryComponent
			// },
			// {
			// 	path: 'user-administrate',
			// 	component: UserAdministrateComponent
			// },
			// {
			// 	path: 'user-edit/:id',
			// 	component: UserEditComponent
			// },
			// {
			// 	path: 'user-edit/:id/:userType',
			// 	component: UserEditComponent
			// },
   //          {
   //              path: 'user-edit',
   //              component: UserEditComponent
   //          },
            // {
            //     path: 'user-log',
            //     component: UserLogComponent
            // },
            // {
            //     path: 'user-vip',
            //     component: UserVipComponent
            // },
            // {
            //     path: 'user-operate',
            //     component: UserOperateComponent
            // },
			{
				path: 'organization-list',
				component: OrganizationListComponent
			},
			{
				path: 'organization-detial/:id',
				component: OrganizationDetialComponent
			},
			{
				path: 'organization-combine/:ids',
				component: OrganizationCombineComponent
			},
			{
				path: 'organization-statistics',
				component: OrganizationStatisticsComponent
			},
			// ...UserBackRouting,
			// ...authRoleManageRouting,
			// ...GroupManagementRoutes,
			// ...UserFormComponentRouting,
			// ...UserRelationRouting,
			{
				path: 'auth-user-group',
				component: AuthUserGroupComponent
			},
			{
				path: 'permission-group',
				component: PermissionGroupComponent
			},
			{
				path: 'auth-data-item',
				component: AuthDataItemComponent
			},
			{
				path: 'auth-menu-btn-setting',
				component: AuthMenuBtnSettingComponent
			},
			{
				path: 'sns-tags-management',
				component: SnsTagsManagementComponent
			},
			{
				path: 'sns-comments-history',
				component: SnsCommentsHistoryComponent
			},
			{
				path: 'sns-statistics-component',
				component:SnsStatisticsComponent
			},
			// ...SnsNewsManagementRouting,
			// ...SnsNewsFlashManagementRouting,
			// ...SnsShareManagementRouting,
			// ...SnsSourceManagementRouting,
			{
				path: 'sns-pics-management',
				component: SnsPicsManagementComponent
			},
			{
				path: 'version-management',
				component: VersionManagementComponent
			},
			{
				path: 'user-info',
				component: UserInfoComponent
			},
			{
				path: 'parameter-set',
				component: ParameterSetComponent
			},
			{
				path: 'quotation',
				component: LookQuotationComponent
			},
			{
				path: 'customerhang',
				component: CustomerHangComponent
			},
			{
				path: 'capital_distribution',
				component: CapitalDistributionComponent
			} ,
			{
				path: 'bonds_verview',
				component: BondsVerviewComponent
			} ,

			// {
			// 	path: 'bond_verview',
			// 	component: CustomerHangComponent
			// },
			// ...CoinGoldDetailRouting,
			// ...CoinCommodityExchangeAuditRouting,
			// ...InvoiceManagementRouting,
			{
				path: 'coin-gift-management',
				component: CoinGiftManagementComponent
			},
			{
				path: 'coin-gold-detail',
				component: CoinGoldDetailComponent
			},
			{
				path: 'coin-gold-statistics',
				component: CoinGoldStatisticsComponent
			},
			{
				path: 'coin-stores-goods-management',
				component: CoinStoresGoodsManagementComponent
			},
			{
				path:'coin-user-detail',
				component:CoinUserDetailComponent
			},
			{
				path: 'user-recharge-log',
				component: UserRechargeLogComponent
			},
			{
				path: 'invoice-management',
				component: InvoiceManagementComponent
			},
			{
				path: 'coin-shuffling-figure-management',
				component: CoinShufflingFigureManagementComponent
			},
			{
				path: 'bad-list',
				component: BadListComponent
			},
			{
				path: 'award-management',
				component: AwardManagementComponent
			},
			{
				path: 'banner-management',
				component: BannerManagementComponent
			},
			{
				path: 'user-management',
				component: UserManagementComponent
			},
			{
				path:'cache-management',
				component: CacheManagementComponent
			},
			{
				path:'crmGroup-management',
				component: CrmGroupComponent
			},
			{
				path:'recommend-component',
				component: RecommendComponent
			},
			// ...CustomerManageRouting,
			// ...ContactManageRouting,
			// ...ActionManageRouting,
			// ...UserCommunicationRouting,
			// ...LiveStreamingRouting,
			// ...BondDistribtionRouting,
			// ...SnsConformityRouting,
			// ...SnsQuestionAnswerRouting,
			...ContentOperationRouting,
			{
				path: 'business',
				loadChildren: './subs/business/business.module#BusinessModule'
			},
			// ...VideoManagementRouting,
			...CustomerServiceRouting,
			// ...ContactsRouting,
			// {
			// 	path: '**',
			// 	component: ErrorComponent
			// }
		]
	}
];

