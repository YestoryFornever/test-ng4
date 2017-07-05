import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NavMapService } from './services/nav-map.service';
import {INCONFIG} from '../../../../../../public/in.config';

@Component({
	selector: 'alphain-nav-map',
	templateUrl: './nav-map.component.html',
	styleUrls: ['./nav-map.component.scss'],
	providers: [NavMapService]
})
export class NavMapComponent implements OnInit {
	constructor(
		private navMapService:NavMapService,
		private router:Router,
		private activatedRoute:ActivatedRoute
	){}
	private isProd = INCONFIG.prod;
	@Output() updataDyNav = new EventEmitter<string>();
	ngOnInit() {
		this.getNavMap();
	}
	errorMsg:string;
	navMap:any;
	getNavMap(){
		if(this.isProd==false){
			this.navMap = this.navMapService.extractData()
			this.navMap = this.navMap.map(function(item:any,index:any){
						switch(item.label){
							case "工作台":item.iconId="bench";break;
							case "内容管理":item.iconId="content-manage";break;
							case "用户管理":item.iconId="authority-manage";break;
							case "系统管理":item.iconId="system-manage";break;
							case "业务管理":item.iconId='business-manage';break;
						}
						return item;
					});
			return false
		}
		this.navMapService.getNavMap()
			.subscribe(
				navmap => {
					this.navMap = navmap.map(function(item:any,index:any){
						switch(item.label){
							case "工作台":item.iconId="bench";break;
							case "内容管理":item.iconId="content-manage";break;
							case "用户管理":item.iconId="authority-manage";break;
							case "系统管理":item.iconId="system-manage";break;
							case "业务管理":item.iconId='business-manage';break;
						}
						return item;
					});
				},
				error => this.errorMsg = <any>error
			);
	}
	navTo(target:any){
		this.router.navigate([target.routerlink],{relativeTo:this.activatedRoute});
		//this.updataDyNav.emit("1"); 更新侧导航
	}
}