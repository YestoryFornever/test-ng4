import { Component, ChangeDetectorRef,ViewChild,OnInit,AfterViewInit,trigger,state,style,transition,animate } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service'


@Component({
	selector: 'sns-conformity-choiceness-edit',
	templateUrl: './sns-conformity-sweeping-edit.component.html',
	styleUrls: ['./sns-conformity-sweeping-edit.component.scss'],
	providers: [SnsConformityServices]
})

export class SnsConformitySweepingEdit  implements OnInit,AfterViewInit{
	constructor(
				private snsConformityServices:SnsConformityServices,
				private changeDetectorRef:ChangeDetectorRef,
				private activatedRoute:ActivatedRoute,
        		private router:Router,

        		){}
		
	// msgNumbers = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];

	ngOnInit(){
		this.activatedRoute.params.forEach((params:Params)=>{
			let id = params['id'];
			this.ID = id
			// let backId = params['backId'];
			// console.log(userId,backId);
		})
		var a:any = document.getElementsByClassName('wrapper')[0]
		a.scrollTop = 0
		window.scrollTo(0,0);
		this.en = {
			            firstDayOfWeek: 0,
			            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
			            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
			            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
			            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
			        };
			        if(this.ID){
			        	 this.sweepList()
			        }else{
			        	this.sweepDetial.bond_tags=[]
			        }
		// window.location.href="javascript:window.scrollTo( 0, 0 );"     
			       
	}
	ngAfterViewInit(){
		 this.randerColor()
	}
	ID:any
// 列表
	default:any={
		time_begin:'',
		time_end:'',
		title:'',
		sweep_id:'',
		cur_page:'1',
		show_count:'30',
	}

	sweepDetial:any={
		e_title:'',
		e_note:'',
		bad_point:'',
		is_important:''
	}

	orgAndBond:any=[]
	sweepList() {
	this.default.sweep_id = this.ID 
		this.snsConformityServices
		.sweepList(this.default)
		.subscribe(
		infoList => {  
			if(infoList.status==0){
				this.sweepDetial = infoList.data.list[0]	
				var imports:any = <HTMLImageElement>document.getElementById('import')
					this.sweepDetial.bad_point=this.sweepDetial.bad_point*1
					if(this.sweepDetial.bond_tags){
						this.sweepDetial.bond_tags=JSON.parse(this.sweepDetial.bond_tags)
					}else{
						this.sweepDetial.bond_tags=[]
					}
					this.orgAndBond = this.sweepDetial.bond_tags
					if(this.sweepDetial.is_important==1){
							imports.checked=true
							this.import = true
					}
			// this.sweepDetial.is_important==1? this.imports
				console.log(this.sweepDetial)
			}else{
				alert(infoList.msg)
			}					
		},

		error => {	this.errorMessage = error;
					}
		);
	}
	en:any
	list:any=[1,2,3,4,5,6,7,8]
	val:any=0
	disPlayOrg(i:any){
		// debugger
		this.sweepDetial.bond_tags.splice(i,1)

	}
	disPlayBond(i:any,j:any){
		this.sweepDetial.bond_tags[i].bonds.splice(j,1)
		if(this.sweepDetial.bond_tags[i].bonds.length==0){
			this.sweepDetial.bond_tags.splice(i,1)
		}
	}
	 getRandomColor(){  
	  return '#'+Math.floor(Math.random()*16777215).toString(16); 
	}
    

	randerColor(){
		// debugger
		var tipList = document.getElementsByName('tip')
			for(var i=0;i<tipList.length;i++){
				tipList[i].style.backgroundColor='#0275d8'//this.getRandomColor()
			}
	}
	errorMessage:any

// 模糊查询机构
	orgListShow=false
	OrgName:any={
		keyword:''
		}
	orgList:any=[]
	searchOrg(orgUl:any){
		this.snsConformityServices.fuzzyMatchByshrtNm(this.OrgName)
            .subscribe(
            org => {
                 this.orgList  =  org.data  
                 this.matchBondName=''
                 this.bondName=''
                 this.matchOrgName=''
                 this.closematchBond()
                },
                error => this.errorMessage = error                 
            ); 
            if(this.OrgName.keyword!=''){
 				this.orgListShow =true
            }      
	}
	OrgSerch(val:any,id:any){
		// debugger
		this.OrgName.keyword = val 
		this.orgId.issuerId = id
		this.bondInfoByIssueId()
		this.orgListShow=false
		this.matchBond = true
	}
	closeOrg(){
		this.orgListShow=false
	}
// 机构id匹配债券
// bondName:any
	orgId:any={
		issuerId:''
	}
	serchBond:any=false
	serchOrg:any =false
	bondListForInfoId:any=[]
	bondInfoByIssueId(){
		this.serchBond=true
		this.serchOrg=false
		this.snsConformityServices.bondInfoByIssueId(this.orgId)
	            .subscribe(
	            org => {
	                 this.bondListForInfoId  =  org.data  
	                 this.bondName = ''  
	                 // debugger
	                 // var bondL = document.getElementsByName('bond')
	                 // for(var i=0;i<bondL.length;i++){
	                 // 	bondL[i].for=i
	                 // }
	                },
	                error => this.errorMessage = error                 
	            ); 
	}
	bondid:any={
		bondid:''
	}

matchBond:any=false
matchBondName:any=''
	matchBondSerch(val:any,id:any){
			// alert(val)

			this.matchBondName = val 
			var OrgisRepeat = false
			for(var i =0;i<this.sweepDetial.bond_tags.length;i++){
				if(this.sweepDetial.bond_tags[i].oid==this.orgId.issuerId){
					OrgisRepeat=true;
					var bondIsrepeat = false;
					for(var k=0;k<this.sweepDetial.bond_tags[i].bonds.length;k++){
						if(this.sweepDetial.bond_tags[i].bonds[k].bid==id){
							bondIsrepeat = true;
						}
					}
					if(!bondIsrepeat){
						var bond={bid:id,bname:val}
						this.sweepDetial.bond_tags[i].bonds.push(bond)
					}
				}
			}
			if(!OrgisRepeat){
				// debugger
				var org = {oid:this.orgId.issuerId,oname:this.OrgName.keyword,bonds:[{bid:id,bname:val}]}
				// org.bond=[]
				this.sweepDetial.bond_tags.push(org)
				console.log(this.sweepDetial.bond_tags)
				// this.sweepDetial.bond_tags[this.sweepDetial.bond_tags.length-1].bond.push()
			}
			// this.closematchBond()
		}
	closematchBond(){
		this.matchBond=false
	}




// 债券简称匹配债券
	bondListShow:any=false
	bondName:any=''
	bondNm:any={
		keyword:''
	}
	bondList:any=[]
	fuzzyMatchingForBond(){
		this.bondNm.keyword=this.bondName
		this.snsConformityServices.fuzzyMatchingForBond(this.bondNm)
	            .subscribe(
	            org => {
	                 this.bondList  =  org.data
	                  this.matchOrgName=''  
	                  this. matchBondName=''
	                  this.closematchOrg()    
	                },
	                error => this.errorMessage = error                 
	            ); 
	             if(this.bondName!=''){
	 				this.bondListShow =true
	            }  
	}
	BondSerch(val:any,id:any){
		// debugger
		this.bondName = val 
		this.bondid.bondid = id
		this.bondInsById()
		this.bondListShow=false
		this.matchOrg = true
	}
	closeBond(){
		this.bondListShow=false
	}

// 债券id匹配机构
	bondInsByIdList:any=[]
	bondInsById(){
		this.serchBond=false
		this.serchOrg=true	
		this.snsConformityServices.bondInsById(this.bondid)
	            .subscribe(
	            org => {
	                 this.bondInsByIdList  =  org.data    
	                 this.OrgName.keyword = ''
	                },
	                error => this.errorMessage = error                 
	            ); 
	}
matchOrg:any=false
matchOrgName:any=''
matchOrgSerch(val:any,id:any){
		// alert(val)
		this.matchOrgName = val 
		var OrgisRepeat = false
			for(var i =0;i<this.sweepDetial.bond_tags.length;i++){
				if(this.sweepDetial.bond_tags[i].oid==id){
					OrgisRepeat=true;
					var bondIsrepeat = false;
					for(var k=0;k<this.sweepDetial.bond_tags[i].bonds.length;k++){
						if(this.sweepDetial.bond_tags[i].bonds[k].bid==this.bondid.bondid){
							bondIsrepeat = true;
						}
					}
					if(!bondIsrepeat){
						var bond={bid:this.bondid.bondid,bname:this.bondName}
						this.sweepDetial.bond_tags[i].bonds.push(bond)
					}
				}
			}
			if(!OrgisRepeat){
				// debugger
				var org = {oid:id,oname:val,bonds:[{bid:this.bondid.bondid,bname:this.bondName}]}
				// org.bond=[]
				this.sweepDetial.bond_tags.push(org)
				console.log(this.sweepDetial.bond_tags)
				// this.sweepDetial.bond_tags[this.sweepDetial.bond_tags.length-1].bond.push()
			}
		this.closematchOrg()
	}
	closematchOrg(){
		this.matchOrg=false
	}
	test(){
		console.log(this.sweepDetial.bond_tags)
	}
	addCon:any={
		sweep_id:'',
		e_title:'',
		note:'',
		bad_point:'',
		is_important:'',
		bond_tags:'',
		is_release:'',
	}
    // imports:any = <HTMLImageElement>document.getElementById('import')
	import:any=false
	isImport(imp:any){
		this.import = imp.checked
	}
	OrgNameLists:any=[]
	sweepEdit(is_release:any){
		
		if(this.sweepDetial.e_title==''&&this.import==false){
			alert('请填写标题！')
			return false
		}
		if(this.sweepDetial.note==''&&this.import==false){
			alert('请填写内容！')
			return false
		}
		if(this.ID){
			this.addCon.sweep_id=this.ID
		}else{
			this.addCon.sweep_id=0
		}
		this.addCon.e_title=this.sweepDetial.e_title
		this.addCon.note=this.sweepDetial.e_note
		this.addCon.bad_point=this.sweepDetial.bad_point
		
		// this.addCon.is_important=this.sweepDetial.e_title
		
		if(this.sweepDetial.bond_tags.length!=0){
			this.addCon.bond_tags=JSON.stringify(this.sweepDetial.bond_tags)
		}else{
			// this.addCon.bond_tags=JSON.stringify([{oid:undefined,oname:undefined,bonds:[{bid:undefined,bname:undefined}]}])
			this.addCon.bond_tags=undefined
		}
		
		if(this.import==true){
			if(!this.addCon.bond_tags&&is_release==1){
				alert('重点关注资讯发送时必须添加至少一条关联机构及个债')
				return false
			}
			this.addCon.is_important=1	
			// for(var i=0;i<JSON.parse(this.addCon.bond_tags).length;i++){
			// 	this.OrgNameLists.push(JSON.parse(this.addCon.bond_tags)[i].oname)
			// }
			// debugger
			// this.addCon.e_title ='今日扫雷关注：'+this.OrgNameLists.join(',')
			// this.addCon.note=undefined
		}
		if(this.sweepDetial.release_state=='已发送'){
			this.addCon.is_release=1
		}else{
			this.addCon.is_release=0
		}
		if(is_release==1){
			this.addCon.is_release=1
		}
		this.snsConformityServices.sweepEdit(this.addCon)
	            .subscribe(
	            org => {
	                 if(org.status==0){
	                 	if(is_release==1){
	                 		alert('保存并发送成功！')
	                 	}else{
	                 		alert('保存成功！')
	                 	}
	                 		this.ListTo()
	                 }else{
	                 	alert(org.msg)
	                 }
	                },
	                error => this.errorMessage = error                 
	            );
	}
	
	ListTo(){
		if(this.ID){
			this.router.navigate(['../../sns-conformity-sweeping'],{relativeTo:this.activatedRoute}); 
		}else{
			this.router.navigate(['../sns-conformity-sweeping'],{relativeTo:this.activatedRoute}); 
		}
	}
}
