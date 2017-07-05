import {Component, OnInit} from "@angular/core";
import {contactsServices} from "../contacts.services";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
    selector: "contacts-add",
    templateUrl: "./contacts-add.component.html",
    styleUrls: [
        "../contacts.component.css"
    ]
})
export class ContactsAddComponent implements OnInit {
    public results: Array<Object>;
    public selected: string;
    public states: Array<Object>;
    // 定义参数
    qqNm: string;
    userNm: string;
    instid: string;
    instNm: string;
    autoOrgan: string;
    arrayInfo: Array<string>;

    constructor(public contactsService: contactsServices, public activeRouter: ActivatedRoute, public router: Router) {
        console.log(this.contactsService.userInfo, "用户信息");
        this.qqNm = "";
        this.instNm = "";
        this.instid = "";
        this.autoOrgan = "";
        this.arrayInfo = [];
    }

    ngOnInit() {
        // 1. 创建同业宝用户

    }

    // 1. 创建同业宝
    submitBtn() {
        if (this.qqNm == "" || this.userNm == "" || this.instid == "") {
            alert("请填写必填字段");
        }
        else {
            let newParams = {
                qqNm: this.qqNm,
                userNm: this.userNm,
                instId: this.instid,
                instNm: this.instNm.split("--")[0]
            };
            console.log(newParams, "同业宝参数");
            this.contactsService.createNewUser(newParams).subscribe(listData => {
                console.log(listData, "创建同业宝信息");
                if (listData.status == 0) {
                    this.router.navigate(['homepage/contacts/contacts-detail/' + listData.data.userId]);
                }
            });
        }
    }

    // 2. 获取机构列表
    searchInfo() {
        // 2
        let listParams = {
            organizationFullName: this.instNm
        };

        this.contactsService.selectUserListId(listParams).subscribe(data => {
            console.log(data);
            this.states = data.data;
            if (data.data) {
                for (let i = 0; i < data.data.length; i++) {
                    this.arrayInfo.push(data.data[i].organizationFullName + "--" + data.data[i].issuerShortName + "--" + data.data[i].issuerId);
                }
            }
        });
    }

    // childValue() {
    //     this.autoOrgan = this.instNm.split("--")[1];
    //     this.instid = this.instNm.split("--")[2];
    //     this.instNm = this.instNm.split("--")[0];
    //     console.log(this.autoOrgan);
    // }

    selectValue(data: any) {
        this.autoOrgan = this.instNm.split("--")[1];
        this.instid = this.instNm.split("--")[2];
        this.instNm = this.instNm.split("--")[0];
        console.log(this.autoOrgan);
    }
}
// issuerId,organizationFullName,organizationShortName