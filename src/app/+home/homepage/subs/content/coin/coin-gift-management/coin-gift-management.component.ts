import { Component,ViewChild,OnInit,ChangeDetectorRef,Input} from '@angular/core';
import { FormControl, FormGroup ,NgForm} from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import { ActivatedRoute, Router }   from '@angular/router';//
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { TypeaheadModule,AlertModule,ButtonsModule} from 'ng2-bootstrap/ng2-bootstrap';
// import { ExcelExportService } from '../../../../services/excel-export.service';
/*import { ModalDirective } from 'modal.component.ts';*/
import { GoodsList,GoodsInfo }  from './classes/goods-list';

import { CoinGiftManagementService } from './services/coin-gift-management.service'
@Component({
  selector: 'coin-gift-management',
  templateUrl: './coin-gift-management.component.html',
  styleUrls: [
    './coin-gift-management.component.scss'
  ],
  providers: [
         CoinGiftManagementService

  ]//注册服务器
})
export class CoinGiftManagementComponent implements OnInit{

    color = '#fff';
    height = '312px';
    page:any;

//set礼品列表 
    goodsLists:any=[];

    errorMessage: string; 
    msgNumber:any;
    constructor(
        private changeDetectorRef:ChangeDetectorRef,
        private coinGiftManagementService:CoinGiftManagementService,
        // private excelExportService:ExcelExportService,
        private activatedRoute:ActivatedRoute,
        private sanitizer: DomSanitizer,
        private router:Router,
        ){};
//初始化
ngOnInit(){
    // this.cookie();
    this.searchgoodslist(null);
}


// 判断正序或者倒叙
isNarmal=false;//倒叙

getSort(){
  if(this.isNarmal){
    this.default.sortType="ASC";

  }else{
    this.default.sortType="DESC";
  }
  this.isNarmal=!this.isNarmal;
}


typeArr:any =[];




/**********http**********/
default:any={
        usedType:'',
        goodsType:'',
        isEnabled:'1',
        pageNum:"1",
        pageSize:"10",
        orderBy:"",
        sortType:"",

};
alertOnOff:any = false ;

searchgoodslist(orderByName:any){

      // this.default.orderBy ="";
      // this.default.sortType ="";

      if(orderByName){
          this.getSort();
          this.default.orderBy = orderByName;
      }

    this.coinGiftManagementService.showGoodsList(this.default)
        .subscribe(
            goodsLists =>{
                this.alertOnOff =false;
                console.log(goodsLists)
                if(goodsLists.status==0){
                    for(let i in goodsLists.data.list ){

                        if(goodsLists.data.list[i].isEnabled){
                                goodsLists.data.list[i].isEnabled="正常";
                        }else{
                                goodsLists.data.list[i].isEnabled="已删除";
                        }
                    }
                    this.changeDetectorRef.detectChanges();

                    this.goodsLists=goodsLists.data.list;
                    this.page = goodsLists.data.page;
                    this.totalItems = this.page.totalResult;

                }else{
                  alert("请求超时");
                }
            },
            error => this.errorMessage = <any>error
        );
}
/********添加礼品弹框***********/
  //添加礼品弹框出现
  onShow(myshow:any,input:any){
    input.value="";
    this.goodsInfo = {
          name:'',
          description:'',
          priceCoin:'',
          usedType:'101',
          goodsType:'101',
    }
    myshow.show();
  };

// 添加礼品弹框
  goodsInfo:any={
        name:'',
        description:'',
        priceCoin:"",
        usedType:'101',
        goodsType:'101',
  };
// 去空格
trim(str:any) { //删除左右两端的空格　　
  return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
 onSave(goodsPicture:any,addGift:any){ 

      this.goodsInfo.name =  this.trim( this.goodsInfo.name );
      this.goodsInfo.description =  this.trim( this.goodsInfo.description );
      if(this.goodsInfo.name.length<=0){
            alert("请添加礼品名称");
            return false;
      }
      if(this.goodsInfo.priceCoin<=0){
            alert("请输入正确的礼品价格");
            return false;
      }
      if(this.goodsInfo.usedType=="101" && this.goodsInfo.goodsType=="103"){
            alert("请选择‘实体’或‘虚拟’选项");
            return false;
      }
      if(this.goodsInfo.usedType=="102" && this.goodsInfo.goodsType!="103"){
            alert("请选择‘表情’选项");
            return false;
      }

    if(this.PictureShow==""){
        alert("请添加图片");
        return false;
    }
    this.coinGiftManagementService.addGoods(this.goodsInfo,goodsPicture)
        .subscribe(
            msg => {
                if(msg.status==0){
                    alert("礼品添加成功");
                    addGift.hide();//隐藏弹框
                    this.fileReset();//清空页面数据
                    this.searchgoodslist(null);//刷新页面
                }else{
                     if(msg.data){
                       alert(msg.msg + ", "+ msg.data);
                     }
                     else{
                       alert(msg.msg );
                     }
                }
            },
            error => this.errorMessage = <any>error,
    );
}
/******LOGO上传************/
//LOGO上传
  goodsPicture:any;
  PictureShow:any;
  picValue:any;
  fileChange(input:any,thumbnail:any,event:any){
    this.picValue = input;
    let myValue = event.currentTarget.value;
    let reg = /\.(jpg|gif|png|PNG|JPG|GIF)$/i;
    if(input.files[0]){
      // 1M =1024kb =1024 * 1024 字节
        if(event.currentTarget.files[0].size/1000 < 1024){
           // console.log(event.currentTarget.files[0].size/1000);
            // let image = new Image();
            // console.log(image.)
            // this.getFileSize(input.files[0].value);
            this.PictureShow = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(input.files[0]));
            this.goodsPicture = input.files[0];
        }else{
            this.picValue.value="";
            this.PictureShow="";
            alert("图片大小超过1M， 请更换图片");
        }
       if(!reg.test(myValue)){
           alert("图片的后缀名不对，请选择后缀名为jpg/gif/png");
           this.picValue.value="";
           this.PictureShow="";
       }
    }
  }

//清空LOGO
  cancelLogo(addGift:any){
    
   
    this.fileReset();
    addGift.hide();
  }
  fileReset(){
    this.PictureShow="";
    this.goodsPicture="";
  }
onSubmit(){
    this.currentPage = 1;//无法同时修改当前页和每页总数
    this.changeDetectorRef.detectChanges();
    this.searchgoodslist(null);
}
/*************商品删除***************/

goodsDownId:any;

// 获取删除礼品ID
getGoodsId(showBox:any,goodsDownId:any){
  showBox.show();
  this.goodsDownId=goodsDownId;//赋值给全局变量
}

//下架礼品
goodsIdDown(close:any){
  let oo={
    goodsId:this.goodsDownId
  }
 
  this.coinGiftManagementService.unLineGoods(oo)
        .subscribe(
            msg => {
                if(msg.status=="0"){
                  console.log(msg);
                  alert("删除成功");
                  close.hide();
                  this.searchgoodslist(null);//刷新页面
                }else{
                   if(msg.data){
                       alert(msg.msg + ", "+ msg.data);
                     }
                     else{
                       alert(msg.msg );
                     }
                  close.hide();
                }
            },
            error => this.errorMessage = <any>error,

    );
}
//联动礼品属性 和礼品归属
myFn(sta:any){
    if(sta == '1'){
        this.goodsInfo.goodsType = '101';
    }
    if(sta == '2'){
        this.goodsInfo.goodsType = '103';
    }
}
defaultFn(){
    this.default.goodsType = "" ;
}

// 分页
    msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
    public firstText:string    = '首页';
    public lastText:string     = '末页';
    public previousText:string = '<';
    public nextText:string     = '>';
    public maxSize:number      = 5;
    public totalItems:number;
    public itemsPerPage:number = 10;
    public currentPage:number  =1;
    public totalPages:number;
    public turnFirst(){
        this.currentPage = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.searchgoodslist(null);
    }
    public sizeData(Number:any){
        this.height       = Number*40+40+'px';
        this.currentPage  = 1;//无法同时修改当前页和每页总数
        this.changeDetectorRef.detectChanges();
        this.itemsPerPage = Number;
        this.turnFirst()
        this.height       = Number*40+120+'px';
        var listBody:any  = document.getElementById("listBody");
        var tr:any        = document.createElement('tbody')
        var num:number    = Number*1;
    };
    public pageNumChange(event:any,allcheck:any){
        this.default.pageSize = this.itemsPerPage;
        this.totalPages = event;
    }
    public setPage(pageNo:number):void {
        this.currentPage = pageNo;
    };
// 翻页
    pageChanged(event:any,allcheck:any):void {
        this.default.pageNum = event.page;
        this.searchgoodslist(null);
    };
isDIsable:any
isGaming(){
  if(this.goodsInfo.goodsType==104){
    this.goodsInfo.priceCoin=1
    this.isDIsable=true
  }else{
    this.goodsInfo.priceCoin=0
    this.isDIsable=false
  }
}

}






