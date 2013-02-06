function HomeWindow(client){
	
	var catalogue = require("ui/common/UICatalogue");
	var PhotoDetailWindow = require("ui/handheld/PhotoDetailWindow");
	
    var self = catalogue.createWindow(L("home"));
    
    var showMapButton = catalogue.createButton({
    	title:L("map"),
    	left:"20%",
    	top:"5%",
    	height:"13%",
    	width:"60%"
    }); 
    self.add(showMapButton);
    var showCalendarButton = catalogue.createButton({
    	title:L("calendar"),
    	left:"20%",
    	top:"20%",
    	height:"13%",
    	width:"60%"
    });
    self.add(showCalendarButton);
    var showYourPhotosButton = catalogue.createButton({
    	title:L("yourPhotos"),
    	left:"20%",
    	top:"35%",
    	height:"13%",
    	width:"60%"
    });
    self.add(showYourPhotosButton);
    self.add(catalogue.createLabel({
    	text:L("problemPlaces"),
    	top:"50%",
    	left:"5%",
    	color:"red"
    }))
    var problemPlacesTable = Ti.UI.createTableView({
    	top:"58%",
    	left:0,
    	width:"100%",
    	height:"30%"
    });
    self.add(problemPlacesTable);
    var updateProblemPlacesButton = catalogue.createButton({
    	title:L("update"),
    	top:"88%",
    	left:0
    });
    self.add(updateProblemPlacesButton)
    
    
    showMapButton.addEventListener("click",function(){
    	var MapWindow = require("ui/handheld/MapWindow");
    	var mapWindow = new MapWindow(client);
    	mapWindow.containingTab = self.containingTab;
    	self.containingTab.open(mapWindow);
    });
    showCalendarButton.addEventListener("click",function(){
    	var CalendarWindow = require("ui/handheld/CalendarWindow");
    	var calWindow = new CalendarWindow(client);
    	calWindow.containingTab = self.containingTab;
    	self.containingTab.open(calWindow);
    });
    showYourPhotosButton.addEventListener("click",function(){
    	var YourPhotoListWindow = require("ui/handheld/YourPhotoListWindow");
    	var yourPhotosWindow = new YourPhotoListWindow(client);
    	yourPhotosWindow.containingTab = self.containingTab;
    	self.containingTab.open(yourPhotosWindow);
    });
    var updateAlerts = function(){
    	Ti.API.debug("Update alerts");
		client.getAlerts(function(r) {
			var data = [];
			Ti.API.debug("There are " + r.length + " alerts");
			for (var i in r) {
				var p = r[i];
				data.push({
					title :L("latLon") + ":" + ("" + p.latitude).slice(0,5) + " , " + ("" + p.longitude).slice(0,5),
					photo:p
				});
			}
			problemPlacesTable.data = data;
		});
	};
    problemPlacesTable.addEventListener("click",function(e){
		var photo = null;
		if(e.source && e.source.photo) photo = e.row.photo;
		else if(e.row && e.row.photo) photo = e.row.photo;
		else if(e.rowData && e.rowData.photo) photo = e.rowData.photo;
		var w = new PhotoDetailWindow(client,photo);
		w.containingTab = self.containingTab;
	    self.containingTab.open(w);
	});

    updateProblemPlacesButton.addEventListener("click",function(){
    	updateAlerts();
    });
    updateAlerts();
    return self;
}

module.exports = HomeWindow;