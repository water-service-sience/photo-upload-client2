

function UploadWindow(client,image){
	var catalogue = require("ui/common/UICatalogue");
	
	var self = catalogue.createWindow({
	    title:L("upload"),
	    tabBarHidden:true	
	});
	
	var imageView = Ti.UI.createImageView({
		image:image,
		top:"5%",
		left:"15%",
		right:"15%",
		height:"auto"
	});
	self.add(imageView);
	
	var l1 = catalogue.createLabel({
		text:L("bad"),
		left:"5%",
		bottom:"25%"
	});
	self.add(l1);
	var l2 = catalogue.createLabel({
		text:L("good"),
		right:"5%",
		bottom:"25%"
	});
	self.add(l2);
	
	var slider = Ti.UI.createSlider({
		bottom:"20%",
		left:"5%",
		height:"5%",
		width:"90%",
		min:-100,
		max:100,
		value:0
	});
	self.add(slider);
	
	
	var uploadButton = catalogue.createButton({
		title:L("upload"),
		bottom: "5%",
		left:"20%",
		right:"20%",
		height:"10%",
		width:"60%",
	});
	self.add(uploadButton);
	
	var progressBar = Ti.UI.createProgressBar({
		bottom:"5%",
		left:"5%",
		right:"5%",
		width:"90%",
		min:0,
		max:100,
		visible:false
	});
	self.add(progressBar);
	
	var lon = 0;
	var lat = 0;
	
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success) {
			alert("This device is not support GPS.");
			return;
		}
		lat = e.coords.latitude;
		lon = e.coords.longitude;
	});
	
	
	var sendAdditionalData = function(e){
		Ti.API.debug("GPS? " + e.hasGpsInfo);
		if(e.hasGpsInfo){
			client.editPhotoInfo(e.photoId,{
				goodness:slider.value
			});
		}else{
			Ti.API.debug("Send also gps info");
			client.editPhotoInfo(e.photoId,{
				goodness:slider.value,
				lat:lat,
				lon:lon
			});
		}
	}
	
	
	uploadButton.addEventListener("click",function(){
		uploadButton.visible = false;
		progressBar.visible = true;
		client.upload(image,function(e){
			var progress = e.progress;
			progressBar.value = progress * 100;
		},function(imageData){
			if(imageData){
				sendAdditionalData(imageData);
				self.close();
			}
		})
	})
	
	
	return self;
	
}

module.exports = UploadWindow;
