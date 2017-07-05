import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service'


@Component({
	selector: 'sns-conformity-daily',
	templateUrl: './sns-conformity-daily-component.html',
	styleUrls: ['./sns-conformity-daily-component.scss'],
	providers: [SnsConformityServices]
})

export class SnsConformityDaily  implements OnInit{
	constructor(
		
				private snsConformityServices:SnsConformityServices,
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
		this.NFX_Newstype_Source()
		this.dayList()
		this.dayInfoTypeList()
	}
	detialTo(){
		this.router.navigate(['../../sns-news-management/sns-news-list'],{relativeTo:this.activatedRoute}); 
	}
	errorMessage:any
	dayLists:any=[]
	dayList(){
		this.snsConformityServices
		.dayList(undefined)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.dayLists = infoList.data.list
				this.todayIsSend = this.dayLists[0].release_state
				this.dayInfoList()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	infoList:any=[]
	infoCon:any={
			dm_id:''
	}
	issend:any
	dayId:any
	todayIsSend:any
	dayInfoList(){
		// debugger
		if(this.infoCon.dm_id==''){
			this.infoCon.dm_id = this.dayLists[0].dm_id
			
		}else{
			var select:any = document.getElementsByName('day')[0]
			this.infoCon.dm_id = select.value
		}
		for(var i=0;i<this.dayLists.length;i++){
			if(this.infoCon.dm_id==this.dayLists[i].dm_id){
				this.issend = this.dayLists[i].release_state
			}
		}
		this.snsConformityServices
		.dayInfoList(this.infoCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				

				this.infoList = infoList.data.list
			}else{
				alert(infoList.msg)
				this.infoList =[]
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
// 日报预览
	showList:any={}

	showSend(win:any){
		// this.showList.data.data=
		this.snsConformityServices
		.dayInfoView(this.infoCon)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
					this.showList = infoList.data
				// this.showList.d_title=this.showList.d_title.replace(' 未发送','')
			}else{
				alert(infoList.msgdata)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
		win.show()
	}
	Infodic:any=[]
	// 字典查询
	NFX_Newstype_Source(){
		var obj={businTypeID:"SNS_DAY_TYPE"}
		this.snsConformityServices
		
		.NFX_Newstype_Source(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.Infodic = infoList.data
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	// 修改类型
		dayInfoEdit(id:any,sele:any){
			var obj={
				dd_id:id,
				info_type:'',
			}
			obj.info_type = sele.value
		this.snsConformityServices
		.dayInfoEdit(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	// 删除日报
	delCOn:any
	infoDelShow(del:any,id:any){
		this.delCOn={
			data_type:1,
			data_id:id
		}
		del.show()
		
	}
	delInfo(del:any){
		this.snsConformityServices
		.infoDel(this.delCOn)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('删除成功')

				this.dayInfoList()
				del.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	// 撤回日报
	
		infoReleaseDEF(){
			var obj={
				ids:'',
				data_type:1,
				op_type:2,
			}
		obj.ids =	this.infoCon.dm_id
		this.snsConformityServices
		
		.infoRelease(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('撤回成功！')
				this.dayList()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	// 发送日报

		infoReleaseSED(delay:any){
			var obj={
				ids:'',
				data_type:1,
				op_type:1,
			}
		obj.ids =	this.infoCon.dm_id
		this.snsConformityServices
		
		.infoRelease(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('发送成功！')
				this.dayList()
				delay.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	
					this.errorMessage = error;
					
				}
		);
	}

	// 日报排序
compare(property:any){
    return function(a:any,b:any){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
DTList:any=[]

	dayInfoTypeList(){
		this.snsConformityServices
		.dayInfoTypeList(null)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.DTList = infoList.data.sort(this.compare('it_order'))
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
// DTList:any=[{name:'种类一',ord:1},{name:'种类二',ord:2},{name:'种类三',ord:3},{name:'种类四',ord:4},{name:'种类五',ord:5},]
	nowChoose:any=''
	chooseOne(i:any,dt:any){
		this.nowChoose=i
		var list:any = document.getElementsByName('dailyType')
		for(var k=0;k<list.length;k++){
			list[k].style.backgroundColor='#fff'
		}
		dt.style.backgroundColor='#BADDF5'
	}
	turnUp(){
		// debugger
		if(this.nowChoose===''){
			return false
		}
		var thisType=this.DTList[this.nowChoose]
		if(this.nowChoose>0){
			this.DTList.splice(this.nowChoose,1)
			this.DTList.splice(this.nowChoose-1,0,thisType)
			this.nowChoose=this.nowChoose-1
		}
		
	}
	turnDown(){
		// debugger
		if(this.nowChoose===''){
			return false
		}
		var thisType=this.DTList[this.nowChoose]
		if(this.nowChoose<this.DTList.length-1){
			this.DTList.splice(this.nowChoose,1)
			this.DTList.splice(this.nowChoose+1,0,thisType)
			this.nowChoose=this.nowChoose+1
		}
	}
	addNew:boolean=false
	newtype:any=''
	addNews(){
		if(!this.addNew){
			this.addNew = true
		}else{
			if(this.newtype==''){
				alert('日报分类名称不能为空')
				return false
			}else{
				this.DTList.push({it_name:this.newtype,it_order:this.DTList.length+2})
				this.addNew = false
				this.newtype=''
			}
		}
		
	}
	setDayInfoOrder(org:any){
		// debugger
		for(var i=0;i<this.DTList.length;i++){
			this.DTList[i].it_order = i+1
		}
		this.snsConformityServices
		.setDayInfoOrder(this.DTList)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('操作成功!')
				org.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
}
