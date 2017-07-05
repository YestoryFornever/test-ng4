import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'time'
})
export class TimePipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}
	transform(format:any,dateOrTime:any,newType:any) {
		if(format){
			var today = new Date()
			format = new Date(format)
				 var args = {
	           	   Y: format.getFullYear(),
	               M: format.getMonth() + 1,
	               d: format.getDate(),
	               h: format.getHours(),
	               m: format.getMinutes(),
	               s: format.getSeconds(),
	           	};
	           	if(args.M<10){
	           		args.M=0+''+args.M
	           	}
	           	if(args.d<10){
	           		args.d=0+''+args.d
	           	}
	           	if(args.h<10){
	           		args.h=0+''+args.h
	           	}
	           	if(args.m<10){
	           		args.m=0+''+args.m
	           	}
	           	if(args.s<10){
	           		args.s=0+''+args.s
	           	}
	           	if(dateOrTime=='time'){
	           		format = args.Y+'-'+ args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
	           	}else{
	           		format = args.Y+'-'+ args.M +'-'+args.d
	           	}
	           if(newType){
	           		if(args.Y==today.getDate()&&args.Y==today.getMonth()&&args.Y==today.getFullYear()){
	           			format = args.h+':'+args.m+':'+args.s
	           		}
	           		if(args.Y==today.getMonth()&&args.Y==today.getFullYear()){
	           			format = args.d+' '+args.h+':'+args.m+':'+args.s
	           		}
	           		if(args.Y==today.getFullYear()){
	           			format =  args.M +'-'+args.d+' '+args.h+':'+args.m+':'+args.s
	           		}
	           }
	           // 
			}
           return format;
	}
}