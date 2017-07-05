import {INCONFIG} from '../../../../../../../../public/in.config';
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { PermissionGroups } from '../classes/permission-groups';

import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
// import {}

@Injectable()
export class PermissionService {
    private IP:string = INCONFIG.getIP()
    private JH:Headers = INCONFIG.setLidHeaders();
    private FDH:Headers = INCONFIG.FormDataHeaders;
    private ExtractResult = INCONFIG.extractResult();
    private extractData = INCONFIG.extractData();
    private HandleError = INCONFIG.handleError();
    constructor (private http: Http ) { }
    // 添加权限分组
    addPermiGroup(obj:Object){
        // debugger;
        let url=this.IP+"security/permissiongroup/add";
        let ser=JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }
// 编辑权限分组
   editPermiGroup(obj:Object){
        let url=this.IP+"security/permissiongroup/update";
        let ser=JSON.stringify(obj);
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }

// 查询授权分组列表
getPermiGroup(obj:Object){
    // debugger;
   let url=this.IP+"security/permissiongroup/queryList";
   let ser=JSON.stringify(obj);
   // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
   let headers = new Headers({ 'Content-Type': 'application/json' });
   let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
   return this.http.post(url, ser, options)
       .map(this.ExtractResult)
       .catch(this.HandleError);
}
// 删除权限分组
deletPermis(obj:Object){
    // debugger;
    let url=this.IP+"security/permissiongroup/delete";
    let ser=JSON.stringify(obj);
    // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
    return this.http.post(url, ser, options)
        .map(this.ExtractResult)
        .catch(this.HandleError);
}

// 复制权限分组
copyPermissiongroup(obj:Object){

    let url=this.IP+"security/permissiongroup/copy";
    let ser=JSON.stringify(obj);
    // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
    return this.http.post(url, ser, options)
        .map(this.ExtractResult)
        .catch(this.HandleError);
}
// 获取权限分组菜单l列表
//     getMenusPermissiongroup(obj:Object){
//
//         let url=this.IP+"security/menu/getMenus";
//         let ser=JSON.stringify(obj);
//         // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
//         let headers = new Headers({ 'Content-Type': 'application/json' });
//         let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
//         return this.http.post(url, ser, options)
//             .map(this.ExtractResult)
//             .catch(this.HandleError);
//     }
// 获取具体权限分组菜单（个人）
    getMenus(obj:Object){
        // debugger;
        let url=this.IP+"security/permissiongroup/getMenus";
        let ser=JSON.stringify(obj);
        // console.log(ser)
        // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }
// 更新权限分组
    updateMenus(obj:Object){
        // debugger;
        let url=this.IP+"security/permissiongroup/updateMenus";
        let ser=JSON.stringify(obj);
        // let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: INCONFIG.setLidHeaders()});
        return this.http.post(url, ser, options)
            .map(this.ExtractResult)
            .catch(this.HandleError);
    }



}
