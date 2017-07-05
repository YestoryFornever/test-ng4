import {Component, OnInit} from "@angular/core";
import {contactsServices} from "../contacts.services";
import {URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
@Component({
    selector: "contacts-list",
    templateUrl: "./contacts-list.component.html",
    styleUrls: [
        "../contacts.component.css"
    ]
})
export class ContactsListComponent implements OnInit {
    tableHeader: Array<Object>;
    tableBody: Array<Object>;
    states: Array<Object>;
    tags: Array<Object>;
    registers: Array<Object>;
    qqs: Array<Object>;
    telephones: Array<Object>;
    channels: Array<Object>;
    froms: Array<Object>;
    showTag: boolean;
    totalItems: number;
    currentPage: number;

    qqNm: string;
    userNm: string;
    userStatus: string;
    timeBegin: string;
    timeEnd: string;
    org1: string;
    org2: string;
    lbl: string;
    wthrRgst: string;
    isQqCheck: string;
    isInputph: string;
    inptChnl: string;
    dataeSource: string;
    oneClass: Array<Object>;
    twoClass: Array<Object>;
    ip: string;
    downloadIp: string;
    display: boolean;
    file_name: string;
    uploadUrl: string;
    message: string;
    params: any;

    constructor(public contactsService: contactsServices, public router: Router) {
        this.tableHeader = [];
        this.tableBody = [];
        this.showTag = false;
        this.totalItems = 0;
        this.currentPage = 1;

        this.qqNm = "";
        this.userNm = "";
        this.userStatus = "";
        this.timeBegin = "";
        this.timeEnd = "";
        this.org1 = "";
        this.org2 = "";
        this.lbl = "";
        this.wthrRgst = "";
        this.isQqCheck = "";
        this.isInputph = "";
        this.inptChnl = "";
        this.dataeSource = "";
        this.ip = "";
        this.downloadIp = "";
        this.display = false;
        this.file_name = "";
        this.message = "";

        // this.contactsService = contactsService;
    }


    ngOnInit() {
        this.uploadUrl = this.contactsService.IP + "interbank/inportConnection";
        // 初始化表格头信息
        this.tableHeader = [
            {operation: "操作区"},
            {usreStatus: "同业宝状态"},
            {qqNo: "QQ"},
            {userNm: "姓名"},
            {instnm: "机构"},
            {inptChnl: "渠道"},
            {createtime: "创建时间"},
            {uName: "操作人"}
        ];
        // 初始化表格内容
        this.tableBody = [];
        // 初始化同业宝状态
        this.states = [
            {
                label: "全部",
                value: ""
            },
            {
                label: "待审核",
                value: "2"
            },
            {
                label: "审核通过",
                value: "1"
            },
            {
                label: "审核失败",
                value: "0"
            }
        ];
        // 初始化业务标签
        this.tags = [
            {
                "label": "全部",
                "value": "",
            },
            {
                "label": "一级市场",
                "value": "1",
            },
            {
                "label": "二级市场",
                "value": "2",
            },
            {
                "label": "线上资金",
                "value": "3",
            },
            {
                "label": "线下资金",
                "value": "4",
            },
            {
                "label": "资金",
                "value": "5",
            },
            {
                "label": "同业存单",
                "value": "6",
            },
            {
                "label": "其他",
                "value": "7",
            }
        ];
        this.registers = [
            {
                label: "全部",
                value: ""
            },
            {
                label: "已注册",
                value: "1"
            },
            {
                label: "未注册",
                value: "0"
            }
        ];
        this.qqs = [
            {
                label: "全部",
                value: ""
            },
            {
                label: "已验证",
                value: "1"
            },
            {
                label: "未验证",
                value: "0"
            }
        ];
        this.telephones = [
            {
                label: "全部",
                value: ""
            },
            {
                label: "已录入",
                value: "1"
            },
            {
                label: "未录入",
                value: "0"
            }
        ];
        this.channels = [
            {
                label: "全部",
                value: ""
            },
            {
                label: "用户",
                value: "0"
            },
            {
                label: "后台创建",
                value: "1"
            },
            {
                label: "后台导入",
                value: "2"
            },
            {
                label: "系统导入",
                value: "3"
            }
        ];
        this.froms = [
            {
                label: "全部",
                value: ""
            },
            {
                label: "QQ群",
                value: "0"
            },
            {
                label: "大金所",
                value: "1"
            }
        ];
        // 调取列表信息
        // let listParams = new URLSearchParams();
        // listParams.set("userId", this.contactsService.userInfo.id.toString());
        // userId: this.contactsService.userInfo.id.toString()
        this.getContactsList(1);
        this.organValue();
        this.ip = this.contactsService.IP + "interbank/exportConnection";
        console.log(this.ip);
    }

    // 定义审核函数
    contactsCheck(value: any) {
        console.log(value);
        this.router.navigate(['./contacts/contacts-detail', value.instid]);
    }

    // 更多筛选
    moreInfoClick() {
        this.showTag = !this.showTag;
    }

    // 定义获取同业宝列表的服务
    getContactsList(page: number) {
        if (this.timeBegin) {
            let dateStart = new Date(this.timeBegin);
            let yStart = dateStart.getFullYear();
            let mStart = dateStart.getMonth();
            let dStart = dateStart.getDate();
            var startDate = yStart + "-" + mStart + "-" + dStart;
        }
        else {
            var startDate = "";
        }
        if (this.timeEnd) {
            let dateEnd = new Date(this.timeEnd);
            let yEnd = dateEnd.getFullYear();
            let mEnd = dateEnd.getMonth();
            let dEnd = dateEnd.getDate();
            var endDate = yEnd + "-" + mEnd + "-" + dEnd;
        }
        else {
            var endDate = "";
        }
        let listParams = {
            qqNm: this.qqNm,
            userNm: this.userNm,
            uName: this.userNm,
            userStatus: this.userStatus,
            timeBegin: startDate,
            timeEnd: endDate,
            org1: this.org1,
            org2: this.org2,
            lbl: this.lbl,
            wthrRgst: this.wthrRgst,
            isQqCheck: this.isQqCheck,
            isInputph: this.isInputph,
            inptChnl: this.inptChnl,
            dataeSource: this.dataeSource,
            cur_page: page,
            show_count: 10
        };
        console.log(listParams, "查询参数");
        this.ip = this.contactsService.IP + "interbank/exportConnection?qqNm=" + this.qqNm + "&userNm=" + this.userNm + "&userStatus=" + this.userStatus + "&timeBegin=" + this.timeBegin + "&timeEnd=" + this.timeEnd + "&org1=" + this.org1 + "&org2=" + this.org2 + "&lbl=" + this.lbl + "&wthrRgst=" + this.wthrRgst + "&isQqCheck=" + this.isQqCheck;
        this.downloadIp = this.contactsService.IP + "interbank/exportConnectionModel";
        console.log(this.ip);
        this.contactsService.getContactsList(listParams).subscribe(listData => {
            if (listData.data.list) {
                console.log(listData, "同业宝列表");
                this.tableBody = listData.data.list;
                this.totalItems = listData.data.page.totalPage;
            }
        })
    }

    // 分页
    pageChanged(event: any) {
        this.getContactsList(event.page);
    }

    // 机构联动
    organValue() {
        let params = {
            parentId: 0
        };
        this.contactsService.organList(params).subscribe(res => {
            console.log(res, "获取机构联动信息");
            this.oneClass = res.data;
        })
    }

    // 二级分类
    childrenClass(id: string) {
        console.log(id);
        let params = {
            parentId: id
        };
        this.contactsService.organList(params).subscribe(res => {
            console.log(res, "获取机构联动信息");
            this.twoClass = res.data;
        })
    }

    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
        this.message = "";
    }

    changeFile(event: any) {
        console.log(event, "获取参数");
        console.log(event.target.files[0]);
        this.params = new FormData();
        this.params.append("inportExcel", event.target.files[0]);
        console.log(this.params, "参数");
    }
    uploadFile() {
        this.contactsService.importCon(this.params).subscribe(res => {
            console.log(res, "文件上传");
            this.message = res.msg;
        })
    }
}

