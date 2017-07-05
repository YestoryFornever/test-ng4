import { HomeComponent } from './home.component';
import { CanLoginIn } from 'app.common';

export const routes = [
  { path: '', 
  	component: HomeComponent, 
  	canActivate: [CanLoginIn],
  	children: [
	    { path: 'iframe', loadChildren: './+iframe#IframeModule' },
	    { 
	    	path: 'user', 
	    	loadChildren: './+user#UserModule', 
	    	data: {preload: false},
	    	events: {
	    		'NavigationStart': function(){
	    			console.log('NavigationStart');
	    		},
	    	},
	    },
	    { path: 'crm', loadChildren: './+crm/crm.module.ts#CrmModule' },
			{ path: 'system', loadChildren: './+system/system.module#SystemModule'},
	    { path: 'homepage', loadChildren: './homepage/homepage.module.ts#HomepageModule' },
	  ]
	},
];
