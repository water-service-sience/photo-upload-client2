function SinglePhotoMapWindow(photo){
	var catalogue = require("ui/common/UICatalogue");
	
	var self = catalogue.createWindow({
		title:L("map"),
		tabBarHidden:true
	});
	
	var mapView = Ti.Map.createView({
		mapType:Ti.Map.STANDARD_TYPE,
		region:{
			latitude:photo.latitude, longitude:photo.longitude, latitudeDelta:0.01, longitudeDelta:0.01		
		},
		animate:true,
		regionFit:true,
		userLocation:false
	});
	self.add(mapView);
	
	var annotation = Ti.Map.createAnnotation({
		latitude:photo.latitude,
		longitude:photo.longitude,
		title:"Here!"
	});;
	mapView.addAnnotation(annotation);
	
	
	return self;
}

module.exports = SinglePhotoMapWindow;
