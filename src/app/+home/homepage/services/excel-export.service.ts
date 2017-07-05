import { Injectable } from '@angular/core';

@Injectable()
export class ExcelExportService {
	
	constructor() {}
	export(table:any, excel_helper:any, filename?:string){
		let name:string;
		let dt = new Date();
		let day = this.A0(dt.getDate());
		let month = this.A0(dt.getMonth() + 1);
		let year = dt.getFullYear();
		let hour = this.A0(dt.getHours());
		let mins = this.A0(dt.getMinutes());
		name = filename?filename + year + month + day + hour + mins + '.xls':year + month + day + hour + mins + '.xls';
		
		let table_text="<table border='2px'><tr bgcolor='#87AFC6'>";
		let textRange:any;
		let j=0;
		for(j = 0 ; j < table.rows.length ; j++)
		{
			table_text=table_text+table.rows[j].innerHTML+"</tr>";
		}
		table_text=table_text+"</table>";
		table_text= table_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
		table_text= table_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
		table_text= table_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

		let msie = window.navigator.userAgent.indexOf("MSIE ");
		let result:any;
		if (typeof msie !== "undefined" && msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))// If Internet Explorer
		{
			excel_helper.contentWindow.document.open("txt/html","replace");
			excel_helper.contentWindow.document.write(table_text);
			excel_helper.contentWindow.document.close();
			excel_helper.focus(); 
			result=excel_helper.contentWindow.document.execCommand("SaveAs", true, name);
		}else{
			let a = document.createElement('a');
			a.href = 'data:application/vnd.ms-excel,' + encodeURIComponent(table_text);
			a.download = name;
			a.click();

			//result = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table_text)); 
		}
		return (result);
	}
	private A0(num:any){
		return num>10?num.toString():("0"+num);
	}
}