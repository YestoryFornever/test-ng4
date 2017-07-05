import { Observable } from 'rxjs/Observable';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

export class TypeAhead{
	constructor(){
		this.limit='10';
		this.isloading=false;
		this.hasNoResult=false;
	}
	source:Observable<any>;
	limit:string;
	select(e:any){
		console.log('当前值:',e.value );
	}
	isloading:boolean;
	loading(e:boolean){
		this.isloading=e;
	}
	hasNoResult:boolean;
	noresult(e:boolean){
		this.hasNoResult=e;
	}
	getStates(token:any):Observable<any> {	
		return Observable.of(token);
	}
}