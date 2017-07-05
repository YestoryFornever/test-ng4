import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule}     from '@angular/http';

import {RouterModule} from '@angular/router';
import {SnsQuestionAnswer} from './sns-question-answer.component';
import {SnsQuestionAnswerDetial} from './sns-question-answer-detial/sns-question-answer-detial.component';

import {DataTableModule, CalendarModule, SharedModule, DialogModule, InputTextModule, PanelModule, SplitButtonModule, PaginatorModule} from 'primeng/primeng';
import {
    AlertModule,
    DatepickerModule,
    ButtonsModule,
    CollapseModule,
    RatingModule,
    TypeaheadModule,
    PaginationModule,
    ModalModule,
    TabsModule,
    TooltipModule

} from 'ng2-bootstrap/ng2-bootstrap';
import {SnsQuestionAnswerList} from "./sns-question-answer-list/sns-question-answer-list.component";
import "../../../../../../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js";
import "../../../../../../../../node_modules/froala-editor/js/languages/zh_cn.js";
import {FroalaEditorModule, FroalaViewModule} from 'angular2-froala-wysiwyg';
import {QuestionListService} from "./sns-question-answer.services";
import { SnsQuestionAnswerRouting } from './sns-question-answer.module.routing';
@NgModule({
    imports: [
CommonModule,
FormsModule,
        
        DataTableModule,
        SharedModule,
        HttpModule,
        RouterModule.forChild(SnsQuestionAnswerRouting),
        AlertModule,
        DatepickerModule,
        ButtonsModule,
        CollapseModule,
        RatingModule,
        TypeaheadModule,
        PaginationModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        DialogModule,
        InputTextModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        CalendarModule,
        PanelModule,
        SplitButtonModule,
        PaginatorModule
    ],
    declarations: [
        SnsQuestionAnswer,
        SnsQuestionAnswerDetial,
        SnsQuestionAnswerList,
    ],
    providers: [
        QuestionListService
    ]
})
export class SnsQuestionAnswerModule {
}