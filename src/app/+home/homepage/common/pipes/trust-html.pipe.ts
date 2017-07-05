import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'trusthtml'
})
export class TrustHtmlPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}
	transform(url:string) {
		return this.sanitizer.bypassSecurityTrustHtml(url);
	}
}