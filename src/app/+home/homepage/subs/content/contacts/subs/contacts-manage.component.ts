import {Component, OnInit} from "@angular/core";
import {contactsServices} from "../contacts.services";
@Component({
    selector: "contacts-manage",
    templateUrl: "./contacts-manage.component.html",
    styleUrls: [
        "../contacts.component.css"
    ]
})
export class ContactsManageComponent implements OnInit {
    users: Array<Object>;
    user_header: Array<Object>;

    constructor(public contactsService: contactsServices) {

    }

    ngOnInit() {
        this.user_header = [
            {
                customsid: "序号",
                customsname: "客服昵称",
                customsqq: "联系QQ号",
                customsEStatus: "当前状态"
            }
        ];
        this.clientList();
    }

    // 删除
    deleteClick(item: Object) {
        console.log(item);
    }

    // 新增
    addUser() {
        this.users.push(
            {
                customsname: "",
                customsqq: "",
                customsEStatus: '0'
            }
        )
    }

    // 列表
    clientList() {
        let params = {};
        this.contactsService.selectClientList(params).subscribe(data => {
            this.users = data;
            console.log(data);
        })
    }

    //
    editInfo(row: any) {
        row.editTag = true;
    }

    // 修改
    editBtn(row: any) {
        row.editTag = false;
        let params = {
            customsid: row.customsid,
            customsname: row.customsname,
            customsqq: row.customsqq,
            customseStatus: row.customsEStatus
        };
        this.contactsService.editCustomer(params).subscribe(data => {
            console.log(data);
            if (data.status == 0) {
                this.clientList();
            }
        })
    }
    // 无效
    noUse(row: any) {
        row.editTag = false;
        let params = {
            customsid: row.customsid,
            customsname: row.customsname,
            customsqq: row.customsqq,
            customseStatus: 0
        };
        this.contactsService.editCustomer(params).subscribe(data => {
            console.log(data);
            if (data.status == 0) {
                this.clientList();
            }
        })
    }
    use(row: any) {
        row.editTag = false;
        let params = {
            customsid: row.customsid,
            customsname: row.customsname,
            customsqq: row.customsqq,
            customseStatus: 1
        };
        this.contactsService.editCustomer(params).subscribe(data => {
            console.log(data);
            if (data.status == 0) {
                this.clientList();
            }
        })
    }

    // 添加
    addBtn(row: any) {
        let params = {
            customsname: row.customsname,
            customsqq: row.customsqq,
            customseStatus: row.customsEStatus
        };
        this.contactsService.addCustomer(params).subscribe(data => {
            console.log(data);
            if (data.status == 0) {
                this.clientList();
            }
        })
    }

    // 删除
    deleteBtn(row: any) {
        if (confirm("您确定删除客服吗？")) {
            let params = {
                customsid: row.customsid
            };
            this.contactsService.deleteCustomer(params).subscribe(data => {
                console.log(data);
                if (data.status == 0) {
                    this.clientList();
                }
            })
        }
    }
}