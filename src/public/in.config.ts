import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiDomain } from 'app.config';

export const INCONFIG = {
	prod: false,
	newId:'',
	webAppName:"emanager",
	getIP(){
		return this.prod?"":PRIVATECONFIG.ip;
	},
	getIPWithOutE(){
		return this.newId=ApiDomain
	},
	JsonHeaders: new Headers({ 'Content-Type': 'application/json' }),
	setLidHeaders(){
		return new Headers({ 'Content-Type': 'application/json','lid':PRIVATECONFIG.USERINFO.sessionId})
	},
	FormDataHeaders: new Headers({}),
	extractData() {
		let prod = this.prod;
		let webAppName = this.webAppName;
		return function(res: Response){
			let body = res.json();
			if(!prod){
				body.status==="0"?console.info(`${body.status}:${body.msg}`):console.warn(`${body.status}:${body.msg}`);
			}
			if(body.status==="-5" || body.status==990002){
				window.location.href = window.location.origin+window.location.pathname+'#/login?relogin=true';
			}else{
				return body.data || { };
			}
		}
	},
	extractResult() {
		let prod = this.prod;
		let webAppName = this.webAppName;
		return function(res: Response){
			let body = res.json();
			if(!prod){
				body.status==="0"?console.info(`${body.status}:${body.msg}`):console.warn(`${body.status}:${body.msg}`);
			}
			if(body.status==="-5" || body.status==990002){
				window.location.href = window.location.origin+window.location.pathname+'#/login?relogin=true';
			}else{
				return body || { };
			}
		}
	},
	handleError() {
		return function(error: any){
			let errMsg = (error.message) ? error.message :
				error.status ? `${error.status} - ${error.statusText}` : 'Server error';
			console.error(errMsg); // log to console instead
			return Observable.throw(errMsg);
		}
	},
	// getRoute(){
	// 	let jsroute = document.getElementById("jsroute")["value"];
	// 	return (jsroute == "null" || !this.prod) ? "homepage" : jsroute;
	// },
	getUserInfo(){
		return PRIVATECONFIG.USERINFO;
	},
	setUserInfo(obj:any){
		PRIVATECONFIG.USERINFO = obj;
		this.JsonHeaders = new Headers({ 'Content-Type': 'application/json','lid':PRIVATECONFIG.USERINFO.sessionId});
	}
}
export const PRIVATECONFIG = {
	ip: ApiDomain+"emanager/",

	//ip:"http://11.177.50.51:8080/emanager/",//jf
	//ip:"http://11.177.50.66:8080/emanager/",//zx
	//ip:"http://11.177.50.73:8080/emanager/",//wjy
	// ip:"http://11.177.50.63:9999/emanager/",//yh
	// ip:"http://11.177.50.70:9999/emanager/",//dl
	
	USERINFO: {
		id:102801,
		loginName:"admin",
		loginPassword:"",
		loginTime:1492740147976,
		qualifiedName:"admin/Administrator",
		sessionId:"54bf7a9d-6c4e-4c3f-a718-6f742daa0021",
		status:0,
		userName:"Administrator"
	}
}