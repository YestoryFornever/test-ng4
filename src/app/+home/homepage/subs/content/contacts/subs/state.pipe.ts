import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: "statePipe"
})
export class StatePipe implements PipeTransform {
    transform(value: string) {
        if (value == "1") {
            return value = "生效"
        }
        if (value == "0") {
            return value = "失效"
        }
    }
}