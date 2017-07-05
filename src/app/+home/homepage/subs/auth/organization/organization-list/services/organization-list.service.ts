import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Organization, OrgCondition } from '../classes/organizations';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class OrganizationListService {
	private IP:string = INCONFIG.getIP()
	private JH:Headers = INCONFIG.setLidHeaders();
	private FDH:Headers = INCONFIG.FormDataHeaders;
	private ExtractData = INCONFIG.extractData();
	private ExtractResult = INCONFIG.extractResult();
	private HandleError = INCONFIG.handleError();

	constructor (private http: Http) {}

	getOrganizations (orgCondition:OrgCondition): Observable<Organization[]> {
		// debugger;
		let url = this.IP+'back/authority/queryOrganizationList';
		let body = JSON.stringify({
			'organizationFullName':orgCondition.fullname,
			'organizationShortName':orgCondition.abbreviation,
			'organizationCategoryId1':orgCondition.c1,
			'organizationCategoryId2':orgCondition.c2,
			'organizationStatus':orgCondition.approveStatus,
			'ifFinancialInstitution':orgCondition.isFinancial,
			'ifBondsInstitution':orgCondition.isBonds,
			'internationClassifyId1':orgCondition.ic1,
			'internationClassifyId2':orgCondition.ic2,
			'enterpriseNature':orgCondition.enterpriseNature,
			'sortType':'asc',
			'orderBy':'',
			'pageNum':orgCondition.currentPage,
			'pageSize':orgCondition.itemsPerPage
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}

	addOrganization(org:Organization):Observable<any>{
		// debugger;
		let url = this.IP+'back/authority/addOrganization';
		var fd = new FormData();
		fd.append('organizationFullName',org.fullname);
		fd.append('organizationShortName',org.abbreviation);
		fd.append('organizationCategoryId1',org.c1id);
		fd.append('organizationCategoryId2',org.c2id);
		fd.append('province',org.province);
		fd.append('city',org.city);//org.address);
		fd.append('detailedAddress',org.address_detail);
		fd.append('postcode',org.address_code);
		fd.append('switchboard',org.phone);
		fd.append('ifFinancialInstitution',org.isFinancial);
		fd.append('ifBondsInstitution',org.isBonds);
		fd.append('logoPicture',org.logo?org.logo.files[0]:org.logo);
		fd.append('remark',org.backup);
		fd.append('issuerId',org.issuerId);
		fd.append('issuerShortName',org.issuerShortName);
		fd.append('internationClassifyId1',org.ic1id);
		fd.append('internationClassifyId2',org.ic2id);
		fd.append('enterpriseNature',org.enterpriseNature);
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		return this.http
			.post(url, fd, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

	editOrganization(org:Organization):Observable<any>{
		let url = this.IP+'back/authority/updateOrganization';
		var fd = new FormData();
		fd.append('organizationId',org.id);
		fd.append('organizationFullName',org.fullname);
		fd.append('organizationShortName',org.abbreviation);
		fd.append('organizationCategoryId1',org.c1id);
		fd.append('organizationCategoryId2',org.c2id);
		fd.append('province',org.province);
		fd.append('city',org.city);
		fd.append('detailedAddress',org.address_detail);
		fd.append('postcode',org.address_code);
		fd.append('switchboard',org.phone);
		fd.append('ifFinancialInstitution',org.isFinancial);
		fd.append('ifBondsInstitution',org.isBonds);
		fd.append('logoPicture',org.logo?org.logo.files[0]:org.logo);
		fd.append('remark',org.backup);
		fd.append('issuerId',org.issuerId);
		fd.append('issuerShortName',org.issuerShortName);
		fd.append('internationClassifyId1',org.ic1id);
		fd.append('internationClassifyId2',org.ic2id);
		fd.append('enterpriseNature',org.enterpriseNature);
		let headers = INCONFIG.setLidHeaders();
		headers.delete('Content-Type');
		let options = new RequestOptions({headers: headers});
		return this.http
			.post(url, fd, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

	getOrgCate(key:string):Observable<any>{
		let url = this.IP+'back/authority/getOrganizationCategoryList';
		let body = JSON.stringify({
			'categoryParentId':key
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
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

	updateStatus(org:Organization):Observable<any>{
		// debugger;
		let url = this.IP+'back/authority/updateOrganizationStatus';
		let body = JSON.stringify({
			'organizationId':org.id,
			'organizationStatus':org.approveStatus
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

	getDeps(org:Organization):Observable<any>{
		let url = this.IP+'back/authority/getDepartmentOfOrgList';
		let body = JSON.stringify({
			'organizationId':org.id
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}

	getOrgFullName(val:string):Observable<any>{
		let url = this.IP+'back/authority/getOrganizationListByFullName';
		let body = JSON.stringify({
			'value':val
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}

	getOrgAbbr(val:string):Observable<any>{
		let url = this.IP+'back/authority/getOrganizationListByShortName';
		let body = JSON.stringify({
			'value':val
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}

	getOrgIssuer(val:string):Observable<any>{
		let url = this.IP+'back/authority/getIssuerListByShortName';
		let body = JSON.stringify({
			'value':val
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}

	issuerExcel():Observable<any>{
		let url = this.IP+'back/authority/exportIssuerExceptionData';
		let body = JSON.stringify({});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractData)
			.catch(this.HandleError);
	}	
	updateOrgInstitutionData(key:string):Observable<any>{
		let url = this.IP+'back/authority/updateOrgInstitutionData';
		let body = JSON.stringify({
			'categoryParentId':key
		});
		let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
		return this.http
			.post(url, body, options)
			.map(this.ExtractResult)
			.catch(this.HandleError);
	}

	
}
