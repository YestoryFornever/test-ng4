/**
 * 主菜单服务
 */
import { Injectable } from "@angular/core";
import { StorageService } from './storage.service';
import { NetUserService } from '../net-services';
@Injectable()
export class MenuService {

	private _data:any = [
			{
				label:"内容管理",
				icon: 'fa fa-sticky-note',
				childs:[
					{
						label:'同业圈',
						icon: 'fa fa-sticky-note',
						childs:[
							{
								label:'资讯管理',
								icon: 'fa fa-file-text',
								// routerLink:['/home/user']
								routerLink:["./homepage/sns-news-management"]
							},
							{
								label:'快讯管理',
								icon: 'fa fa-book',
								routerLink:["./homepage/sns-news-flash-management"]
							},
							{
								label:'动态管理',
								icon: 'fa fa-paper-plane',
								routerLink:["./homepage/sns-share-management"]
							},
							{
								label:'评论管理',
								icon: 'fa fa-comment',
								routerLink:["./homepage/sns-comments-history"]
							},
							// {
							// 	label:'聚合标签管理',
							// 	icon: 'fa fa-tags',
							// 	routerLink:["./homepage/sns-tags-management"]
							// },
							{
								label:'资讯来源管理',
								icon: 'fa fa-briefcase',
								routerLink:["./homepage/sns-source-management"]
							},
							{
								label:'数据统计',
								icon: 'fa fa-pie-chart',
								routerLink:["./homepage/sns-statistics-component"]
							},
							{
								label:'雷区管理',
								icon: 'fa fa-warning',
								routerLink:["./homepage/sns-conformity/sns-conformity-sweeping"]
							},
							{
								label:'机构个债关注池',
								icon: 'fa fa-eye',
								routerLink:["./homepage/sns-conformity/sns-conformity-orgBondAttention"]
							},
							{
								label:'日报管理',
								icon: 'fa fa-file-text',
								routerLink:["./homepage/sns-conformity/sns-conformity-daily"]
							},
							{
								label:'要闻管理',
								icon: 'fa fa-rss-square',
								routerLink:["./homepage/sns-conformity/sns-conformity-choiceness"]
							},
							{
								label:'问答管理',
								icon: 'fa fa-comments',
								routerLink:["./homepage/sns-question-answer"]
							},
							{
								label: '同业宝',
								icon: 'fa fa-database',
								routerLink:[ "./homepage/contacts/contacts-list"]
							},
							{
								label:'内容运营',
								icon: 'fa fa-cloud',
								routerLink:["./homepage/content-operation"]
							},
							{
								label:'资讯分类管理',
								icon: 'fa fa-tasks',
								routerLink:["./homepage/sns-conformity/sns-conformity-classify"]
							},
							{
								label:'视频管理',
								icon: 'fa fa-video-camera',
								routerLink:["./homepage/video-management/video-list"]
							}
						]
					},
					{
						label:'客户经理管理',
						icon: 'fa fa-black-tie',
						childs:[
							{
								label:'用户组管理',
								icon: 'fa fa-user-plus',
								routerLink:["./homepage/crmGroup-management"]
							},
							{
								label:'客户经理维护',
								icon: 'fa fa-user',
								routerLink:["./homepage/customer-manage"]
							},
							{
								label:'联系人维护',
								icon: 'fa fa-phone-square',
								routerLink:["./homepage/contact-manage"]
							},
							{
								label:'行动维护',
								icon: 'fa fa-wrench',
								routerLink:["./homepage/action-manage"]
							},
						]
					},
					{
						label:'群组',
						icon: 'fa fa-users',
						childs:[
							{
								label:'群组管理',
								icon: 'fa fa-puzzle-piece',
								routerLink:["./homepage/group-management"]
							},
						]
					},
					{
						label:'金币',
						icon: 'fa fa-database',
						childs:[
							{
								label:'礼品管理',
								icon: 'fa fa-gift',
								routerLink:['./homepage/coin-gift-management']
							},
							{
								label:'上架商品管理',
								icon: 'fa fa-cubes',
								routerLink:['./homepage/coin-stores-goods-management']
							},
							{
								label:'商品兑换审核',
								icon: 'fa fa-flag',
								routerLink:['./homepage/coin-commodity-exchange-audit']
							},
							{
								label:'金币收支统计',
								icon: 'fa fa-area-chart',
								routerLink:['./homepage/coin-gold-statistics']
							},
							{
								label:'金币收支明细',
								icon: 'fa fa-gg-circle',
								routerLink:['./homepage/coin-gold-detail']
							},
							{
								label:'金币发放',
								icon: 'fa fa-share-square',
								routerLink:['./homepage/coin-gold-detail/coin-issue']
							},
							{
								label:'用户充值记录',
								icon: 'fa fa-leanpub',
								routerLink:['./homepage/user-recharge-log']
							},
							{
								label:'用户金币统计',
								icon: 'fa fa-bar-chart',
								routerLink:['./homepage/coin-user-detail']
							},
							{
								label:'发票管理',
								icon: 'fa fa-cc-diners-club',
								routerLink:['./homepage/invoice-management']
							},
							{
								label:'轮播图管理',
								icon: 'fa fa-file-image-o',
								routerLink:['./homepage/coin-shuffling-figure-management']
							},
							{
								label:'金币发放权限',
								icon: 'fa fa-eye-slash',
								routerLink:['./homepage/coin-gold-detail/coin-permissions']
							},
						]
					},
					{
						label:'公众号',
						icon: 'fa fa-wechat',
						childs:[
							{
								label:'负面资讯列表',
								icon: 'fa fa-info-circle',
								routerLink:["./homepage/bad-list"]
							},
							{
								label:'公众号资讯',
								icon: 'fa fa-list',
								routerLink:["./homepage/banner-management"]
							},
						]
					},
					{
						label:'联系用户',
						icon: 'fa fa-phone',
						childs:[
							{
								label:'用户反馈',
								routerLink:["./user/user-back/user-back-list"],
								icon: 'fa fa-commenting',
							},
							{
								label:'消息列表',
								routerLink:["./user/user-back/send-info-list"],
								icon: 'fa fa-bars',
							},
							{
								label:'定时消息列表',
								routerLink:["./user/user-back/timing-info-list"],
								icon: 'fa fa-hourglass-2',
							},
							{
								label:'推送用户分组',
								routerLink:["./user/user-back/info-group-list"],
								icon: 'fa fa-users',
							},
						]
					},
					{
						label:'直播',
						icon: 'fa fa-video-camera',
						childs:[
							{
								label:'路演直播管理',
								icon: 'fa fa-play-circle',
								routerLink:["./homepage/live-streaming/rdShow-liveStreaming-list"]
							},
						]
					},
					{
						label:'推荐',
						icon: 'fa fa-thumbs-up',
						childs:[
							{
								label:'推荐内容池',
								icon: 'fa fa-inbox',
								routerLink:["./homepage/recommend-component"]
							},
						]
					},
				]
			},
			{
				label:"用户管理",
				icon: 'fa fa-user',
				childs:[
					{
						label:'用户管理',
						icon: 'fa fa-user',
						childs:[
							{
								label:'用户列表',
								icon: 'fa fa-list',
								routerLink:["./user/user-list"]
							},
							{
								label:'添加用户',
								icon: 'fa fa-user-plus',
								routerLink:["./user/user-edit"]
							},
							{
								label:'用户审核',
								icon: 'fa fa-warning',
								routerLink:["./user/user-approve"]
							},
							{
								label:'审核历史',
								icon: 'fa fa-calendar-minus-o',
								routerLink:["./user/user-approve-history"]
							},
							{
								label:'用户日志',
								icon: 'fa fa-file-text',
								routerLink:["./user/user-log"]
							},
							{
								label:'运营号管理',
								icon: 'fa fa-cog',
								routerLink:["./user/user-operate"]
							},
							
						]
					},
					{
						label:'机构管理(新)',
						icon: 'fa fa-university',
						childs:[
							{
								label:'机构列表',
								icon: 'fa fa-list',
								routerLink:["./user/organization-list"]
							},
							{
								label:'同步异常列表',
								icon: 'fa fa-pie-chart',
								routerLink:["./user/organization-syn"]
							},
						]
						// organization-statistics
					},
					{
						label:'管理员管理',
						icon: 'fa fa-suitcase',
						childs:[
							{
								label:'管理员管理',
								icon: 'fa fa-suitcase',
								routerLink:["./user/user-administrate"]
							},
							{
								label:'用户组维护',
								routerLink:["./user/user-form/user-form-list"],
								icon: 'fa fa-wrench',
							},
							{
								label:'VIP服务',
								icon: 'fa fa-black-tie',
								routerLink:["./user/user-form/user-form-vip"]
							},
							{
								label:'用户关系查询',
								icon: 'fa fa-binoculars',
								routerLink:["./user/user-relation"]
							}
						]
						// organization-statistics
					},
					{
						label:'机构管理',
						icon: 'fa fa-university',
						childs:[
							{
								label:'机构列表',
								icon: 'fa fa-list',
								routerLink:["./homepage/organization-list"]
							},
							{
								label:'机构分类统计',
								icon: 'fa fa-pie-chart',
								routerLink:["./homepage/organization-statistics"]
							},
						]
						// organization-statistics
					},
					{
						label:'权限设置',
						icon: 'fa fa-eye',
						childs:[
							{
								label:'角色管理',
								icon: 'fa fa-cogs',
								routerLink:['./homepage/auth-role-manage']
							},
							{
								label:'权限管理',
								icon: 'fa fa-eye-slash',
								routerLink:['./homepage/permission-group']
							},
							// {
							// 	label:'用户分组',
							// 	icon: 'fa fa-users',
							// 	routerLink:['./homepage/auth-user-group']
							// },
							// {
							// 	label:'数据项设置',
							// 	icon: 'fa fa-bar-chart',
							// 	routerLink:['./homepage/auth-data-item']
							// },
							// {
							// 	label:'菜单按钮设置',
							// 	icon: 'fa fa-list-ol',
							// 	routerLink:['./homepage/auth-menu-btn-setting']
							// }
						]
					}
				]
			},
			{
				label:"系统管理",
				icon: 'fa fa-cog',
				childs:[
					{
						label:'app版本管理',
						icon: 'fa fa-file-text',
						childs:[
							{
								label:'版本发布管理',
								icon: 'fa fa-cloud-upload',
								routerLink:["./homepage/version-management"]
							},
							// {
							// 	label:'用户信息管理',
							// 	icon: 'fa fa-user',
							// 	routerLink:["./homepage/user-info"]
							// },
							{
								label:'用户IM消息管理',
								icon: 'fa fa-commenting',
								routerLink:["./homepage/user-communication"]
							},
						]
					},
					{
						label:'应用设置',
						icon: 'fa fa-dropbox',
						childs:[
							{
								label:'参数设置',
								icon: 'fa fa-align-left',
								routerLink:["./homepage/parameter-set"]
							},
							{
								label:'缓存管理',
								icon: 'fa fa-th-large',
								routerLink:["./homepage/cache-management"]
							}

						]
					},
					{
						label:'综合管理',
						icon: 'fa fa-dropbox',
						childs:[
							{
								label:'导出管理',
								icon: 'fa fa-align-left',
								routerLink:["./system/data-export"]
							},
						]
					}
				]
			},
			{
				label:"业务管理",
				icon: 'fa fa-briefcase',
				childs:[
					
					{
						label:'债券报价',
						icon: 'fa fa-balance-scale',
						childs:[
							{
								label:'查询报价',
								icon: 'fa fa-binoculars',
								routerLink:["./homepage/quotation"]
							},
							// {
							// 	label:'客服代挂',
							// 	icon: 'fa fa-bed',
							// 	routerLink:["./homepage/customerhang"]
							// },
							{
								label:'资金报价',
								icon: 'fa fa-credit-card',
								routerLink:["./homepage/capital_distribution"]
							},
							{
								label:'报价总览',
								icon: 'fa fa-book',
								routerLink:["./homepage/bonds_verview"]
							},{
								label:'报价解析',
								icon: 'fa fa-pie-chart',
								routerLink:["./homepage/bond-distribution/bond-analysis"]
							},
						]
					},
					{
						label:'债券分销',
						icon: 'fa fa-send',
						childs:[
							{
								label:'分销总览',
								icon: 'fa fa-map',
								routerLink:["./homepage/bond-distribution/bond-distribution-pandect"]
							},
							{
								label:'团队管理',
								icon: 'fa fa-users',
								routerLink:["./homepage/bond-distribution/role-management"]
							},
							{
								label:'债券分销列表',
								icon: 'fa fa-list-ul',
								routerLink:["./homepage/bond-distribution/bond-distribution-list"]
							},
							/*{
								label:'申购详情',
								icon: 'fa fa-list-alt',
								routerLink:["./homepage/bond-distribution/subscribe-detial"]
							},
							{
								label:'债券详情',
								icon: 'fa fa-paste',
								routerLink:["./homepage/bond-distribution/bond-detial"]
							},
							{
								label:'用户申购详情',
								icon: 'fa fa-align-left',
								routerLink:["./homepage/bond-distribution/subscribe-detial-user"]
							},*/
						]
					},
					{
						label:'债帮手',
						icon: 'fa fa-gavel',
						childs:[
							{
								label:'列表',
								icon: 'fa fa-list-ul',
								routerLink:["./homepage/business/bond-helper-list"]
							},
						]
					},
				]
			},{
				label:'CRM',
				routerLink: ['./crm'],
				childs:[
				{
						label:'客户经理管理',
						icon: 'fa fa-black-tie',
						childs:[
							{
								label:'客户经理列表',
								icon: 'fa fa-list-ul',
								routerLink:["./crm/client-list"]
							},
							// {
							// 	label:'分配机构',
							// 	icon: 'fa fa-university',
							// 	routerLink:["./crm/crm-allocationOrg"]
							// },
						]
				},
				{
						label:'联系人管理',
						icon: 'fa fa-phone',
						childs:[
							{
								label:'联系人列表',
								icon: 'fa fa-fax',
								routerLink:["./crm/contact-list"]
							},
						]
				},{
						label:'行动管理',
						icon: 'fa fa-black-tie',
						childs:[
							{
								label:'行动管理列表',
								icon: 'fa fa-list-ul',
								routerLink:["./crm/action-list"]
							},
							// {
							// 	label:'分配机构',
							// 	icon: 'fa fa-university',
							// 	routerLink:["./crm/crm-allocationOrg"]
							// },
						]
				},{
					label:'岗位管理',
					icon: 'fa fa-user',
						childs:[
							{
								label:'岗位列表',
								icon: 'fa fa-list-ul',
								routerLink:["./crm/set-position"]
							},
						]
				}
				]
			},
			{
				label:'客服',
				icon: 'fa fa-comments',
				routerLink: ['./crm'],
				childs:[
					{
						label:'客服聊天查询',
						icon: 'fa fa-comments',
						childs:[
							{
								label:'客服聊天查询',
								icon: 'fa fa-comments',
								routerLink:["./homepage/customer-service/chat-query"]
							},
						]
					},
				]
			}
		];
	constructor(public StorageService:StorageService,public NetUserService: NetUserService,) {
		// this.navMenu = this._data;
		let activeIndexs = this.StorageService.get(this.sessionName);
		this.activeIndexs = activeIndexs||[0,0,0];
		this.getMenuList().then(()=>{
			this.activeMenu(this.activeIndexs);
		});
	}

	errorMsg:any
	getMenuList(){
		return this.NetUserService.getMenuList()
		.then((data:any) => {
			var menu = data.data;
			for(var i in menu){
				if(menu[i].routerLink==''){
					menu[i].routerLink=undefined;
				}
			}
			this.navMenu = menu;
			// this.navMenu = this._data
		},error => this.errorMsg = <any>error);
	}
	private sessionName: string = 'activeIndexs';
	public navMenu: any;
	public sidebarMenu:any = [];
	public activeIndexs:any = [0,0,0]; //激活的下标

	/**
	 * 激活菜单
	 */
	public activeMenu(activeIndexs){
		this.activeIndexs = activeIndexs;
		if(activeIndexs[0]>=0) {
			this.sidebarMenu = this.navMenu[activeIndexs[0]].childs;
			this.StorageService.set(this.sessionName, activeIndexs);
		}
		console.log(activeIndexs)
	}
}