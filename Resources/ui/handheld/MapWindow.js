function MapWindow(client){
	var catalogue = require("ui/common/UICatalogue");
	var PhotoDetailWindow = require("ui/handheld/PhotoDetailWindow");
	
	var self = catalogue.createWindow({
		title:L("map"),
		tabBarHidden:true
	});
	
	var mapView = Ti.Map.createView({
		mapType:Ti.Map.STANDARD_TYPE,
		region:{
			latitude:35.7008623427, longitude:139.7486915584, latitudeDelta:0.01, longitudeDelta:0.01		
		},
		animate:true,
		regionFit:true,
		userLocation:true
	});
	self.add(mapView);
	
	var beforeLon = 0;
	var beforeLat = 0;
	mapView.addEventListener("regionChanged",function(e){
		Ti.API.debug("Region changed " + e.longitude + " : " + e.latitude);
		var dLon = beforeLon - e.longitude;
		var dLat = beforeLat - e.latitude;
		if( dLon * dLon + dLat * dLat > 0.01*0.01){
			updateMapPhotos();
		}
	});
	var updateMapPhotos = function(){
		Ti.API.debug("Begin update photos");
		var lat = mapView.region.latitude;
		var lon = mapView.region.longitude;
		beforeLon = lon;
		beforeLat = lat;
	    client.getPhotosNearBy(lat,lon,function(photos){
	    	Ti.API.debug("Find " + photos.length + " photos");
	    	mapView.removeAllAnnotations();
	    	for( var i in photos){
	    		var photo = photos[i];
	    		var title = "1 photo";
	    		var pin = Titanium.Map.createAnnotation({
	    			latitude: photo.latitude,
	    			longitude:photo.longitude,
	    			title:title,
	    			subtitle:photo.comment,
	    			pincolor:Titanium.Map.ANNOTATION_GREEN,
	    			animate:true,
	    			photo:photo
	    		});
	    		mapView.addAnnotation(pin);
	    		
	    		pin.addEventListener("click",function(e){
	    			var pin = e.source;
	    			Ti.API.debug("Click photo " + pin.photo.id + ":" + pin.photo.resouceKey + " source:" + e.clicksource);
	    			
	    			if(e.clicksource != null){
	    			    var window = new PhotoDetailWindow(client,pin.photo);
	    			    window.containingTab = self.containingTab;
	    			    self.containingTab.open(window);
	    			}
	    			
	    		});
	    	}
	    });
	}
	self.addEventListener("open",function(){
		
		Titanium.Geolocation.getCurrentPosition(function(e) {
			if (!e.success) {
				alert("This device is not support GPS.");
				return;
			}

			Ti.API.debug("Current pos = " + e.coords.latitude + "," + e.coords.longitude + ")");

			var r = mapView.region;
			var newR = {
				latitude : e.coords.latitude,
				longitude : e.coords.longitude,
				latitudeDelta : r.latitudeDelta,
				longitudeDelta : r.longitudeDelta
			};
			mapView.region = newR;
			updateMapPhotos();

		});

	});
	
	return self;
}

module.exports = MapWindow;
