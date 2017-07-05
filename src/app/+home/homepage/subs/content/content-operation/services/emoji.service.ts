import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery';
@Injectable()
export class CustomEmojiService {
	constructor () {
		// this.debugging = true;
	}
	/*查询列表+*/
	initCustomEmoji(): void {
		// Define popup template.
		$.extend((<any>$).FroalaEditor.POPUP_TEMPLATES, {
			"customPlugin.popup": '[_BUTTONS_][_CUSTOM_LAYER_]'
		});

		// Define popup buttons.
		$.extend((<any>$).FroalaEditor.DEFAULTS, {
			popupButtons: ['popupClose', '|', 'popupButton1', 'popupButton2'],
		});

		// The custom popup is defined inside a plugin (new or existing).
		(<any>$).FroalaEditor.PLUGINS.customPlugin = function (editor:any) {
			// Create custom popup.
			function initPopup () {
				// Popup buttons.
				var popup_buttons = '';

				// Create the list of buttons.
				if (editor.opts.popupButtons.length > 1) {
					popup_buttons += '<div class="fr-buttons">';
					popup_buttons += editor.button.buildList(editor.opts.popupButtons);
					popup_buttons += '</div>';
				}

				// Load popup template.
				var template = {
					buttons: popup_buttons,
					custom_layer: '<div style="padding:10px;text-align: center;" class="custom-layer">Hello World!</div>'
				};

				// Create popup.
				var $popup = editor.popups.create('customPlugin.popup', template);

				return $popup;
			}

			// Show the popup
			function showPopup () {
				// Get the popup object defined above.
				var $popup = editor.popups.get('customPlugin.popup');

				// If popup doesn't exist then create it.
				// To improve performance it is best to create the popup when it is first needed
				// and not when the editor is initialized.
				if (!$popup) $popup = initPopup();

				// Set the editor toolbar as the popup's container.
				editor.popups.setContainer('customPlugin.popup', editor.$tb);

				// This will trigger the refresh event assigned to the popup.
				// editor.popups.refresh('customPlugin.popup');

				// This custom popup is opened by pressing a button from the editor's toolbar.
				// Get the button's object in order to place the popup relative to it.
				var $btn = editor.$tb.find('.fr-command[data-cmd="myButton"]');

				// Set the popup's position.
				var left = $btn.offset().left + $btn.outerWidth() / 2;
				var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

				// Show the custom popup.
				// The button's outerHeight is required in case the popup needs to be displayed above it.
				editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
			}

			// Hide the custom popup.
			function hidePopup () {
				editor.popups.hide('customPlugin.popup');
			}

			// Methods visible outside the plugin.
			return {
				showPopup: showPopup,
				hidePopup: hidePopup
			}
		};

		// Define an icon and command for the button that opens the custom popup.
		(<any>$).FroalaEditor.DefineIcon('buttonIcon', { NAME: 'star'});
		(<any>$).FroalaEditor.RegisterCommand('myButton', {
			title: 'Show Popup',
			icon: 'buttonIcon',
			undo: false,
			focus: false,
			plugin: 'customPlugin',
			callback: function () {
				this.customPlugin.showPopup();
			}
		});

		// Define custom popup close button icon and command.
		(<any>$).FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
		(<any>$).FroalaEditor.RegisterCommand('popupClose', {
			title: 'Close',
			undo: false,
			focus: false,
			callback: function () {
				this.customPlugin.hidePopup();
			}
		});

		// Define custom popup 1.
		(<any>$).FroalaEditor.DefineIcon('popupButton1', { NAME: 'bell-o' });
		(<any>$).FroalaEditor.RegisterCommand('popupButton1', {
			title: 'Button 1',
			undo: false,
			focus: false,
			callback: function () {
				alert("popupButton1 was pressed");
			}
		});

		// Define custom popup 2.
		(<any>$).FroalaEditor.DefineIcon('popupButton2', { NAME: 'bullhorn' });
		(<any>$).FroalaEditor.RegisterCommand('popupButton2', {
			title: 'Button 2',
			undo: false,
			focus: false,
			callback: function () {
				alert("popupButton2");
			}
		});

		/*(<any>$).FroalaEditor.DefineIcon('alert', {NAME: 'info'});
		(<any>$).FroalaEditor.RegisterCommand('alert', {
			title: 'Hello',
			focus: false,
			undo: false,
			refreshAfterCallback: false,
			callback: function () {
				alert('Hello!');
			}
		});*/
	}
}