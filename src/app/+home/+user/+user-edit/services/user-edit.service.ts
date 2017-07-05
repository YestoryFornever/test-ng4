import {INCONFIG} from '../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { User }           from '../classes/user-edit';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserEditService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}

	getUser (id:any): Observable<any> {
		console.log("id:="+id);
		let url = this.IP+'back/authority/getUserDetail';
		let body = JSON.stringify({
			'userId':""+id
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractData)
						.catch(this.HandleError);
	}

	addUser(user:User): Observable<any> {
		// debugger;
		//http://stackoverflow.com/questions/37174759/how-do-you-post-a-formdata-object-in-angular-2
		
		var formdata = new FormData();
		if(user.referrerid==undefined||user.referrerid=='undefined'){
			user.referrerid=''
		}
		formdata.append('loginName',user.phone);
		formdata.append('headPicture',user.head_thumbnail);
		formdata.append('userName',user.name);
		formdata.append('organizationName',user.company);
		formdata.append('departmentName',user.department);
		formdata.append('position',user.position);
		formdata.append('contactPhone',user.contact);
		formdata.append('workPhone',user.work_contact);
		formdata.append('companyMail',user.mail);
		formdata.append('workAddress',user.work_address);
		formdata.append('nickName',user.nickname);
		formdata.append('gender',user.sex);
		formdata.append('organizationId',user.companyId)
		formdata.append('bTwoCardPicture',user.info_card);
		user.birthday && (formdata.append('birthday',(user.birthday).getTime()));
		formdata.append('hometown',user.home_address);
		formdata.append('qqId',user.qq_num);
		formdata.append('weChatId',user.wechat_num);
		formdata.append('referralCode',user.referrerid);
		formdata.append('bCardPicture',user.name_card);
		formdata.append('userStatus',user.userStatus);//待删除
		formdata.append('realNameAStatus',user.approveStatus);//待删除
		formdata.append('mailAStatus',user.mailModel);
		formdata.append('visitStatus',user.visitModel);
		formdata.append('userRemark',user.backup);
		if(user.userType){
			formdata.append('userType',user.userType);
		}
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		let url = this.IP+'authority/register/registerUser';
		return this.http.post(url, formdata, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

	editUser(user:User): Observable<any> {
		// debugger;
		if(!user.referrerid){
			user.referrerid=''
		}
		if(user.referrerid==undefined||user.referrerid=='undefined'){
			user.referrerid=''
		}
		var formdata = new FormData();
		formdata.append('userId',user.id);
		formdata.append('loginName',user.phone);
		formdata.append('headPicture',user.head_thumbnail);
		formdata.append('userName',user.name);
		formdata.append('organizationName',user.company);
		formdata.append('departmentName',user.department);
		formdata.append('position',user.position);
		formdata.append('contactPhone',user.contact);
		formdata.append('workPhone',user.work_contact);
		formdata.append('companyMail',user.mail);
		formdata.append('workAddress',user.work_address);
		formdata.append('nickName',user.nickname);
		formdata.append('gender',user.sex);
		formdata.append('organizationId',user.companyId)
		user.birthday && (formdata.append('birthday',(user.birthday).getTime()));
		formdata.append('hometown',user.home_address);
		formdata.append('qqId',user.qq_num);
		formdata.append('weChatId',user.wechat_num);
		formdata.append('referralUserId',user.referrerid);
		formdata.append('bCardPicture',user.name_card);
		formdata.append('bTwoCardPicture',user.info_card);
		formdata.append('userStatus',user.userStatus);//待删除
		formdata.append('realCertifyStatus',user.approveStatus);//待删除
		formdata.append('emailCertifyStatus',user.mailModel);
		formdata.append('visitStatus',user.visitModel);//待删除
		formdata.append('userRemark',user.backup);
		if(user.userType){
			formdata.append('userType',user.userType);
		}
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		let url = this.IP+ 'authority/register/updateRegisterUser';
		return this.http.post(url, formdata, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

	resetPassword(userId:string){
		let url = this.IP+'authority/register/resetLoginPassword';
		let body = JSON.stringify({
			'userId':userId
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

	getOrgs(): Observable<any[]> {
		let url = this.IP+'back/authority/getOrganizationList';
		let body = JSON.stringify(null);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractData)
						.catch(this.HandleError);
	}

	getDeps(): Observable<any[]> {
		let url = this.IP+'back/authority/getDepartmentList';
		let body = JSON.stringify(null);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractData)
						.catch(this.HandleError);
	}

	getReferrer(phonenum:string){
		let url = this.IP+'authority/register/getRecommendedAccountID';
		let body = JSON.stringify({
			'loginName':phonenum
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractData)
						.catch(this.HandleError);
	}
	
	checkAccont(phone:string){
		let url = this.IP+'authority/register/getRegisterAccount';
		let body = JSON.stringify({
			'loginName':phone
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	getOrgListByShortName(phone:string){
		let url = this.IP+'back/authority/getOrganizationListByShortName';
		let body = JSON.stringify(phone);
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(url, body, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
	UploadBusinessCardAnalysis(obj:any){
		var formdata = new FormData();
		if(obj.bTwoCardPicture){
			formdata.append('bTwoCardPicture',obj.bTwoCardPicture);
		}
		if(obj.bCardUrl){
			formdata.append('bCardUrl',obj.bCardUrl);
		}
		let url = this.IP+'back/authority/UploadBusinessCardAnalysis';
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		return this.http.post(url, formdata, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}

	//获取机构分类
	getOrgCate(key:string):Observable<any>{
		let url = this.IP+'back/authority/getOrganizationCategoryList';
		let body = JSON.stringify({
			'categoryParentId':key
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
	getOrgInCate(key:string):Observable<any>{
		let url = this.IP+'back/authority/getListByParentId';
		let body = JSON.stringify({
			'parentId':key
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}

	addOrganization(obj:any):Observable<any>{
		let url = this.IP+'back/authority/addOrganization';
		var formdata = new FormData();
		formdata.append('city',obj.city);
		formdata.append('detailedAddress',obj.detailedAddress);
		formdata.append('organizationCategoryId1',obj.organizationCategoryId1);
		formdata.append('organizationCategoryId2',obj.organizationCategoryId2);
		formdata.append('organizationFullName',obj.organizationFullName);
		formdata.append('organizationShortName',obj.organizationShortName);
		formdata.append('ifBondsInstitution',obj.ifBondsInstitution);
		formdata.append('ifFinancialInstitution',obj.ifFinancialInstitution);
		formdata.append('province',obj.province);
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		return this.http
			.post(url, formdata, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}
		// 模糊查询机构

 getOrganizationListByShortName(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/getOrgListByShortName';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
}