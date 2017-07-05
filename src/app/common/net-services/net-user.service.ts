import { Injectable } from "@angular/core";
import { ProxyRequestService } from '../app-services';

import "rxjs/add/operator/map";
@Injectable()

export class NetUserService {
    constructor(public proxy:ProxyRequestService) {

    }
    /**
     * 登录验证
     * @param {[type]} loginName     [description]
     * @param {[type]} loginPassword [description]
     */
    public loginAuthc(data:any){
        return this.proxy.post('emanager/loginAuthc', {
            loginName: data.loginName,
            loginPassword: data.loginPassword,
            loginTerminalType: 10, //WEB端为10
            isCarryOn: 1, // 强制登录
        });
    }

     //----------- 获取菜单 ----------
    getMenuList(obj?:Object){
        return this.proxy.post('emanager/security/menu/getMenuList', obj)
        .then(res=> {
            return res
        });
    } 
 //********************* 机构相关 **********************

     //----------- 4.4.1获取机构状态 ----------
    getOrgStateList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgStateList', obj)
        .then(res=> {
            return res
        });
    } 
      //-----------4.4.2获取省列表 ----------
    getProviceList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getProviceList', obj)
        .then(res=> {
            return res
        });
    } 
      //-----------4.4.3获取市列表 ----------
    getCityList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getCityList', obj)
        .then(res=> {
            return res
        });
    } 
      //----------- 4.4.4获取机构分类列表 ----------
    queryOrganizitonCategoryList(obj?:Object){
        return this.proxy.post('emanager/back/authority/queryOrganizitonCategoryList', obj)
        .then(res=> {
            return res
        });
    } 
      //-----------4.4.5获取机构分类1列表----------
    getOrgCategory1List(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgCategory1List', obj)
        .then(res=> {
            return res
        });
    } 
        //-----------4.4.6获取机构分类2列表----------
    getOrgCategory2List(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgCategory2List', obj)
        .then(res=> {
            return res
        });
    } 
        //-----------4.4.7获取国标分类列表1级----------
    getInternationClass1List(obj?:Object){
        return this.proxy.post('emanager/back/authority/getInternationClass1List', obj)
        .then(res=> {
            return res
        });
    } 
        // -----------4.4.8获取国标分类列表2级----------
    getInternationClass2List(obj?:Object){
        return this.proxy.post('emanager/back/authority/getInternationClass2List', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.9获取企业性质列表----------
    getEnterpristNatureList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getEnterpristNatureList', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.10获取目标用户机构列表----------
    getObjUserOrgList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getObjUserOrgList', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------获取机构全称列表---------
    getOrganizationListByFullName(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrganizationListByFullName', obj)
        .then(res=> {
            return res
        });
    } 
             //-----------获取机构简称列表---------
    getOrganizationListByShortName(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrganizationListByShortName', obj)
        .then(res=> {
            return res
        });
    } 
          //----------4.4.11获取发债机构列表----------
    getBondOrgList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getBondOrgList', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.12获取外汇交易中心成员列表----------
    getCfetsOrgList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getCfetsOrgList', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.13获取承分销资质列表----------
    getDistributorOrgList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getDistributorOrgList', obj)
        .then(res=> {
            return res
        });
    } 
          //----------4.4.14获取评级机构列表 ----------
    getRatingOrgList(obj?:Object){
        return this.proxy.post('emanager/back/authority/getRatingOrgList', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.15机构删除----------
    deleteOrg(obj?:Object){
        return this.proxy.post('emanager/back/authority/deleteOrg', obj)
        .then(res=> {
            return res
        });
    } 
        //----------4.4.16修改机构状态----------
    modifyOrgState(obj?:Object){
        return this.proxy.post('emanager/back/authority/modifyOrgState', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.17获取机构基本信息----------
    getOrgBase(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgBase', obj)
        .then(res=> {
            return res
        });
    } 
   
          //-----------4.4.18获取目标用户机构---------
    getOrgUser(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgUser', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.19获取机构承分销资质----------
    getOrgQualifiDistributor(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgQualifiDistributor', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.20获取外汇交易中心成员机构----------
    getOrgCfets(obj?:Object){
        return this.proxy.post('emanager/back/authority/getOrgCfets', obj)
        .then(res=> {
            return res
        });
    } 
          //----------4.4.21修改机构全称----------
    modifyOrgFullName(obj?:Object){
        return this.proxy.post('emanager/back/authority/modifyOrgFullName', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.22修改目标用户机构----------
    modifyOrgUser(obj?:Object){
        return this.proxy.post('emanager/back/authority/modifyOrgUser', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.23修改机构承分销资质----------
    modifyOrgQualifiDistributor(obj?:Object){
        return this.proxy.post('emanager/back/authority/modifyOrgQualifiDistributor', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.24修改机构基本信息----------
    modifyOrgBase(obj?:Object){
        return this.proxy.post('emanager/back/authority/modifyOrgBase', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.25添加目标用户机构----------
    addOrgUser(obj?:Object){
        return this.proxy.post('emanager/back/authority/addOrgUser', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.26添加机构承分销资质----------
    addOrgQualifiDistributor(obj?:Object){
        return this.proxy.post('emanager/back/authority/addOrgQualifiDistributor', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.27导入外汇交易中心成员机构（提交验证）----------
    importOrgCfets(obj?:Object){
        return this.proxy.post('emanager/back/authority/importOrgCfets', obj)
        .then(res=> {
            return res
        });
    } 
          //-----------4.4.28导入外汇交易中心成员机构（保存）----------
    saveOrgCfets(obj?:Object){
        return this.proxy.post('emanager/back/authority/saveOrgCfets', obj)
        .then(res=> {
            return res
        });
    } 
          //----------4.4.29同步发债机构----------
    syncBondOrg(obj?:Object){
        return this.proxy.post('emanager/back/authority/syncBondOrg', obj)
        .then(res=> {
            return res
        });
    } 

}