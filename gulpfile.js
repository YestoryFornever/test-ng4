var gulp = require('gulp');
var data = require('gulp-data');
var path = require('path');

gulp.task('bat', function () {
	return gulp.src(['src/app/+home/**/*.ts', 'src/app/+home/**/*.html', 'src/app/+home/**/*.css'])
	.pipe(data(function (file) {
		if (file.isBuffer()) {
			var str = String(file.contents);

	        str = str.replace(/import GLOBAL = require\([\'\"\.\/]+public/, 'import {INCONFIG} from \'public');
	        str = str.replace(/public\/in.config\'\)/, 'public/in.config\'');
	        str = str.replace(/GLOBAL./g, '');
	        str = str.replace("import UID =  require('../../../classes/uid')",'');

	        var _path = path.relative( path.dirname(file.path), __dirname+'/src/');
	        //处理GLOBAL的路径替换
	        str = str.replace("'public/in.config'", "'"+_path.replace(/\\/g,'/')+"/public/in.config'");
	        //处理模版图片路径
	        str = str.replace(/(['|"|\(])[\.\/]+public\/([\w\s.\\\/\-]*?)(['|"|\)])/g, "$1"+_path.replace(/\\/g,'/')+"/public/$2$3");
	        //处理 DropdownModule
	        str = str.replace(/(\W)DropdownModule/g, '$1BsDropdownModule');
	        //添加 import { FormsModule } from '@angular/forms';
	        if( (/@NgModule/).test(str) && !(/FormsModule/).test(str) ){
	        	str = str.replace("'@angular/core';", "'@angular/core';\nimport { FormsModule } from '@angular/forms';");
	        	str = str.replace(/imports:([\s]{0,})\[/, 'imports: [\nFormsModule,');
	        }
	        //添加 import { CommonModule } from '@angular/common';
	        if( (/@NgModule/).test(str) && !(/CommonModule/).test(str) ){
	        	str = str.replace("'@angular/core';", "'@angular/core';\nimport { CommonModule } from '@angular/common';");
	        	str = str.replace(/imports:([\s]{0,})\[/, 'imports: [\nCommonModule,');
	        }
	        //删除 BrowserModule
	        str = str.replace(/import {([\s]{0,})BrowserModule([\s]{0,})}  from '@angular\/platform-browser';/, '');
	        str = str.replace('BrowserModule,', '');
	        //处理 RouterModule, // import {SnsNewsManagementRouting} from './sns-news-management-routing.module'
	        if ( (/\/\/RouterModule,/).test(str) ) {
	        	var _filename = path.basename(file.path, '.module.ts');
	        	_filename = _filename.replace(".component", "");
	        	var character = _filename.split('');
	        	character[0] = character[0].toUpperCase();
	        	for(var i=0;i<character.length;i++){
	        		if(character[i]=='-'){
	        			var n = i+1;
	        			character[i] = '';
	        			character[n] = character[n].toUpperCase();
	        		}
	        	}
	        	var name = character.join('')+'Routing';
	        	str = str.replace("@NgModule({", "import { "+name+" } from './"+_filename+"-routing.module';\n@NgModule({");
	        	str = str.replace("//RouterModule,", "RouterModule.forChild("+name+"),");
	        };
	        if( (/-routing.module.ts$/).test(file.path) ){
	        	
	        }
	        //处理 dropdownMenu
	        if( (/\.html$/).test(file.path) ){
	        	str = str.replace(/[\s]dropdownMenu[\s]/, ' *dropdownMenu class="dropdown-menu" ');
	        }
	        /**
	         * 处理HTTP
	         * @param  {[type]} (/.html$/).test(file.path) [description]
	         * @return {[type]}                            [description]
	         */
	        /*if( (/\.ts$/).test(file.path) && (/INCONFIG/).test(str) ){
	        	str = str.replace(/[\s]*.+INCONFIG.*([\s]*)/g, '$1');
	        	str = str.replace(/[\s]*.+\.map\(this\.Extract.*([\s]*)/g, '$1');
        		str = str.replace(/[\s]*.+\.catch\(this\.Handle.*([\s]*)/g, '$1');
    			str = str.replace('http: Http', 'proxy: ProxyRequestService');
    			str = str.replace('@Injectable()', 'import { ProxyRequestService } from "app.common";\n@Injectable()');
    			str = str.replace(/this\.IP/g, '"emanager/"');
    			str = str.replace(/this\.http\.post\(([\w\s]+),([\w\s]+).+\)/g, 'this.proxy.post($1, $2)');
    			str = str.replace(/[\s]*.+RequestOptions.*([\s]*)/g, '$1');
    			str = str.replace(/[\s]*.+Headers.*([\s]*)/g, '$1');
    			str = str.replace(/[\s]*.+application\/json.*([\s]*)/g, '$1');
    			str = str.replace(/JSON\.stringify/g, '');
    			str = str.replace('"app.common"', "'"+_path.replace(/\\/g,'/')+"/app/common'");
    			str = str.replace(/[\s]*.+this\.JH.*([\s]*)/g, '$1');
	        }
	        str = str.replace(/\.subscribe\(/g, '.then(');*/
	        	
        	// if( (/\.ts$/).test(file.path) && (/INCONFIG/).test(str) ){
        	// 	str = str.replace(/JsonHeaders/g, 'setLidHeaders()');
        	// 	str = str.replace(/RequestOptions\(.+\)/g, 'RequestOptions({headers: INCONFIG.setLidHeaders()})');
	        // }

	        file.contents = new Buffer(str);
	  	}
	}))
	.pipe(gulp.dest('src/app/+home/'));
});
