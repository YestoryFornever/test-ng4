/*
* 1. Directive: 指令模块
* 2. ElementRef: 获取节点
* 3. Renderer： 渲染新节点
* 4. HostListener: 监听、并绑定事件
*
*/
import {Directive, ElementRef, HostListener, Renderer, Input} from "@angular/core";
@Directive({
    selector: '[copyText]'
})
export class CopyTextDirective {
    constructor(public el: ElementRef, public rd: Renderer) {

    }
    @Input("copyText") cpClass: string;
    @HostListener("click")
    onClick() {
        // 调取方法
        this.copyTextFun(this.cpClass);
    }
    public copyTextFun(copyClass: string) {
        var that = this;
        console.log(this.el.nativeElement, copyClass);
            // let clipboard = new Clipboard("." + copyClass, {
            //     text: function () {
            //         console.log(that.el.nativeElement.className);
            //         let copyContent = that.el.nativeElement.className.slice(4);
            //         return copyContent;
            //     }
            // })
    }
}