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
	selector: 'bond-dictionary-management',
	templateUrl: './bond-dictionary-management.component.html',
	styleUrls: ['./bond-dictionary-management.component.scss'],
	providers: [BondDistributionService]
})

export class BondDictionaryManagement implements OnInit{
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
		for(var i=0;i<this.dicType.length;i++){
			this.dicTypeMod[i]={check:false}
		}
		this.turnFirst()
		
	}

	list:any=[1,2,3,4,5]
	BondAtype:any = [{name:'方向词典',id:'1'},{name:'线上资金属性',id:'2'}];
	en:any
	bond:any='1'
	
detialTo(){
		this.router.navigate(['../bond-analysis'],{relativeTo:this.activatedRoute}); 
	}
	bondType:any=[{name:'方向',id:'1'}]
	keywordType:any = [{name:'机构全称',id:'1'},{name:'机构简称',id:'2'},{name:'债券代码',id:'2'},{name:'方向',id:'2'},{name:'期限',id:'2'},{name:'线上',id:'2'},{name:'债券类型',id:'2'},{name:'存单',id:'2'},{name:'债',id:'2'},{name:'券',id:'2'},{name:'债一级',id:'2'},{name:'线上模式',id:'2'},{name:'交易限制',id:'2'},{name:'线下种类',id:'2'},{name:'同业存单',id:'2'},{name:'备注',id:'2'},{name:'利率',id:'2'},{name:'线下',id:'2'},{name:'数量',id:'2'},{name:'债二级',id:'2'},{name:'理财',id:'2'},{name:'其他',id:'2'},{name:'主债评级',id:'2'},{name:'债项',id:'2'},{name:'主体',id:'2'},{name:'日期',id:'2'},{name:'资金',id:'2'},{name:'债券',id:'2'},{name:'新债发行',id:'2'},{name:'净价',id:'2'},{name:'出',id:'2'},{name:'入',id:'2'},{name:'换',id:'2'},{name:'卖',id:'2'},{name:'发行',id:'2'},];
	dicType:any= [{name:'线上资金特征',id:'1'},{name:'线下资金特征',id:'2'},{name:'资金特征',id:'2'},{name:'债一级特征',id:'2'},{name:'债二级特征',id:'2'},{name:'同业存单特征',id:'2'},{name:'机构',id:'2'},{name:'债券代码简称',id:'2'},{name:'分类词典',id:'2'}];
	dicTypeMod:any=[]
	dic_all:any='0'
	clickAll_dic(){
		this.dic_all = '0'
		for(var i=0;i<this.dicType.length;i++){
			this.dicTypeMod[i]={check:false}
		}
	}
	clickOther_dic(){
		this.dic_all = '1'
	}
 // 分页
	msgNumbers = [{Number:'20'},{Number:'30'},{Number:'50'},{Number:'80'},];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number=0;
	public itemsPerPage:number = 30;
	public currentPage:number=1;
	public totalPages:number=1;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryKeyWordList()
	}
	rdShowListIN(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.queryKeyWordList()
	}
	public sizeData(Number:any){

		this.itemsPerPage = Number;
		this.serchKeyWord.pageSize=this.itemsPerPage;
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
		this.serchKeyWord.pageNum = event.page;	
		this.queryKeyWordList()
	};
 reg:RegExp=/特征/
errorMessage:any
// 新增关键词
addKeyWord:any={
	keyWordType:'',
	analysisType:'',
	keyWord:'',
	weight:'',
}
serchKeyWord:any={
	keyWordType:'',
	analysisType:'',
	keyWord:'',
	pageNum:'1',
	pageSize:'30',
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
	this.bondDistributionService.addAnalysisKeyWord(this.addKeyWord)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 	alert('保存成功')
	                 }
	                },
	                error => this.errorMessage = error                 
	            ); 
}
// 关键词列表
keyWprdLsit:any=[]
queryKeyWordList(){
	var modeList:any=[]
		for(var i=0;i<this.dicTypeMod.length;i++){
			if(this.dicTypeMod[i].check){
				modeList.push(this.dicType[i].name)
			}
		}
		this.serchKeyWord.keyWordType=modeList.join(',')
	this.bondDistributionService.queryKeyWordList(this.serchKeyWord)
	            .subscribe(
	            org => {
	            	if(org.status==0){
	            		if(org.data.page.totalPage == 0){
	            			this.totalPages = 1
	            		}else{
	            			this.totalPages = org.data.page.totalPage
	            		}
	            		
	            		this.totalItems = org.data.page.totalResult
	            		  this.keyWprdLsit = org.data.returnList
	            		  for(var i=0;i<this.keyWprdLsit.length;i++){
	            		  	if(this.keyWprdLsit[i].weight)
	            		  	this.keyWprdLsit[i].weight=	this.keyWprdLsit[i].weight*1
	            		  }
	            		}else{
	            			alert( org.msg)
	            		}
	             
	                },
	                error => this.errorMessage = error                 
	            ); 
}
// 删除关键词
deleteAnalysisKeyWord(item:any){
	var obj={
		keyWordId:item.keyWordId,
		keyWordType:item.keyWordType,
		keyWord:item.keyWord
	}
	this.bondDistributionService.deleteAnalysisKeyWord(obj)
	            .subscribe(
	            org => {
	               if(org.status==0){
	            		  alert("删除成功！")
	            		  this.queryKeyWordList()
	            		}else{
	            			alert( org.msg)
	            		}
	             
	                },
	                error => this.errorMessage = error                 
	            ); 
}
}