import { ElementRef, AfterViewInit, AfterContentInit, EventEmitter, TemplateRef, QueryList } from '@angular/core';
import { BlockableUI } from '../common/api';
export declare class DataList implements AfterViewInit, AfterContentInit, BlockableUI {
    el: ElementRef;
    paginator: boolean;
    rows: number;
    totalRecords: number;
    pageLinks: number;
    rowsPerPageOptions: number[];
    lazy: boolean;
    onLazyLoad: EventEmitter<any>;
    style: any;
    styleClass: string;
    paginatorPosition: string;
    emptyMessage: string;
    alwaysShowPaginator: boolean;
    trackBy: Function;
    onPage: EventEmitter<any>;
    header: any;
    footer: any;
    templates: QueryList<any>;
    _value: any[];
    itemTemplate: TemplateRef<any>;
    dataToRender: any[];
    first: number;
    page: number;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    value: any[];
    handleDataChange(): void;
    updatePaginator(): void;
    paginate(event: any): void;
    updateDataToRender(datasource: any): void;
    isEmpty(): boolean;
    createLazyLoadMetadata(): any;
    getBlockableElement(): HTMLElement;
}
export declare class DataListModule {
}
