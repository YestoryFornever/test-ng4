/**
 * Created by denvey on 2016/12/22.
 */
import { KeyValueDiffer, ElementRef, KeyValueDiffers, OnDestroy, DoCheck } from "@angular/core";
export declare abstract class Ng2EchartsBase implements OnDestroy, DoCheck {
    options: Object;
    hostElement: ElementRef;
    pChart: any;
    currentWidth: number;
    currentHeight: number;
    differ: any;
    constructor(ele: ElementRef, _differs: KeyValueDiffers);
    readonly chart: any;
    reflow(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    abstract draw(opt: any): void;
}
