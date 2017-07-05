import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CapitalDistributionServices } from './capital_distribution.service'
import {INCONFIG} from '../../../../../../public/in.config';

@Component({
	selector: 'capital-distribution',
	templateUrl: './capital_distribution.component.html',
	styleUrls: ['./capital_distribution.component.scss'],
	providers: [CapitalDistributionServices]
})

export class CapitalDistributionComponent implements OnInit{
	constructor(
		
				private capitalDistributionServices:CapitalDistributionServices,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	//tab
	listState:any = 1;
	private IP:string = INCONFIG.getIP()
	public get(event:any):void {
		// debugger
		if(event.heading=="线上报价"){
			this.listState = 1;
			this.all_intrtTp='0'
			this.turnFirst()
			this.clearOn()
		}
		if(event.heading=="线下报价"){
			this.listState= 2;
			this.all_intrtTp='0'
			this.turnFirst()
			this.clearOn()
		}
	};

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			// let userId = params['userId'];
			// console.log(userId,backId);
		})
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		for(var i=0;i<this.instTp.length;i++){
			this.instTpMod[i]={check:false}
		}
		for(var i=0;i<this.mode.length;i++){
			this.modeMod[i]={check:false}
		}
		for(var i=0;i<this.trmTp.length;i++){
			this.trmTpMod[i]={check:false}
		}
		for(var i=0;i<this.txnRst.length;i++){
			this.txnRstMod[i]={check:false}
		}
		for(var i=0;i<this.intrtTp.length;i++){
			this.intrtTpMod[i]={check:false}
		}
		for(var i=0;i<this.eStatusStr.length;i++){
			this.eStatusStrMod[i]={check:false}
		}
		for(var i=0;i<this.ctlg.length;i++){
			this.ctlgMod[i]={check:false}
		}
		this.clearOn()
		this.turnFirst()
	}
	
	en:any
// 机构类型
	all_orgTp:any ='0'
	instTpMod:any=[]
	instTp:any=[{name:'银行',id:1},{name:'证券',id:2},{name:'基金',id:3},{name:'保险',id:4},{name:'资产管理',id:5},{name:'财务公司',id:6},{name:'投资公司',id:7},{name:'信托',id:8},{name:'期货',id:9},{name:'其他金融',id:10},{name:'金融中介',id:11},{name:'政府机构',id:12},{name:'企业',id:13},{name:'其他',id:14}]
	clickAll_orgTp(){
		this.all_orgTp = '0'
		for(var i=0;i<this.instTp.length;i++){
			this.instTpMod[i]={check:false}
		}
	}
	clickOther_orgTp(){
		this.all_orgTp = '1'
	}
// 种类
all_ctlg:any='0'
ctlgMod:any=[]
ctlg:any=[{name:'资金',id:1},{name:'结构性存款',id:2},{name:'银行同存',id:3},{name:'非银同存',id:4},{name:'协议存款',id:5}]
clickAll_ctlg(){
	this.all_ctlg = '0'
		for(var i=0;i<this.ctlg.length;i++){
			this.ctlgMod[i]={check:false}
		}
	}
	clickOther_ctlg(){
		this.all_ctlg = '1'
	}
// 方向
 all_drc:any='0'
 drcMod:any=[]
 // drc:any=[{name:'融出',id:2},{name:'融入',id:1}]
 // 	clickAll_drc(){
	// 	for(var i=0;i<this.drc.length;i++){
	// 		this.drcMod[i]={check:false}
	// 	}
	// }
	// clickOther_drc(){
	// 	this.all_drc = '1'
	// }
// 模式
 all_mode:any='0'
 modeMod:any=[]
 mode:any=[{name:'押利率',id:1},{name:'押信用',id:2},{name:'押中债',id:3},{name:'押上清',id:4},{name:'押存单',id:5}]
 	clickAll_mode(){
 		this.all_mode = '0'
		for(var i=0;i<this.mode.length;i++){
			this.modeMod[i]={check:false}
		}
	}
	clickOther_mode(){
		this.all_mode = '1'
	}
// 期限
trmLwrDay:any
trmUpDay:any
trmUpLmVal:any=''
trmUpLmUnit:any='1'
trmLwrLmtVal:any=''
trmLwrLmtUnit:any='1'
 custom_trmTp:any='1'
 all_trmTp:any='0'
 trmTpMod:any=[]
 trmTp:any=[{name:'隔夜',id:1},{name:'7天',id:2},{name:'14天',id:3},{name:'21天',id:4},{name:'1个月',id:5},{name:'2个月',id:6},{name:'3个月',id:7},{name:'6个月',id:8},{name:'9个月',id:9},{name:'1年',id:10}]
 	clickAll_trmTp(){
		for(var i=0;i<this.trmTp.length;i++){
			this.trmTpMod[i].check=false
		}
		this.all_trmTp='0'
		this.custom_trmTp='1'
	}
	clickCustom_trmTp(){
		// for(var i=0;i<this.trmTp.length;i++){
		// 	this.trmTpMod[i].check=false
		// }
		this.all_trmTp='1'
	}
	clickOther_trmTp(){
		this.all_trmTp = '1'
		// this.custom_trmTp='1'
	}
	regTMin(){
		this.trmLwrLmtVal
	}
	regTMax(){
		// debugger
		console.log(1)
		if(this.trmLwrLmtVal!=''&&this.trmUpLmVal!=''){
			if(this.trmLwrLmtUnit=='1'){
				this.trmLwrDay = this.trmLwrLmtVal		
			}
			if(this.trmLwrLmtUnit=='2'){
				this.trmLwrDay = this.trmLwrLmtVal*30		
			}
			if(this.trmLwrLmtUnit=='3'){
				this.trmLwrDay = this.trmLwrLmtVal*365		
			}
			if(this.trmUpLmUnit=='1'){
				this.trmUpDay = this.trmUpLmVal
			}
			if(this.trmUpLmUnit=='2'){
				this.trmUpDay = this.trmUpLmVal*30
			}
			if(this.trmUpLmUnit=='3'){
				this.trmUpDay = this.trmUpLmVal*365
			}
			if(this.trmUpDay<this.trmLwrDay){
				alert('选择期限上限必须高于下限')
				this.trmUpLmVal=''
				return false
			}
		}
		
	}
// 交易限制
all_txnRst:any='0'
 txnRstMod:any=[]
 txnRst:any=[{name:'限银行',id:1},{name:'限农信',id:2},{name:'限直连',id:3},{name:'限存款机构',id:4},{name:'其他',id:5}]
 	clickAll_txnRst(){
		for(var i=0;i<this.txnRst.length;i++){
			this.txnRstMod[i].check=false
		}
		this.all_txnRst = '0'
	}
	clickOther_txnRst(){
		this.all_txnRst = '1'
	}
// 利率
	intRtStrtVal:any=''
	intRtEndVal:any=''
 all_intrtTp:any='0'
 custom_intrtTp:any='1'
 intrtTpMod:any=[]
 intrtTp:any=[{name:'加权',id:1},{name:'加点',id:2},{name:'减点',id:3}]
 	clickAll_intrtTp(){
		for(var i=0;i<this.intrtTp.length;i++){
			this.intrtTpMod[i].check=false
		}
		this.custom_intrtTp='1'
		this.all_intrtTp = '0'
	}
	clickOther_intrtTp(){
		this.all_intrtTp = '1'
		this.custom_intrtTp='1'
	}
	clickCustom_intrtTp(){
		for(var i=0;i<this.intrtTp.length;i++){
			this.intrtTpMod[i].check=false
		}
		this.all_trmTp='1'
	}
	regInMin(){
		if(this.intRtStrtVal&&this.intRtStrtVal!=0){
			var reg = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/
			if(!reg.test(this.intRtStrtVal)){
				alert('请填写最多四位小数')
				this.intRtStrtVal=''
			}
		}
	}
	regInMax(){
		if(this.intRtEndVal&&this.intRtEndVal!=0){
			var reg = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/
			if(!reg.test(this.intRtEndVal)){
				alert('请填写最多四位小数')
				this.intRtEndVal=''
			}
			if(reg.test(this.intRtStrtVal)){
				if(this.intRtEndVal<this.intRtStrtVal){
					this.intRtEndVal = this.intRtStrtVal
				}
			}
		}
	}
// 金额
amt:any=10000
amtStrtVal:any
amtEndVal:any
	regGMin(){
		if(this.amtStrtVal<0){
			this.amtStrtVal=0
		}
		if(this.amtStrtVal>1000000){
			this.amtStrtVal=1000000
		}
	}
	regGMax(){
		if(this.amtEndVal<0){
			this.amtEndVal=0
		}
		if(this.amtEndVal>1000000){
			this.amtEndVal=1000000
		}
		if(this.amtEndVal<this.amtStrtVal){
			this.amtEndVal=this.amtStrtVal
		}
	}
// 报价状态
all_eStatusStr:any='0'
 eStatusStrMod:any=[]
 eStatusStr:any=[{name:'有效',id:1},{name:'成交',id:2},{name:'撤销',id:3},{name:'过期',id:4}]
 	clickAll_eStatusStr(){
		for(var i=0;i<this.eStatusStr.length;i++){
			this.eStatusStrMod[i].check=false
		}
		this.all_eStatusStr = '0'
	}
	clickOther_eStatusStr(){
		this.all_eStatusStr = '1'
	}

	// 分页
	msgNumbers = [{Number:'50'},{Number:'30'},{Number:'20'},{Number:'80'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 50;
	public currentPage:number=1;
	public totalPages:number=1;
	public turnFirst(){
				// debugger
		this.changeDetectorRef.detectChanges();
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		// debugger
		if(this.listState==1){
			this.queryOfrHall()
		}else{
			this.queryOfrHallOff()
		}
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.onContion.pageSize = Number
		this.unContion.pageSize = Number
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		// var num:number = Number*1; 	
	};
	public pageNumChange(event:any){

		this.onContion.pageSize=this.itemsPerPage;

		// this.msgInfoList()
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		
		if(this.listState==1){
			this.onContion.pageNum = event.page;	
			this.queryOfrHall()
		}else{
			this.unContion.pageNum = event.page;	
			this.queryOfrHallOff()
		}
	};
	errorMessage:any
	default:any={loginName:'',instNm:'',userNm:'',rgstMblPh:''}
// 模糊查询机构
orgListShow=false
orgList:any=[]
	searchOrg(orgUl:any){
		var obj={
			value:this.default.instNm
		}
		this.capitalDistributionServices.getOrgListByShortName(obj)
            .subscribe(
            org => {
                 this.orgList  = org.data    
                },
                error => this.errorMessage = error                 
            ); 
            if(this.default.instNm!=''){
 				this.orgListShow =true
            }      
	}
	OrgSerch(val:any){
		// debugger
		this.default.instNm = val 
		this.orgListShow=false
	}
	closeOrg(){
		this.orgListShow=false
	}
// 模糊查询用户名
userListShow=false
userList:any=[]
	searchUser(orgUl:any){
		var obj={
			value:this.default.userNm
		}
		this.capitalDistributionServices.getUserNameListByName(obj)
            .subscribe(
            org => {
                 this.userList  = org.data    
                },
                error => this.errorMessage = error                 
            ); 
             if(this.default.userNm!=''){
  					this.userListShow =true
              } 
         
	}
	UserSerch(val:any){
		// debugger
		this.default.userNm = val 
		this.userListShow=false
	}
	closeUser(){
		this.userListShow=false
	}
// 模糊查询手机号
phoListShow=false
phoList:any=[]
	searchPho(orgUl:any){
		var obj={
			value:this.default.rgstMblPh
		}
		this.capitalDistributionServices.getLoginNameListByName(obj)
            .subscribe(
            org => {
                 this.phoList  = org.data    
                },
                error => this.errorMessage = error                 
            ); 
             if(this.default.rgstMblPh!=''){
  				this.phoListShow =true
              } 
         
	}
	phoSerch(val:any){
		// debugger
		this.default.rgstMblPh = val 
		this.phoListShow=false
	}
	closePho(){
		this.phoListShow=false
	}
totalResult:any
// 线上报价查询
	onContion:any={
		instTp:'',
		instNm:'',
		userNm:'',
		rgstMblPh:'',
		drc:'',
		trmTp:'',
		trmLwrLmtVal:'',
		trmLwrLmtUnit:'',
		trmUpLmVal:'',
		intRtStrtVal:'',
		trmUpLmUnit:'',
		mode:'',
		intrtTp:'',
		intRtEndVal:'',
		amtStrtVal:'',
		amtEndVal:'',
		ofrStrtDt:'',
		ofrEndDt:'',
		txnRst:'',
		eStatusStr:'',
		qqNo:'',
		pageNum:'1',
		pageSize:'50',
		cptlSource:''
	}
	startDate:any=new Date()
	endDate:any=new Date()
	onList:any=[]
queryOfrHall(){
	this.regTMax()
	if(this.all_orgTp==0){
		this.onContion.instTp=''
	}else{
		var instTpList:any=[]
		for(var i=0;i<this.instTpMod.length;i++){
			if(this.instTpMod[i].check){
				instTpList.push(this.instTp[i].id)
			}
		}
		this.onContion.instTp=instTpList.join(',')
	}
	if(this.intRtStrtVal==''&&this.intRtEndVal==''&&this.all_intrtTp=='4'&&this.listState == 1){
		alert('请填写自定义利率范围')
		return false
	}
	this.onContion.instNm = this.default.instNm
	this.onContion.userNm = this.default.userNm
	this.onContion.rgstMblPh = this.default.rgstMblPh
	if(this.all_drc==0){
		this.onContion.drc=undefined
	}else{
		this.onContion.drc = this.all_drc
	}
	if(this.all_trmTp==0){
		this.onContion.trmTp=''
	}else{
		var trmTpList:any=[]
		for(var i=0;i<this.trmTpMod.length;i++){
			if(this.trmTpMod[i].check){
				trmTpList.push(this.trmTp[i].id)
			}
		}
		if(this.custom_trmTp==0){
			trmTpList.push(11)
		}
		this.onContion.trmTp=trmTpList.join(',')
	}
	if( this.trmLwrLmtVal==''){
		this.onContion.trmLwrLmtVal=undefined
	}else{
		this.onContion.trmLwrLmtVal = this.trmLwrLmtVal
	}
	
	this.onContion.trmLwrLmtUnit = this.trmLwrLmtUnit

	if(this.trmUpLmVal==''){
		this.onContion.trmUpLmVal = undefined
	}else{
		this.onContion.trmUpLmVal = this.trmUpLmVal
	}

	this.onContion.trmUpLmUnit = this.trmUpLmUnit

	if(this.all_txnRst==0){
		this.onContion.txnRst=''
	}else{
		var txnRstList:any=[]
		for(var i=0;i<this.txnRstMod.length;i++){
			if(this.txnRstMod[i].check){
				txnRstList.push(this.txnRst[i].id)
			}
		}
		this.onContion.txnRst=txnRstList.join(',')
	}
	
	if(this.all_mode==0){
		this.onContion.mode=''
	}else{
		var modeList:any=[]
		for(var i=0;i<this.modeMod.length;i++){
			if(this.modeMod[i].check){
				modeList.push(this.mode[i].id)
			}
		}
		this.onContion.mode=modeList.join(',')
	}
	if(this.all_intrtTp==0){
		this.onContion.intrtTp=undefined
	}else{
		this.onContion.intrtTp = this.all_intrtTp
	}
	this.onContion.intRtStrtVal = this.intRtStrtVal
	this.onContion.intRtEndVal = this.intRtEndVal
	if(this.amtStrtVal ){
		this.onContion.amtStrtVal = this.amtStrtVal*this.amt
	}else{
		this.onContion.amtStrtVal=undefined
	}
	if(this.amtEndVal ){
		this.onContion.amtEndVal = this.amtEndVal*this.amt
	}else{
		this.onContion.amtEndVal=undefined
	}
	this.onContion.ofrStrtDt = this.format(this.startDate) 
	this.onContion.ofrEndDt = this.format(this.endDate) 
	if(this.all_eStatusStr==0){
		this.onContion.eStatusStr=''
	}else{
		var eStatusStrList:any=[]
		for(var i=0;i<this.eStatusStrMod.length;i++){
			if(this.eStatusStrMod[i].check){
				eStatusStrList.push(this.eStatusStr[i].id)
			}
		}
		this.onContion.eStatusStr=eStatusStrList.join(',')
	}
	console.log(this.onContion)

	this.capitalDistributionServices.queryOfrHall(this.onContion)
            .subscribe(
            org => {
            	this.totalResult=org.data.page.totalResult
            	this.totalPages= org.data.page.totalPage  
                 	this.onList= org.data.list  
                 	this.totalItems = org.data.page.totalResult
                 	this.onStatisticQueryOfrHall()
                },
                error => this.errorMessage = error                 
            ); 
	}
totalNum:any
exportOfrHall(){
	this.regTMax()
	if(this.all_orgTp==0){
		this.onContion.instTp=''
	}else{
		var instTpList:any=[]
		for(var i=0;i<this.instTpMod.length;i++){
			if(this.instTpMod[i].check){
				instTpList.push(this.instTp[i].id)
			}
		}
		this.onContion.instTp=instTpList.join(',')
	}
	this.onContion.instNm = this.default.instNm
	this.onContion.userNm = this.default.userNm
	this.onContion.rgstMblPh = this.default.rgstMblPh
	if(this.all_drc==0){
		this.onContion.drc=undefined
	}else{
		this.onContion.drc = this.all_drc
	}
	if(this.all_trmTp==0){
		this.onContion.trmTp=''
	}else{
		var trmTpList:any=[]
		for(var i=0;i<this.trmTpMod.length;i++){
			if(this.trmTpMod[i].check){
				trmTpList.push(this.trmTp[i].id)
			}
		}
		if(this.custom_trmTp==0){
			trmTpList.push(11)
		}
		this.onContion.trmTp=trmTpList.join(',')
	}
	if( this.trmLwrLmtVal==''){
		this.onContion.trmLwrLmtVal==undefined
	}else{
		this.onContion.trmLwrLmtVal = this.trmLwrLmtVal
	}
	
	this.onContion.trmLwrLmtUnit = this.trmLwrLmtUnit

	if(this.trmUpLmVal==''){
		this.onContion.trmUpLmVal = this.trmUpLmVal
	}

	this.onContion.trmUpLmUnit = this.trmUpLmUnit

	if(this.all_txnRst==0){
		this.onContion.txnRst=''
	}else{
		var txnRstList:any=[]
		for(var i=0;i<this.txnRstMod.length;i++){
			if(this.txnRstMod[i].check){
				txnRstList.push(this.txnRst[i].id)
			}
		}
		this.onContion.txnRst=txnRstList.join(',')
	}
	
	if(this.all_mode==0){
		this.onContion.mode=''
	}else{
		var modeList:any=[]
		for(var i=0;i<this.modeMod.length;i++){
			if(this.modeMod[i].check){
				modeList.push(this.mode[i].id)
			}
		}
		this.onContion.mode=modeList.join(',')
	}
	if(this.all_intrtTp==0){
		this.onContion.intrtTp=undefined
	}else{
		this.onContion.intrtTp = this.all_intrtTp
	}
	this.onContion.intRtStrtVal = this.intRtStrtVal
	this.onContion.intRtEndVal = this.intRtEndVal
	if(this.amtStrtVal ){
		this.onContion.amtStrtVal = this.amtStrtVal*this.amt
	}
	if(this.amtEndVal ){
		this.onContion.amtEndVal = this.amtEndVal*this.amt
	}
	this.onContion.ofrStrtDt = Date.parse(this.startDate) 
	this.onContion.ofrEndDt =  Date.parse(this.endDate) 
	if(this.all_eStatusStr==0){
		this.onContion.eStatusStr=''
	}else{
		var eStatusStrList:any=[]
		for(var i=0;i<this.eStatusStrMod.length;i++){
			if(this.eStatusStrMod[i].check){
				eStatusStrList.push(this.eStatusStr[i].id)
			}
		}
		this.onContion.eStatusStr=eStatusStrList.join(',')
	}
	  let str:any ='';
		// console.log( this.order)
        for(let i in this.onContion){
            if(this.onContion[i]==undefined){
                this.onContion[i]= '';
            }
            str += '&' + i + '=' +this.onContion[i];
        }
        str                  = str.substr(1);
        let url              = this.IP + 'capitalQuote/online/exportOfrHall?'+str;
        // console.log(url)
        window.location.href = url;
}
// 线下报价查询
	unContion:any={
		instTp:'',
		instNm:'',
		userNm:'',
		rgstMblPh:'',
		drc:'',
		trmTp:'',
		trmLwrLmtVal:'',
		trmLwrLmtUnit:'',
		trmUpLmVal:'',
		intRtStrtVal:'',
		trmUpLmUnit:'',
		ctlg:'',
		// mode:'',
		intrtTp:'',
		intRtEndVal:'',
		// amtStrtVal:'',
		// amtEndVal:'',
		ofrStrtDt:'',
		ofrEndDt:'',
		// txnRst:'',
		eStatusStr:'',
		qqNo:'',
		pageNum:'1',
		pageSize:'50',
		cptlSource:''
	}
	startDate2:any=new Date()
	endDate2:any=new Date()
	unList:any=[]
queryOfrHallOff(){
	this.regTMax()
	if(this.all_orgTp==0){
		this.unContion.instTp=''
	}else{
		var instTpList:any=[]
		for(var i=0;i<this.instTpMod.length;i++){
			if(this.instTpMod[i].check){
				instTpList.push(this.instTp[i].id)
			}
		}
		this.unContion.instTp=instTpList.join(',')
	}
	if(this.all_ctlg==0){
		this.unContion.ctlg=''
	}else{
		var ctlgList:any=[]
		for(var i=0;i<this.ctlgMod.length;i++){
			if(this.ctlgMod[i].check){
				ctlgList.push(this.ctlg[i].id)
			}
		}
		this.unContion.ctlg=ctlgList.join(',')
	}
	this.unContion.instNm = this.default.instNm
	this.unContion.userNm = this.default.userNm
	this.unContion.rgstMblPh = this.default.rgstMblPh
	if(this.all_drc==0){
		this.unContion.drc=undefined
	}else{
		this.unContion.drc = this.all_drc
	}
	if(this.all_trmTp==0){
		this.unContion.trmTp=''
	}else{
		var trmTpList:any=[]
		for(var i=0;i<this.trmTpMod.length;i++){
			if(this.trmTpMod[i].check){
				trmTpList.push(this.trmTp[i].id)
			}
		}
		if(this.custom_trmTp==0){
			trmTpList.push(11)
		}
		this.unContion.trmTp=trmTpList.join(',')
	}
	if( this.trmLwrLmtVal==''){
		this.unContion.trmLwrLmtVal==undefined
	}else{
		this.unContion.trmLwrLmtVal = this.trmLwrLmtVal
	}
	
	this.unContion.trmLwrLmtUnit = this.trmLwrLmtUnit

	if(this.trmUpLmVal==''){
		this.unContion.trmUpLmVal = undefined
	}else{
		this.unContion.trmUpLmVal = this.trmUpLmVal
	}
	if(this.intRtStrtVal==''&&this.intRtEndVal==''&&this.all_intrtTp=='4'&&this.listState == 2){
		alert('请填写自定义利率范围')
		return false
	}
	this.unContion.trmUpLmUnit = this.trmUpLmUnit

	// if(this.all_txnRst==0){
	// 	this.onContion.txnRst=''
	// }else{
	// 	var txnRstList:any=[]
	// 	for(var i=0;i<this.txnRstMod.length;i++){
	// 		if(this.txnRstMod[i].check){
	// 			txnRstList.push(this.txnRst[i].id)
	// 		}
	// 	}
	// 	this.onContion.txnRst=txnRstList.join(',')
	// }
	
	if(this.all_intrtTp==0){
		this.unContion.intrtTp=undefined
	}else{
		this.unContion.intrtTp = this.all_intrtTp
	}
	this.unContion.intRtStrtVal = this.intRtStrtVal
	this.unContion.intRtEndVal = this.intRtEndVal
	// if(this.onContion.amtStrtVal ){
	// 	this.onContion.amtStrtVal = this.amtStrtVal*this.amt
	// }
	// if(this.onContion.amtEndVal ){
	// 	this.onContion.amtEndVal = this.amtEndVal*this.amt
	// }
	this.unContion.ofrStrtDt = this.format(this.startDate2) 
	this.unContion.ofrEndDt = this.format(this.endDate2) 
	if(this.all_eStatusStr==0){
		this.unContion.eStatusStr=''
	}else{
		var eStatusStrList:any=[]
		for(var i=0;i<this.eStatusStrMod.length;i++){
			if(this.eStatusStrMod[i].check){
				eStatusStrList.push(this.eStatusStr[i].id)
			}
		}
		this.unContion.eStatusStr=eStatusStrList.join(',')
	}
	this.capitalDistributionServices.queryOfrHallOff(this.unContion)
            .subscribe(
            org => {
            		this.totalResult=org.data.page.totalResult
                 	this.totalPages= org.data.page.totalPage  
                 	this.totalItems = org.data.page.totalResult
                 	this.totalItems = org.data.page.totalResult
                 	this.unList= org.data.list

                 	for(var i=0;i<this.unList.length;i++){
                 		this.unList[i].insTus=''
                 		if(this.unList[i].uDFTrm1){
                 			this.unList[i].insTus+=this.unList[i].uDFTrm1+this.unList[i].uDFTrmUnitNm1+'--'+this.unList[i].uDFInRtVal1+'%'
                 		}
                 		if(this.unList[i].uDFTrm2){
                 			this.unList[i].insTus+=' , '+this.unList[i].uDFTrm2+this.unList[i].uDFTrmUnitNm1+'--'+this.unList[i].uDFInRtVal2+'%'
                 		}
                 		if(this.unList[i].uDFTrm3){
                 			this.unList[i].insTus+=' , '+this.unList[i].uDFTrm3+this.unList[i].uDFTrmUnitNm1+'--'+this.unList[i].uDFInRtVal3+'%'
                 		}
                 		if(this.unList[i].uDFTrm4){
                 			this.unList[i].insTus+=' , '+this.unList[i].uDFTrm4+this.unList[i].uDFTrmUnitNm1+'--'+this.unList[i].uDFInRtVal4+'%'
                 		}
                 		if(this.unList[i].uDFTrm5){
                 			this.unList[i].insTus+=' , '+this.unList[i].uDFTrm5+this.unList[i].uDFTrmUnitNm1+'--'+this.unList[i].uDFInRtVal5+'%'
                 		}
                 	}  
                 	
                 	this.offStatisticQueryOfrHall()
                },
                error => this.errorMessage = error                 
            ); 
}
// 导出线下报价
exportOfrHallOff(){
	this.regTMax()
	if(this.all_orgTp==0){
		this.unContion.instTp=''
	}else{
		var instTpList:any=[]
		for(var i=0;i<this.instTpMod.length;i++){
			if(this.instTpMod[i].check){
				instTpList.push(this.instTp[i].id)
			}
		}
		this.unContion.instTp=instTpList.join(',')
	}
	if(this.all_ctlg==0){
		this.unContion.ctlg=''
	}else{
		var ctlgList:any=[]
		for(var i=0;i<this.ctlgMod.length;i++){
			if(this.ctlgMod[i].check){
				ctlgList.push(this.ctlg[i].id)
			}
		}
		this.unContion.ctlg=ctlgList.join(',')
	}
	this.unContion.instNm = this.default.instNm
	this.unContion.userNm = this.default.userNm
	this.unContion.rgstMblPh = this.default.rgstMblPh
	if(this.all_drc==0){
		this.unContion.drc=undefined
	}else{
		this.unContion.drc = this.all_drc
	}
	if(this.all_trmTp==0){
		this.unContion.trmTp=''
	}else{
		var trmTpList:any=[]
		for(var i=0;i<this.trmTpMod.length;i++){
			if(this.trmTpMod[i].check){
				trmTpList.push(this.trmTp[i].id)
			}
		}
		if(this.custom_trmTp==0){
			trmTpList.push(11)
		}
		this.unContion.trmTp=trmTpList.join(',')
	}
	if( this.trmLwrLmtVal==''){
		this.unContion.trmLwrLmtVal==undefined
	}else{
		this.unContion.trmLwrLmtVal = this.trmLwrLmtVal
	}
	
	this.unContion.trmLwrLmtUnit = this.trmLwrLmtUnit

	if(this.trmUpLmVal==''){
		this.unContion.trmUpLmVal = this.trmUpLmVal
	}

	this.unContion.trmUpLmUnit = this.trmUpLmUnit

	
	if(this.all_intrtTp==0){
		this.unContion.intrtTp=undefined
	}else{
		this.unContion.intrtTp = this.all_intrtTp
	}
	this.unContion.intRtStrtVal = this.intRtStrtVal
	this.unContion.intRtEndVal = this.intRtEndVal

	this.unContion.ofrStrtDt =  Date.parse(this.startDate) 
	this.unContion.ofrEndDt =  Date.parse(this.endDate)  
	 let str:any ='';
		// console.log( this.order)
        for(let i in this.unContion){
            if(this.unContion[i]==undefined){
                this.unContion[i]= '';
            }
            str += '&' + i + '=' +this.unContion[i];
        }
        str                  = str.substr(1);
        let url              = this.IP + 'capitalQuote/offline/exportOfrHall?'+str;
        // console.log(url)
        window.location.href = url;
	// this.capitalDistributionServices.exportOfrHallOff(this.unContion)
 //            .subscribe(
 //            org => {
 //            	this.totalResult=org.data.page.totalResult
 //                 	this.unList= org.data.list  
 //                 	this.totalItems = org.data.page.totalResult
 //                },
 //                error => this.errorMessage = error                 
 //            ); 
}
// 清空线上报价
clearOn(){
	this.clickAll_orgTp()
	this.default.instNm=''
	this.default.userNm=''
	this.default.rgstMblPh=''
	this.all_drc='0'
	this.clickAll_mode()
	this.amtStrtVal=''
	this.amtEndVal=''
	this.clickAll_trmTp()
	this.trmLwrLmtVal=''
	this.trmLwrLmtUnit='1'
	this.trmUpLmVal=''
	this.trmUpLmUnit='1'
	this.clickAll_txnRst()
	this.all_intrtTp='0'
	this.intRtStrtVal=''
	this.intRtEndVal=''
	this.clickAll_eStatusStr()
	// this.startDate=new Date()
	// this.endDate=new Date()
	this.clickAll_ctlg()
}
// 获取总数
offStatisticQueryOfrHall(){
	this.capitalDistributionServices.offStatisticQueryOfrHall(this.unContion)
            .subscribe(
            org => {
	            	if(!org.data.list.totalAmt){
	            		this.totalNum='0'
	            	}else{
	            		this.totalNum=org.data.list.totalAmt
	            	}
                },
                error => this.errorMessage = error                 
            ); 
}
onStatisticQueryOfrHall(){
	this.capitalDistributionServices.onStatisticQueryOfrHall(this.onContion)
            .subscribe(
            org => {
	            	if(!org.data.list.totalAmt){
	            		this.totalNum='0'
	            	}else{
	            		this.totalNum=org.data.list.totalAmt
	            	}
                },
                error => this.errorMessage = error                 
            ); 
}


format (format:any) {
			if(format){
				 var args = {
	           	   Y: format.getFullYear(),
	               M: format.getMonth() + 1,
	               d: format.getDate(),
	               h: format.getHours(),
	               m: format.getMinutes(),
	               s: format.getSeconds(),
	           	};
	           	if(args.M<10){
	           		args.M=0+''+args.M
	           	}
	           	if(args.d<10){
	           		args.d=0+''+args.d
	           	}
	           	if(args.h<10){
	           		args.h=0+''+args.h
	           	}
	           	if(args.m<10){
	           		args.m=0+''+args.m
	           	}
	           	if(args.s<10){
	           		args.s=0+''+args.s
	           	}
	           	// format = args.Y+'-'+ args.M +'-'+args.d
	           format = args.Y+'-'+ args.M +'-'+args.d
			}
           return format;
       };
	updateOfrEStatus(id:any){
		var obj={
			ofrid:'',
			eStatus:'3'
		}
		obj.ofrid =id;
		this.capitalDistributionServices.updateOfrEStatus(obj)
            .subscribe(
            org => {
	            	if(org.status){
	            		alert('撤销成功')
	            		if(this.listState==1){
							this.queryOfrHall()
						}else{
							this.queryOfrHallOff()
						}
	            	}else{
	            		alert(org.msg)
	            	}
                },
                error => this.errorMessage = error                 
            );
    }
}
