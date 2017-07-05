import { Component, ChangeDetectorRef,ViewChild,OnInit,AfterViewInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserBackServices } from '../../services/user-back.services'

@Component({
	selector: 'info-group-edit',
	templateUrl: './info-group-edit.component.html',
	styleUrls: ['./info-group-edit.component.scss'],
	providers: [UserBackServices]
})
export class InfoGroupEditComponent implements OnInit,AfterViewInit{
		constructor(private changeDetectorRef:ChangeDetectorRef,
					private activatedRoute:ActivatedRoute,
					private userBackServices:UserBackServices,
	        		private router:Router) {}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let state =  params['state'];
			this.ID = id;
		})
	
		this.queryOrganizitonCategoryList()
		
		this.cityList=[{name:"北京",id:'0'},{name:"上海",id:'1'},{name:"天津",id:'2'},{name:"重庆",id:'3'},{name:"河北",id:'4'},{name:"山西",id:'5'},{name:"辽宁",id:'6'},{name:"吉林",id:'7'},{name:"黑龙江",id:'8'},{name:"江苏",id:'9'},{name:"浙江",id:'10'},{name:"安徽",id:'11'},{name:"福建",id:'12'},{name:"江西",id:'13'},{name:"山东",id:'14'},{name:"河南",id:'15'},{name:"湖北",id:'16'},{name:"湖南",id:'17'},{name:"广东",id:'18'},{name:"海南",id:'19'},{name:"四川",id:'20'},{name:"贵州",id:'21'},{name:"云南",id:'22'},{name:"陕西",id:'23'},{name:"甘肃",id:'24'},{name:"青海",id:'25'},{name:"内蒙古",id:'26'},{name:"广西",id:'27'},{name:"西藏",id:'28'},{name:"宁夏",id:'29'},{name:"新疆",id:'30'},{name:"香港",id:'31'},{name:"澳门",id:'32'},{name:"台湾",id:'33'},{name:"其它",id:'34'},{name:"其他地区",id:'35'},{name:"国外机构",id:'36'}]
		for(var i = 0;i<this.cityList.length;i++){
				this.cityMod[i]={check:false}
		}
		
	       
	}
	ngAfterViewInit(){
		
	}
	getInfo(){
		if(this.ID!=""){
			this.getScmInf()
		}
	}
	ID:any=''
	cityList:any = [];
	cityMod:any = [];
	appType:any = '1';
	approve:any = {	
					unApproved:false,
					waitApproved:false,
					approvedSuc:false,
					approvedFal:false
					};
	orgType:any = '1';
	orgPosition:any = '1';
	actUser:any = '1';
	newUser:any = '1';
	errorMessage:any
test(id:any){
	// console.log(this.cityMod)
}
getScmInf(){
	var obj={
		grpgScmid:this.ID
	}
	this.userBackServices.getScmInf(obj)
			.subscribe( 
	            res =>{
	            	if(res.status==0){
	            		// debugger
	            		this.groupCon.scmNm = res.data.scmNm
	            		var instClArr:any = []
	            		var ctfnEStatusArr:any = []
	            		var instLoArr:any = []
	            		if(res.data.instCl){
	            			 instClArr = res.data.instCl.split(","); 
	            		}
	            		if(res.data.ctfnEStatus){
	            			 ctfnEStatusArr =  res.data.ctfnEStatus.split(","); 
	            		}
	            		if(res.data.instLo){
	            			 instLoArr = res.data.instLo.split(","); 
	            		}
	            		if( res.data.instCl){
	            			this.orgType='2'
	            			for(var i = 0;i<instClArr.length;i++){
	            			this.orgMod[instClArr[i]-1].check = true
	            			}
	            		}
	            		if( res.data.ctfnEStatus){
	            			this.appType='2'
	            			for(var i = 0;i<4;i++){
	            				if(ctfnEStatusArr[i]=='1'){
		            				this.approve.unApproved=true
	            				}
	            				if(ctfnEStatusArr[i]=='2'){
		            				this.approve.waitApproved=true
	            				}
	            				if(ctfnEStatusArr[i]=='3'){
		            				this.approve.approvedSuc=true
	            				}
	            				if(ctfnEStatusArr[i]=='4'){
		            				this.approve.approvedFal=true
	            				}
	            			}
	            		}
	            		if( res.data.instLo){
	            			this.orgPosition='2'
	            			for(var i = 0;i<instLoArr.length;i++){
	            			  for(var j = 0;j<this.cityList.length;j++){
	            			  		if(instLoArr[i]==this.cityList[j].name){
	            			  			this.cityMod[j].check=true
	            			 	 	}
	            			  	}
	            			}
	            		}
	            		            		
	            	}else{
	            		alert(res.msg);
	            	}
	            },  
	            error => this.errorMessage = error
	        )
}
// 获取机构分类
orgTypelist:any=[]
orgMod:any=[]
	queryOrganizitonCategoryList(){
		this.userBackServices.queryOrganizitonCategoryList(null)
			.subscribe( 
	            res =>{
	            	if(res.status==0){
	            	// console.log(res)
	            		this.orgTypelist = res.data;
	            		for(var i = 0;i<this.orgTypelist.length;i++){
	            			this.orgMod[i] = {check:false}
	    				}
	    				this.getInfo()
	            	}else{
	            		alert(res.msg);
	            	}
	                
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	
groupCon:any={
	scmNm:'',
	ctfnEStatus:'',
	instCl:'',
	instLo:'',
	grpgScmid:'',
}
chooseOrg:any=[]
saveCity:any=[]
// 添加用户分组列表
	addOrUpUserGroup (){
		if(this.ID!=''){
			this.groupCon.grpgScmid = this.ID
		}
		if(this.groupCon.scmNm==''){
			alert('请输入组名')
			return false
		}
		if(this.appType!='1'){
			if(this.approve.unApproved){
				this.groupCon.ctfnEStatus+='1,'
			}
			if(this.approve.waitApproved){
				this.groupCon.ctfnEStatus+='2,'
			}
			if(this.approve.approvedSuc){
				this.groupCon.ctfnEStatus+='3,'
			}
			if(this.approve.approvedFal){
				this.groupCon.ctfnEStatus+='4,'
			}
			this.groupCon.ctfnEStatus=this.groupCon.ctfnEStatus.substring(0,this.groupCon.ctfnEStatus.length-1) 
		}else{
			this.groupCon.ctfnEStatus=''
		}
		if(this.orgType!='1'){
			for(var i = 0;i<this.orgTypelist.length;i++){
	       		 if(this.orgMod[i].check){
					this.chooseOrg.push(this.orgTypelist[i].organizationCategoryId)
	        	}
	        this.groupCon.instCl = this.chooseOrg.join(',') 
			}
		}else{
			this.groupCon.instCl=''
		}
		if(this.orgPosition!='1'){
			 for(var i = 0;i<this.cityList.length;i++){
				if(this.cityMod[i].check){
					this.saveCity.push(this.cityList[i].name)
				}
			}
			this.groupCon.instLo = this.saveCity.join(',') 
		}else{
			this.groupCon.instLo=''
		}
	    this.userBackServices.addOrUpUserGroup (this.groupCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                	alert("保存成功！")
                	this.turnTo()
                }else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
	 
	}
	   	
	turnTo(){
		// debugger
		if(this.ID){
			this.router.navigate(['../../info-group-list'],{relativeTo:this.activatedRoute}); 
		}else{
			this.router.navigate(['../info-group-list'],{relativeTo:this.activatedRoute}); 
		}
	}
		// this.userBackServices.msgInfoList (this.groupCon) 
  //       .subscribe(
  //           partlist => {   
  //               if(partlist.status==0){
                
  //               }else{
		// 			if(partlist.msg){
		// 				alert(partlist.msg);
		// 			}
  //               }
  //           },  
  //           error => this.errorMessage = <any>error
	 //    ); 
	 
	// }
}	
