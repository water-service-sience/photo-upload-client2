function PhotoDetailWindow(client,photo){
	var catalogue = require("ui/common/UICatalogue");
	var SinglePhotoMapWindow = require("ui/handheld/SinglePhotoMapWindow");
	
	var self = catalogue.createWindow({
		title:L("photo"),
		tabBarHidden:true
	});
	var image = Ti.UI.createImageView({
		image:"images/now_loading.png",
		left:"20%",
		top:"5%",
		right:"20%",
		height:"30%"
	});
	
	client.getImage(photo,function(data){
		if(data){
		    image.image = data;
		}
	});
	self.add(image);
	
	self.add(catalogue.createLabel({
		text:L("owner") + ":" + photo.ownerName,
		left:"5%",
		top:"35%"
	}));
	
	var mapButton = catalogue.createButton({
		title:L("map"),
		right:"5%",
		top:"35%"
	});
	self.add(mapButton);
	
	var date = new Date();
	date.setTime(photo.captured);
	
	var dateStr = L("captured") + ":" + String.formatTime(date) + " " + String.formatDate(date)
	self.add(catalogue.createLabel({
		text:dateStr,
		top:"40%",
		left:"5%"
	}));
	
	var goodnessToString = function(goodness){
		if(goodness > 20){
			if(goodness > 90){
				return L("veryGood");
			}else if(goodness > 50){
				return L("good");
			}else{
				return L("slightlyGood");
			}
		}else if(goodness < -20){
			if(goodness < -90){
				return L("veryBad");
			}else if(goodness < -50){
				return L("bad");
			}else{
				return L("slightlyBad");
			}
		}else{
			return L("soso");
		}
	}
	
	self.add(catalogue.createLabel({
		text:L("goodness") + ":" + goodnessToString(photo.goodness),
		top:"45%",
		left:"5%"
	}))
	
	
	var commentLabel = catalogue.createLabel({
		text:photo.comment,
		top:"50%",
		left:"5%",
		width:"90%",
		height:"30%"
	});
	self.add(commentLabel);
	
	mapButton.addEventListener("click",function(){
		var w = new SinglePhotoMapWindow(photo);
		self.containingTab.open(w);
	});
	
	return self;
	
}

module.exports = PhotoDetailWindow;
