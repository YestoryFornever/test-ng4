export class ListParams {
    constructor(
        public time_begin: string,
        public time_end: string,
        public user_name: string,
        public title: string,
        public is_tip: boolean,
        public cur_page: string,
        public show_count: string
    ) {}
}