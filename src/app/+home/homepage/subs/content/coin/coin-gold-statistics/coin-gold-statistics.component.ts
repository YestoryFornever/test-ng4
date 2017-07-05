import { Component, ChangeDetectorRef,ViewChild,OnInit,trigger,state,style,transition,animate } from '@angular/core';
import {NgStyle} from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { CoinGoldStatistiscsservice } from './coin-gold-statistics.services/coin-gold-statistics.services';
@Component({
	selector: 'coin-gold-statistics',
	templateUrl: './coin-gold-statistics.component.html',
	styleUrls: ['./coin-gold-statistics.component.scss'],
	providers: [CoinGoldStatistiscsservice]
})
export class CoinGoldStatisticsComponent {
	constructor(
		private coinGoldStatistiscsservice:CoinGoldStatistiscsservice
	){}
	// constructor(private UserApproveHistoryService:UserApproveHistoryService){}

	ngOnInit(){
		 this.coinstatistics();
		 this.todaystatistics();
	};
	errorMessage:any;
	 // 4.7.1金币收支统计
	 coinStatis:any={
	 	certification : 0,
		recommend : 0,
		dailyLand : 0,
		publishDynamic : 0,
		publishPrice : 0,
		feedBackWard : 0,
		releaseGold : 0,
		goodsExchanges: 0,
		shareInformation:0,
		userRecharge:0,
		logisticFee:0,


	 }
	 income:any;//金币收入
	 grant:any;//系统发放
	 expend:any;//金币支出
	 userCostSum:any;//用户消费总和
	 goodsExchanges:any; //商城消费
	 logisticFee:any;//发票邮费
	 userRecharge:any;//金币充值
	 todyDeduct:any;//系统扣除
	 userLiabilities:any;
	 total:any;//总额
	 myAlert:any;//刷新按钮开关
	coinstatistics(){
    	this.coinGoldStatistiscsservice.coinstatistics(null) 
        .subscribe(
            coinstatistics => {
            	// debugger
                if(coinstatistics.status==0){
                    this.coinStatis = coinstatistics.data;
                    this.grant = coinstatistics.data.certification//实名认证
		                    	+ coinstatistics.data.recommend//推荐用户
		                    	+ coinstatistics.data.publishDynamic //发布动态
		                    	+ coinstatistics.data.dailyLand//每日登陆
		                    	+coinstatistics.data.publishPrice//发布交易
		                    	+ coinstatistics.data.feedBackWard//用户反馈
		                    	+ coinstatistics.data.releaseGold//发放金币
		                    	+ coinstatistics.data.shareInformation//对外分享资讯 = 系统发放金币。
		                    	+coinstatistics.data.publishFundPrice//发布资金报价
                    this.userRecharge = coinstatistics.data.userRecharge ;//金币充值
                    this.userLiabilities = coinstatistics.data.userLiabilities? coinstatistics.data.userLiabilities : 0 ;
                    this.todyDeduct  =  coinstatistics.data.cancelRealName + coinstatistics.data.cancelRecommend+ coinstatistics.data.cancelPublishPrice+ coinstatistics.data.cancelPublishDynamic+ coinstatistics.data.canclePublishFundPrice+ coinstatistics.data.deductCoin;// 实名认证奖励扣除 + 推荐用户奖励扣除
                    this.logisticFee = coinstatistics.data.logisticFee ;//发票邮费
                    this.goodsExchanges = coinstatistics.data.goodsExchanges ;//商城消费
                    this.userCostSum = coinstatistics.data.logisticFee + coinstatistics.data.goodsExchanges;
                    this.income = this.grant + this.userRecharge;//金币收入=系统发放+金币充值
					this.expend = this.userCostSum + this.todyDeduct ;// 用户消费+系统扣除
					this.total = this.income + this.expend + this.userLiabilities ;//总额= 支出 +收入
                    console.log(this.coinStatis)
                    // alert('获取数据成功');
                    this.myAlert = true;
                }else{
					 alert(coinstatistics.msg)
                }
            }, 
            error => this.errorMessage = <any>error
        ); 
    }

    // 4.7.2今日收支统计
	 todayStatics:any={
						todaySysSend : 0,
						todayRecharge : 0,
						todayConsume : 0,
	 }
	todaystatistics(){
    	this.coinGoldStatistiscsservice.todaystatistics(null) 
        .subscribe(
            todaystatistics => {
                if(todaystatistics.status==0){
                    this.todayStatics = todaystatistics.data
                    console.log(this.todayStatics)
                }else{
					 alert(todaystatistics.msg)
                }
            }, 
            error => this.errorMessage = <any>error
        ); 
    }
    refresh(){
    	this.coinstatistics();
		this.todaystatistics();
		if(this.myAlert){
			alert('刷新成功');
		}
		// alert('刷新成功');

    }


}