
import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { rdShowLiveStreamingService } from '../../../services/rdShow-liveStreaming.services'

@Component({
	selector: 'rdShow-liveStreaming-list',
	templateUrl: './rdShow-liveStreaming-list.component.html',
	styleUrls: ['./rdShow-liveStreaming-list.component.scss'],
	providers: [rdShowLiveStreamingService]
})
export class RdShowLiveStreamingListComponent implements OnInit{

	constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private rdShowLiveStreamingService:rdShowLiveStreamingService,
        		private router:Router) {}
	ngOnInit(){

		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
		this.rdShowList()
	}
	errorMessage:any
	type:any= '0'
	// clickAll(){
	// 	this.type.inf= false
	// 	this.type.sys= false
	// 	this.type.stMsg= false
	// }
	// clickOther(){
	// 	this.type.all= false
	// }
	today:any=new Date()
	startDate:any=new Date(Date.parse(this.today)-1000*24*3600*3)
	endDate:any = this.today
	en:any
	default:any={
		title:'',
		valid:'0',
		state:'0',
		live_begin_time:'',
		live_end_time:'',
		cur_page:'1',
		order_by:'',
		show_count:'30'
	}
	showList:any=[]
	rdShowList(){
		this.default.live_begin_time=this.format(this.startDate,'to')
		this.default.live_end_time=this.format(new Date(Date.parse(this.endDate)+1000*3600*24-1),'to')
		this.rdShowLiveStreamingService.liveList(this.default)
			.subscribe(
				list => { 
					if(list.status==0){
						this.showList = list.data.list
						for(var i=0;i<this.showList.length;i++){
							this.showList[i].begin_time=this.format(new Date(this.showList[i].begin_time),'show')
						}
						this.totalItems = list.data.page.totalResult
						this.totalPages = list.data.page.totalPage
					}else{

					}
				},
				error => this.errorMessage = <any>error
			);
	}
	// 分页
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
		this.rdShowList()
	}
	rdShowListIN(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.rdShowList()
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
	public pageNumChange(event:any,){
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any):void {
		this.currentPage = event.page;
		this.default.cur_page = event.page;	
		// allcheck.checked = false;
		this.rdShowList()
	};
	// 时间转换
	format (format:any,show:any) {

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
	           	if(show=='show'){
	           		var today:any = new Date()
		           	if(today.getFullYear()==args.Y&&today.getMonth()==args.M&&today.getDate()==args.d){
						format = args.h+':'+args.m+':'+args.s
		           	}
		           	if(today.getFullYear()==args.Y){
		           		 format = args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
		           	}else{
		           		format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
		           	}
	           	}else{
	           		format = args.Y+'-'+ args.M +'-'+args.d
	           	}
	           	
	           	// format = args.Y+'-'+ args.M +'-'+args.d
			}
           return format;
       };
// 跳转
	turnTo(){
		this.router.navigate(['../rdShow-liveStreaming-edit'],{relativeTo:this.activatedRoute}); 
	}
	detialTo(id:any,sta:any){
		this.router.navigate(['../rdShow-liveStreaming-edit',id,sta],{relativeTo:this.activatedRoute}); 
	}
	turnDetial(id:any){
		this.router.navigate(['../rdShow-liveStreaming-detial',id],{relativeTo:this.activatedRoute}); 
		// rdShow-liveStreaming-detial/:id
	}
// 修改状态弹窗
setLive:any={
		live_id:'',
		valid:''
	}
	statue:any
	showName:any=''
	showChange(win:any,show:any){
		console.log(show.valid)
		this.showName = show.title+''
		this.statue = show.valid+''
		this.setLive.live_id = show.lid
		
		win.show()
	}
// 修改状态
	
	changeStatue(win:any){
		this.setLive.valid = this.statue
		this.rdShowLiveStreamingService.setLiveValid(this.setLive)
			.subscribe(
				list => { 
					if(list.status==0){
						alert("修改成功！")
						this.rdShowList()
					}else{
						if(list.msg){
							alert(list.msg)
						}
					}
				},
				error => this.errorMessage = <any>error
			);
			
			win.hide()
	}
// 删除
deleteShow(id:any){
	this.setLive.valid=3
	this.setLive.live_id=id
	this.rdShowLiveStreamingService.setLiveValid(this.setLive)
			.subscribe(
				list => { 
					if(list.status==0){
						alert("删除成功！")
						this.rdShowList()
					}else{
						if(list.msg){
							alert(list.msg)
						}
					}
				},
				error => this.errorMessage = <any>error
			);
			
}
// 查看
	looked:any={
		title:'',
		view_num:'',
		ask_num:'',
		chat_num:''
	}
	lookAt(show:any,win:any){
		console.log(show);
		this.looked.title = show.title;
		this.looked.view_num = show.view_num;
		this.looked.ask_num = show.ask_num;
		this.looked.chat_num = show.chat_num;
		win.show()
	}
	// 时间排序
	timeUp:any=false
	timeDown:any=false
	timeNotChoose:any=true
	// 状态排序
	stateNotChoose:any=true
	stateUp:any=false
	stateDown:any=false
	// 观看人数排序
	lookNumNotChoose:any=true
	lookNumUp:any=false
	lookNumDown:any=false
	ordBy(name:any,ord:any){
		this.default.order_by=''
		if(name=='state'){
			this.default.order_by='state '+ord+',create_time desc'
			this.timeNotChoose = true
			this.stateNotChoose = false
			this.lookNumNotChoose = true
			if(ord=='asc'){
				this.stateUp=true
				this.stateDown=false
			}else{
				this.stateUp=false
				this.stateDown=true
			}
		}
		if(name=='create_time'){
			this.default.order_by=name+' '+ord
			this.stateNotChoose = true
			this.timeNotChoose = false
			this.lookNumNotChoose = true
			if(ord=='asc'){
				this.timeUp=true
				this.timeDown=false
			}else{
				this.timeUp=false
				this.timeDown=true
			}
		}
		if(name=='view_num'){
			this.default.order_by=name+' '+ord
			this.lookNumNotChoose = false
			this.stateNotChoose = true
			this.timeNotChoose = true
			if(ord=='asc'){
				this.lookNumUp=true
				this.lookNumDown=false
			}else{
				this.lookNumUp=false
				this.lookNumDown=true
			}
		}
		this.rdShowListIN()

	}

}