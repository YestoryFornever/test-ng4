import { IframeComponent } from './iframe.component';

export const routes = [
  { path: '', children: [
    { path: '', component: IframeComponent },
  ]},
];
