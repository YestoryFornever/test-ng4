import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { BondDistributionService } from '../../service/bond-distribution-service'

@Component({
	selector: 'check-org',
	templateUrl: './check-org.component.html',
	styleUrls: ['./check-org.component.scss'],
	providers: [BondDistributionService]
})

export class CheckOrgComponent implements OnInit{
	constructor(
		
				private bondDistributionService:BondDistributionService,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let orgName = params['orgName'];
			this.orgName = orgName
			this.ID = id
			
		})
		this.getTeamList()
		// this.getTeamDetail(null)
	}
	ID:any
	orgName:any
	instRlCh:any = '1'
	instRl:any = '1'
	errorMessage:any
	change(){
		if(!this.isChange){
			this.instRlCh= this.instRl
			
		}else{
			this.instRl= this.instRlCh
			var obj={
				instId:this.ID,
				instRl:this.instRlCh
			}
			this.bondDistributionService.updateInstRl (obj)
	  		.subscribe(
            partlist => {   
            	
                if(partlist.status==0){
                	alert('修改成功')
                 this.getTeamList()
                }else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
		}
		// this.instRlCh= this.instRl
		this.instRl = this.instRlCh
		this.isChange = !this.isChange	
	}
	isChange:any=false	
	toChange:any =false
	teamQualfCh:any='1'
	teamQualf:any='1'
	teamNmCh:any
	teamNm:any=''
	change2(){
		if(!this.toChange){
			this.teamNmCh= this.saveCon.teamNm
			this.teamQualfCh= this.saveCon.teamQualf
		}else{
			this.saveGp()
		}
		this.toChange = !this.toChange	
	}
	 turnTo(id:any){
		this.router.navigate(['../../../role-management'],{relativeTo:this.activatedRoute}); 
	}
// 创建团队
isCreat=false
gpNum:any=0
creatGp(){
	var trList=document.getElementsByTagName('tr')	
	for(var i=0;i<trList.length;i++){
		trList[i].style.backgroundColor= "#fff"
		trList[i].style.color= "#000"
	}
	this.isCreat= true
	this.toChange=true
	this.gpNum=0
	this.teamNmCh=''
	this.teamQualfCh='1'
	this.saveCon.teamNm=''
	this.saveCon.teamQualf='1'
}
// 保存团队
creatCon:any={}
saveCon:any={
	teamId:'',
	teamNm:'',
	teamQualf:'1',
}
saveGp(){
	if(this.teamNmCh==''){
		alert('请给团队起个名字')
		return false
	}
	if(this.isCreat){
		this.creatCon={
			instId:this.ID,
			teamNm:'',
			teamQualf:'1',
		}
		this.creatCon.teamNm=this.teamNmCh
		this.creatCon.teamQualf =this.teamQualfCh
		this.bondDistributionService.addTeam (this.creatCon)
	  		.subscribe(
            partlist => {   
                if(partlist.status==0){
					alert("创建团队成功")
					this.first=1
					this.getTeamList()
					this.isCreat = false
                }else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
	}else{
		this.saveCon.teamNm=this.teamNmCh
		this.saveCon.teamQualf =this.teamQualfCh
		this.bondDistributionService.updateTeam (this.saveCon)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	                 	alert("保存成功")
	                 	this.getTeamList()
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 

	}
	// this.getTeamList()
}
// 获取团队明细
trNum:any=0
nowTmid:any
chooseOne(id:any,event:any,tr:any,k:any){
	this.trNum = k
	this.nowTmid = id
	this.isCreat=false
	var trList=document.getElementsByTagName('tr')	
	for(var i=0;i<trList.length;i++){
		trList[i].style.backgroundColor= "#fff"
		trList[i].style.color= "#000"
	}
	
	// tr.style.backgroundColor= "#377dc2";
	// tr.style.color="#fff"
	var obj={teamId:id} 
	this.getTeamDetail(obj)
	this.getAStaffsList(obj)
}
groupDetial:any
first:any=1
getTeamDetail(obj:any){
	this.bondDistributionService.getTeamDetail (obj)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	                 	this.groupDetial=partlist.data
	            		this.saveCon.teamId = this.groupDetial.teamId
	            		this.saveCon.teamNm = this.groupDetial.teamNm
	            		this.saveCon.teamQualf = this.groupDetial.teamQualf
	            		this.teamNmCh = this.groupDetial.teamNm
	            		this.teamQualfCh = this.groupDetial.teamQualf
	            		this.gpNum = this.groupDetial.teamPnum 
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
}
// 获取团队列表信息
	groupList:any=[]
	getTeamList(){
		var obj={
			instId:this.ID
		}
		this.bondDistributionService.getTeamList (obj)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	                	if(partlist.data.org.instRl){
	                		this.instRl=partlist.data.org.instRl
	                	}else{
	                		this.instRl='4'
	                	}
	                	this.groupList=partlist.data.teamList
	                	if(this.groupList.length<=0){
                  			this.creatGp()
                  		}else{
		                 	
		               		 for(var i=0;i<this.groupList.length;i++){
	                  		this.groupList[i].udtTm = this.format(new Date(this.groupList[i].udtTm)) 
	                  		if(!this.groupList[i].teamNum){
	                  			this.groupList[i].teamNum='0'
	                  		}
	                  		if(!this.groupList[i].teamPnpNm){
	                  			this.groupList[i].teamPnpNm='无'
	                  		}
	                  	}
	      					if(this.first==1){
	                  			var	obj={teamId:''} 
								obj.teamId=this.groupList[0].teamId;
								this.nowTmid = this.groupList[0].teamId;
								this.getTeamDetail(obj)
								this.getAStaffsList(obj)

								this.first=2
	                  		}
                  		}
                  		
                  	
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
	}
// 获取团队成员
gpNumberList:any=[]
	getAStaffsList(obj:any){

		this.bondDistributionService.getAStaffsList (obj)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	               		this.gpNumberList=partlist.data
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
	}
// 移出团队
objDetelt:any={
	teamId:'',
	aStaffsId:'='
}
deleteName:any=''
deleteNum(teamId:any,aStaffsId:any,win:any,name:any){
	win.show()
	this.objDetelt.teamId=teamId
	this.objDetelt.aStaffsId=aStaffsId
	this.deleteName = name
}
// gpNumberList:any=[]
	deleteTeamAStaffs(deleteW:any){
		// var obj={teamId:teamId,aStaffsId:aStaffsId}
		this.bondDistributionService.deleteTeamAStaffs (this.objDetelt)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	               		alert("移除成功！")
	               		deleteW.hide()
	               		this.getAStaffsList(this.objDetelt)
	               		this.getTeamList()
	               		var	obj={teamId:''} 
						obj.teamId=this.nowTmid
	               		this.getTeamDetail(obj)
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
	}
	// 添加弹出框
	orgNumList:any=[]
	addGpNum(win:any){
		var obj={
			instId:'',
			teamId:''
		}

		obj.instId = this.ID
		obj.teamId = this.nowTmid
		this.bondDistributionService.getInstAStaffsList (obj)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	               		this.orgNumList=partlist.data
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
		  		win.show()
		  		var allcheck:any = document.getElementsByName('allCheck')[0]
		  		if(allcheck){
		  			allcheck.checked = false
		  		}
		  		
	}
	// 全选

//全选HTMLImageElement
	 checkbox:any = document.getElementsByName('user');
	 checkAll = function(allcheck:any){
	 	this.color = allcheck.checked?"#ffa":"#fff";
			for(var i=0;i<this.checkbox.length;i++){
				this.checkbox[i].checked = allcheck.checked
			}
		};
approveNot:any=[]
approveY:any=[]
approve(node:any,userVe:any){	
	this.approveNot=[]
	this.approveY=[]
		let listState= <HTMLInputElement[]><any>document.getElementsByName("user");				
			for(var i =0;i<listState.length;i++){
		 		if(listState[i].checked == true){
		 			this.approveY.push(this.orgNumList[i].userId)
					if(this.orgNumList[i].aStaffInd==2){
						this.approveNot.push(this.orgNumList[i].userName)
					}
				}
			}
		if(this.approveNot.length>0){
			this.approveNot.join(',')
			node.show()
		}else{
			this.addNumber(userVe,node)
		}
	}
// 添加用户
addNumber(userVe:any,node:any){
	var arr:any=[]
	var obj={
		teamId:this.nowTmid,
		addList:'',
		delList:arr
	}
	
	obj.addList=this.approveY
	
	this.bondDistributionService.updateTeamAStaffs (obj)
		  		.subscribe(
	            partlist => {   
	                if(partlist.status==0){
	               		alert('操作成功！')
	               		userVe.hide()
	               		node.hide()
	               		var prams={teamId:this.nowTmid}
	               		this.getAStaffsList(prams)
	               		this.getTeamList()
	               		var	obj={teamId:''} 
						obj.teamId=this.nowTmid
	               		this.getTeamDetail(obj)
	                }else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
}

// 换算时间
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
