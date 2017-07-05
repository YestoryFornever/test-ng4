/**
 * 存储服务
 */
import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
	constructor() {
		
	}
	public set(key, value){
		value = JSON.stringify([value]);
		return window.sessionStorage[key] = value;
	}
	
	public get(key){
		var value = window.sessionStorage[key];
		if (value) {
			value = JSON.parse(value);
		};
		
		return (value && value[0])?value[0]:null;
	}

	public clear(){
		window.sessionStorage.clear();
	}

}
