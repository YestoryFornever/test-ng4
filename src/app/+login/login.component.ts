import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { 
	UserAuthService,
	NetUserService
 } from '../common';

@Component({
	selector: 'alphain-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit { 
	public hasError: boolean = false;
	public errorMsg: string = '用户名或密码错误';
	public loginName: string;
	public loginPassword: string;
	constructor( 
		private router: Router, 
		public UserAuthService:UserAuthService
	){}
	ngOnInit() {
		
	};

	public submit(form){
		console.log(form, this.loginName);
		this.UserAuthService.loginAuthc(this.loginName, this.loginPassword)
		.then((res)=>{
			this.hasError = false;
			this.router.navigate(['/home']);
		}).catch((err:any)=>{
			this.hasError = true;
			this.errorMsg = err.msg;
			console.log(err);
		});
	}
}