
import { Component,ViewChild,OnInit,ChangeDetectorRef,Input,ChangeDetectionStrategy} from '@angular/core';
import { FormControl, FormGroup ,NgForm} from '@angular/forms';
import { ActivatedRoute, Router ,Params}   from '@angular/router';//
import { Observable } from 'rxjs/Observable';
import {PickListModule ,CheckboxModule} from 'primeng/primeng';

// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { TypeaheadModule,AlertModule,ButtonsModule,TooltipModule} from 'ng2-bootstrap/ng2-bootstrap';
// import { ExcelExportService } from '../../../../services/excel-export.service'; 
/*import { ModalDirective } from 'modal.component.ts';*/

import { UserInfoServices } from './services/user-info.services'

@Component({
	selector: 'user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],  
    providers: [
        UserInfoServices
    ]//注册服务器
 
})
export class UserInfoComponent implements OnInit{
  
    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private userInfoServices:UserInfoServices,
        private activatedRoute:ActivatedRoute,
        private router:Router,
        ){}
//初始化
   list1: any=[] ;
    
    list2: any=[] ;
    arr:any =[
        {
            name:'123'
        },
        {
            name:"234"
        }
    ]
    
    ngOnInit() {
        this.list1 = this.arr;
        // this.list1 = //initialize list 1
        // this.list2 = //initialize list 2
    }

infoType:any = '14' ;
errorMsg:any ;

showBox(alertBox:any,types:any){
    this.sendMsg.pshCntnt ="";
    this.sendMsg.pshETitle ="";
    this.sendMsg.pshExpdInf = types;
    alertBox.show();
}

// 发送信息
sendMsg:any= {
    pshExpdInf:"",
    pshCntnt:"",
    pshETitle:"",
};
// 清空
clearOut(){
    this.sendMsg.pshETitle='';
    this.sendMsg.pshCntnt='';
}
sendInfo(hideBox:any){
    this.sendMsg.pshExpdInf = this.infoType;
    this.sendMsg.pshCntnt.replace(/\s/g,"");
    this.sendMsg.pshETitle.replace(/\s/g,"");
    if( this.sendMsg.pshCntnt ==""){
        alert("输入信息为空，请重新输入。");
    }
    if( this.sendMsg.pshETitle ==""){
        alert("输入信息为空，请重新输入。");

    }
    console.log(this.sendMsg);
    
    this.userInfoServices.test(this.sendMsg)
        .subscribe(
            data=>{
                if(data.status =="0"){
                    console.log(data);
                    
                    alert("发送信息成功");
                    hideBox.hide();
                }else{
                    alert("发送信息失败，请重新尝试。");
                    hideBox.hide();
                }
                
            },
            error=>this.errorMsg = error
        );
    }




} 

