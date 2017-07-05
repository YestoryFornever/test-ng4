import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NetUserService } from '../net-services';
import { UserStatusService } from './user-status.service';
@Injectable()
export class UserAuthService {
	constructor(
		public NetUserService: NetUserService,
		public UserStatusService: UserStatusService
	) {
		
	}
	/**
	 * 登录验证
	 */
	public loginAuthc(loginName:string, loginPassword:string){
		return this.NetUserService.loginAuthc({
			loginName: loginName, 
			loginPassword: loginPassword
		}).then((res)=>{
			this.UserStatusService.setUserInfo(res['data']);
      console.log('登录成功：',res, this.UserStatusService);
			return res;
		});
	}
  public logout(){
    this.UserStatusService.clear();
  }
}

@Injectable()
export class CanLoginIn implements CanActivate {
    constructor(
        private currentRoute: ActivatedRoute,
        private router: Router,
        public UserStatusService: UserStatusService,
    ) { }
    canActivate(nextRoute: ActivatedRouteSnapshot, nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        //this.currentRoute vs nextRoute some logiz 
        let nextUrl = nextState.url;
        let currentUrl = this.router.url;       
        return new Promise<Boolean>((resolve, reject) => {
          console.log('CanLoginIn:',this.UserStatusService);
        	if(this.UserStatusService.lid) {
        		resolve(true);
        	}else{
        		this.router.navigate(['/login']); //未登录调到登录页
        		resolve(true);
        	}
        });
    }
}