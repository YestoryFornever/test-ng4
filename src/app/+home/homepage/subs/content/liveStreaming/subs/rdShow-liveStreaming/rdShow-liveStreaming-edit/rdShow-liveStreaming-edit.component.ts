import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { rdShowLiveStreamingService } from '../../../services/rdShow-liveStreaming.services'
import {INCONFIG} from '../../../../../../../../../public/in.config';



@Component({
	selector: 'rdShow-liveStreaming-edit',
	templateUrl: './rdShow-liveStreaming-edit.component.html',
	styleUrls: ['./rdShow-liveStreaming-edit.component.scss'],
	providers: [rdShowLiveStreamingService]
})
export class RdShowLiveStreamingEditComponent implements OnInit{
	constructor(private sanitizer: DomSanitizer,
				private router:Router,
				private activatedRoute:ActivatedRoute,
				private rdShowLiveStreamingService:rdShowLiveStreamingService,
				){}

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let state = params['sta'];
			this.id = id;
			this.state = state;
		})
		let that = this;
		this.userInfo = INCONFIG.getUserInfo();
		if(this.id){
			this.liveInfo()
		}
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.option={
			 language: "zh_cn", //配置语言
            placeholderText: "请输入内容", // 文本框提示内容
            charCounterCount: true, // 是否开启统计字数
            // charCounterMax: 200, // 最大输入字数,目前只支持英文字母
            // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
            toolbarButtons: ['fullscreen', '|', 'bold', 'italic','color','underline', 'strikeThrough', 'align', 'insertLink', 'insertImage', 'insertHR', 'subscript', 'superscript'],
            codeMirror: false, // 高亮显示html代码
            codeMirrorOptions: { // 配置html代码参数
                tabSize: 4
            },
            SpellChecker: false,
			imageUploadURL:INCONFIG.getIP()+"sns/uploadPhoto",//INCONFIG.getIP()+接口名称,
			//imageUploadURL:"http://11.177.50.63:9999/emanager/sns/uploadPhoto",//刘琦本地路径
			imageUploadParams:{uid:this.userInfo.id},//接口其他传参,默认为空对象{},
			imageUploadMethod:"POST",//POST/GET,
			events : {
				'froalaEditor.image.beforeUpload':function(e:any, editor:any, images:any) {
					// console.log(e);
				},
				'froalaEditor.image.uploaded':function(e:any, editor:any, response:any) {
					console.info(response);
					console.info(that.weiboImgs);
					that.weiboImgs.push({
						photo:JSON.parse(response).photo,
						thumb:JSON.parse(response).thumb
					})
				},
				'froalaEditor.image.inserted':function(e:any, editor:any, $img:any, response:any) {
					// console.log(e);
				},
				'froalaEditor.image.error':function(e:any, editor:any, error:any, response:any) {
					console.log(error);
				},
				'froalaEditor.blur':function(e:any){
					// debugger;
				}
			}
		}

	}
	weiboImgs:any = [];
	option:any
	hours:any
	min:any
	sec:any
	userInfo:any;
// 获取详情
showInfo:any={}
	liveInfo(){
		var obj={
			live_id:this.id
		}
		this.rdShowLiveStreamingService.liveInfo(obj) 
        .subscribe(
            info => {   
                if(info.status==0){
	    			this.showInfo = info.data
	    			this.sendMsg.live_id = info.data.lid
	    			this.sendMsg.live_no = info.data.live_no
	    			this.sendMsg.live_id_zs = info.data.live_id
	    			this.sendMsg.his_id = info.data.his_id
	    			this.sendMsg.his_url = info.data.his_url
	    			this.img.src = info.data.logo
	    			this.sendMsg.phone = info.data.phone
	    			this.sendMsg.name = info.data.name
	    			this.sendMsg.ulist_hide = info.data.ulist_hide+''
	    			this.sendMsg.share_note = info.data.share_note
	    			this.dataPicker=new Date(info.data.begin_time)
	    			// this.sendMsg.user_limit = info.data.user_limit
					// this.timePicker=new Date(info.data.begin_time)
					this.sendMsg.user_limit = info.data.user_limit
	    			this.sendMsg.locale = info.data.locale
	    			this.sendMsg.title = info.data.title
	    			this.sendMsg.note = info.data.note
	    			var his_time = info.data.his_times.split(':')
	    			this.hours=his_time[0]
	    			this.min = his_time[1]
	    			this.sec = his_time[2]
	    			var arr=info.data.authority.split(',')
	    			this.v_user=0
	    			this.l_user=1
	    			this.c_user=1
	    			for(var i=0;i<arr.length;i++){
	    				if(arr[i]==1){
	    					this.v_user=0
	    				}
	    				if(arr[i]==2){
	    					this.l_user=0
	    				}
	    				if(arr[i]==3){
	    					this.c_user=0
	    				}
	    			}
				}else{
					alert('获取详情失败，继续操将作为新建直播！')
                }
                this.content="查询"
            },  
            error => this.errorMessage = <any>error
	    ); 
	}
	id:any
	state:any
	content4:any
	en:any
	turnTo(){
		if(!this.id){
			this.router.navigate(['../rdShow-liveStreaming-list'],{relativeTo:this.activatedRoute}); 
		}else{
			this.router.navigate(['../../../rdShow-liveStreaming-list'],{relativeTo:this.activatedRoute}); 
		}
	}
	// /上传图片的字段
	img:any={
		src:''
	}
	file_ipt:any;
	fileChange(input:any,umbnail:any,e:any){
		// debugger
		this.file_ipt = input;
		if(this.file_ipt.files[0]){
	    	this.img.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file_ipt.files[0]));
		}
	}
	vTime(){
		if(this.min>=60){
			this.min=59
		}
		if(this.sec>=60){
			this.sec=59
		}
	}
	
	// 时间转换
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
	          
	    format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
	          
	          
			}
           return format;
       };
    v_user:any='0'
    l_user:any='0'
    c_user:any='0'
    sendMsg:any={
		live_id:'0',
		live_no:'',
		live_id_zs:'',
		his_id:'',
		his_url:'',
		his_times:'',
		logo:'',
		phone:'',
		name:'',
		begin_time:'',
		locale:'',
		user_limit:500,
		title:'',
		note:'',
		authority:'',
		share_note:'',
		ulist_hide:'1'
	}
	errorMessage:any
	dataPicker:any
	timePicker:any
	saving:any=false
	addShow(){
		this.saving=true
		if(!this.img.src){
	    	alert("请选择背景图片")
	    	this.saving=false
	    	return false
	    	
	    }
	    if(!this.sendMsg.live_no){
	    	alert("请填写展示互动直播编号")
	    	this.saving=false
	    	return false
	    	
	    }
 		if(!this.sendMsg.live_id_zs){
	    	alert("请填写加入ID")
	    	this.saving=false
	    	return false
	    	
	    }
	    if(!this.sendMsg.his_id){
	    	this.sendMsg.his_id=''
	    }
	    if(!this.sendMsg.his_url){
	    	this.sendMsg.his_url=''
	    }
	     if(!this.sendMsg.phone){
	    	this.sendMsg.phone=''
	    }
	     if(!this.sendMsg.name){
	    	this.sendMsg.name=''
	    }
	    if(!this.dataPicker){
	    	alert("请填写直播时间")
	    	this.saving=false
	    	return false
	    	
	    }
	    if(!this.sendMsg.locale){
	    	alert("请填写直播地点")
	    	this.saving=false
	    	return false
	    	
	    }
	     if(!this.sendMsg.title){
	    	alert("请填写直播标题")
	    	this.saving=false
	    	return false
	    	
	    }
	     if(!this.sendMsg.note){
	    	this.sendMsg.note=''
	    }
	     if(!this.sendMsg.user_limit&&this.sendMsg.user_limit!=0){
	    	alert("请填最高并发数")
	    	this.saving=false
	    	return false
	    }
	     if(!this.sendMsg.share_note){
	    	alert("请填写分享平台描述")
	    	this.saving=false
	    	return false
	    	
	    }
	    if(this.hours||this.min||this.sec){
	    	if(!this.hours){
	    		this.hours='00'
	    	}
	    	if(!this.min){
	    		this.min='00'
	    	}
	    	if(!this.sec){
	    		this.sec='00'
	    	}
	    	if(this.hours<10&&(this.hours+'').length<2){
	    		this.hours='0'+this.hours
	    	}
	    	if(this.min*1<10&&(this.min+'').length<2){
	    		this.min='0'+this.min
	    	}
	    	if(this.sec*1<10&&(this.sec+'').length<2){
	    		this.sec='0'+this.sec
	    	}
	     this.sendMsg.his_times=this.hours+':'+this.min+':'+this.sec
	    }else{
	    	this.sendMsg.his_times=undefined
	    }
	   
	    var authority:any=[]
	    // if(this.v_user==0){
	    	authority.push('1')
	    // }
	    if(this.l_user==0){
	    	authority.push('2')
	    }
	    if(this.c_user==0){
	    	authority.push('3')
	    }
	    this.sendMsg.authority= authority.join(',')
		var  fd= new FormData();
		this.sendMsg.begin_time = this.format(this.dataPicker)
	    fd.append('live_id',this.sendMsg.live_id);
	    fd.append('live_no ',this.sendMsg.live_no);
	    fd.append('live_id_zs',this.sendMsg.live_id_zs);
	    fd.append('his_id',this.sendMsg.his_id);
		fd.append('his_url',this.sendMsg.his_url);
		fd.append('ulist_hide',this.sendMsg.ulist_hide);
		 fd.append('share_note',this.sendMsg.share_note);
		// debugger
		// fd.append('logo','');
		if(this.file_ipt&&this.file_ipt.files[0]){
			fd.append('logo',this.file_ipt.files[0]);
		}else{
			fd.append('logo','');
		}
		
		fd.append('phone',this.sendMsg.phone);
		fd.append('name',this.sendMsg.name);
		fd.append('begin_time ',this.sendMsg.begin_time);
		fd.append('locale',this.sendMsg.locale);
		fd.append('title',this.sendMsg.title);
		fd.append('note',this.sendMsg.note);
		if(this.sendMsg.his_times)
		fd.append('his_times',this.sendMsg.his_times);
		fd.append('authority',this.sendMsg.authority);
		fd.append('user_limit',this.sendMsg.user_limit);
	    this.rdShowLiveStreamingService.editLive(fd)
			.subscribe(
			Article =>{
	            if(Article.status==0){
	                alert("发布成功")
	                this.sendMsg = {
						live_id:'',
						live_no:'',
						live_id_zs:'',
						his_id:'',
						his_url:'',
						logo:'',
						phone:'',
						name:'',
						begin_time:'',
						locale:'',
						title:'',
						note:'',
					}
					this.dataPicker=''
					this.img.src=''
					if(this.file_ipt){
						this.file_ipt.value=''
					}
					this.saving=false
					this.turnTo()
	            }else{
	            	if(Article.msg){
	                	alert(Article.msg);
	                	}
	                }  
	                this.saving=false             
	            },
			error => this.errorMessage = error
        );        
	}
	login:any={
		loginName:''
	}
	isSer:any=false
	content:any = '查询'
	queryUserList(name:any){
		this.login.loginName=this.sendMsg.phone
		this.content="匹配中..."
			this.isSer=true
  	 this.rdShowLiveStreamingService.queryUserList(this.login) 
        .subscribe(
            partlist => {   
                if(partlist.status==0&&partlist.data.list.length==1){
    				this.sendMsg.name = partlist.data.list[0].userName
				}else{
					this.sendMsg.name=''
					name.placeholder="没有匹配到用户"
                }
                this.content="查询"
            },  
            error => this.errorMessage = <any>error
	    ); 
  
	}
}