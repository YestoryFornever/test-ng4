import {INCONFIG} from '../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}

@Injectable()

export class CustomerManageService {
	    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
	private UserMsgeUrl = 'app/userMsges';
	// private UserMsgeUrl = 'http://11.177.50.137:8080/e_project_manager/authority/register/registerUser';

	constructor (private http: Http) {}
//获取公司列表
    OrganizationList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/getOrganizationList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
                        .map(this.ExtractResult)
                        .catch(this.HandleError);
    }
//获取部门列表
    DepartmentList(obj:Object):Observable<any>{
        let url = this.IP+'back/authority/getDepartmentList';
        let ser = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
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

// 4.1.1客户经理列表
	queryAllEmployment(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/employment/queryAllEmployment"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.2查看已机构分配
	queryAllocatedOrgList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/organization/queryAllocatedOrgList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.x移除某个员工下面的部分机构 
	removeOrgList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/organization/removeOrgList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.3新分配机构查询机构列表  (｡•ˇ‸ˇ•｡)
	queryNotAllocatedOrgList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/organization/queryNotAllocatedOrgList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.4保存机构分配
	addAllocate(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/organization/addAllocate"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.5联系人列表信息  (｡•ˇ‸ˇ•｡)
	queryContactList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/contact/queryContactList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.6联系人姓名模糊查询
	queryContactNameByLike(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/contact/queryContactNameByLike"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.7联系人删除操作
	deleteContact(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/contact/deleteContact"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.8查询单个联系人
	querySingleContact(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/contact/querySingleContact"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.9修改联系人
	updateSingleContact(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/contact/updateSingleContact"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.10行动列表查询
	searchActionList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/action/searchActionList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.11 行动列表查询 –取得所有客户经理接口    
	queryAllStaff(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/employment/queryAllStaff"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}	
// 4.1.12行动详情-行动记录    
	getBaseActionInfo(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/action/getBaseActionInfo"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}	
	
// 4.1.13 行动详情 – 文字记录 
	getActionRecordText(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/actionRecord/getActionRecordText"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}	

// 4.1.14	行动详情-图片记录
	getPictureByActionId(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/actionRecord/getPictureByActionId"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.15	用户组列表
	getGroupList(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/customerGroup/getGroupList"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.17	父级数据来源
	getAvailableGroup(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/customerGroup/getAvailableGroup"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.17	管理员数据来源
	getAvailableUser(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/customerGroup/allowAllocatedUser"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.18	添加用户组
	addCustomerGroup(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/customerGroup/addCustomerGroup"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.19	修改用户组
	editGroup(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/customerGroup/editGroup"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.20	分配初始化
	multipleAllocateInit(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/organization/multipleAllocateInit"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.21	分配查询
	multipleAllocateQuery(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/organization/multipleAllocateQuery"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
// 4.1.21	分配查询
	duplicateName(obj:Object):Observable<any>{
		let data = JSON.stringify(obj);
		let Url =this.IP+"crm/customerGroup/duplicateName"
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http.post(Url, data, options)
						.map(this.ExtractResult)
						.catch(this.HandleError);
	}
}