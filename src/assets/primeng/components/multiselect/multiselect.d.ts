import { ElementRef, OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnDestroy, Renderer2, EventEmitter, IterableDiffers } from '@angular/core';
import { SelectItem } from '../common/api';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/ObjectUtils';
import { ControlValueAccessor } from '@angular/forms';
export declare const MULTISELECT_VALUE_ACCESSOR: any;
export declare class MultiSelect implements OnInit, AfterViewInit, AfterViewChecked, DoCheck, OnDestroy, ControlValueAccessor {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    objectUtils: ObjectUtils;
    options: SelectItem[];
    onChange: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    scrollHeight: string;
    defaultLabel: string;
    style: any;
    styleClass: string;
    inputId: string;
    disabled: boolean;
    filter: boolean;
    overlayVisible: boolean;
    tabindex: number;
    appendTo: any;
    dataKey: string;
    displaySelectedLabel: boolean;
    maxSelectedLabels: number;
    selectedItemsLabel: string;
    containerViewChild: ElementRef;
    panelViewChild: ElementRef;
    value: any[];
    onModelChange: Function;
    onModelTouched: Function;
    valuesAsString: string;
    focus: boolean;
    documentClickListener: any;
    container: HTMLDivElement;
    panel: HTMLDivElement;
    selfClick: boolean;
    panelClick: boolean;
    filterValue: string;
    visibleOptions: SelectItem[];
    filtered: boolean;
    valueDiffer: any;
    optionsDiffer: any;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2, differs: IterableDiffers, objectUtils: ObjectUtils);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngDoCheck(): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    setDisabledState(val: boolean): void;
    onItemClick(event: any, value: any): void;
    isSelected(value: any): boolean;
    findSelectionIndex(val: any): number;
    toggleAll(event: any, checkbox: any): void;
    isAllChecked(): boolean;
    show(): void;
    hide(): void;
    close(event: any): void;
    onMouseclick(event: any, input: any): void;
    onFocus(event: any): void;
    onInputBlur(event: any): void;
    updateLabel(): void;
    findLabelByValue(val: any): string;
    onFilter(event: any): void;
    isItemVisible(option: SelectItem): boolean;
    getVisibleOptions(): SelectItem[];
    ngOnDestroy(): void;
}
export declare class MultiSelectModule {
}
