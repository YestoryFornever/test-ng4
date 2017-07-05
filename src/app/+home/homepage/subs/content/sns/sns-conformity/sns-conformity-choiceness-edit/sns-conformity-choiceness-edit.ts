
import { Component, ChangeDetectorRef,ViewChild,OnInit,AfterViewInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service'


@Component({
	selector: 'sns-conformity-choiceness-edit',
	templateUrl: './sns-conformity-choiceness-edit.html',
	styleUrls: ['./sns-conformity-choiceness-edit.scss'],
	providers: [SnsConformityServices]
})

export class SnsConformityChoicenessEdit  implements OnInit{
	constructor(
				private snsConformityServices:SnsConformityServices,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

	ngOnInit(){
		var a:any = document.getElementsByClassName('wrapper')[0]
		a.scrollTop = 0
		window.scrollTo(0,0);
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.ID = id
			// let backId = params['backId'];
			// console.log(userId,backId);
		})
		if(this.ID){
			this.importantList()
		}
		
	}	


// 列表
	default:any={
		time_begin:'',
		time_end:'',
		title:'',
		cur_page:'1',
		show_count:'30',
	}
	sweepDetial:any={
		e_title:'',
		e_note:'',
	}

	orgAndBond:any=[]
	importantList() {
	this.default.important_id = this.ID 
		this.snsConformityServices
		.importantList(this.default)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.sweepDetial = infoList.data.list[0]	
				
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
ID:any
errorMessage:any

addCon:any={
	important_id:'',
	title:'',
	note:'',
	is_release:'',
	}
	OrgNameLists:any=[]
	sweepEdit(is_release:any){
		
		if(this.sweepDetial.e_title==''){
			alert('请填写标题！')
			return false
		}
		if(this.sweepDetial.e_note==''){
			alert('请填写内容！')
			return false
		}
		if(this.ID){
			this.addCon.important_id=this.ID
		}else{
			this.addCon.important_id=0
		}
		if(this.sweepDetial.release_state=='已发送'){
			this.addCon.is_release=1
		}else{
			this.addCon.is_release=0
		}
		if(is_release==1){
			this.addCon.is_release=1
		}
		this.addCon.title=this.sweepDetial.e_title
		this.addCon.note=this.sweepDetial.e_note
		this.snsConformityServices.importantEdit(this.addCon)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 	if(is_release==1){
	                 		alert('保存并发送成功！')
	                 	}else{
	                 		alert('保存成功！')
	                 	}
	                 		this.ListTo()
	                 }else{
	                 	alert(org.msg)
	                 }
	                },
	                error => this.errorMessage = error                 
	            );
	}
	ListTo(){
		if(this.ID){
			this.router.navigate(['../../sns-conformity-choiceness'],{relativeTo:this.activatedRoute}); 
		}else{
			this.router.navigate(['../sns-conformity-choiceness'],{relativeTo:this.activatedRoute}); 
		}
	}

}