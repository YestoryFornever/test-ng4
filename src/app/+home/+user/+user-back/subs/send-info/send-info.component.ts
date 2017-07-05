import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { UserBackServices } from '../../services/user-back.services'

@Component({
	selector: 'send-info',
	templateUrl: './send-info.component.html',
	styleUrls: ['./send-info.component.scss'],
	providers: [UserBackServices]
})
export class SendInfoComponent implements OnInit{
	constructor(private sanitizer: DomSanitizer,private userBackServices:UserBackServices,private router:Router,private activatedRoute:ActivatedRoute,){}
	ngOnInit(){
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.userGroupList()		        
	}
	turnTo(){
		this.router.navigate(['../send-info-list'],{relativeTo:this.activatedRoute}); 
	}
	turnType:any = '1'
	timeType:any = '1'
	errorMessage:any
	en:any
	dataPicker:any
	// timePicker:any
//上传图片的字段
	file_ipt:any;
	fileChange(input:any){
		this.file_ipt = input;
		if(this.file_ipt.files[0]){
	    	this.sendMsg.pictureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_ipt.files[0]));
		}
	}

	groupID:any
	sendMsg:any={
		pshETitle:'',
		pshCntnt:'',
		h5Url:'',
		pictureUrl:'',
		sendTime:'',
		wthrTmgSnd:'0',
		pshTpid:'14',
		targetGroup:'A',
		targetUserId:'',
		userPhone:''
	}
	pushMessage(){
		this.toDate = new Date()
		if(Date.parse(this.dataPicker)< Date.parse(this.toDate) ){

			alert('无法选择过去的日期！')
			this.dataPicker=''
			return false
			
		}
	
		if(this.sendMsg.pshCntnt==''){
				alert('请填写消息内容')
				return false
			}
		if(this.sendMsg.targetGroup  =='A'){
			this.sendMsg.targetUserId = ''
			this.sendMsg.userPhone = ''
		}
		if(this.sendMsg.targetGroup  =='B'){
			this.sendMsg.targetUserId = this.groupID
			this.sendMsg.userPhone = ''
			if(!this.groupID){
				alert('请选择用户组')
				return false
			}
		}
		
		if(this.sendMsg.pshTpid==14){
			if(this.sendMsg.pshETitle==''){
				alert('请填写消息标题')
				return false
			}
		}
		if(this.turnType==2&&this.sendMsg.pshTpid!=17){
			if(this.sendMsg.h5Url==''){
				alert('请填写跳转链接')
				return false
			}
		}
		if(this.sendMsg.targetGroup  =='C'){
			if(!this.user[0]){
				alert('请输入手机号匹配用户')
				return false
			}
			this.sendMsg.targetUserId = this.user[0].userId
			this.sendMsg.userPhone = ''
			
		}
		if(this.sendMsg.targetGroup  =='C'&&this.sendMsg.pshTpid==17){
			this.sendMsg.userPhone=this.login.loginName
		}
		if(this.sendMsg.turnType==1){
			this.sendMsg.h5Url=''
		}
	    if(this.file_ipt&&this.sendMsg.pshTpid==15){
	   	 	if(!this.file_ipt.files[0]){
		    	alert("请选择图片")
		    	return false
		    }
	   	}
	   	
		if(this.sendMsg.wthrTmgSnd==1){
			if(this.dataPicker){
				this.sendMsg.sendTime = this.format(this.dataPicker,'D')
			}else{
				alert("请选择发送时间")
		    	return false
			}
		}	
		var  fd= new FormData();

	    fd.append('pshETitle',this.sendMsg.pshETitle);
	    fd.append('pshCntnt',this.sendMsg.pshCntnt);
	    fd.append('h5Url',this.sendMsg.h5Url);
	    if(this.file_ipt){
	    	fd.append('pictureUrl',this.file_ipt.files[0]);
	    }
		fd.append('sendTime',this.sendMsg.sendTime);
		fd.append('wthrTmgSnd',this.sendMsg.wthrTmgSnd);
		fd.append('pshTpid',this.sendMsg.pshTpid);
		fd.append('targetGroup',this.sendMsg.targetGroup);
		fd.append('targetUserId',this.sendMsg.targetUserId);
		fd.append('userPhone',this.sendMsg.userPhone);
	    console.log(this.sendMsg)
	    // console.log(this.file_ipt.files[0])
	    this.userBackServices.pushMessage(fd)
			.subscribe(
			Article =>{
	            if(Article.status==0){
	                console.log(Article)
	                alert("发送成功")
	                this.sendMsg = {
						pshETitle:'',
						pshCntnt:'',
						h5Url:'',
						pictureUrl:'',
						sendTime:'',
						wthrTmgSnd:'0',
						pshTpid:'14',
						targetGroup:'A',
						targetUserId:'',
						userPhone:''
					}
	            }else{
	            	if(Article.msg){
	                	alert(Article.msg);
	                	}
	                }               
	            },
			error => this.errorMessage = <any>error
        );        
	}
	login:any={
		loginName:''
	}
	user:any=[]
	isSer:any=false
	content:any = '请输入精确手机号进行匹配'
	queryUserList(){
		this.content="匹配中..."
			this.isSer=true
  	 this.userBackServices.queryUserList(this.login) 
        .subscribe(
            partlist => {   
                if(partlist.status==0&&partlist.data.list[0]){
    				this.user = partlist.data.list
    				this.login.loginName = partlist.data.list[0].contactPhone
				}else{
					if(partlist.status!=0&&partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
  
	}
	toDate:any= new Date()
// 查询用户分组列表
	infoList:any=[]
	userCon:any={
		pageNum:1,
		pageCount:100000
	}
	userGroupList (){
		// this.userCon.pshTpid = this.listState
		// 机构位置（{{item.instLo}})   机构分类({{item.scmCntntGro.instClCar}})
		this.userBackServices.userGroupList (this.userCon) 
        .subscribe(
            partlist => {   
                if(partlist.status==0){
                  this.infoList =  partlist.data.ScmInfList
                }else{
					if(partlist.msg){
						alert(partlist.msg);
					}
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
	}
format (format:any,TOrD:any) {
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
	           	 if(TOrD=="T"){
	           	 	format = args.h+':'+args.m+':'+args.s
	           	 }
	           	 if(TOrD=="D"){
	           	 	format = args.Y+'-'+ args.M +'-'+args.d+" "+args.h+':'+args.m+':'+args.s
	           	 }
	           	// format = args.Y+'-'+ args.M +'-'+args.d
			}
           return format;
       };
Piketime(){

}
}