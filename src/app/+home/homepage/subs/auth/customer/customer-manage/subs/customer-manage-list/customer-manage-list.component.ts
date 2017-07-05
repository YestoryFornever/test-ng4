import { Component,ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import {CustomerManageService} from '../../../services/customer-manage.service';

@Component({
	selector: 'customer-manage-list.component',
	templateUrl: './customer-manage-list.component.html',
	styleUrls: ['./customer-manage-list.component.scss'],
	providers: [CustomerManageService]
})
export class CustomerManageListComponent  implements OnInit{


	constructor(private changeDetectorRef:ChangeDetectorRef,
		private customerManageService:CustomerManageService,
		private activatedRoute:ActivatedRoute,
		private router:Router){}

	ngOnInit(){
		this.queryAllEmployment()
		this.getOrgCate1()
	};
	height = '440px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
// /即时搜索
	public stateCtrl:FormControl = new FormControl();
	public myForm:FormGroup = new FormGroup({
		state: this.stateCtrl
	});

	public customSelected:string = '';
	// public usernameSelected:string = '';
	public dataSource:Observable<any>;
	public asyncSelected:string = '';
	public typeaheadLoading:boolean = false;
	public typeaheadNoResults:boolean = false; 
	public companys:Array<string>;
	public departments:Array<string>;  
	public typeaheadOnCompanys(e:any):void{
	   // this.default.organizationId = e.item.organizationId;//id 赋值给隐藏的input。获取公司id 
	}
	public typeaheadOnDepartments(e:any):void{
	    
	    // this.default.departmentId = e.item.departmentId;
	} 

 errorMessage:any
 orgCate1:any[];
	//机构分类
	orgCondition:any={
		c1:'',
		c2:''
	}
	getOrgCate1(){
		this.customerManageService
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
	orgc1:any=''
	orgc2:any=''
	getOrgCate2(event:any,o1:any){
		// debugger;
		this.orgc1=o1.options[o1.selectedIndex].text
		this.orgCate2 = undefined;
		this.orgCondition.c2 = '';
		this.customerManageService
			.getOrgCate(event.target.value)
			.subscribe(
				cates => {
					if(cates.data.length>0)
						this.orgCate2 = cates.data;
				},
				error => this.errorMessage = error
			);
	}
	getOrg(o2:any){
		// debugger
		console.log(event)
		this.orgc2=o2.options[o2.selectedIndex].text
	}
// 分配初始化
initdata:any={
	receiveId:'',
	nameStr:''
}
	multipleAllocateInit(allocation:any){
		var obj={receiveId:allocation}
		this.customerManageService
			.multipleAllocateInit(obj)
			.subscribe(
				cates => {
					if(cates.status==0){
						this.initdata =	cates.data
					}
				},
				error => this.errorMessage = error
			);
	}

//客户经理列表查询
	customerList:any
	queryAllEmployment(){
		this.hideList = true;
		this.hideLoad = false;
		 this.customerManageService.queryAllEmployment(null) 
	        .subscribe(
	            customerList => {
	            	console.log(customerList)
	                if(customerList.status==0){
	                    this.customerList=customerList.data;
	                    this.hideList = false;
						this.hideLoad = true;
	                }else{
	                	if(customerList.msg){
	                		 alert(this.customerList.msg);
	                		 this.hideList = false;
							this.hideLoad = true;
	                	}
	                }
	            }, 
	            error => this.errorMessage = <any>error
	        ); 
	}
//选择分配
	isSuccess:boolean=false
	orgIdList:any=[]
	orgIdNum:any=0
	public allocation = function(userVe:any,allocation:any){
		this.isSuccess=false
		this.pPie={
				sum:'',
				notAllocated:'',
				allowAllocated:'',
				orgIdList:[]
			}
		this.aInfo={
			receiveId:'',
			organizationCategoryId1:'',
			organizationCategoryId2:'',
			province:'',
			city:'',	
		}
		this.multipleAllocateInit(allocation)
		userVe.show();	
	}
// 分配查询
	aInfo:any={
		receiveId:'',
		organizationCategoryId1:'',
		organizationCategoryId2:'',
		province:'',
		city:'',	
	}
	pPie:any={
		sum:'',
		notAllocated:'',
		allowAllocated:'',
		orgIdList:[]
	}
	multipleAllocateQuery(info:any){
		if(this.apha==1){
			this.aInfo.province=''
			this.aInfo.city=''
		}
		if(this.apha==2){
			this.aInfo.organizationCategoryId1=''
			this.aInfo.organizationCategoryId2=''
		}
		if(this.aInfo.province==''&&this.aInfo.city==''&&this.aInfo.organizationCategoryId1==''&&this.aInfo.organizationCategoryId2==''){
			alert("请先选择至少一项查询条件")
			return false
		}
		this.aInfo.receiveId = this.initdata.receiveId
		this.customerManageService
			.multipleAllocateQuery(this.aInfo)
			.subscribe(
				cates => {
					if(cates.status==0)
						this.pPie = cates.data;
					// this.queryAllEmployment()
				},
				error => this.errorMessage = error
			);
}
// 分配机构
isAli:boolean = true
aliGro:any={
	msg:''
}
addAllocate(allocation:any){
		this.isAli=false
		var obj={
					receiveId:this.aInfo.receiveId,
					orgIdList:this.pPie.orgIdList
				}
		this.customerManageService
			.addAllocate(obj)
			.subscribe(
				cates => {
					if(cates.status==0){
						this.aliGro = cates
						this.isSuccess=true
						this.isAli=true
						this.queryAllEmployment()
					}else{
						alert(cates.msg)
					}
				},
				error => this.errorMessage = error
			);
	}

// 类管理
	hideLoad:any = true
	hideList:any =  true
	show:any
	setLoadClasses() {
	  	let classes =  {
	    hide: this.hideLoad,      // true
	    // show: !this.show, // false
  		};
		return classes;
	}
	setListClasses() {
	  	let classes =  {
	    	hide: this.hideList,      // true
	    // show: !this.show, // false
		};
		return classes;
	}
	// 跳转
	toChange(newsId:any,loginName:any,userName:any){
	   this.router.navigate(['../customer-manage-serch',newsId,loginName,userName],{relativeTo:this.activatedRoute}); 
	}
	// 跳转
	toAllocation(newsId:any,loginName:any,userName:any){
	   this.router.navigate(['../customer-manage-allocation',newsId,loginName,userName],{relativeTo:this.activatedRoute}); 
	}

	//省市联动
	public set_city(province:any){ 
		if(province.value==''){
			this.aInfo.city=''
		}
 		this.aInfo.province=province.value
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
		// debugger
		let cv=''; 
		var city:any = document.getElementById('city');
		cv=city.value; 
		this.aInfo.city =  cv
	}
	apha:any = '1'
}
