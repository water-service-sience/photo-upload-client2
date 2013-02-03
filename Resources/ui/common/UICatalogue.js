function merge(){

	var args = Array.prototype.slice.call(arguments), len = args.length, ret = {}, itm;

	for (var i = 0; i < len; i++) {
		var arg = args[i];
		for (itm in arg) {
			if (arg.hasOwnProperty(itm))
				ret[itm] = arg[itm];
		}
	}

	return ret;


}

function createWindow(titleOrSetting){
	
	if(typeof(titleOrSetting) == "string"){
		
		var w = Ti.UI.createWindow({
			title : titleOrSetting,
			backgroundColor : "#ccffff"
		}); 
		return w;
	}else{
		var defaultSettings = {
			backgroundColor : "#ccffff"
		};
		var w = Ti.UI.createWindow(merge(defaultSettings,titleOrSetting));
		return w;
	}
}
function createView(setting){
	
	var defaultSettings = {
		backgroundColor : "#ccffff"
	};
	var w = Ti.UI.createView(merge(defaultSettings, setting));
	return w;

}

function createScrollView(setting){
	
	var defaultSettings = {
		backgroundColor : "#ccffff"
	};
	var w = Ti.UI.createScrollView(merge(defaultSettings, setting));
	return w;

}

/**
 * title
 */
function createButton(setting){
	var defaultSettings = {
		width:"auto",
		height:"auto"
	}; 
    var button = Ti.UI.createButton(merge(defaultSettings,setting));
    
    return button;


}
/**
 * text
 * @param {Object} setting
 */
function createLabel(setting){
	var defaultSettings = {
		width:"auto",
		height:"auto"
	}; 
	var label = Ti.UI.createLabel(merge(defaultSettings,setting));
	
	return label;
}
/**
 * value
 * @param {Object} setting
 */
function createTextField(setting){
	
	var defaultSettings = {
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		height:"auto"
	}; 
	var textField = Ti.UI.createTextField(merge(defaultSettings,setting));
	
	return textField;
}

module.exports = {
	createWindow : createWindow,
	createButton : createButton,
	createLabel :  createLabel,
	createTextField : createTextField,
	createView:createView,
	createScrollView:createScrollView
}
