function LoginWindow(client){
	var catalogue = require("ui/common/UICatalogue");
	var self = catalogue.createWindow(L("Login"));
	
	self.add(catalogue.createLabel({
		text:L("nickname"),
		left:"5%",
		top:"5%",
		width:"30%"
	}));
	
	var nicknameField = catalogue.createTextField({
		left:"30%",
		top:"5%",
		width:"65%"
	});
	self.add(nicknameField);
	
	var errorMessageLabel = catalogue.createLabel({
		text:"",
		left:"5%",
		top :"12%",
		width:"90%",
		color:"red",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	self.add(errorMessageLabel);
	
	var createButton = catalogue.createButton({
		title:L("create"),
		left:"20%",
		width:"60%",
		top:"20%"
	});
	self.add(createButton);
	
	createButton.addEventListener("click",function(){
		if(nicknameField.value.length == 0){
			errorMessageLabel.visible = true;
			errorMessageLabel.text = L("Please input nickname");
		}else{
			client.createUser(nicknameField.value,function(success){
				if(success){
					self.close();
				}else{
					errorMessageLabel.visible = true;
					errorMessageLabel.text = L("Fail to create user"); 

					
				}
			})
		}
	});
	
	return self;
}


module.exports = LoginWindow;
