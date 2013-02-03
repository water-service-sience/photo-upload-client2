function PhotoEditWindow(client,photo){
	var catalogue = require("ui/common/UICatalogue");
	
	var self = catalogue.createWindow({
		title:L("editPhoto"),
		tabBarHidden:true
	});
	
	var image = Ti.UI.createImageView({
		left:"10%",
		top:"5%",
		width:"80%",
		height:"50%",
		image:client.photoBaseUrl + photo.resourceKey
	});
	self.add(image);
	
	self.add(catalogue.createLabel({
		top:"60%",
		left:"5%",
		text:L("comment")
	}));
	
	var commentField = catalogue.createTextField({
		value:photo.comment,
		top:"65%",
		left:"5%",
		width:"90%",
		height:"10%"
	});
	self.add(commentField);
	
	var l1 = catalogue.createLabel({
		text:L("bad"),
		left:"5%",
		top:"75%"
	});
	self.add(l1);
	var l2 = catalogue.createLabel({
		text:L("good"),
		right:"5%",
		top:"75%"
	});
	self.add(l2);
	
	var slider = Ti.UI.createSlider({
		top:"80%",
		left:"5%",
		height:"5%",
		width:"90%",
		min:-100,
		max:100,
		value:photo.goodness
	});
	self.add(slider);
	
	var updateButton = catalogue.createButton({
		title:L("update"),
		top:"90%",
		left:"20%",
		width:"60%",
		height:"10%"
	});
	self.add(updateButton);
	
	updateButton.addEventListener("click",function(){
		client.editPhotoInfo(photo.id,{
			comment:commentField.value,
			goodness:slider.value
		},function(){
			self.close();
		});
	});
	
	
	return self;
	
	
}

module.exports = PhotoEditWindow;
