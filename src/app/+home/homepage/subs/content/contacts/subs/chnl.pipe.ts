import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: "inputChnl"
})
export class InputChnl implements PipeTransform {
    transform(value: string) {
        if (value == "2") {
            return value = "系统导入"
        }
        if (value == "1") {
            return value = "后台导入"
        }
        if (value == "0") {
            return value = "后台创建"
        }
    }
}