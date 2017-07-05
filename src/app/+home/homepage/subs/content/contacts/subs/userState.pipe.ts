import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: "userState"
})
export class UserState implements PipeTransform {
    transform(value: string) {
        if (value == "2") {
            return value = "待审核"
        }
        if (value == "1") {
            return value = "审核通过"
        }
        if (value == "0") {
            return value = "审核失败"
        }
    }
}