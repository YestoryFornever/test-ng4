
import { Component, ChangeDetectorRef,OnDestroy,ViewChild,AfterContentInit,AfterViewInit,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { VideoManagementService } from '../videoManagement.services'
import {INCONFIG} from '../../../../../../../public/in.config';

@Component({
	selector: 'video-detial',
	templateUrl: './video-detial.component.html',
	styleUrls: ['./video-detial.component.scss'],
	providers: [VideoManagementService]
})
export class VideoDetialComponent implements OnInit,OnDestroy,AfterContentInit,AfterViewInit{

constructor(private sanitizer: DomSanitizer,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private videoManagementService:VideoManagementService,
        		private router:Router) {}
	ngOnInit(){
		 this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let state = params['sta'];
			this.id = id;
			console.log(id)
		})
   		this.commentLists()
		this.listTip()
		this.listDetial()
		// debugger
		this.UserInfo = INCONFIG.getUserInfo()
	}

	private UserInfo:any;
	ngAfterContentInit(){
		
	}
	ngAfterViewInit(){
		// window.onresize=this.textOverFlow(this.allCommentList,this.stringLength)	
	}
	ngOnDestroy(){
		window.onresize=null
	}
	id:any
	errorMessage:any
// 列表详情
listCon:any={
	time_begin:'',
	time_end:'',
	op_uid:'',
	title:'',
	video_id:'',
	is_tip:'',
	cur_page:'1',
	show_count:'30',
	url_type:''
}
Detial:any={}
listDetial(){
	this.listCon.video_id = this.id
	this.videoManagementService.listVideo(this.listCon)
	        .subscribe( 
	            videoList =>{
	            	if(videoList.status=="0"){
	            		this.Detial = videoList.data.list[0]
	            		this.addVideo.title = this.Detial.title
	            		this.addVideo.times = this.Detial.times
	            		this.addVideo.url = this.Detial.url
	            		this.addVideo.url_id = this.Detial.url_id
	            		this.addVideo.note = this.Detial.note
	            		this.addVideo.url_type = this.Detial.url_type
	            		this.img.src = this.Detial.logo
	            	}else{
	            		alert(videoList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
}
// 评论
    commentCon:any={
		info_id:'',
		type:4,
		cur_page:1,
		show_count:10,
		overflow:false
	}
	allCommentList:any=[]
	commentList:any=[]
	commentLists(){	
		this.commentCon.info_id = this.id
		this.videoManagementService.listComment(this.commentCon)
	        .subscribe( 
	            commentList =>{
	            	if(commentList.status=="0"){
	            		this.commentList = commentList.data.list
	            		this.textOverFlow(this.allCommentList,this.stringLength)()
	            		if(this.commentList.length<10){
	            			this.haveComment = 2
	            		}else{
	            			this.haveComment = 3
	            		}
	            		for(var i=0;i<this.commentList.length;i++){
	            			this.allCommentList.push(this.commentList[i])
	            		}
	            		if(this.allCommentList.length==0){
	            			this.haveComment = 1
	            		}
	            	}else{
	            		alert(commentList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}

// 举报
	tipList:any=[]
	listTip(){
		var obj={
			info_id:this.id,
			type:6,
			cur_page:1,
			show_count:1000
		}
		this.videoManagementService.listTip(obj)
	        .subscribe( 
	            tipList =>{
	            	if(tipList.status=="0"){
	            		this.tipList = tipList.data.list
	            	}else{
	            		alert(tipList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
// 点赞
	setLikes(num:number){
		var obj={
				obj_id:this.id,
				obj_type:5,
				likes:num,
			}
			this.videoManagementService.setLikes(obj)
		        .subscribe( 
		            commentList =>{
		            	if(commentList.status=="0"){
		            		alert('点赞成功')
		            		this.listDetial()
		            	}else{
		            		alert(commentList.msg);
		            	}
		            },
		            error => this.errorMessage = <any>error
		        );
	}
	returnList(){
		this.router.navigate(['../../video-list'],{relativeTo:this.activatedRoute}); 
	}
stringLength(str:any) {
  ///<summary>获得字符串实际长度，中文2，英文1</summary>
  ///<param name="str">要获得长度的字符串</param>
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) 
       realLength += 1;
    else
       realLength += 2;
  }
  return realLength
};
// 判断文本是否超出
	textOverFlow(allCommentList:any,stringLength:any){
		return function(){
			var commentlist = allCommentList
			setTimeout(()=>{
				var noteList:any=document.getElementsByClassName('cont');
				// debugger
				for(var i=0;i<commentlist.length;i++){
					// console.log((noteList[i].clientWidth-120)*2 +'--'+stringLength(commentlist[i].content)*12)
					if((noteList[i].clientWidth-120)*2 <stringLength(commentlist[i].content)*12){
						allCommentList[i].overflow=true
					}else{
						allCommentList[i].overflow=false
					}
				}
			},0);	
		}
		
	}
// 展开

   openOrclose:any='展开'
	openText(note:any,i:any){
		// debugger
		// if(this.openOrclose=='展开'){
			note.style.display = 'inline'
			this.allCommentList[i].overflow=false
			// this.openOrclose=''
		// }else{
		// 	note.style.display = 'box'
		// 	this.openOrclose='展开'
		// }
	}
// 阻止冒泡
	stopBubble(e:any) { 
		if (e && e.stopPropagation) {//非IE浏览器 
			e.stopPropagation(); 
		} 
		else {//IE浏览器 
			window.event.cancelBubble = true; 
		} 
	}
// 分页
	haveComment:any =1
	moreCommentLists(){
		this.commentCon.cur_page+=1
		this.commentLists()
	}
// 编辑
// / /上传图片的字段
	 addVideo:any={
		title:'',
		note:'',
		url_id:'',
		url:'',
		video_id:'',
		logo:'',
		source:'',
		times:'',
		url_type:'1'
	 }
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
saving:any=false
	saveVideo(view:any){
		if(this.addVideo.title==''){
			alert('标题不能为空')
			return false
		}
		
		if(this.addVideo.url_type==1){
			if(this.addVideo.url_id==''){
				alert('视频ID串不能为空')
				return false
			}
		}else{
			if(this.addVideo.url==''){
				alert('视频链接不能为空')
				return false
			}
		}
		if(this.addVideo.times==''){
			alert('视频时长不能为空')
			return false
		}
		 // debugger
		
		var  fd= new FormData();
	    fd.append('u_id',this.UserInfo.id);
	    fd.append('title',this.addVideo.title);
	    fd.append('note',this.addVideo.note);
		fd.append('url_id',this.addVideo.url_id);
		fd.append('url',this.addVideo.url);
		fd.append('source','后台');
		fd.append('video_id',this.id)
		fd.append('times',this.addVideo.times);
		fd.append('url_type',this.addVideo.url_type)
		if(this.file_ipt&&this.file_ipt.files[0]){
			fd.append('photo',this.file_ipt.files[0]);
		}else if(this.Detial.logo){
		
		}else{
				alert('背景图不能为空')
			return false
		}
		this.saving = true
 		this.videoManagementService.saveVideo(fd)
			.subscribe(
			Article =>{
	            if(Article.status==0){
	                alert("发布成功")
	                 this.addVideo={
						title:'',
						note:'',
						url_id:'',
						url:'',
						logo:'',
						source:'',
						times:'',
					 }
					 this.listDetial()
					this.img.src=''
					if(this.file_ipt){
						this.file_ipt.value=''
					}
					view.hide()
					this.saving = false
	            }else{
	            	if(Article.msg){
	                	alert(Article.msg);
	                	}
	                }           
	                this.saving = false
	            },
			error => this.errorMessage = error
        );        
	}

// 删除视频
	infoDel(){
		var obj:any={
			data_type:4,
			data_id:''
	}
	obj.data_id = this.id
	this.videoManagementService.infoDel(obj)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('删除成功！')
	            		 this.returnList()
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	// 发表评论
	publishCom:any={
		type:'4',
		info_id:'',
		uids:'',
		content:'',
		add_weibo:'',
		comm_id:'',
	}
	publishComment(){
		this.publishCom.info_id
	}
	// 删除评论
	delCom:any={
		p_type:'3',
		p_id:'',
		uid:''
	}
	snsDel(id:any){
		this.delCom.p_id = id
		this.delCom.uid = this.UserInfo.id
		this.videoManagementService.snsDel(this.delCom)
	        .subscribe( 
	            userList =>{
	            	if(userList.status=="0"){
	            		alert('删除成功！');
	            		this.allCommentList=[];
	            		var pageNow:any = this.commentCon.cur_page;
	            		for(var i=1;i<=pageNow;i++){
	            			this.commentCon.cur_page=i;
	            			this.commentLists()
	            		}
	            	}else{
	            		alert(userList.msg);
	            	}
	            },
	            error => this.errorMessage = <any>error
	        );
	}
	
}
