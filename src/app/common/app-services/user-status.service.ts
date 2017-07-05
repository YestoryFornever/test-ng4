import { Injectable } from "@angular/core";

import { StorageService } from './storage.service';
//为了兼容旧代码所以引入并修改
import { INCONFIG } from '../../../public/in.config';

@Injectable()
export class UserStatusService {
	constructor(
		private StorageService:StorageService
	) {
		var userinfo = this.StorageService.get('USERINFO');
		this.setUserInfo(userinfo||{});
	}
	public lid:string = null;
	public uid:string = null;
	public userName:string = null;
	public detail:Object = {};
	public customsImId: number;//客服对应环信ID
	
	setUserInfo(userinfo){
		this.lid = userinfo.sessionId;
		this.uid = userinfo.id;
		this.userName = userinfo.loginName || '游客';
		this.StorageService.set('USERINFO', userinfo);
		if(userinfo.otherInfo){
			this.customsImId = userinfo.otherInfo.customsImId;
		}
		//为了兼容旧代码所以引入并修改
		INCONFIG.setUserInfo(userinfo);
		console.log('setUserInfo:',this,INCONFIG.getUserInfo());
		return userinfo;
	}
	clear() {
		this.StorageService.clear();
		this.lid = null;
		this.uid = null;
		this.userName = null;
		this.detail = {};
		this.customsImId = null;
		return true;
	}
}