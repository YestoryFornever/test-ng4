import { Component,ChangeDetectorRef, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectionStrategy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule,TabsModule,CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { UserBackServices }  from '../../services/user-back.services';

@Component({
	selector: 'user-back-detail',
	templateUrl: './user-back-detail.component.html',
	styleUrls: ['./user-back-detail.component.scss',
				'../../../../../common/scss/typical-list/header.scss'],
	providers: [UserBackServices],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserBackDetailComponent implements OnInit{
	height = '312px';
	msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	constructor(
		
				private userBackServices:UserBackServices,
				// private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let userId = params['userId'];
			let backId = params['backId'];
			// console.log(userId,backId);
			
			this.ID.userFeedbackId = backId;
			this.handlerInfo.userFeedbackId = backId;
			this.handlerInfo.userId = userId;

			this.getBackDetail(this.ID);
			this.getUserInfo(this.ID);
		})
		
	};

	// 获取详情
	// id:any
	ID = {
		userFeedbackId: ''
	};
	infoArr:any =[];
	detailList:any= {
		handlingSuggestion:"",
	};
	errorMessage:any;
	photoArr:any = [];
	picArr:any = [];
	page:any;
	getBackDetail(obj:any){
		// debugger;
		this.userBackServices.userFeedbackDetail(obj)
			.subscribe( 
	            detailList =>{
	            	if(detailList.status=="0"){
	            		
	            		if(detailList.data.feedbackState==""){
	            			detailList.data.feedbackState = "全部";

	            		}
	            		if(detailList.data.feedbackState=="1"){
	            			detailList.data.feedbackState = "待处理";

	            		}
	            		if(detailList.data.feedbackState=="2"){
	            			detailList.data.feedbackState = "已忽略";

	            		}
	            		if(detailList.data.feedbackState=="3"){
	            			detailList.data.feedbackState = "已采纳";
	            		}

	            		if(detailList.data.coinNum==null){
	            			detailList.data.coinNum = "0";
	            		}
	            		
	            		

	            		this.detailList = detailList.data;

	            		
	            		this.photoArr.push(this.detailList.feedbackAnnexUrl1);
	            		this.photoArr.push(this.detailList.feedbackAnnexUrl2);
	            		this.photoArr.push(this.detailList.feedbackAnnexUrl3);
	            		this.photoArr.push(this.detailList.feedbackAnnexUrl4);
	            		this.photoArr.push(this.detailList.feedbackAnnexUrl5);
	            		this.photoArr.push(this.detailList.feedbackAnnexUrl6);
	            		for (var i in this.photoArr) {
	            			if(this.photoArr[i] != ""){
	            				this.picArr.push(this.photoArr[i]);
	            			}
	            		}

	            	}else{
	            		alert(detailList.msg);
	            	}
	                console.log(detailList);
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	userInfo:any={
		createTime:"",
		loginName:'',
		userName:'',
		organizationFullName:"",
		department:"",
		position:"",
		contactPhone:"",
		workPhone:"",
		companyMail:"",
		workAddress:"",
		processUserName:"",
		updateTime:"",

	};
	// 获取用户基本信息
	getUserInfo(id:any){
		this.userBackServices.userAndFeedbackDetail(id)
			.subscribe( 
	            res =>{
	            	if(res.status==0){
	            	console.log(res)
	            		this.userInfo = res.data;

	            	}else{
	            		alert(res.msg);
	            	}
	                
	            },
	            error => this.errorMessage = <any>error
	        );
	}
 	// 处理用户反馈
 	handlerInfo:any={
 		userFeedbackId:"",
 		userId:"",
 		feedbackState :'',
 		handlingSuggestion :'',
 		coinNum: "0",
 	};
 	//采纳
 	handlerUserBack(myStatus:any){
 		this.handlerInfo.handlingSuggestion = this.detailList.handlingSuggestion;
 		this.handlerInfo.coinNum = this.detailList.coinNum;
 		if(this.handlerInfo.handlingSuggestion==""&&myStatus==2){
 			alert("请填写处理意见");
 			return false;
 		}


 		this.handlerInfo.feedbackState = myStatus;//已采纳  
 		if(this.handlerInfo.feedbackState =='2'){
 			if(this.handlerInfo.coinNum !=0){
 				alert('请选择金币数量为 ‘0’ ');
 				return false ;
 			}
 		}
		console.log(this.handlerInfo);

 		this.userBackServices.handlerFeedback(this.handlerInfo)
			.subscribe( 
	            detailList =>{
	            	if(detailList.status=="0"){
	            		alert("处理成功");

	            		this.router.navigate(['../../../user-back-list'],{relativeTo:this.activatedRoute}); 
	            		// console.log(detailList);

	            	}else{
	            		alert(detailList.msg);
	            	}
	                
	            },
	            error => this.errorMessage = <any>error
	        );
 	}
 	// 忽略
 	// backToList(){
 	// 	this.handlerInfo.feedbackState = "2";//未采纳  
 	// 	this.userBackServices.handlerFeedback(this.handlerInfo)
		// 	.subscribe( 
	 //            detailList =>{
	 //            	if(detailList.status=="0"){
	 //            		alert("处理成功");

	 //            		this.router.navigate(['../../../user-back-list'],{relativeTo:this.activatedRoute}); 
	 //            		// console.log(detailList);

	 //            	}else{
	 //            		alert("处理信息失败");
	 //            	}
	                
	 //            },
	 //            error => this.errorMessage = <any>error
	 //        );
 	// 	this.router.navigate(['../../../user-back-list'],{relativeTo:this.activatedRoute}); 
 	// }
 	//
 	picUrl:any;
 	myAlert(tan:any,url:any){
 		tan.show();
 		this.picUrl=url;
 	}
 	// 去用户列表页面
 	toList(){
 		this.router.navigate(['../../../user-back-list'],{relativeTo:this.activatedRoute}); 
 	}
 	

 
}
