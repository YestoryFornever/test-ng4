import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, ViewChild  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router,Params }   from '@angular/router';
// import { ActivatedRoute, Router }   from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { ExcelExportService } from '../../../../services/excel-export.service';
import { OrganizationListService } from './services/organization-list.service';
import { Organization, OrgCondition } from './classes/organizations';
import { TypeAhead } from './classes/typeahead';
@Component({
	selector: 'alphain-organization-list',
	templateUrl: 'organization-list.component.html',
	styleUrls: [
		'./organization-list.component.scss',
		'../../../../scss/header.scss',
		'../../../../scss/table.scss',
		'../../../../scss/condition.scss',
		'../../../../scss/pagination.scss'
	],
	providers:[
		OrganizationListService,
		ExcelExportService
	]
})
export class OrganizationListComponent implements OnInit {
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private organizationListService:OrganizationListService,
		private excelExportService:ExcelExportService,
		private sanitizer: DomSanitizer,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	) {
		this.orgCondition = new OrgCondition();
		this.organization = new Organization();
		this.emptyOrganization = new Organization();
		this.fullnameTypeAhead = new TypeAhead();
		this.abbrTypeAhead = new TypeAhead();
		this.issuerTypeAhead = new TypeAhead();
		this.pvc = {
			'北京':'北京',
			'上海':'上海',
			'天津':'天津',
			'重庆':'重庆',
			'河北':'石家庄,张家口,承德,秦皇岛,唐山,廊坊,保定,沧州,衡水,邢台,邯郸',
			'山西':'太原,大同,朔州,阳泉,长治,晋城,忻州,吕梁,晋中,临汾,运城',
			'辽宁':'沈阳,朝阳,阜新,铁岭,抚顺,本溪,辽阳,鞍山,丹东,大连,营口,盘锦,锦州,葫芦岛',
			'吉林':'长春,白城,松原,吉林,四平,辽源,通化,白山,延边',
			'黑龙江':'哈尔滨,齐齐哈尔,黑河,大庆,伊春,鹤岗,佳木斯,双鸭山,七台河,鸡西,牡丹江,绥化,大兴安',
			'江苏':'南京,徐州,连云港,宿迁,淮阴,盐城,扬州,泰州,南通,镇江,常州,无锡,苏州',
			'浙江':'杭州,湖州,嘉兴,舟山,宁波,绍兴,金华,台州,温州,丽水',
			'安徽':'合肥,宿州,淮北,阜阳,蚌埠,淮南,滁州,马鞍山,芜湖,铜陵,安庆,黄山,六安,巢湖,池州,宣城',
			'福建':'福州,南平,三明,莆田,泉州,厦门,漳州,龙岩,宁德',
			'江西':'南昌,九江,景德镇,鹰潭,新余,萍乡,赣州,上饶,抚州,宜春,吉安',
			'山东':'济南,聊城,德州,东营,淄博,潍坊,烟台,威海,青岛,日照,临沂,枣庄,济宁,泰安,莱芜,滨州,菏泽',
			'河南':'郑州,三门峡,洛阳,焦作,新乡,鹤壁,安阳,濮阳,开封,商丘,许昌,漯河,平顶山,南阳,信阳,周口,驻马店',
			'湖北':'武汉,十堰,襄攀,荆门,孝感,黄冈,鄂州,黄石,咸宁,荆州,宜昌,恩施,襄樊',
			'湖南':'长沙,张家界,常德,益阳,岳阳,株洲,湘潭,衡阳,郴州,永州,邵阳,怀化,娄底,湘西',
			'广东':'广州,清远,韶关,河源,梅州,潮州,汕头,揭阳,汕尾,惠州,东莞,深圳,珠海,江门,佛山,肇庆,云浮,阳江,茂名,湛江',
			'海南':'海口,三亚',
			'四川':'成都,广元,绵阳,德阳,南充,广安,遂宁,内江,乐山,自贡,泸州,宜宾,攀枝花,巴中,达州,资阳,眉山,雅安,阿坝,甘孜,凉山',
			'贵州':'贵阳,六盘水,遵义,毕节,铜仁,安顺,黔东南,黔南,黔西南',
			'云南':'昆明,曲靖,玉溪,丽江,昭通,思茅,临沧,保山,德宏,怒江,迪庆,大理,楚雄,红河,文山,西双版纳',
			'陕西':'西安,延安,铜川,渭南,咸阳,宝鸡,汉中,榆林,商洛,安康',
			'甘肃':'兰州,嘉峪关,金昌,白银,天水,酒泉,张掖,武威,庆阳,平凉,定西,陇南,临夏,甘南',
			'青海':'西宁,海东,海北,海南,黄南,果洛,玉树,海西',
			'内蒙古':'呼和浩特,包头,乌海,赤峰,呼伦贝尔盟,兴安盟,哲里木盟,锡林郭勒盟,乌兰察布盟,鄂尔多斯,巴彦淖尔盟,阿拉善盟',
			'广西':'南宁,桂林,柳州,梧州,贵港,玉林,钦州,北海,防城港,南宁,百色,河池,柳州,贺州',
			'西藏':'拉萨,那曲,昌都,林芝,山南,日喀则,阿里',
			'宁夏':'银川,石嘴山,吴忠,固原',
			'新疆':'乌鲁木齐,克拉玛依,喀什,阿克苏,和田,吐鲁番,哈密,博尔塔拉,昌吉,巴音郭楞,伊犁,塔城,阿勒泰',
			'香港':'香港',
			'澳门':'澳门',
			'台湾':'台北,台南,其他',
			'其它':'其它',
			'其他地区':'其他地区',
			'国外机构':'国外机构'
		};
		this.provinces = Object.keys(this.pvc);
	}
	
	//public variable
	errorMsg:string;
	emptyOrganization:Organization;
	orgCondition:OrgCondition;
	organization:Organization;
	organizations:Organization[];
	fullnameTypeAhead:TypeAhead;
	abbrTypeAhead:TypeAhead;
	issuerTypeAhead:TypeAhead;

	provinces:string[];
	pvc:Object;
	cities:string[];

	ngOnInit() {
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
			this.organizationListService
				.getOrgFullName(this.organization.fullname)
				.subscribe(
					data => {
						if(data.length!=undefined){
							observer.next(data)
						}else{
							var obj:any=[]
							observer.next(obj)
						}
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
		this.abbrTypeAhead.source = Observable.create((observer:any) => {
			this.organizationListService
				.getOrgAbbr(this.organization.abbreviation)
				.subscribe(
					data => {
						if(data.length!=undefined){
							observer.next(data)
						}else{
							var obj:any=[]
							observer.next(obj)
						}
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.abbrTypeAhead.getStates(token));
		this.issuerTypeAhead.source = Observable.create((observer:any) => {
			this.organizationListService
				.getOrgIssuer(this.organization.issuerShortName)
				.subscribe(
					data => {
						// debugger
						if(data.length!=undefined){
							observer.next(data)
						}else{
							var obj:any=[]
							observer.next(obj)
						}
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.issuerTypeAhead.getStates(token));
		this.getOrgCate1();
		this.getOrgInCate1();
		this.getOrganizations();
	}
	ngAfterViewChecked(){
		this.formChanged();
	}
	orgCate1:any[];
	//机构分类
	getOrgCate1(){
		this.organizationListService
			.getOrgCate("0")
			.subscribe(
				cates => {
					this.orgCate1 = cates;
				},
				error => this.errorMsg = error
			);
	}
	orgCate2:any[];
	getOrgCate2(event:any){
		//debugger;
		this.orgCate2 = undefined;
		this.orgCondition.c2 = '';
		this.organizationListService
			.getOrgCate(event.target.value)
			.subscribe(
				cates => {
					this.orgCate2 = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}

	orgCate2EP:any[];
	getOrgCate2EP(event?:any){
		let key:any;
		if(event){
			if(!event.target.value){
				this.orgCate2EP = undefined;
				this.organization.c2id = "";
				return;
			}
			key = event.target.value;
			this.organization.c2id = "";
		}else{
			key = "1";
		}
		this.organizationListService
			.getOrgCate(key)
			.subscribe(
				cates => {
					this.orgCate2EP = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}
	getOrgCate2EP_plus(key:string){
		this.organizationListService
			.getOrgCate(key)
			.subscribe(
				cates => {
					this.orgCate2EP = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}

	//机构国际分类
	orgInCate1:any[];
	getOrgInCate1(){
		this.organizationListService
			.getOrgInCate("0")
			.subscribe(
				cates => {
					// debugger;
					this.orgInCate1 = cates;
				},
				error => this.errorMsg = error
			);
	}
	orgInCate2:any[];
	getOrgInCate2(event:any){
		this.orgInCate2 = undefined;
		this.orgCondition.ic2 = '';
		this.organizationListService
			.getOrgInCate(event.target.value)
			.subscribe(
				cates => {
					this.orgInCate2 = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}

	orgInCate2EP:any[];
	getOrgInCate2EP(event?:any){
		let key:any;
		if(event){
			if(!event.target.value){
				this.orgInCate2EP = undefined;
				this.organization.ic2id = "";
				return;
			}
			key = event.target.value;
			this.organization.ic2id = "";
		}else{
			key = "1";
		}
		this.organizationListService
			.getOrgInCate(key)
			.subscribe(
				cates => {
					this.orgInCate2EP = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}
	getOrgInCate2EP_plus(key:string){
		this.organizationListService
			.getOrgInCate(key)
			.subscribe(
				cates => {
					this.orgInCate2EP = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}

	//获取机构列表(查询)
	getOrganizations(){
		this.organizationListService
			.getOrganizations(this.orgCondition)
			.subscribe(
				data => {
					let arr = data["list"];
					let obj = new Object();
					obj["orgs"] = new Array();
					for(let item in arr){
						let org = new Organization();
						org.id = arr[item].organizationId;
						org.fullname = arr[item].organizationFullName;
						org.abbreviation = arr[item].organizationShortName;
						org.logourl = arr[item].logoAnnexUrl;
						org.c1 = arr[item].organizationCategoryName1||"";
						org.c1id = arr[item].organizationCategoryId1;
						org.c2 = arr[item].organizationCategoryName2||"";
						org.c2id = arr[item].organizationCategoryId2;
						org.address = arr[item].province+arr[item].city;
						org.address_detail = arr[item].detailedAddress;
						org.address_code = arr[item].postcode;
						org.phone = arr[item].switchboard;
						org.isFinancial = arr[item].ifFinancialInstitution;
						org.isBonds = arr[item].ifBondsInstitution;
						org.backup = arr[item].remark;
						org.subsNum = arr[item].departmentNumber;
						org.population = arr[item].totalStaff;
						org.source = arr[item].organizationSource;
						org.approveStatus = arr[item].organizationState||"3";//Status
						org.createTime = arr[item].createTime;//Status
						org.updateTime = arr[item].updateTime;//Status
						org.enterpriseNature = arr[item].enterpriseNature;
						org.enterpriseNatureName = arr[item].enterpriseNatureName;
						org.issuerShortName = arr[item].issuerShortName;
						org.issuerId = arr[item].issuerId;
						org.province = arr[item].province;
						org.city = arr[item].city;
						org.ic1 = arr[item].internationClassifyName1;
						org.ic1id = arr[item].internationClassifyId1;
						org.ic2 = arr[item].internationClassifyName2;
						org.ic2id = arr[item].internationClassifyId2;
						obj["orgs"].push(org);
					}
					this.organizations = obj["orgs"];
					// this.orgCondition.totalPages = data["page"]["totalPage"];
					this.orgCondition.totalItems = data["page"]["totalResult"];
					// debugger;
					this.changeDetectorRef.detectChanges();
				},
				error => this.errorMsg = <any>error
			);
	}
	//添加/修改机构弹窗
	isAdd:boolean = true;
	editOrgPop(dialog:any,organization?:any){
		// debugger;
		if(!organization){//添加时
			this.isAdd = true;
			this.fileReset();
			this.organization = this.emptyOrganization;
		}else{
			this.isAdd = false;
			this.organization = organization;
			//备注：应该不存在一个机构属于某个一级分类但不属于这个一级分类下的任何二级分类这种情况（在这个一级分类有二级分类的情况下）。
			if(organization.c1id){
				this.getOrgCate2EP_plus(organization.c1id);
			}
			if(organization.ic1id){
				this.getOrgInCate2EP_plus(organization.ic1id);
			}
			if(organization.province){
				this.cities = this.pvc[organization.province].split(",");
			}
		}
		dialog.show();
	}
	//添加/修改机构保存
	editOrganization(dialog:any){
		switch(this.organization.enterpriseNature){
			case "1":
				this.organization.enterpriseNatureName="央企";break;
			case "2":
				this.organization.enterpriseNatureName="国企";break;
			case "3":
				this.organization.enterpriseNatureName="民企";break;
			case "4":
				this.organization.enterpriseNatureName="其他";break;
			default: this.organization.enterpriseNatureName="";break;
		}
		if(this.isAdd){
			this.organizationListService
				.addOrganization(this.organization)
				.subscribe(
					result => {
						if(result.status!=="0"){
							alert(result.msg);
						}else{
							dialog.hide();
						}
					},
					error => this.errorMsg = <any>error
				);
		}else{
			this.organizationListService
				.editOrganization(this.organization)
				.subscribe(
					result => {
						if(result.status!=="0"){
							alert(result.msg);
						}else{
							dialog.hide();
						}
					},
					error => this.errorMsg = <any>error
				);
			}
	}
	/*表单校验*/
	org_form:NgForm;
	@ViewChild('orgform') curForm:NgForm;
	formChanged(){
		if(this.curForm === this.org_form){return;}
		this.org_form = this.curForm;
		if(this.org_form){
			this.org_form.valueChanges
				.subscribe(data=>this.onValueChanged(data));
		}
	}
	onValueChanged(data?:any){
		if(!this.org_form){return;}
		const form = this.org_form.form;
		for(const field in this.formErrors){
			this.formErrors[field]='';
			const control = form.get(field);

			if(control && control.dirty && !control.valid){
				const messages = this.validationMessages[field];
				for(const key in control.errors){
					this.formErrors[field]+=messages[key]+' ';
				}
			}
		}
	}
	formErrors = {
		'fullname':'',
		'abbreviation':'',
		'c1':''
	}
	validationMessages = {
		'fullname':{
			'required':'不能为空'
		},
		'abbreviation':{
			'required':'不能为空'
		},
		'c1':{
			'required':'分类不能为空'
		}
	}
	blurIssuer(){
		this.organization.issuerShortName = this.organization.issuerId = '';
	}
	changeIssuerId(e:any){
		this.organization.issuerId = e.item.id;
	}
	changeCities(province:HTMLSelectElement){
		// console.log(province.value);
		this.cities = this.pvc[province.value].split(",");
		this.organization.city = "";
	}
	//添加/修改机构弹窗关闭
	editOrgPopClose(dialog:any){
		dialog.hide();
	}
	//LOGO上传
	fileChange(input:any,thumbnail:any){
		this.organization.logo = input;
		this.organization.logourl = '';
		if(input.files[0]){
			this.organization.logourl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(input.files[0]));
		}
	}
	//清空LOGO
	fileReset(){
		this.organization.logourl="";
		this.organization.logo && (this.organization.logo.value="");
	}
	//导出excel
	exportExcel(excel_helper:any){
		//this.excelExportService.export(table,excel_helper);
		this.organizationListService
			.issuerExcel()
			.subscribe(
				result => {
					//window.location.href = result;
					let a = document.createElement('a');
					a.href = result;
					a.click();
				},
				error => this.errorMsg = <any>error
			);
	}
	//列标题设置
	listItem:Object={
		fullname:true,
		abbreviation:true,
		category:true,
		approveStatus:true,
		logo:true,
		address_detail:true,
		address_code:true,
		phone:true,
		isFinancial:true,
		backup:true,
		subsNum:true,
		population:true,
		source:true,
		createTime:true,
		updateTime:true,
		enterpriseNature:true,
		issuerShortName:true,
		issuerId:true,
		province:true,
		city:true,
		incategory:true
	}
	colsSettingAll:boolean=false;
	cols_settingTrue(){
		for(let item in this.listItem){
			if(item==="fullname"||item==="abbreviation"||item==="category"||item==="approveStatus"){continue;}
			this.listItem[item]=true;
		}
		this.colsSettingAll=false;
	}
	cols_settingFalse(){
		for(let item in this.listItem){
			if(item==="fullname"||item==="abbreviation"||item==="category"||item==="approveStatus"){continue;}
			this.listItem[item]=false;
		}
		this.colsSettingAll=true;
	}
	//修改机构状态弹窗
	statusOrgPop(dialog:any,organization:any){
		this.organization = this.emptyOrganization;
		dialog.show();
		if(organization){
			//console.log("修改");
			this.organization = organization;
		}
	}
	//修改机构状态
	updateStatus(dialog:any){
		this.organizationListService
			.updateStatus(this.organization)
			.subscribe(
				result => {
					// debugger;
				},
				error => this.errorMsg = error
			);
		dialog.hide();
		//更新列表
		this.getOrganizations();
	}
	//部门详情
	deps:any;
	depsPop(dialog:any,organization:any){
		this.organizationListService
			.getDeps(organization)
			.subscribe(
				data => {
					this.deps = data;
				},
				error => this.errorMsg = error
			);
		dialog.show();
	}
	viewOrgUserList(org:Organization){
		//console.log(org.id);
		//debugger;
		this.router.navigate(['/home/user/user-list',org.id],{relativeTo:this.activatedRoute}); 
	}
	viewDepUserList(dep:any){
		this.router.navigate(['/home/user/user-list',{orgid:dep.organizationId,depid:dep.departmentId}],{relativeTo:this.activatedRoute}); 
	}
	
	// 分页
	msgNumbers = [10,20,30,50];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public sizeData(num:number){
		this.orgCondition.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.orgCondition.itemsPerPage = num;
		this.getOrganizations();
	};
	// 翻页
	public pageChanged(event:any):void {
		//console.log(event);
		this.orgCondition.currentPage = event.page;
		this.getOrganizations();
	};
	public pageNumChange(event:any){
		this.orgCondition.totalPages = event;
	}
	public setPage(pageNo:number):void {
		this.orgCondition.itemsPerPage = pageNo;
	};

	appStatues:any = true
	show:any
	setLoadClasses(app:any) {
		console.log(app)
	  	let classes =  {
	  	  notApprove: app==2,   
	  	  approve:app==1, 
	  	  approving:app==3 // true
  		};
		return classes;
	}
	updateOrgInstitutionData(){
		this.organizationListService
				.updateOrgInstitutionData(null)
				.subscribe(
					result => {
						
							alert(result.msg);
					},
					error => this.errorMsg = <any>error
				);
	}
	 turnTo(id:any){
		this.router.navigate(['../organization-detial',id],{relativeTo:this.activatedRoute}); 
	}
	// organization-combine/:ids
	turnToCom(ids:any){
		this.router.navigate(['../organization-combine',ids],{relativeTo:this.activatedRoute}); 
	}
}