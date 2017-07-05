import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { BondDistributionService } from '../../../service/bond-distribution-service'

@Component({
	selector: 'bond-analysis',
	templateUrl: './bond-analysis.component.html',
	styleUrls: ['./bond-analysis.component.scss'],
	providers: [BondDistributionService]
})

export class BondAnalysisList implements OnInit{
	constructor(
				private bondDistributionService:BondDistributionService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let userId = params['userId'];
			let backId = params['backId'];
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
		this.turnFirst()
		
	}

 reg:RegExp=/特征/
	list:any=[1,2,3,4,5]
	bondType:any=[{name:'方向',id:'1'}]
	keywordType:any = [{name:'机构全称',id:'1'},{name:'机构简称',id:'2'},{name:'债券代码',id:'2'},{name:'方向',id:'2'},{name:'期限',id:'2'},{name:'线上',id:'2'},{name:'债券类型',id:'2'},{name:'存单',id:'2'},{name:'债',id:'2'},{name:'券',id:'2'},{name:'债一级',id:'2'},{name:'线上模式',id:'2'},{name:'交易限制',id:'2'},{name:'线下种类',id:'2'},{name:'同业存单',id:'2'},{name:'备注',id:'2'},{name:'利率',id:'2'},{name:'线下',id:'2'},{name:'数量',id:'2'},{name:'债二级',id:'2'},{name:'理财',id:'2'},{name:'其他',id:'2'},{name:'主债评级',id:'2'},{name:'债项',id:'2'},{name:'主体',id:'2'},{name:'日期',id:'2'},{name:'资金',id:'2'},{name:'债券',id:'2'},{name:'新债发行',id:'2'},{name:'净价',id:'2'},{name:'出',id:'2'},{name:'入',id:'2'},{name:'换',id:'2'},{name:'卖',id:'2'},{name:'发行',id:'2'},];
	dicType:any= [{name:'线上资金特征',id:'1'},{name:'线下资金特征',id:'2'},{name:'资金特征',id:'2'},{name:'债一级特征',id:'2'},{name:'债二级特征',id:'2'},{name:'同业存单特征',id:'2'},{name:'机构',id:'2'},{name:'债券代码简称',id:'2'},{name:'分类词典',id:'2'}];
	en:any
	bond:any=''
	keyWord:any=''
	dataType:any=''
// 分页
	msgNumbers = [{Number:'30'},{Number:'20'},{Number:'50'},{Number:'80'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 30;
	public currentPage:number=1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryQuoteInfList()
	}
	rdShowListIN(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryQuoteInfList()
	}
	public sizeData(Number:any){

		this.itemsPerPage = Number;
		this.default.pageSize=this.itemsPerPage;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public pageNumChange(event:any,){
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.currentPage = event.page;
		this.default.pageNum = event.page;	
		this.queryQuoteInfList()
	};


	
	detialTo(){
		this.router.navigate(['../bond-distribution-management'],{relativeTo:this.activatedRoute}); 
	}
	// bondType:any=1
	bondInfo:any={
		message:'',
		showEdit:''
	}
	bondRes:any=[]
	upRes:any=[]
	downRes:any=[]
	qq:any
	showEdit(bond:any,id:any,qq:any){
	this.bondRes=[]
	this.qq=qq
	// debugger
	this.upRes=[]
	this.downRes=[]
		bond.show()
		var obj={
			quoteInfId:id
		}
		 	this.bondDistributionService.queryQuoteInf(obj)
	            .subscribe(
	            org => {
	            	if(org.status==0){
	            		// debugger
	            		this.bondInfo = org.data
	            		for(var i=0;i<this.bondInfo.resultList.length;i++){
	            			if(this.bondInfo.resultList[i].analysisType=='线上资金'){
	            				this.upRes.push(this.bondInfo.resultList[i])
	            			}
	            			if(this.bondInfo.resultList[i].analysisType=='线下资金'){
	            				this.downRes.push(this.bondInfo.resultList[i])
	            			}
	            			if(this.bondInfo.resultList[i].analysisType=='债二级'){
	            				this.bondRes.push(this.bondInfo.resultList[i])
	            			}
	            		}
	            	}
	             
	                },
	                error => this.errorMessage = error                 
	            ); 
	}
	analysisQuoteInf(){
		var obj:any={
			message:'',

		}
		this.bondRes=[]
		this.upRes=[]
		this.downRes=[]
		obj.message=this.bondInfo.message
		this.bondDistributionService.analysisQuoteInf(obj)
	            .subscribe(
	            org => {
		           		if(org.status==0&&org.data.length>0){
		           			this.bondInfo.resultList = org.data
		            		for(var i=0;i<this.bondInfo.resultList.length;i++){
		            			if(this.bondInfo.resultList[i].analysisType=='线上资金'){
		            				this.upRes.push(this.bondInfo.resultList[i])
		            			}
		            			if(this.bondInfo.resultList[i].analysisType=='线下资金'){
		            				this.downRes.push(this.bondInfo.resultList[i])
		            			}
		            			if(this.bondInfo.resultList[i].analysisType=='债二级'){
		            				this.bondRes.push(this.bondInfo.resultList[i])
		            			}
		            		}
		           		}
	                },
	                error => this.errorMessage = error                 
	            ); 
	}
testToolTip:any
errorMessage:any
addDic:any=false
	addDicIcon(){
		this.addDic = !this.addDic	
	}
endDate:any=new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
startDate:any=new Date(new Date(new Date().toLocaleDateString()).getTime())

default:any={
	startTime:'',
	endTime:'',
	analysisType:'',
	quoteInfId:'',
	pageNum:'1',
	pageSize:'30',
}
QuoteInfList:any=[]
queryQuoteInfList(){
	this.default.startTime=this.format(this.startDate)
	this.default.endTime=this.format(this.endDate)
	this.bondDistributionService.queryQuoteInfList(this.default)
	            .subscribe(
	            org => {
	            if(org.data.page.totalPage == 0){
	            			this.totalPages = 1
	            		}else{
	            			this.totalPages = org.data.page.totalPage
	            		}
	            	this.totalItems = org.data.page.totalResult
	               	this.QuoteInfList = org.data.returnList
	                },
	                error => this.errorMessage = error                 
	            ); 
}	
// queryKeyWordList(){
// 	this.bondDistributionService.queryKeyWordList(this.default)
// 	            .subscribe(
// 	            org => {
	               
// 	                },
// 	                error => this.errorMessage = error                 
// 	            ); 
// }
// 新增报价
new:any=[]
addQuoteInf(){
	this.new=[] 
	for(var i=0;i<this.bondRes.length;i++){
		this.bondRes[i].quoteInfId=this.bondInfo.quoteInfId
		this.new.push(this.bondRes[i])	
	}
	for(var i=0;i<this.upRes.length;i++){
		this.upRes[i].quoteInfId=this.bondInfo.quoteInfId
		this.new.push(this.upRes[i])	
	}
	for(var i=0;i<this.downRes.length;i++){
		this.downRes[i].quoteInfId=this.bondInfo.quoteInfId
		this.new.push(this.downRes[i])	
	}	
	if(this.new.length==0){
		this.new.length=null
	}
	// console.log()
	this.bondDistributionService.addQuoteInf(this.new)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 	alert('保存成功')
	                 	// this.queryQuoteInfList()
	                 }
	                },
	                error => this.errorMessage = error                 
	            ); 
}
// 新增关键词
addKeyWord:any={
	keyWordType:'',
	analysisType:'',
	keyWord:'',
	weight:'',
}
cleanAnalysisKeyWord(){
	this.addKeyWord={
	keyWordType:'',
	analysisType:'',
	keyWord:'',
	weight:'',
}
}
addAnalysisKeyWord(){
	if(this.addKeyWord.keyWordType==''){
		alert('请选择词典分类')
		return false
	}
	if(this.addKeyWord.analysisType=='' && !this.reg.test(this.addKeyWord.keyWordType)){
		alert('请选择关键词分类')
		return false
	}
	if(this.addKeyWord.keyWord==''){
		alert('关键词名称不能为空')
		return false
	}
	if(this.addKeyWord.weight=='' && this.reg.test(this.addKeyWord.keyWordType)){
		alert('权重不能为空')
		return false
	}
	// if()
	this.bondDistributionService.addAnalysisKeyWord(this.addKeyWord)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 	alert('保存成功')
	                 	this.cleanAnalysisKeyWord()
	                 }
	                },
	                error => this.errorMessage = error                 
	            ); 
}
updateQuoteInfType(id:any,select:any){
	console.log(id+','+select.value)
	var obj:any={
		quoteInfId:id,
		analysisType:select.value
	}
	this.bondDistributionService.updateQuoteInfType(obj)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 	alert('修改成功')
	                 	this.queryQuoteInfList()
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
	           format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
			}
           return format;
       };
}
