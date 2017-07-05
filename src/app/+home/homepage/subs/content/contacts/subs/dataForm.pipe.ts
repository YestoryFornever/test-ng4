import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: "dataFrom"
})
export class DataFrom implements PipeTransform {
    transform(value: string) {
        if (value == "1") {
            return value = "大金所"
        }
        if (value == "0") {
            return value = "QQ群"
        }
    }
}