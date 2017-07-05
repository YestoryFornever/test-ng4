import {Component, OnInit} from "@angular/core";
import{ActivatedRoute} from "@angular/router";
import {contactsServices} from "../contacts.services";
import {DetailInfo} from "./detail-info";
import {ConfirmationService} from "primeng/primeng";
@Component({
    selector: "contacts-detail",
    templateUrl: "./contacts-detail.component.html",
    styleUrls: [
        "../contacts.component.css"
    ]
})
export class ContactsDetailComponent implements OnInit {
    bs_label: Array<string>;
    bs_labels: Array<Object>;
    cks: Array<string>;
    // 同业宝状态表格
    form_state: Array<Object>;
    // 债金所状态
    house_state: Array<Object>;
    orgins: Array<string>;
    arrayInfo: Array<string>;
    detailInfo: DetailInfo;
    lbl: Array<string>;

    constructor(public activeRouter: ActivatedRoute, public contactsService: contactsServices, public confirmService: ConfirmationService) {
        this.bs_label = [];
        this.cks = [];
        this.arrayInfo = [];
        this.form_state = [
            {
                state: "",
                qq_state: "",
                qq_href: "",
                check_user: "",
                check_time: ""
            }
        ];
        this.house_state = [
            {
                state: ""
            }
        ];
    }

    ngOnInit() {
        this.detailInfo = {
            userId: "",
            userNm: "",
            qqNm: "",
            instId: "",
            instfullNm: "",
            instNm: "",
            cfname: "",
            ctname: "",
            rgstMblph: "",
            ctcMod1: "",
            ctcMod2: "",
            inptChnl: "",
            dataeSource: "",
            createtime: "",
            lsttmusetm: "",
            lbl: "",
            udflbl: "",
            wxopenid: "",
            smbsnestatus: "",
            qqvldestatus: "",
            vldqq: "",
            chkuname: "",
            lsttmchktm: "",
            state: "",
            province: "无",
            city: "无",
            mnpltRsn: ""
        };
        if (this.detailInfo.lbl == "") {
            this.lbl = [];
        }
        else {
            this.lbl = this.detailInfo.lbl.split(",");
        }
        this.bs_labels = [
            {id: 103, name: "理财销售"},
            {id: 105, name: "债券分销"},
            {id: 106, name: "存单销售"},
            {id: 107, name: "非标销售"},
            {id: 202, name: "非标投资"},
            {id: 205, name: "信用债投资"},
            {id: 206, name: "利率债投资"},
            {id: 207, name: "理财投资"},
            {id: 301, name: "资金交易"},
            {id: 302, name: "债券交易"},
            {id: 304, name: "货币经纪"},
            {id: 305, name: "外汇交易"},
            {id: 404, name: "债券承揽"},
            {id: 405, name: "债券承做"},
            {id: 406, name: "债券承销"},
            {id: 501, name: "宏观研究"},
            {id: 502, name: "信用研究"},
            {id: 505, name: "行业研究"},
            {id: 506, name: "策略研究"}
        ];
        // 获取信息
        this.contactDetail();

        // new Clipboard('.btnCopy');
    }

    // 保存提醒信息
    form_state_click() {
        if (confirm("您好，请确认是否保存信息修改？")) {
            let params = {
                userId: this.activeRouter.snapshot.params["id"],
                wxopenid: this.detailInfo.wxopenid,
                usreStatus: this.detailInfo.smbsnestatus,
                qqvldEstatus: this.detailInfo.qqvldestatus,
                vldqq: this.detailInfo.vldqq,
                chkUid: this.detailInfo.chkuname,
                mnpltRsn: this.detailInfo.mnpltRsn,
                modTm: this.detailInfo.lsttmchktm
            };
            console.log(this.detailInfo, "同业宝状态参数");
            console.log(params, "同业宝状态参数");
            this.contactsService.checkMsg(params).subscribe(res => {
                console.log(res, "审核同业宝状态");
                if (res.status == 0) {
                    // this.contactDetail();
                }
            })
        }
        else {

        }
    }

    // 数据
    contactDetail() {
        let params = {
            userId: this.activeRouter.snapshot.params["id"]
        };
        this.contactsService.getContactsDetail(params).subscribe(data => {
            for (let i = 0; i < data.data.length; i++) {
                data.data[i].state = data.data[i].state + "";
            }
            this.detailInfo = data.data;
            if(this.detailInfo.dataeSource == "0") {
                this.detailInfo.dataeSource = "QQ群";
            }
            else {
                this.detailInfo.dataeSource = "大金所";
            }
            console.log(data, "同业宝详细信息");
            if (this.detailInfo.lbl.length > 0) {
                this.lbl = this.detailInfo.lbl.split(",");
            }
        })
    }

    // 保存用户信息
    sureUserInfo() {
        if(confirm("您好，请确认是否保存信息修改？")) {
            if(this.detailInfo.dataeSource == "QQ群") {
                this.detailInfo.dataeSource = "1";
            }
            else {
                this.detailInfo.dataeSource = "2";
            }
            let params = {
                userId: this.activeRouter.snapshot.params["id"],
                userNm: this.detailInfo.userNm,
                qqNm: this.detailInfo.qqNm,
                instId: this.detailInfo.instId,
                instNm: this.detailInfo.instfullNm,
                rgstMblph: this.detailInfo.rgstMblph,
                ctcMod1: this.detailInfo.ctcMod1,
                ctcMod2: this.detailInfo.ctcMod2,
                inptChnl: this.detailInfo.inptChnl,
                dataeSource: this.detailInfo.dataeSource,
                lbl: this.detailInfo.lbl,
                udfLbl: this.detailInfo.udflbl

            };
            console.log(this.detailInfo, "用户基本信息修改参数");
            console.log(params, "用户基本信息修改参数");
            this.contactsService.saveUserInfo(params).subscribe(data => {
                console.log(data, "保存用户信息");
                if (data.status == 0) {
                    this.contactDetail();
                }
            })
        }
    }

    // 2. 获取机构列表
    searchInfo() {
        // 2
        let listParams = {
            organizationFullName: this.detailInfo.instfullNm
        };

        this.contactsService.selectUserListId(listParams).subscribe(data => {
            console.log(data);
            if (data.data) {
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].province == undefined) {
                        data.data[i].province = "";
                    }
                    else {
                        data.data[i].province = data.data[i].province + "-"
                    }
                    if (data.data[i].city == undefined) {
                        data.data[i].city = "";
                    }
                }
                for (let i = 0; i < data.data.length; i++) {
                    this.arrayInfo.push(data.data[i].organizationFullName + "-" + data.data[i].issuerShortName + "-" + data.data[i].issuerId + "-" + data.data[i].province + data.data[i].city);
                }
            }
        });
    }

    selectValue(data: any) {
        this.detailInfo.instNm = this.detailInfo.instfullNm.split("-")[1];
        this.detailInfo.instId = this.detailInfo.instfullNm.split("-")[2];
        this.detailInfo.province = this.detailInfo.instfullNm.split("-")[3];
        this.detailInfo.city = this.detailInfo.instfullNm.split("-")[4];
        this.detailInfo.instfullNm = this.detailInfo.instfullNm.split("-")[0];
    }

    // 修改复选框的值
    editCk(data: any) {
        this.detailInfo.lbl = data.toString();
    }
}