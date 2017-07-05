import { Component,Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
@Component({
	selector: 'alphain-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent{
	@Input()attr_width:string;
	@Input()attr_height:string;
	@Input()resetTrigger:boolean;
	@Input()thumbnail_url:string;
	nail_img:string="";
	file_input:any;
	@Output() fileData = new EventEmitter<any>();
	@Output() fileUrl = new EventEmitter<any>();
	fileChange(input:any,thumbnail:any){
		this.file_input = input;
		if(input.files[0]){
			// debugger;
			this.nail_img = window.URL.createObjectURL(input.files[0]);
			this.fileData.emit(input.files[0]);
			this.fileUrl.emit(this.nail_img);
		}
	}
	reset(){
		this.nail_img="";
		this.file_input && (this.file_input.value="");
	}
	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		//console.log(changes);
		('resetTrigger' in changes) && this.reset();
		('thumbnail_url' in changes) && (this.nail_img = this.thumbnail_url);
	}
}