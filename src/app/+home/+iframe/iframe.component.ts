import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router ,Params}   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import $ from '$';

@Component({
  selector: 'ngIframe',
  template:`<div id="iframe"><iframe [src]="url"></iframe></div>`,
  styleUrls: ['./iframe.scss'],
})
export class IframeComponent implements OnInit {
	constructor(
    private activatedRoute:ActivatedRoute,
    public sanitizer: DomSanitizer
  ){}

  public url:any;
  public params:any;

  public ngOnInit() {
  	this.activatedRoute.queryParams.forEach((param)=>{
  		this.params = param;
  		this.url = this.sanitizer.bypassSecurityTrustResourceUrl('/emanager/#/'+this.params['url']);
  	});
  	
    console.log('hello IframeComponent', this.params);
  }

}
