export class Order{
	constructor(){
		this.orderNumber='';
		this.userName='';
		this.phone='';
		this.goodsExchangeId='';
		this.goodsName='';
		this.goodsType='101';
		this.totalCoin='';
		this.requestTime='';
		this.status='';
		this.statusCode='';
	}
	orderNumber:string;
	userName:string;
	phone:string;
	goodsExchangeId:string;
	goodsName:string;
	goodsType:string;//101实体;102虚拟
	totalCoin:string;
	requestTime:string;
	status:string;
	statusCode:string;
}
export class OrderCondition{
	constructor(){
		/*this.pageNum='';
		this.pageSize='';*/
		this.currentPage=1;
		this.itemsPerPage=10;
		this.maxSize=5;
		this.orderType='';
		this.sortType='';
		this.status={
			"all":true,
			"status101":false,
			"status102":false,
			"status103":false,
			"status104":false,
			"status105":false,
		};
		/*this.requestTimeStart=(new Date()).getTime();
		this.requestTimeEnd=(new Date()).getTime();*/
		//this.requestTimeStart=this.getDate();
		//this.requestTimeEnd=this.getDate();
		this.orderNumber='';
		this.phone='';
	}
	/*pageNum:string;
	pageSize:string;*/
	currentPage:Number;
	maxSize:Number;
	itemsPerPage:Number;
	totalItems:Number;
	totalPages:Number;
	orderType:string;
	sortType:string;
	status:Object;
	statusAll(){
		this.status={
			"all":true,
			"status101":false,
			"status102":false,
			"status103":false,
			"status104":false,
			"status105":false,
		};
	};
	statusOthers(){
		this.status["all"]=false;
	}
	requestTimeStart:any;
	requestTimeEnd:any;
	orderNumber:string;
	phone:string;
	getDate(){
		let date = new Date();
		let month:any = date.getMonth() + 1;
		let day:any = date.getDate();
		return [
			date.getFullYear(),
			(month>9 ? '' : '0') + month,
			(day>9 ? '' : '0') + day
		].join('-');
	}
}