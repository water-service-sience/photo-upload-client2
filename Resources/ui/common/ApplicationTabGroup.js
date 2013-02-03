function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	var APIClient = require("api/APIClient");
	var HomeWindow = require("ui/handheld/HomeWindow");
	var CameraWindow = require("ui/handheld/CameraWindow");
	
	var client = APIClient.client;
	
	
	
	var homeWindow = new HomeWindow(client);
	var cameraWindow = new CameraWindow(client);
	
	var homeTab = Ti.UI.createTab({
		title:L("home"),
		icon: "/images/KS_nav_ui.png",
		window: homeWindow
	});
	homeWindow.containingTab = homeTab;
	var cameraTab = Ti.UI.createTab({
		title:L("camera"),
		icon: "/images/KS_nav_ui.png",
		window: cameraWindow
	});
	cameraWindow.containingTab = cameraTab;
	
	self.addTab(homeTab);
	self.addTab(cameraTab);
	
		
	self.addEventListener("open", function() {
		if (!client.isLogin()) {
			var LoginWindow = require("ui/handheld/LoginWindow");
			var loginWindow = new LoginWindow(client);
			loginWindow.open({
				modal : true,
				modalTransitionStyle : Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL
			});
		}
	}); 

	
	
	
	return self;
};

module.exports = ApplicationTabGroup;
