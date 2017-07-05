import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';

import { routes } from './home.routes';
import { HomeComponent } from './home.component';
import { AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,
	BsDropdownModule,RatingModule,TypeaheadModule,PaginationModule,ModalModule,
	TabsModule,TooltipModule,
	BsDropdownConfig,
	PaginationConfig,
	TooltipConfig,
	TabsetConfig
} from 'ng2-bootstrap';
import { 
  MultiSelectModule,
  CalendarModule,
  PickListModule, 
  TreeModule,
  TreeNode,
  AutoCompleteModule,
  FileUploadModule 
} from 'primeng/primeng';

import { CustomerChatModule } from '../common/components/customer-chat/customer-chat.module';


@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MultiSelectModule,CalendarModule,PickListModule,TreeModule,AutoCompleteModule,FileUploadModule,
    AlertModule,CarouselModule,DatepickerModule,ButtonsModule,CollapseModule,
		BsDropdownModule.forRoot(),
		RatingModule,TypeaheadModule,PaginationModule,
		ModalModule.forRoot(),
		TabsModule,TooltipModule,
    CustomerChatModule,
  ],
  providers: [
    
  ]
})
export class HomeModule {
  public static routes = routes;
}
