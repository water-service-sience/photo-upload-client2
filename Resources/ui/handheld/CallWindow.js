

function CallWindow(photo){
	
	var catalogue = require("ui/common/UICatalogue");
	
    var self = catalogue.createWindow({
    	title:L("call"),
		tabBarHidden:true
    });
    
    self.add(catalogue.createLabel({
    	text:"03-xxxx-xxxx",
    	top:"6%",
    	left:"5%",
    	width:"45%"
    }));
    var call1Button = catalogue.createButton({
    	title:"call to A",
    	top:"5%",
    	left:"50%",
    	width:"30%"
    });
    self.add(call1Button);
    call1Button.addEventListener("click",function(e){
    	Ti.API.debug("Call to 117");
    	Ti.Platform.openURL("tel:117");
    });
    
    var mailButton = catalogue.createButton({
    	title:"mail to B",
    	top:"30%",
    	left:"25%",
    	width:"50%"
    });
    self.add(mailButton);
    mailButton.addEventListener("click",function(e){
    	Ti.API.debug("Mail to B");
    	var emailDialog = Ti.UI.createEmailDialog();
    	emailDialog.setSubject("Great photo!");
    	emailDialog.setMessageBody("http://xxx.xxx.com.This photo is exit!This mail is not spam!");
    	emailDialog.open();
    });
    
    return self;
}


module.exports = CallWindow;
