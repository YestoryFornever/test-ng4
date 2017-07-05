import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
	selector: 'switch-btns',
	templateUrl: './switch-btns.component.html',
	styleUrls: ['./switch-btns.component.scss'],
})
export class SwitchBtnsComponent implements OnInit{
	constructor(
		private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private router:Router,
	){}
	@Input()cptType:any;
	@Input()xxx:any='4';
	routeParams:any={};
	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			this.routeParams.dstrBondId = params['dstrBondId'];
			this.routeParams.issuId = params['issuId'];
			this.routeParams.userId = params['userId'];
			this.routeParams.teamId = params['teamId'];
			this.routeParams.obTeamId = params['obTeamId'];
			this.routeParams.roleId = params['roleId'];
			this.routeParams.enqrTp = params['enqrTp'];
		});
	}
	gotoBondDetail(){
		console.log(this.activatedRoute.params["value"]);
		if(this.xxx==7){
			this.router.navigate(['../../../../../../../../bond-detial',
				this.routeParams.dstrBondId,
				this.routeParams.issuId,
				this.routeParams.enqrTp
			],{relativeTo:this.activatedRoute});
		}else{
			this.router.navigate(['../../../../bond-detial',
				this.routeParams.dstrBondId,
				this.routeParams.issuId,
				this.routeParams.enqrTp
			],{relativeTo:this.activatedRoute});
		}
	}
	gotoSubscribeDetail(){
		this.router.navigate(['../../../../subscribe-detial',
			this.routeParams.dstrBondId,
			this.routeParams.issuId,
			this.routeParams.enqrTp
		],{relativeTo:this.activatedRoute});
	}
}
