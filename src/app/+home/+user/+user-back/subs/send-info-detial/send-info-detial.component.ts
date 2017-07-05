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
	selector: 'send-info-detial',
	templateUrl: './send-info-detial.component.html',
	styleUrls: ['./send-info-detial.component.scss'],
	providers: [UserBackServices]
})
export class SendInfoDetialComponent implements OnInit{
		constructor(private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
				private userBackServices:UserBackServices,
        		private router:Router) {}
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			let state =  params['state'];
			let from = params['from'];
			this.ID = id;
			this.state = state;
			this.from = from
		})
		this.msgDetail()
	}
	from:any
	ID:any
	state:any
	errorMessage:any
	detialData:any={
		targetMebNum :"",
		sendMebNum :"",
		clickMebNum :"",
		targetGroUser :"",
		sendTime  :"",
		pshETitle :"",
		pshCntnt :"",
		h5Url :"",
		pictureUrl :"",
	}
	sendTo(){
		if(this.from==1){
			this.router.navigate(['../../../../send-info-list'],{relativeTo:this.activatedRoute}); 
		}
		if(this.from==2){
			this.router.navigate(['../../../../timing-info-list'],{relativeTo:this.activatedRoute}); 
		}
	}
	msgDetail(){
		var id={
			msgPshid:this.ID
		}
		 this.userBackServices.msgDetail(id) 
	        .subscribe(
	            partlist => {   
	                if(partlist.status==0){
	    				this.detialData = partlist.data
	    				this.detialData.sendTime = this.format(new Date(this.detialData.sendTime))  
					}else{
						if(partlist.msg){
							alert(partlist.msg);
						}
	                }
	            },  
	            error => this.errorMessage = <any>error
		    ); 
	}
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