import { Component, OnInit, OnDestroy, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { NavDynamic,Nav } from './classes/nav-dynamic';

import { NavDynamicService } from './services/nav-dynamic.service';

@Component({
	selector: 'alphain-nav-dynamic',
	templateUrl: './nav-dynamic.component.html',
	styleUrls: ['./nav-dynamic.component.scss'],
	providers: [NavDynamicService]
})
export class NavDynamicComponent implements OnInit,OnDestroy {
	nav_ul:string;
	nav_lis:Nav[];
	nav_bool:boolean;
	navDynamic:NavDynamic;
	@Input() currentDyNav:string;
	@Output() ifshowDyNav = new EventEmitter<boolean>();

	getNavs():void{
		this.navDynamicService.getNavs().subscribe(function(data:NavDynamic){
			this.navDynamic = data;
			this.nav_ul = this.navDynamic.group;
			this.nav_lis = this.navDynamic.items;
			this.nav_bool = this.navDynamic.showNavDynamic;
			this.ifshowDyNav.emit(this.nav_bool);
		}.bind(this));
	}
	getMockNavs():void{
		let data = this.navDynamicService.getMockNavs();
		this.nav_ul = data.group;
		this.nav_lis = data.items;
		this.nav_bool = data.showNavDynamic;
		this.ifshowDyNav.emit(this.nav_bool);
	}

	constructor(private navDynamicService:NavDynamicService){}

	ngOnInit() {
		this.getMockNavs();
	}
	ngOnDestroy(){
		
	}
	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		//console.log(changes);
		//debugger;
		if('currentDyNav' in changes){
			//console.log(this.currentDyNav);
		}
	}
}