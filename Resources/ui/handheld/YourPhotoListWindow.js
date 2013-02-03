
function YourPhotoListWindow(client){
	var catalogue = require("ui/common/UICatalogue");
	var self = catalogue.createWindow({
		title:L("yourPhotos"),
		tabBarHidden:true
	});
	
	var refresh = function(){
	    client.getSelfUploadPhotos(function(photos){
	    	Ti.API.debug(photos.length + " photos");
		    var data = [];
		    for(var i in photos){
		    	var p = photos[i];
		    	var date = new Date();
		    	date.setTime(p.captured);
		    	var row = Ti.UI.createTableViewRow({
		    		className:"MyPhoto",
		    		photo:p,
		    		height:"10%"
		    	});
		    	row.add(catalogue.createLabel({
		    		left:"0%",
		    		top:"2%",
		    		text:L("captured") + ":" + String.formatTime(date) + " " + String.formatDate(date) 
		    	}));
		    	data.push(row);
		    }
		    /*self.remove(table);
			table = Ti.UI.createTableView({
				height : "90%",
				top : 0,
				left : 0,
				width : "100%",
				data : data
			}); 
			self.add(table);*/
			table.data = data;

	    });
	}
	var table = Ti.UI.createTableView({
		height:"90%",
		top:0,
		left:0,
		width:"100%"
	});
	self.add(table);
	var refreshButton = catalogue.createButton({
		title:L("refresh"),
		bottom:0,
		height:"10%",
		left:0,
		width:"100%"
	})
	self.add(refreshButton);
	refreshButton.addEventListener("click",refresh);
	var PhotoEditWindow = require("ui/handheld/PhotoEditWindow");
	
	table.addEventListener("click",function(e){
		var row = e.row;
		var w = new PhotoEditWindow(client,row.photo);
	    self.containingTab.open(w);
	});
	
	refresh();
	
	return self;
}

module.exports = YourPhotoListWindow;
