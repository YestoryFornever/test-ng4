import { Component, ViewChild,OnInit,ChangeDetectorRef,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { ActivatedRoute,Router,Params }   from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule ,TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SnsConformityServices } from '../sns-conformity.service';


import { Organization, OrgCondition , Modal_data_list ,Org_json ,Bond_tags  } from './class/org-bond';
import { TypeAhead } from './class/org-typehead';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

@Component({
	selector: 'sns-conformity-orgBondAttention',
	templateUrl: './sns-conformity-orgBondAttention.component.html',
	styleUrls: ['./sns-conformity-orgBondAttention.component.scss'],
	providers: [SnsConformityServices],
})

export class SnsConformityOrgBondAttention implements OnInit{
	constructor(
			private snsConformityServices:SnsConformityServices,
			private changeDetectorRef:ChangeDetectorRef,
			private activatedRoute:ActivatedRoute,
			private router:Router,
		){
		this.organization            = new Organization();

		this.modal_fullname_TypeHead = new TypeAhead();
		this.modal_bond_idTypeAhead  = new TypeAhead();
		this.fullnameTypeAhead       = new TypeAhead();
		this.bond_idTypeAhead        = new TypeAhead();

		this.modal_data               = new Modal_data_list();

	}
	organization:Organization;
	modal_fullname_TypeHead:TypeAhead;
	modal_bond_idTypeAhead:TypeAhead;
	fullnameTypeAhead:TypeAhead;
	bond_idTypeAhead:TypeAhead;
	ngOnInit(){
		/***********列表 模糊搜索*/
		this.fullnameTypeAhead.source = Observable.create((observer:any) => {
			this.snsConformityServices
				.fuzzyMatchByshrtNm({keyword:this.organization.insFulNm})
				.subscribe(
					data => {
						console.log(data)
						data.status==0 && observer.next(data.data)
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.fullnameTypeAhead.getStates(token));
		this.bond_idTypeAhead.source = Observable.create((observer:any) => {
			this.snsConformityServices
				.fuzzyMatchingForBond({keyword:this.organization.bondNm})
				.subscribe(
					data => {
						console.log(data)
						data.status==0 && observer.next(data.data)
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.bond_idTypeAhead.getStates(token));
		/*弹窗模糊搜索*/
		this.modal_fullname_TypeHead.source = Observable.create((observer:any) => {
			this.snsConformityServices
				.fuzzyMatchByshrtNm({keyword:this.modal_data.org_fullname})
				.subscribe(
					data => {
						console.log(data)
						data.status==0 && observer.next(data.data)
					},
					error => this.errorMsg = error
				);
		}).mergeMap((token:string) => this.modal_fullname_TypeHead.getStates(token));
		this.bondFocusList();
		this.mon = {
			firstDayOfWeek: 0,
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
			monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
			monthNamesShort: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ]
		};

	};
	mon:any={
		monthNames:[]
	};
	defaultSearch:any={
		org_id:'',
		bond_id:'',
		time_begin:'',
		time_end:'',
		cur_page:1,
		show_count:30,
	}
	errorMsg:any;
	bondList:any;
	bondFocusList(){
		this.defaultSearch.time_begin = this.format(this.myStartTime) || '';
		this.defaultSearch.time_end = this.format(this.myEndTime)  || '';
		this.snsConformityServices.bondFocusList(this.defaultSearch)
		.subscribe(
				data=>{
					if(data.status ==0){
						this.bondList = data.data.list;
						for(let item of this.bondList){
							if(item.bond_tags){
								let arr:any = [] ;
								item.bond_tags =  JSON.parse(item.bond_tags);
								item['bond_tags'].forEach((_item:any)=>{
									arr.push(_item['bname']);
								})
								item['bname_str'] = arr.join(' , ');
							}
						}
						this.totalPages = data.data.page.totalPage;
			            this.totalItems = data.data.page['totalResult'];
					}
					console.log(data)
				}
			)
	}
	myStartTime:any;
	myEndTime:any;
	format (format:any) {
		if(format){
			var args = {
           	   Y: format.getFullYear(),
               M: format.getMonth() + 1,
               d: format.getDate(),
               h: format.getHours(),
               m: format.getMinutes(),
               s: format.getSeconds(),
           	};
           	if(args.M<10){
           		args.M=0+''+args.M
           	}
           	if(args.d<10){
           		args.d=0+''+args.d
           	}
           	if(args.h<10){
           		args.h=0+''+args.h
           	}
           	if(args.m<10){
           		args.m=0+''+args.m
           	}
           	if(args.s<10){
           		args.s=0+''+args.s
           	}
           	format = args.Y+'-'+ args.M +'-'+args.d
           // format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
		}
        return format;
    };
    /*列表 模糊搜索  机构 、债券*/
    org_idSelect(e:any){
		this.organization.insFulNm = e.item.insFulNm;
		this.defaultSearch.org_id = e.item.insId;
		console.log(e)
	}
	bond_idSelect(e:any){
		this.organization.bondNm = e.item.bondShrtnm;
		this.defaultSearch.bond_id = e.item.bondid;
		console.log(e)
	}
	is_change:any = false;
    /*弹窗 出现*/
	showModal(modal:any,item?:any){
		this.is_change = false;
		this.modal_data = new Modal_data_list();
		this.modal_data.reset();
		this.modal_send_info.f_id = '';
		modal.show();
		if(item && item.f_id){

			this.modal_send_info.f_id = item && item.f_id ;
			this.modal_data['org_fullname'] = item['org_fullname'];
			this.search_bond(item.org_id);
			// let temp_obj = new Modal_data_list();
			this.modal_data['modal_org_list']['insFulNm'] = item['org_fullname'];
			this.modal_data['modal_org_list']['insId'] = item['org_id'];
			this.modal_data['modal_org_list']['insShtNm'] = item['org_name'];
			console.log(item);
			if(!item['bond_tags']){
				let temp_obj = new Modal_data_list();
				temp_obj['org_fullname']         = item['org_fullname'];
				temp_obj['org_id']               = item['org_id'];
				temp_obj['org_name']             = item['org_name'];
				temp_obj['is_org_zero']          = false;
				temp_obj['modal_org_list']		 = this.modal_data['modal_org_list'];
				this.modal_data.modal_table_list.push(temp_obj);
				console.log(this.modal_data.modal_table_list)
				return ;
			}
			if(item['bond_tags'] && item['bond_tags'].length==1){
				let temp_obj = new Modal_data_list();
				temp_obj['org_fullname'] = item['org_fullname'];
				temp_obj['org_id']       = item['org_id'];
				temp_obj['org_name']     = item['org_name'];

				temp_obj['modal_org_list']	= this.modal_data['modal_org_list'];
				temp_obj['modal_bond_list'] = this.modal_data['modal_bond_list'];

				temp_obj['bname']        = item['bond_tags'][0]['bname'];
				temp_obj['bid']          = item['bond_tags'][0]['bid'];
				this.modal_data.modal_table_list.push(temp_obj);

			}
			if(item['bond_tags'] && item['bond_tags'].length>1){
				for(let  index in item['bond_tags'] ){
					let temp_obj = new Modal_data_list();
					temp_obj['bname']        = item['bond_tags'][index]['bname'];
					temp_obj['bid']          = item['bond_tags'][index]['bid'];
					temp_obj['modal_bond_list'] = this.modal_data['modal_bond_list'];
					temp_obj['modal_org_list']		 = this.modal_data['modal_org_list'];
					if(index=='0'){
						temp_obj['org_fullname'] = item['org_fullname'];
						temp_obj['org_id']       = item['org_id'];
						temp_obj['org_name']     = item['org_name'];
						temp_obj['is_org_zero']          = false;
					}
					console.log(index)
					this.modal_data.modal_table_list.push(temp_obj);
					// temp_obj['org_fullname'] = item['org_fullname'];
					// temp_obj['org_id']       = item['org_id'];
					// temp_obj['org_name']     = item['org_name'];
				}
				// this.modal_data.modal_table_list.push(temp_obj);
				return ;
			}
		}
		console.log(this.modal_data.modal_table_list)
	}
	//弹窗列表
	modal_data:Modal_data_list;
	shrtnm:any ; // 债券名称
	/*删除一行数据*/
	modal_del(index:any){
		this.modal_data.modal_table_list.splice(index,1);
	}


	only_org(){

		let temp_obj = new Modal_data_list();
		var arr :any  =[] ;
		temp_obj['org_fullname']         = this.modal_data['modal_org_list']['insFulNm'];
		temp_obj['org_id']               = this.modal_data['modal_org_list']['insId'];
		temp_obj['org_name']             = this.modal_data['modal_org_list']['insShtNm'];
		temp_obj['is_org_zero']          = false;
		temp_obj['modal_org_list']       = this.modal_data['modal_org_list'];
		if(this.modal_data.modal_table_list.length==0){
			if(!temp_obj['org_fullname'] && !temp_obj['org_id']){
				return ;
			}
			this.modal_data.modal_table_list.push(temp_obj);
		}
		for(let  _item of this.modal_data.modal_table_list){
			if(_item['org_id'] == temp_obj['org_id']){
				arr.push(0);
			}else{
				arr.push(1);
			}
		}
		if(!arr.includes(0)){
			
			this.modal_data.modal_table_list.push(temp_obj);
		}
	}
	only_bond(){
		let temp_obj = new Modal_data_list();
		var arr :any  =[] ;
		for(let _list of this.modal_data.modal_bond_list){
			if(this.modal_data['bid'] == _list['bondId']){
				temp_obj['bname']           = _list['shrtnm'];
				temp_obj['bid']             = _list['bondId'];
				temp_obj['modal_bond_list'] = this.modal_data['modal_bond_list'];
				temp_obj['modal_org_list'] = this.modal_data['modal_org_list'];
			}
		}
		if(this.modal_data.modal_table_list.length==0){
			if(!temp_obj['bname']&& !temp_obj['bid']){
				return ;
			}
			this.modal_data.modal_table_list.push(temp_obj);
		}
		for(let  _item of this.modal_data.modal_table_list){
			if(temp_obj['bid'] == _item['bid'] ){
				arr.push(0);
			}
		}
		if(!arr.includes(0)){
			this.modal_data.modal_table_list.push(temp_obj);
		}
	}
	all_add(){
		let temp_obj = new Modal_data_list();
		var arr :any  =[] ;
		temp_obj['org_fullname']   = this.modal_data['modal_org_list']['insFulNm'];
		temp_obj['org_id']         = this.modal_data['modal_org_list']['insId'];
		temp_obj['org_name']       = this.modal_data['modal_org_list']['insShtNm'];
		temp_obj['is_org_zero']    = false;
		temp_obj['modal_org_list'] = this.modal_data['modal_org_list'];
		temp_obj['modal_bond_list'] = this.modal_data['modal_bond_list'];
		for(let _list of this.modal_data.modal_bond_list){
			if(this.modal_data['bid'] == _list['bondId']){
				temp_obj['bname']           = _list['shrtnm'];
				temp_obj['bid']             = _list['bondId'];
			}
		}
		if(this.modal_data.modal_table_list.length==0){
			if(!temp_obj['bname']&& !temp_obj['bid']){
				return ;
			}
			if(!temp_obj['org_fullname']&& !temp_obj['org_id']){
				return ;
			}
			this.modal_data.modal_table_list.push(temp_obj);
		}
		for(let  _item of this.modal_data.modal_table_list){
			if(_item['org_id'] == temp_obj['org_id']){
				arr.push(0);
			}else if(_item['bid'] == temp_obj['bid']){
				arr.push(0);
			}
		}
		if(!arr.includes(0)){
			this.modal_data.modal_table_list.push(temp_obj);
		}

	}

	/*联动进行搜索 债券*/
	modal_org_idSelect(e:any){
		this.modal_data['modal_org_list'] = e.item;
		this.modal_data['org_fullname'] = e.item['insFulNm'];

		this.modal_data['bid'] = '';
		this.modal_data['bname'] = '';

		this.search_bond(this.modal_data['modal_org_list']['insId']);
		console.log(this.modal_data);
	}
	/*根据id 查债券*/
	search_bond(id:any){
		this.snsConformityServices
			.bondInfoByIssueId({issuerId:id})
			.subscribe(
				data => {
					if(data.status ==0){
						this.modal_data.modal_bond_list = data.data;
					}
				},
				error => this.errorMsg = error
			);
	}
/***********发送请求  处理数据*/
	before_request(){
		this.modal_send_info.org_json =[];
		this.modal_send_info.bond_tags =[];
		let arr = this.modal_data.modal_table_list;
		for(let item of arr){
			let org_json             = new Org_json();
			let bond_tags            = new Bond_tags();
			org_json['org_fullname'] = item['org_fullname'];
			org_json['org_id']       = item['org_id'];
			org_json['org_name']     = item['org_name'];
			if(org_json['org_id']){
				this.modal_send_info.org_json.push(org_json);
			}
		}
		for(let item of arr){
			for(let _item of this.modal_send_info.org_json){
				if(_item['org_id'] == item['modal_org_list']['insId']){
					item['is_org_zero'] = false;
				}
			}
			// if(this.modal_send_info.org_json.includes(item['modal_org_list']['insId'])){
			// 	item['is_org_zero'] = false;
			// }
		}
		for(let item of arr){
			let bond_tags            = new Bond_tags();
			bond_tags['bid']         = item['bid'];
			bond_tags['bname']       = item['bname'];
			bond_tags['org_id']      = item['is_org_zero']  ? 0 : item['modal_org_list']['insId'];
			if(bond_tags['bid']){
				this.modal_send_info.bond_tags.push(bond_tags);
			}
		}

	}
/*************去重 ***************/
	obj2key(obj:any, keys:any){
	    let n:any = keys.length;
	    let key:any = [];
	    while(n--){
	        key.push(obj[keys[n]]);
	    }
	    return key.join('|');
	}
	uniqeByKeys(array:any,keys:any){
	    let arr:any = [];
	    let hash:any = {};
	    for (var i = 0, j = array.length; i < j; i++) {
	        var k = this.obj2key(array[i], keys);
	        if (!(k in hash)) {
	            hash[k] = true;
	            arr.push(array[i]);
	        }
	    }
	    return arr ;
	}
/************添加 修改 发送的数据*/
	modal_send_info:any={
		f_id:'',
		org_json:[],
		bond_tags:[],

	}
	/*添加或者修改 关注  http*/
	saveBondFocus(modal:any){
		this.before_request();
		if(this.modal_send_info.org_json.length==0){
			let obj ={
				org_fullname:'',
				org_id:'',
				org_name:'',
			}
			this.modal_send_info.org_json.push(obj);
		}
		this.modal_send_info.org_json = JSON.stringify(this.modal_send_info.org_json);
		this.modal_send_info.bond_tags = JSON.stringify(this.modal_send_info.bond_tags);

		this.snsConformityServices
			.saveBondFocus(this.modal_send_info)
			.subscribe(
				data => {
					alert(data.msg);
					modal.hide();
					this.bondFocusList();
				},
				error => this.errorMsg = error
			);
	}

/****************删除 查询页面  一行*/
	f_id:any;
	alert_show(item:any,modal:any){
		modal.show();
		this.f_id = item.f_id;
	}
	alert_del(modal:any){
		this.delete_bond(this.f_id,modal);
	}
	/**
     * 删除债券 机构 个债 关注池
     * @param {any} item [description]
     */
    delete_bond(f_id:any,modal:any){
    	this.snsConformityServices.infoDel({data_type:5,data_id:f_id})
		.subscribe(
				data=>{
					if(data.status ==0){
						alert(data['msg']);
						modal.hide();
						this.bondFocusList();
					}else{
						alert(data['msg']);
					}
					console.log(data)
				}
			)
    }
	// 分页
	msgNumbers:any = [{Number:'10'},{Number:'20'},{Number:'30'},{Number:'50'}];
	public firstText:string = '首页';
	public lastText:string = '末页';
	public previousText:string = '<';
	public nextText:string = '>';
	public maxSize:number = 5;
	public totalItems:number;
	public itemsPerPage:number = 30;
	public currentPage:number = 1;
	public totalPages:number;
	public turnFirst(){
		this.currentPage = 1;//无法同时修改当前页和每页总数
		this.changeDetectorRef.detectChanges();
		this.bondFocusList()
	}
	public sizeData(Number:any){
		this.itemsPerPage = Number;
		this.turnFirst();
		var listBody:any = document.getElementById("listBody");
		var tr:any = document.createElement('tbody');
		var num:number = Number*1;
	};
	public pageNumChange(event:any,allcheck:any){
		this.defaultSearch.show_count = this.itemsPerPage;
	}
	public setPage(pageNo:number):void {
		this.currentPage = pageNo;
	};
// 翻页
	pageChanged(event:any,allcheck:any):void {
		this.defaultSearch.cur_page = event.page;
		this.bondFocusList();
	};


}