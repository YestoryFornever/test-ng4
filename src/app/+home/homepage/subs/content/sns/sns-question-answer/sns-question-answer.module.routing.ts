import {Routes} from '@angular/router';
import {SnsQuestionAnswer} from './sns-question-answer.component';
import  {SnsQuestionAnswerDetial} from './sns-question-answer-detial/sns-question-answer-detial.component';
import {SnsQuestionAnswerList} from "./sns-question-answer-list/sns-question-answer-list.component";

export const SnsQuestionAnswerRouting: Routes = [
    {
        path: 'sns-question-answer',
        component: SnsQuestionAnswer,
        children: [
            {
                path: '',
                redirectTo: 'sns-question-answer-list',
                pathMatch: 'full'
            },
            {
                path: 'sns-question-answer-list',
                component: SnsQuestionAnswerList
            },
            {
                path: 'sns-question-answer-detial/:id',
                component: SnsQuestionAnswerDetial
            }
        ]
    }
];