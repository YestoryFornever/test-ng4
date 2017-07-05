import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name: "timePipe"
})
export class TimePipe implements PipeTransform {
    transform(value: string) {
        // 简单的一句代码
        let date = new Date(value); //获取一个时间对象

        /**
         1. 下面是获取时间日期的方法，需要什么样的格式自己拼接起来就好了
         2. 更多好用的方法可以在这查到 -> http://www.w3school.com.cn/jsref/jsref_obj_date.asp
         */
        let y = date.getFullYear();  // 获取完整的年份(4位,1970)
        let m = date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
        let d = date.getDate();  // 获取日(1-31)

        let h = date.getHours();  // 获取小时数(0-23)
        let i = date.getMinutes();  // 获取分钟数(0-59)
        let s = date.getSeconds();  // 获取秒数(0-59)
        return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
    }
}