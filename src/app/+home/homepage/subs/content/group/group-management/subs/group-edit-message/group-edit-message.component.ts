import { Component, ViewChild,OnInit,trigger,state,style,transition,animate,ChangeDetectorRef } from '@angular/core';
import {NgStyle} from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, Params }   from '@angular/router';//
import { FormControl, FormGroup,NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { GroupEditMessageService } from './services/group-edit-message.service'
@Component({
    selector: 'group-edit-message',
    templateUrl: './group-edit-message.component.html',
    styleUrls: ['./group-edit-message.component.scss'],
    providers: [
       GroupEditMessageService     
    ] 
})
export class GroupEditMessageComponent implements OnInit{ 
    phone:any='';
    color = '#fff';
    height = '312px';
    groupEditkList:any;
    errorMessage: string;
    msgNumber:any;
    groupGrpid:any;
    groupeditMessage:any={};
    groupEditkupdateList:any;
    inputfile:any;
    editgroupmessage:NgForm;
    @ViewChild('editgroupmessage') currentForm:NgForm;
//注册服务
 constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private groupEditMessageService:GroupEditMessageService,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    ){}

 //初始化
    ngOnInit(){
        this.activatedRoute.params.forEach((params:Params)=>{
            let groupGrpid = params['groupid'];
            this.groupGrpid=groupGrpid;
            this.posteditListMsge();
        });
       

    }
//http
posteditListMsge(){
    this.groupEditMessageService.posteditListMsge({groupGrpid:this.groupGrpid})
        .subscribe(
            groupEditkList =>{
                if(groupEditkList.status==0){
                    this.groupeditMessage=groupEditkList.data.list[0]; 
                    console.log(this.groupeditMessage)

                }else{
                     if(groupEditkList){
                       alert(groupEditkList.msg);
                    }
                  
                }
                             
            },
            error => this.errorMessage = <any>error
        );         
};
// 去空格
  trim(str:any) { //删除左右两端的空格　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }
editgrouplist(self:any,ty:any,file_input:any){ 
    if(ty.checked==true){
        this.groupeditMessage.groupTp='1';
    }else{
        this.groupeditMessage.groupTp='0';
    }
    this.groupeditMessage.groupGrpNm=this.trim(this.groupeditMessage.groupGrpNm);
    this.groupeditMessage.groupDsc=this.trim(this.groupeditMessage.groupDsc);
   var  fd= new FormData();
    fd.append('groupGrpid',this.groupeditMessage.groupGrpid);
    fd.append('groupGrpNm',this.groupeditMessage.groupGrpNm);
    fd.append('groupDsc',this.groupeditMessage.groupDsc);
    fd.append('groupTp',this.groupeditMessage.groupTp);
    fd.append('groupHead',file_input.files[0]);
    console.log(this.groupeditMessage.groupTp);

    self.disabled=true;
    this.groupEditMessageService.postupdateEditMsge(fd)
        .subscribe(
            groupEditkupdateList =>{
                if(groupEditkupdateList.status==0){
                    this.router.navigate(['../../group-check',this.groupeditMessage.groupGrpid],{relativeTo:this.activatedRoute}); 
                    self.disabled=false;
                }else{
                     if(groupEditkupdateList){
                       alert(groupEditkupdateList.msg);
                    }
                  
                  self.disabled=false;
                }
                             
            },
            error => this.errorMessage = <any>error
    );
}
//图片上传
fileChange(input:any,thumbnail:any){
    this.inputfile = input;
    this.groupeditMessage.groupheadAdr= '';
    if(this.inputfile.files[0]){
       this.groupeditMessage.groupheadAdr = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.inputfile.files[0]));
    }
}

}