import { InMemoryDbService } from 'angular-in-memory-web-api';

export class UserData implements InMemoryDbService {
	createDb() {
		//cgw
		//cg
		let auth_users = [
			{
				id:'1',
				phone:'18888888888',
				head_thumbnail:'',
				name:'陈静',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'18927377462',
				work_contact:'01022222222',
				mail:'XXX@163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 12 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'2',
				phone:'18888888888',
				head_thumbnail:'',
				name:'郭诗剑',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'01022222222',
				mail:'XXX@163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 11 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'3',
				phone:'18888888888',
				head_thumbnail:'',
				name:'魏宏伟',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'01022222222',
				mail:'XXX@163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'4',
				phone:'18888888888',
				head_thumbnail:'',
				name:'杜立',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'01022222222',
				mail:'XXX@163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'5',
				phone:'18888888888',
				head_thumbnail:'',
				name:'杜立',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'01022222222',
				mail:'XXX@163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'6',
				phone:'18888888888',
				head_thumbnail:'',
				name:'杜立',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'01022222222',
				mail:'XXX@163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'7',
				phone:'18888888888',
				head_thumbnail:'',
				name:'杜立',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'010-22222222',
				mail:'163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'8',
				phone:'18888888888',
				head_thumbnail:'',
				name:'陈静',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'010-22222222',
				mail:'163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			},
			{
				id:'9',
				phone:'18888888888',
				head_thumbnail:'',
				name:'陈静',
				company:'亚联之星',
				department:'技术部',
				position:'web',
				contact:'',
				work_contact:'010-22222222',
				mail:'163.com',
				work_address:'所在地',
				nickname:'昵称',
				sex:'',
				birthday:'Fri Nov 10 2016 23:35:43 GMT+0800',
				home_address:'',
				qq_num:'',
				wechat_num:'',
				referrer_phonenum:'',
				referrer:'',
				name_card:'名片',
				source:"用户来源",
				userState:'true',
				approveState:'false',
				mailModel:'true',
				visitModel:'false',
				backup:'备注'
			}
		];
		//cw
		//gw
		/*chenj start*/
		let groupsearchList=[
			{
				id:'1',
				OfficialGroup:'是',
				OfficialManagement:'是', 
				groupName:'墙面角度与阳光分析群', 
				groupNum:'6',
				groupMainPhone:"12345678976",
				groupMain:"晨晨",
				groupBuiltTime:"2016-08-23", 
			},
			{
				id:'2',
				OfficialGroup:'是',
				OfficialManagement:'否',  
				groupName:'刷墙的',   
				groupNum:'128',
				groupMainPhone:"12345678976",
				groupMain:"静静",
				groupBuiltTime:"2016-08-28",  
			},
			{
				id:'3',
				OfficialGroup:'否',
				OfficialManagement:'否',  
				groupName:'贴地板',   
				groupNum:'1238',
				groupMainPhone:"12345678976",
				groupMain:"海丽",
				groupBuiltTime:"2016-08-20", 
			},
			{
				id:'3',
				OfficialGroup:'否',
				OfficialManagement:'否',  
				groupName:'贴地板',   
				groupNum:'1238',
				groupMainPhone:"12345678976",
				groupMain:"海丽",
				groupBuiltTime:"2016-08-20",  
			},
			{
				id:'3',
				OfficialGroup:'否',
				OfficialManagement:'否',  
				groupName:'贴地板',  
				groupNum:'1238',
				groupMainPhone:"12345678976",
				groupMain:"海丽",
				groupBuiltTime:"2016-08-20",  
			},
			{
				id:'3',
				OfficialGroup:'否',
				OfficialManagement:'否',  
				groupName:'贴地板',   
				groupNum:'1238',
				groupMainPhone:"12345678976",
				groupMain:"海丽",
				groupBuiltTime:"2016-08-20", 
			},
		]
		/*chenj end*/
		/*guosj start*/
		let frame_navs={
			items:[
				{
					label:"用户列表",
					router_id:"user-list"
				},
				{
					label:"添加用户",
					router_id:"user-edit"
				},
				{
					label:"用户审核",
					router_id:"user-approve"
				},
				{
					label:"审核历史",
					router_id:"user-approve-history"
				}
			],
			group:'用户管理',
			showNavDynamic:true
		};
		let auth_organizations = [
			{
				fullname:"中国银行",
				abbreviation:"BOC",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"false"
			},
			{
				fullname:"中国工商银行",
				abbreviation:"ICBC",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"中国人民银行",
				abbreviation:"PBC",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"false"
			},
			{
				fullname:"中国建设银行",
				abbreviation:"CCB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"中国农业银行",
				abbreviation:"ABC",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"中国民生银行",
				abbreviation:"CMBC",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"招商银行",
				abbreviation:"CMB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"兴业银行",
				abbreviation:"CIB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"北京银行",
				abbreviation:"BOB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"中国光大银行",
				abbreviation:"CEB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"中信银行",
				abbreviation:"CCB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"广东发展银行",
				abbreviation:"GDB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"上海浦东发展银行",
				abbreviation:"SPDB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"深圳发展银行",
				abbreviation:"SBD",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"国家开发银行",
				abbreviation:"CDB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"汇丰银行",
				abbreviation:"HSBC",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"华夏银行",
				abbreviation:"HXB",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			},
			{
				fullname:"交通银行",
				abbreviation:"BCM",
				logo:"",
				c1:"",
				c2:"",
				address:"北京",
				address_detail:"",
				isFinancial:"true"
			}
		];
		let auth_roles = [
			{
				code:"11",
				name:"xxx",
				description:"",
				group:"",
				state:""
			},
			{
				code:"12",
				name:"yyy",
				description:"",
				group:"",
				state:""
			},
			{
				code:"13",
				name:"xxx",
				description:"",
				group:"",
				state:""
			},
			{
				code:"14",
				name:"yyy",
				description:"",
				group:"",
				state:""
			},{
				code:"15",
				name:"xxx",
				description:"",
				group:"",
				state:""
			},
			{
				code:"16",
				name:"yyy",
				description:"",
				group:"",
				state:""
			},{
				code:"17",
				name:"xxx",
				description:"",
				group:"",
				state:""
			},
			{
				code:"18",
				name:"yyy",
				description:"",
				group:"",
				state:""
			},
		];
		let auth_groups = [
			{
				code:"",
				name:"xxx",
				description:"",
				group:"",
				state:""
			},
			{
				code:"",
				name:"yyy",
				description:"",
				group:"",
				state:""
			}
		];
		let nav_map_real = [
			{
				"parentMenuId": 0,
				"menuId": 1,
				"label": "内容管理",
				"routerlink": "",
				"level": [
					{
						"parentMenuId": 1,
						"menuId": 2,
						"label": "同业圈",
						"routerlink": "",
						"level": [
							{
								"parentMenuId": 2,
								"menuId": 3,
								"label": "资讯管理",
								"routerlink": "./sns-news-management"
							},
							{
								"parentMenuId": 2,
								"menuId": 4,
								"label": "快讯管理",
								"routerlink": "./sns-news-flash-management"
							},
							{
								"parentMenuId": 2,
								"menuId": 5,
								"label": "动态管理",
								"routerlink": "./sns-share-management"
							},
							{
								"parentMenuId": 2,
								"menuId": 6,
								"label": "评论管理",
								"routerlink": "./sns-comments-history"
							},
							{
								"parentMenuId": 2,
								"menuId": 7,
								"label": "聚合标签管理",
								"routerlink": "./sns-tags-management"
							}
						]
					},
					{
						"parentMenuId": 1,
						"menuId": 8,
						"label": "群组",
						"routerlink": "",
						"level": [
							{
								"parentMenuId": 8,
								"menuId": 9,
								"label": "群租管理",
								"routerlink": "./group-management"
							}
						]
					}
				]
			},
			{
				"parentMenuId": 0,
				"menuId": 10,
				"label": "权限管理",
				"routerlink": "",
				"level": [
					{
						"parentMenuId": 10,
						"menuId": 11,
						"label": "用户管理",
						"routerlink": "",
						"level": [
							{
								"parentMenuId": 11,
								"menuId": 12,
								"label": "用户列表",
								"routerlink": "./user-list"
							},
							{
								"parentMenuId": 11,
								"menuId": 13,
								"label": "添加用户",
								"routerlink": "./user-edit"
							},
							{
								"parentMenuId": 11,
								"menuId": 14,
								"label": "用户审核",
								"routerlink": "./user-approve"
							},
							{
								"parentMenuId": 11,
								"menuId": 15,
								"label": "审核历史",
								"routerlink": "./user-approve-history"
							}
						]
					},
					{
						"parentMenuId": 10,
						"menuId": 16,
						"label": "机构管理",
						"routerlink": "",
						"level": [
							{
								"parentMenuId": 16,
								"menuId": 17,
								"label": "机构列表",
								"routerlink": "./organization-list"
							}
						]
					}
				]
			}
		];
		let nav_map=[
			/*{
				label:'工作台',
				iconId:'bench',
				level2:[
					{
						label:'我的待办',
						level3:[
							{
								label:'我的待办',
								routerlink:'javascript:void(0)'
							}
						]
					},
					{
						label:'我的日常',
						level3:[
							{
								label:'我的日常',
								routerlink:'javascript:void(0)'
							}
						]
					}
				]
			},*/
			{
				label:'内容管理',
				iconId:'content-manage',
				level2:[
					{
						label:'同业圈',
						level3:[
							{
								label:'资讯管理',
								routerlink:'./sns-news-management'
							},
							{
								label:'快讯管理',
								routerlink:'./sns-news-flash-management'
							},
							{
								label:'动态管理',
								routerlink:'./sns-share-management'
							},
							{
								label:'评论管理',
								routerlink:'./sns-comments-history'
							},
							/*{
								label:'图片管理',
								routerlink:'./sns-pics-management'
							},*/
							{
								label:'聚合标签管理',
								routerlink:'./sns-tags-management'
							},
						]
					},
					/*{
						label:'金币',
						level3:[
							{
								label:'礼品管理',
								routerlink:'./coin-present'
							},
							{
								label:'上架商品管理',
								routerlink:'./coin-goods'
							},
							{
								label:'轮播图管理',
								routerlink:'./coin-dypics'
							},
							{
								label:'商品兑换管理',
								routerlink:'./coin-goods-exchange'
							},
							{
								label:'金币收支统计',
								routerlink:'./coin-io-statistics'
							},
							{
								label:'金币收支明细',
								routerlink:'./coin-io-detail'
							}
						]
					},*/
					{
						label:'群组',
						level3:[
							{
								label:'群组管理',
								routerlink:'./group-management'
							}
						]
					}
				]
			},
			{
				label:'权限管理',
				iconId:'authority-manage',
				level2:[
					{
						label:'用户管理',
						level3:[
							{
								label:'用户列表',
								routerlink:'./user-list'
							},
							{
								label:'添加用户',
								routerlink:'./user-edit'
							},
							{
								label:'用户审核',
								routerlink:'./user-approve'
							},
							{
								label:'审核历史',
								routerlink:'./user-approve-history'
							},
						]
					},
					{
						label:'机构管理',
						level3:[
							{
								label:'机构列表',
								routerlink:'./organization-list'
							}
						]
					},
					/*{
						label:'权限设置',
						level3:[
							{
								label:'角色管理',
								routerlink:'./auth-role-manage'
							},
							{
								label:'用户分组',
								routerlink:'./auth-user-group'
							},
							{
								label:'数据项设置',
								routerlink:'./auth-data-item'
							},
							{
								label:'菜单按钮设置',
								routerlink:'./auth-menu-btn-setting'
							}
						]
					}*/
				]
			},
			/*{
				label:'系统管理',
				iconId:'system-manage',
				level2:[
					{
						label:'系统设置',
						level3:[
							{
								label:'资讯动态维护',
								routerlink:'javascript:void(0)'
							}
						]
					},
					{
						label:'应用设置',
						level3:[
							{
								label:'客户端APP',
								routerlink:'javascript:void(0)'
							},
							{
								label:'客户端WEB',
								routerlink:'javascript:void(0)'
							},
							{
								label:'客户端Client',
								routerlink:'javascript:void(0)'
							},
							{
								label:'管理端(后台)',
								routerlink:'javascript:void(0)'
							},
						]
					}
				]
			}*/
		];
		/*guosj end*/
		/*weihw start*/
		let userMsges=[
			{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'},
				{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			},{
				name: 'Ctursy',
				company: '亚联',
				section: '亚联之星',
				phone: '138888888',
				number: '010-8815988',
				sendDate: '2016-8-10',
				recDate: '2016-10-8',
				approveMsg: '注册新用户'
			}
		];
		let loginMsg = [
			{
				username:'chenjing',
				password:'12345687'
			},{
				username:'guoshijian',
				password:'12345687'
			},{
				username:'weihongwei',
				password:'12345687'
			}
		];
		let news = [
			{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},{
				iid:'资讯ID',
				title:'标题',
				category:'资讯分类',
				pol_tip:'聚合标签',
				create_time:'发布时间',
				source:'来源',
				view_cnt:"浏览量",
				comment_cnt:"评论量",
				like_cnt:"点赞量",
				repost_cnt:"转发量",
				is_tip:"举报标识",
				is_del:"删除标识",
			},
		];
		
		/*weihw end*/
		return {
			auth_users,
			frame_navs,
			auth_organizations,
			auth_roles,
			auth_groups,
			nav_map,
			nav_map_real,
			userMsges,
			loginMsg,
			news,
			groupsearchList
		};
	}
}