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
	selector: 'rdShow-liveStreaming-detial',
	templateUrl: './rdShow-liveStreaming-detial.component.html',
	styleUrls: ['./rdShow-liveStreaming-detial.component.scss'],
	providers: [rdShowLiveStreamingService]
})
export class LiveStreamingDetialComponent implements OnInit{
	constructor(private sanitizer: DomSanitizer,
		private changeDetectorRef:ChangeDetectorRef,
				private router:Router,
				private activatedRoute:ActivatedRoute,
				private rdShowLiveStreamingService:rdShowLiveStreamingService,
				){}
	turnTo(){
		this.router.navigate(['../../rdShow-liveStreaming-list'],{relativeTo:this.activatedRoute}); 
		// this.router.navigate(['../../../rdShow-liveStreaming-list'],{relativeTo:this.activatedRoute}); 
	}	
	ngOnInit() {        
      this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let state = params['sta'];
			this.id = id;
		})
     
      this.turnFirst()
    }
    id:any
    
  msgNumbers = [{Number:'30'},{Number:'20'},{Number:'10'}];
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
		this.liveUserList()
		 this.liveInfo()
	}
	rdShowListIN(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.liveUserList()
	}
	public sizeData(Number:any){
		// this.height = Number*40+40+'px';
		// this.currentPage = 1;//无法同时修改当前页和每页总数
		// this.changeDetectorRef.detectChanges();
		this.itemsPerPage = Number;
		this.default.show_count=this.itemsPerPage;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");		
		var tr:any = document.createElement('tbody');
		var num:number = Number*1; 	
	};
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.currentPage = event.page;
		this.default.cur_page = event.page;	
		this.liveUserList()
	};

	public pageNumChange(event:any,){
	}
// 查询列表
	default:any={
		live_id:'',
		cur_page:'1',
		show_count:'30'
	}
	errorMessage:any
	showList:any=[]
	liveUserList(){
		this.default.live_id = this.id
		this.rdShowLiveStreamingService.liveUserList(this.default)
			.subscribe(
				list => { 
					if(list.status==0){
						this.showList = list.data.list
						this.totalItems = list.data.page.totalResult
						this.totalPages = list.data.page.totalPage
					}else{
						// alert(list.msg)
					}
				},
				error => this.errorMessage = <any>error
			);
	}
// 获取详情
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
		rbegin_time:'',
		rend_time:'',
		locale:'',
		user_limit:500,
		title:'',
		note:'',
		authority:'',
		share_note:'',
		ulist_hide:'1',
		enter_num:'',
		user_num:'',	
		ask_num:'',
		chat_num:'',
		like_cnt:'',	}
showInfo:any={}
	liveInfo(){
		var obj={
			live_id:this.id
		}
		this.rdShowLiveStreamingService.liveInfo(obj) 
        .subscribe(
            info => {   
                if(info.status==0){
                	this.sendMsg.state = info.data.state
                	this.sendMsg.title = info.data.title
	    			this.sendMsg.name = info.data.name
	    			this.sendMsg.user_num = info.data.user_num
	    			this.sendMsg.like_cnt = info.data.like_cnt
	    			this.sendMsg.rbegin_time = info.data.rbegin_time
	    			this.sendMsg.rend_time = info.data.rend_time
	    			this.sendMsg.enter_num = info.data.enter_num
	    			this.sendMsg.chat_num = info.data.chat_num
				}else{
					alert('获取详情失败')
                }
            },  
            error => this.errorMessage = <any>error
	    ); 
	}
// 排序
	Order(ord:any,type:any){
		// this.default.sortType = ord
		this.default.orderBy = type+' '+ord
		this.turnFirst()
	}
}