import { Component, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// import { any } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import { User } from './classes/user-edit';
import { TypeAhead } from './classes/typeahead';
import { UserEditService } from './services/user-edit.service';
@Component({
	selector: 'alphain-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: [
		'./user-edit.component.scss','../../../common/scss/header.scss'
	],
	providers:[UserEditService]
})
export class UserEditComponent implements OnInit{
	/*test*/
	data:any;
	test(){
		console.info("测试");
		this.isSaving=true;
		console.log(!this.user_edit_form.form.valid||this.isSaving);
	}
	user:User;
	data_head_thumbnail:Object;
	data_referrer_phonenum:Object;
	users:User[];
	errorMsg:string;
	isAdd:boolean;
	submitted:boolean;
	isSaving:boolean=false;
	editErrorMsg:string="";

	/*生命周期*/
	constructor(
		private userEditService:UserEditService,
		private activatedRoute:ActivatedRoute,
		private router:Router
	){
		this.fullnameTypeAhead = new TypeAhead();
		this.user = new User();
		this.isAdd = true;
		this.submitted = false;
		this.dataSourceOrgs = Observable.create((observer:any) => {
			observer.next(this.user.company);
		}).mergeMap((token:string) => this.getOrgsAsObservable(token));
		this.dataSourceDeps = Observable.create((observer:any) => {
			observer.next(this.user.department);
		}).mergeMap((token:string) => this.getDepsAsObservable(token));
	}
	fullnameTypeAhead:any
	//ngOnChanges(){console.log('changes');}
	ngOnInit(){
		// debugger
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = +params['id'];
			let userType = params['userType'];
			this.ID=id
			// debugger
			if(id){
				this.getUser(id);//根据用户id获取数据接口未完成
				this.isAdd = false;
			}
			if(userType){
				// this.getUser(id);//根据用户id获取数据接口未完成
				this.haveUserType = true;
				this.user.userType = userType
			}else{
				this.user.userType = ''
			}
		});
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
     	 this.userEditService
        .getOrganizationListByShortName({value:this.user.company})
        .subscribe(
          data => { 
          			if(data.data.length){observer.next(data.data)}else{
          					data.data=[]
          					observer.next(data.data)
         				}
      				},
          error => this.errorMessage = error
        );
   		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
		//console.log('init')
		this.getOrgs();
		this.getDeps();
		this.getOrgCate1()
		this.getOrgInCate1();
	}
	haveUserType:boolean= false
	ID:any
	/*ngDoCheck(){console.log('docheck')}
	ngAfterContentInit(){console.log('AfterContentInit')}
	ngAfterContentChecked(){console.log('AfterContentChecked');}
	ngAfterViewInit(){console.log('AfterViewInit')}*/
	ngAfterViewChecked(){
		this.formChanged();
	}
	//ngOnDestroy(){console.log('OnDestroy')}
	private handleString(key:any){
		if(!key) {
			return ''
		}
		return String(key);
	};
	// 解析名片
	managerCard:any={
		bTwoCardPicture:'',
		bCardUrl:''
	}
	isS:any=false
	UploadBusinessCardAnalysis(del:any){
		this.managerCard.bTwoCardPicture = this.user.info_card
		this.managerCard.bCardUrl = this.user.info_card_url
		this.isS=true
		
		this.userEditService
			.UploadBusinessCardAnalysis(this.managerCard)
			.subscribe(
				result => {
					if(result.status==="0"){
						if(result.data.companyMail){
							 this.user.mail = result.data.companyMail
						}else{
							this.user.mail=''
						}
						if(result.data.organizationFullName){
							 this.user.organizationFullName = result.data.organizationFullName
						}else{
							this.user.organizationFullName=''
						}
						if(result.data.organizationId){
							 this.user.companyId = result.data.organizationId
						}else{
							 this.user.companyId=''
						}
					  	if(result.data.organizationShortName){
							 this.user.company = result.data.organizationShortName
						}else{
							 this.user.company=''
						}
						
					    if(result.data.department){
 							this.user.department = result.data.department	
 						}else{
							this.user.department=''
						}
						if(result.data.position){
							 this.user.position = result.data.position
						}else{
							this.user.position=''
						}
						if(result.data.contactPhone){
							 this.user.contact = result.data.contactPhone
						}else{
							this.user.contact=''
						}
						if(result.data.position){
							 this.user.position = result.data.position
						}else{
							this.user.position=''
						}
						if(result.data.userType){
							 this.user.userType = result.data.userType
						}else{
							this.user.userType=''
						}
						if(result.data.workPhone){
							 this.user.work_contact = result.data.workPhone
						}else{
							this.user.work_contact=''
						}
					   	if(result.data.workAddress){
							 this.user.work_address = result.data.workAddress
						}else{
							this.user.work_address=''
						}
					       this.isS=false  // del.hide()
					}else{
						alert(result.msg);
						 this.isS=false 
						// del.hide()
					}
				},
				error => this.errorMsg = <any>error
			);
	}
	/*获取用户*/
	getUser(id:any){
		this.userEditService
			.getUser(id)
			.subscribe(
				data => {
					// debugger;
					this.user.id = this.handleString(data.userId);
					this.user.phone = this.handleString(data.loginName);
					this.user.head_thumbnail_url = this.handleString(data.iconUrl);
					this.user.name = this.handleString(data.userName);
					
					this.user.company = this.handleString(data.organizationShortName);
					this.user.departmentId = this.handleString(data.departmentId);
					this.user.department = this.handleString(data.department);
					this.user.position = this.handleString(data.position);
					this.user.contact = this.handleString(data.contactPhone);
					this.user.work_contact = this.handleString(data.workPhone);
					this.user.mail = this.handleString(data.companyMail);
					this.user.work_address = this.handleString(data.workAddress);
					this.user.nickname = this.handleString(data.nickname);
					this.user.sex = this.handleString(data.gender);
					data.birthday && (this.user.birthday = new Date(data.birthday));
					this.user.home_address = this.handleString(data.hometown);
					this.user.qq_num = this.handleString(data.qqId);
					this.user.wechat_num = this.handleString(data.wechatId);
					this.user.referrer_phonenum = this.handleString(data.referralLogin);
					this.user.referrerid = this.handleString(data.referralCode);
					this.user.referrer = this.handleString(data.referralUserName);
					this.user.name_card_url = this.handleString(data.businessCardUrl);
					this.user.info_card_url = this.handleString(data.businessCardUrlTwo);
					this.user.userStatus = this.handleString(data.userStatus);
					this.user.approveStatus = this.handleString(data.realCertifyStatus);
					this.user.mailModel = this.handleString(data.emailCertifyStatus);
					this.user.visitModel = this.handleString(data.visitStatus);
					this.user.backup = this.handleString(data.remark);
					this.user.userType = this.handleString(data.userType);
					this.user.organizationFullName = this.handleString(data.organizationFullName);
					this.user.companyId = this.handleString(data.organizationId);
				},
				error => this.errorMsg = <any>error
			);
	}
	/*添加用户*/
	userAdd(form:any){
		this.isSaving = true;
		let user = this.user;
		this.userEditService
			.addUser(user)
			.subscribe(
				result => {
					if(result.status==="0"){
						this.submitted = true;
					}else{
						alert(result.msg);
					}
					this.isSaving = false;
				},
				error => this.errorMsg = <any>error
			);
		//console.log(JSON.stringify(this.user));
	}
	/*修改用户*/
	userEdit(form:any){
		// debugger;
		this.isSaving = true;
		let user = this.user;
		this.userEditService
			.editUser(user)
			.subscribe(
				result => {
					if(result.status==="0"){
						this.submitted = true;
					}else if(result.status==="203003"){
						this.editErrorMsg = result.msg;
					}else{
						alert(result.msg);
					}
					this.isSaving = false;
				},
				error => this.errorMsg = <any>error
			);
		//console.log(JSON.stringify(this.user));
	}
	/*获取公司*/
	getOrgs(){
		this.userEditService
			.getOrgs()
			.subscribe(
				orgs => {
					//debugger;
					this.orgs = orgs;
				},
				error => this.errorMsg = <any>error
			);
	}
	// 模糊查询机构
orgListShow=false
orgList:any=[]
obj:any={value:''}
	searchOrg(orgUl:any){
		
		this.obj.value=this.user.company
		this.userEditService.getOrgListByShortName(this.obj)
            .subscribe(
            org => {
                 this.orgList  = org.data    
                },
               	error => this.errorMsg = <any>error               
            ); 
            if(this.user.company!=''){
 				this.orgListShow =true
            }      
	}
	OrgSerch(val:any,id:any){
		// debugger
		this.user.company = val 
		this.user.companyId = id
		this.orgListShow=false
	}
	closeOrg(){
		this.orgListShow=false
	}
	/*获取部门*/
	getDeps(){
		this.userEditService
			.getDeps()
			.subscribe(
				deps => {
					// debugger;
					this.deps = deps;
				},
				error => this.errorMsg = <any>error
			);
	}
	
	routeAddUser(){
		this.userReset();
		this.submitted = false;
		this.isAdd = true;
	}
	/*重置*/
	resetTrigger:boolean=true;
	userReset(){
		this.user.reset();
		if(!this.haveUserType){
			this.user.userType = ''
		}
		this.resetTrigger=this.resetTrigger?false:true;
		setTimeout(()=>this.formErrors={
			'phone':'',
			'name':'',
			'company':'',
			'position':'',
			'contact':'',
			'work_contact':'',
			'mail':'',
			'work_address':'',
			'referrer_phonenum':'',
			'name_card_url':''
		},0);
	}
	/*重置用户密码*/
	resetPassword(){
		this.userEditService
			.resetPassword(this.user.id)
			.subscribe(
				result => {
					if(result.status==="0"){
						alert("重置用户密码成功");
					}else{
						alert(result.msg);
					}
				},
				error => this.errorMsg = <any>error
			);
	}
	/*放弃编辑|回到列表*/
	userCancel(isAdd:boolean){
		if(isAdd){
			this.router.navigate(['../user-list'],{relativeTo:this.activatedRoute});
		}else{
			this.router.navigate(['../../user-list'],{relativeTo:this.activatedRoute});
		}
		if(this.haveUserType){
			this.router.navigate(['../../../user-operate'],{relativeTo:this.activatedRoute});
		}
	}
	/*获取推荐人*/
	getReferrer(referrer_phonenum:any,referrer:any){
		let phonenum = referrer_phonenum.value;
		this.userEditService
			.getReferrer(phonenum)
			.subscribe(
				data => {
					console.log(data);
					this.user.referrerid = data.userId;
					this.user.referrer = data.userName||"无";
				},
				error => this.errorMsg = <any>error
			);
	}
	/*公司失焦清空*/
	blurCompany(el:any,e:any){
		if(!this.user.companyId){
			el.value = "";
			this.user.company = "";
			this.user.organizationFullName=''
		}
	}
	changeCompany(el:any,e:any){
		this.user.companyId = "";
	}
	/*注册手机号失焦*/
	blurPhone(el:any){
		if(this.isAdd){
			this.userEditService
				.checkAccont(this.user.phone)
				.subscribe(
					result => {
						if(result.status==="202002"){
							alert(result.msg);
							this.user.phone="";
						}
					},
					error => this.errorMsg = <any>error
				);
		}
	}

	/*图片预览*/
	head_thumbnail_data = function(file_data:any){
		this.user.head_thumbnail = file_data;
	}
	name_card_data = function(file_data:any){
		this.user.name_card = file_data;
	}
	name_card_url = function(file_url:any){
		this.user.name_card_url = file_url;
	}
	info_card_data = function(file_data:any){
		this.user.info_card = file_data;
		if(!this.ID){
			this.UploadBusinessCardAnalysis()
		}
	}
	info_card_url = function(file_url:any){
		this.user.info_card_url = file_url;
	}
	/*表单校验*/
	user_edit_form:NgForm;
	@ViewChild('user_edit_form') currentForm:NgForm;
	formChanged(){
		if(this.currentForm === this.user_edit_form){return;}
		this.user_edit_form = this.currentForm;
		if(this.user_edit_form){
			this.user_edit_form.valueChanges
				.subscribe(data=>this.onValueChanged(data));
		}
	}
	onValueChanged(data?:any){
		if(!this.user_edit_form){return;}
		const form = this.user_edit_form.form;
		// debugger;
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
		'phone':'',
		'name':'',
		'company':'',
		'position':'',
		'contact':'',
		'work_contact':'',
		'mail':'',
		'work_address':'',
		'referrer_phonenum':'',
		'name_card_url':''
	}
	validationMessages = {
		'phone':{
			'required':'注册手机号不能为空',
			'minlength':'注册手机号不足11位',
			'maxlength':'注册手机号超过11位',
			'pattern':'非数字字符'
		},
		'name':{
			'required':'姓名不能为空'
		},
		'company':{
			'required':'公司不能为空'
		},
		'position':{
			'required':'职位不能为空'
		},
		'contact':{
			'required':'联系电话不能为空'
		},
		'work_contact':{
			'required':'工作电话不能为空'
		},
		'mail':{
			'required':'公司邮箱不能为空',
			'pattern':'邮箱格式不正确'
		},
		'work_address':{
			'required':'工作地址不能为空',
		},
		'referrer_phonenum':{
			'minlength':'手机号不足11位',
			'maxlength':'手机号超过11位',
			'pattern':'非数字字符'
		},
		'name_card_url':{
			'required':'名片不能为空'
		}
	}
	//获取公司
	public orgs:Array<any>;
	public orgsLoading:boolean = false;
	public orgsNoResults:boolean = false;
	public changeOrgsLoading(e:boolean):void {
		this.orgsLoading = e;
	}
	public changeOrgsNoResults(e:boolean):void {
		this.orgsNoResults = e;
	}
	public orgsOnSelect(e:any):void {
		console.log('设置公司为:', e.value);
		this.user.companyId = e.item.organizationId;
		this.user.organizationFullName = e.item.organizationFullName
	}
	public dataSourceOrgs:Observable<any>;
	public getOrgsAsObservable(token:string):Observable<any> {
		let query = new RegExp(token, 'ig');
		return Observable.of(
			this.orgs.filter((status:any) => {
				return query.test(status.organizationShortName);
			})
		);
	}
	//获取部门
	public deps:Array<any>;
	public depsLoading:boolean = false;
	public depsNoResults:boolean = false;
	public changeDepsLoading(e:boolean):void {
		this.depsLoading = e;
	}
	public changeDepsNoResults(e:boolean):void {
		this.depsNoResults = e;
	}
	public depsOnSelect(e:any):void {
		console.log('设置部门为:', e.value);
		//debugger;
		this.user.department = e.item.departmentName
		this.user.departmentId = e.item.departmentId;
	}
	public dataSourceDeps:Observable<any>;
	public getDepsAsObservable(token:string):Observable<any> {
		let query = new RegExp(token, 'ig');
		return Observable.of(
			this.deps.filter((status:any) => {
				return query.test(status.departmentName);
			})
		);
	}
// 机构
	organization:any={
			'organizationFullName':'',
			'organizationShortName':'',
			'organizationCategoryId1':'',
			'organizationCategoryId2':'',
			'province':'',
			'city':'',
			'detailedAddress':'',
			'ifFinancialInstitution':'1',
			'ifBondsInstitution':'2',
			// 'internationClassifyId1':'',
			// 'internationClassifyId2':'1',
			// 'enterpriseNature':'1',		
	}
	//省市联动
	public set_city(province:any){ 
		if(province.value==''){
			this.organization.city=''
		}
		 this.organization.province=province.value
		let cities = {}; 

		cities['北京']=new Array('北京'); 

		cities['上海']=new Array('上海'); 

		cities['天津']=new Array('天津'); 

		cities['重庆']=new Array('重庆'); 

		cities['河北']=new Array('石家庄', '张家口', '承德', '秦皇岛', '唐山', '廊坊', '保定', '沧州', '衡水', '邢台', '邯郸'); 

		cities['山西']=new Array('太原', '大同', '朔州', '阳泉', '长治', '晋城', '忻州', '吕梁', '晋中', '临汾', '运城'); 

		cities['辽宁']=new Array('沈阳', '朝阳', '阜新', '铁岭', '抚顺', '本溪', '辽阳', '鞍山', '丹东', '大连', '营口', '盘锦', '锦州', '葫芦岛'); 

		cities['吉林']=new Array('长春', '白城', '松原', '吉林', '四平', '辽源', '通化', '白山', '延边'); 

		cities['黑龙江']=new Array('哈尔滨', '齐齐哈尔', '黑河', '大庆', '伊春', '鹤岗', '佳木斯', '双鸭山', '七台河', '鸡西', '牡丹江', '绥化', '大兴安'); 

		cities['江苏']=new Array('南京', '徐州', '连云港', '宿迁', '淮阴', '盐城', '扬州', '泰州', '南通', '镇江', '常州', '无锡', '苏州'); 

		cities['浙江']=new Array('杭州', '湖州', '嘉兴', '舟山', '宁波', '绍兴', '金华', '台州', '温州', '丽水'); 

		cities['安徽']=new Array('合肥', '宿州', '淮北', '阜阳', '蚌埠', '淮南', '滁州', '马鞍山', '芜湖', '铜陵', '安庆', '黄山', '六安', '巢湖', '池州', '宣城'); 

		cities['福建']=new Array('福州', '南平', '三明', '莆田', '泉州', '厦门', '漳州', '龙岩', '宁德'); 

		cities['江西省']=new Array('南昌', '九江', '景德镇', '鹰潭', '新余', '萍乡', '赣州', '上饶', '抚州', '宜春', '吉安'); 

		cities['山东']=new Array('济南', '聊城', '德州', '东营', '淄博', '潍坊', '烟台', '威海', '青岛', '日照', '临沂', '枣庄', '济宁', '泰安', '莱芜', '滨州', '菏泽'); 

		cities['河南']=new Array('郑州', '三门峡', '洛阳', '焦作', '新乡', '鹤壁', '安阳', '濮阳', '开封', '商丘', '许昌', '漯河', '平顶山', '南阳', '信阳', '周口', '驻马店'); 

		cities['湖北']=new Array('武汉', '十堰', '襄攀', '荆门', '孝感', '黄冈', '鄂州', '黄石', '咸宁', '荆州', '宜昌', '恩施', '襄樊'); 

		cities['湖南']=new Array('长沙', '张家界', '常德', '益阳', '岳阳', '株洲', '湘潭', '衡阳', '郴州', '永州', '邵阳', '怀化', '娄底', '湘西'); 

		cities['广东']=new Array('广州', '清远', '韶关', '河源', '梅州', '潮州', '汕头', '揭阳', '汕尾', '惠州', '东莞', '深圳', '珠海', '江门', '佛山', '肇庆', '云浮', '阳江', '茂名', '湛江'); 

		cities['海南']=new Array('海口', '三亚'); 

		cities['四川']=new Array('成都', '广元', '绵阳', '德阳', '南充', '广安', '遂宁', '内江', '乐山', '自贡', '泸州', '宜宾', '攀枝花', '巴中', '达川', '资阳', '眉山', '雅安', '阿坝', '甘孜', '凉山'); 

		cities['贵州']=new Array('贵阳', '六盘水', '遵义', '毕节', '铜仁', '安顺', '黔东南', '黔南', '黔西南'); 

		cities['云南']=new Array('昆明', '曲靖', '玉溪', '丽江', '昭通', '思茅', '临沧', '保山', '德宏', '怒江', '迪庆', '大理', '楚雄', '红河', '文山', '西双版纳'); 

		cities['陕西']=new Array('西安', '延安', '铜川', '渭南', '咸阳', '宝鸡', '汉中', '榆林', '商洛', '安康'); 

		cities['甘肃']=new Array('兰州', '嘉峪关', '金昌', '白银', '天水', '酒泉', '张掖', '武威', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南'); 

		cities['青海']=new Array('西宁', '海东', '西宁', '海北', '海南', '黄南', '果洛', '玉树', '海西'); 

		cities['内蒙古']=new Array('呼和浩特', '包头', '乌海', '赤峰', '呼伦贝尔盟', '兴安盟', '哲里木盟', '锡林郭勒盟', '乌兰察布盟', '鄂尔多斯', '巴彦淖尔盟', '阿拉善盟'); 

		cities['广西']=new Array('南宁', '桂林', '柳州', '梧州', '贵港', '玉林', '钦州', '北海', '防城港', '南宁', '百色', '河池', '柳州', '贺州'); 

		cities['西藏']=new Array('拉萨', '那曲', '昌都', '林芝', '山南', '日喀则', '阿里'); 

		cities['宁夏']=new Array('银川', '石嘴山', '吴忠', '固原'); 

		cities['新疆']=new Array('乌鲁木齐', '克拉玛依', '喀什', '阿克苏', '和田', '吐鲁番', '哈密', '博尔塔拉', '昌吉', '巴音郭楞', '伊犁', '塔城', '阿勒泰'); 

		cities['香港']=new Array('香港'); 

		cities['澳门']=new Array('澳门'); 

		cities['台湾']=new Array('台北','台南','其他'); 

		cities['其它地区']=new Array('其它'); 

		cities['国外机构']=new Array('国外机构'); 

		let pv='';
		let cv=''; 
		pv=province.value; 
		var city:any = document.getElementById('city');
		cv=city.value; 
		city.length=1; 
		if(pv=='0') return; 
		if(typeof(cities[pv])=='undefined') return; 
		for(let i=0; i<cities[pv].length; i++) 
			{ 
				let ii = i+1; 
				city.options[ii] = new Option(); 
				city.options[ii].text = cities[pv][i]; 
				city.options[ii].value = cities[pv][i]; 
			}
		}
	con_city(){
		let cv=''; 
		var city:any = document.getElementById('city');
		cv=city.value; 
		this.organization.city =  cv
	}

	orgCate1:any[];
	//机构分类
	orgCondition:any={
		c1:'',
		c2:''
	}
	errorMessage:any
	getOrgCate1(){
		this.userEditService
			.getOrgCate("0")
			.subscribe(
				cates => {
					this.orgCate1 = cates.data;
					console.log(cates)
				},
				error => this.errorMessage = error
			);
	}
	orgCate2:any[];
	getOrgCate2(event:any){
		//debugger;
		this.orgCate2 = undefined;
		this.orgCondition.c2 = '';
		this.userEditService
			.getOrgCate(event.target.value)
			.subscribe(
				cates => {
					if(cates.data.length>0)
						this.orgCate2 = cates.data;
				},
				error => this.errorMessage = error
			);
	}
	//机构国际分类
	orgInCate1:any[];
	getOrgInCate1(){
		this.userEditService
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
		this.userEditService
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
				this.organization.internationClassifyId2 = "";
				return;
			}
			key = event.target.value;
			this.organization.internationClassifyId2 = "";
		}else{
			key = "1";
		}
		this.userEditService
			.getOrgInCate(key)
			.subscribe(
				cates => {
					this.orgInCate2EP = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}
	getOrgInCate2EP_plus(key:string){
		this.userEditService
			.getOrgInCate(key)
			.subscribe(
				cates => {
					this.orgInCate2EP = cates.length>0?cates:undefined;
				},
				error => this.errorMsg = error
			);
	}
	addOrganization(addOrg:any){
		if(this.organization.organizationShortName==''){
			alert('请填写机构简称！')
			return false
		}
		if(this.organization.organizationFullName==''){
			alert('请填写机构全称！')
			return false
		}
		if( this.orgCondition.c1==''||(this.orgCate2&&this.orgCondition.c2=='')){
			alert('请选择完整的金融机构分类！')
			console.log(this.organization)
			return false
		}

	this.organization.organizationCategoryId1=this.orgCondition.c1
	this.organization.organizationCategoryId2=this.orgCondition.c2
	console.log(this.organization)
	this.userEditService
	.addOrganization(this.organization)
			.subscribe(
				cates => {
					if(cates.status==0){
						alert('添加成功！')
						this.user.company=this.organization.organizationShortName 
						this.user.organizationFullName=this.organization.organizationFullName 
						this.user.company=this.organization.organizationShortName 
						this.user.companyId=cates.data.organizationId 
						addOrg.hide()
					}else{
						alert(cates.msg)
					}
				},
				error => this.errorMessage = error
			);
	// this.organization.internationClassifyId1=this.orgCondition.c1
	// this.organization.internationClassifyId2=this.orgCondition.c2
	}

}