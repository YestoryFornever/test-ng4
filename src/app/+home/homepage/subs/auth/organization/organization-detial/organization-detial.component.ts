import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router,Params }   from '@angular/router';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
@Component({
	selector: 'organization-detial',
	templateUrl: './organization-detial.component.html',
	styleUrls: ['./organization-detial.component.scss'],
})
export class OrganizationDetialComponent implements OnInit{ 
	ngOnInit(){
			this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];	
		})
		this.option = {
			language: "zh_cn", //配置语言
			placeholderText: "请输入内容", // 文本框提示内容
			charCounterCount: true, // 是否开启统计字数
			// charCounterMax: 200, // 最大输入字数,目前只支持英文字母
			toolbarButtons:['html','|','insertImage'],
			toolbarInline:true,
			toolbarVisibleWithoutSelection:true,
			codeMirror: false, // 高亮显示html代码
			codeMirrorOptions: { // 配置html代码参数
				tabSize: 4
			},
			inlineMode: false,
			height:200,
			pluginsEnabled:['align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons', 'entities', 'file', 'fontFamily', 'fontSize', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quote', 'save', 'table', 'url', 'video', 'wordPaste']
		}
	};
	option:any
	constructor(private changeDetectorRef:ChangeDetectorRef,
		private activatedRoute:ActivatedRoute,
		private sanitizer: DomSanitizer,
		private router:Router){}

	model:any='1'
	demo:any = {
 	 photo:String
	};
	photoFiles: any[] = [];
	photoUrl:string;
	onPhotoUpload(event:any) {
	  this.demo.photo = JSON.parse(event.xhr.response).data.name;
	  this.photoUrl ="upload/demo/"+this.demo.photo;
	    for(let file of event.files) {
	      this.photoFiles.push(file);
	    }
	  }
	news:any=[]
	imgList:any=[]
	fileChange(input:any){
		// debugger
		if(this.news.length>9){
			alert('上传图片已到上限！')
			return false
		}
		this.imgList = input.files
		for(var i=0;i< this.imgList.length;i++){
			if(i<9){
				if(this.imgList[i]){
					var obj:any
					obj= this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.imgList[i]))
		    		// this.news.push(obj)
		    		console.log(obj.changingThisBreaksApplicationSecurity)
		    		this.news.push(obj)
				}
			}
			this.imgList.splice(9)
		}
	}
	deletedImg(index:any){
		this.news.splice(index,1)
		this.imgList.splice(index,1)
	}	
 fileSelected() {
 	var input:any=document.getElementById('fileToUpload')
	  var file = input.files[0];
	  if (file) {
	    var fileSize:any = 0;
	    if (file.size > 1024 * 1024)
	      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
	    else
	      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
	          
	    document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
	    document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
	    document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
  		}
	}
uploadFile() {
  var xhr = new XMLHttpRequest();
  var form:any =  document.getElementById('form1')
  var fd =form.getFormData();

  /* event listners */
  xhr.upload.addEventListener("progress", this.uploadProgress, false);
  xhr.addEventListener("load", this.uploadComplete, false);
  xhr.addEventListener("error", this.uploadFailed, false);
  xhr.addEventListener("abort", this.uploadCanceled, false);
  /* Be sure to change the url below to the url of your upload server side script */
  xhr.open("POST", "UploadMinimal.aspx");
  xhr.send(fd);
}
uploadProgress(evt:any) {
        if (evt.lengthComputable) {
          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
          document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
        }
        else {
          document.getElementById('progressNumber').innerHTML = 'unable to compute';
        }
      }

uploadComplete(evt:any) {
        /* This event is raised when the server send back a response */
        alert(evt.target.responseText);
      }

uploadFailed(evt:any) {
        alert("There was an error attempting to upload the file.");
      }

uploadCanceled(evt:any) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
      }
}