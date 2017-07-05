import { Component, ViewChild,OnInit,AfterViewInit,ChangeDetectorRef,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service'

@Component({
	selector: 'sns-conformity-classify',
	templateUrl: './sns-conformity-classify.component.html',
	styleUrls: ['./sns-conformity-classify.component.scss'],
	providers: [SnsConformityServices]
})

export class SnsConformityClassify implements OnInit,AfterViewInit{
	// list1:any=[{r_id:1,info_type_id:1,info_type_name:'资讯分类名称1',source_id:1,source_name:'自媒体（普通）'},
	// 		  {r_id:2,info_type_id:2,info_type_name:'资讯分类名称2',source_id:2,source_name:'公告'},
	// 		  {r_id:2,info_type_id:3,info_type_name:'资讯分类名称3',source_id:3,source_name:'资讯'},
	// 		  {r_id:2,info_type_id:3,info_type_name:'资讯分类名称4',source_id:3,source_name:'资讯'},
	// 		  {r_id:2,info_type_id:1,info_type_name:'资讯分类名称5',source_id:1,source_name:'自媒体（普通）'},
	// 		  {r_id:2,info_type_id:4,info_type_name:null,source_id:null,source_name:'扫雷'},
	// 		  {r_id:2,info_type_id:5,info_type_name:null,source_id:null,source_name:'日报'},
	// 		  {r_id:2,info_type_id:6,info_type_name:null,source_id:null,source_name:'要闻'},]
	constructor(
				private snsConformityServices:SnsConformityServices,
				private changeDetectorRef:ChangeDetectorRef,
				// private activatedRoute:ActivatedRoute,
    //     		private router:Router,
        		){}
	ngOnInit(){
		// debugger
		
		this.queryUserList()
		// this.queryUserList()
		this.typeSourceRelation()
		this.NFX_Newstype_Source()
	}
	ngAfterViewInit(){
		 // this.ColorFul()
	}

	list:any=[]
	errorMessage:any
	idLists:any=[]
	typeList:any=[]
	isshow:any=[]
	typing(){
		this.typeList=[]
		for(var i=0;i<this.idLists.length;i++){
			this.typeList[i]=[]
			this.isshow[i]=true
		}
		// debugger
		for(var i=0;i<this.list.length;i++){
			for(var j=0;j<this.idLists.length;j++){
				if(this.list[i].info_type_id == this.idLists[j]){
					this.typeList[j].push(this.list[i])
				}
			}
			
		
		}
		console.log(this.typeList)
	}
	color:any=[{back:'#fc594'},{back:'#1fb3fa'},{back:'#1fb063'},{back:'#7b72df'},{back:'#869494'},{back:'#f3ba29'},{back:'#3e72a3'},{back:'#007ed2'},{back:'#e0713f'},{back:'#9672a6'},]
	ColorFul(){
	 var count=10;
	  var a:any=[]
      for(var i=0;i<10;i++){
         a[i]=i+1;
 		
      }
      a.sort(function(){
       return 0.5-Math.random();
  
      })
     var spanList:any =  document.getElementsByName('sp')
     var buttonList:any= document.getElementsByName('sp1')
     for(var i=0;i<spanList.length;i++){
     	if(i>10){
     		spanList[i].style.backgroundColor = this.color[a[i%10]].back
     		buttonList[i].style.backgroundColor = this.color[a[i%10]].back
     	}else{
     		spanList[i].style.backgroundColor = this.color[a[i]].back
     		buttonList[i].style.backgroundColor = this.color[a[i]].back
     	}
     }
	}
	typeSourceRelation(){
		this.snsConformityServices
		.typeSourceRelation(null)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.list = infoList.data
				for(var i=0;i<this.list.length;i++){
					this.idLists.push(this.list[i].info_type_id)		
				}
				this.idLists=Array.from(new Set(this.idLists))
				for(var i=0;i<this.idLists.length;i++){
					this.typeList.push([])
				}
				this.typing()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	infoSourceList:any=[]
	infoSourceReList(id:any){
		var obj:any={
			info_type_id:id
		}
		this.snsConformityServices
		.infoSourceReList(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.infoSourceList = infoList.data
				for(var i=0;i<this.typeList.length;i++){

					for(var j=0;j<this.typeList[i].length;j++){
						if(this.typeList[i][j].info_type_id==id){
							for(var k=0;k<this.infoSourceList.length;k++){
								// this.infoSourceList[k].v_uid=''
								if(this.infoSourceList[k].is_check&& this.infoSourceList[k].source_id==this.typeList[i][j].source_id){
									// debugger
									this.infoSourceList[k].v_uid=this.typeList[i][j].v_uid
									console.log(this.infoSourceList[k].v_uid)
								}
							}
						}
						
					}
				}
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	typeSourceSave(i:any,j:any){
		// debugger
		var obj:any={
			info_type_id:'',
			source_data:[]
		}
		obj.info_type_id= this.typeList[i][0].info_type_id
		if(this.typeList[i][0].source_id){
		for(var k=0;k<this.typeList[i].length;k++){
			obj.source_data.push({source_id:this.typeList[i][k].source_id,source_name:this.typeList[i][k].source_name,v_uid:this.typeList[i][k].v_uid})
			}
		}else{
			obj.source_data=null
		}
		
		
		this.snsConformityServices
		.typeSourceSave(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				// alert('删除成功')
				
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	Vuser:any
	queryUserList(){
		var obj={userStatus:'1',userType:'4',pageNum:'1',pageSize:'100000'}
		this.snsConformityServices
		.queryUserList(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.Vuser=infoList.data.list
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	INFO_TYPE:any=[]
	NFX_Newstype_Source(){
		var obj={businTypeID:'SNS_INFO_TYPE'}
		this.snsConformityServices
		.NFX_Newstype_Source(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.INFO_TYPE = infoList.data
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	infoType:any='0';

	showEdit(id:any,win:any){
		
		this.infoSourceReList(id)
		this.infoType = id
		win.show()
		// debugger
		// var VuserList:any = document.getElementsByName('Vuser') 
		
		
	}
	deleteOne(i:any,j:any){
		if(this.typeList[i].length>1){
			this.typeList[i].splice(j,1)
		}else{
			var obj:any={info_type_id:this.typeList[i][0].info_type_id,info_type_name:this.typeList[i][0].info_type_name}
			this.typeList[i]=[obj]
		}
		this.typeSourceSave(i,j)
		console.log(this.typeList)
	}
	showthis(i:any){
		this.isshow[i]=false
	}
	hidethis(i:any){
		this.isshow[i]=true
	}
	changes(){
		var select:any = document.getElementsByName('infoTp')[0] 
		this.infoSourceReList(select.value)
	}
	addInfoSource(win:any){
		var obj:any={
			info_type_id:'',
			source_data:[]
		}
		obj.info_type_id = this.infoType
		var checkList:any = document.getElementsByName('checkInfo')
		var VuserList:any = document.getElementsByName('Vuser') 
			for(var i =0;i<checkList.length;i++){
				if(VuserList[i].value){
					if(this.infoSourceList[i].v_uid!=''){
						this.infoSourceList[i].v_uid=VuserList[i].value
					}
				}
		 		if(checkList[i].checked == true){
		 			obj.source_data.push(this.infoSourceList[i])	
		 		}
		 	}
		 	if(obj.source_data.length==0){
		 		obj.source_data=null
		 	}
		 	this.snsConformityServices
		.typeSourceSave(obj)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				alert('保存成功！')
				this.typeSourceRelation()
				win.hide()
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
		 	console.log(obj)
	}
}
