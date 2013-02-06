function CalendarWindow(client){
	var catalogue = require("ui/common/UICatalogue");
	var PhotoDetailWindow = require("ui/handheld/PhotoDetailWindow")
	
	var self = catalogue.createWindow({
		title:L("calendar"),
		tabBarHidden:true
	});
	var now = new Date();
	var month = now.getMonth() + 1;
	var year = now.getYear() + 1900;
	
	var prevButton = catalogue.createButton({
		title:L("prevMonth"),
		top:"1%",
		left:"3%"
	});
	self.add(prevButton);
	var nextButton = catalogue.createButton({
		title:L("nextMonth"),
		top:"1%",
		right:"3%"
	});
	self.add(nextButton);
	var monthLabel = catalogue.createLabel({
		text: month + "month",
		top:"5%",
		left:"30%",
		width:"40%",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		
	});
	self.add(monthLabel);
	
	var calendarView = catalogue.createView({
		top:"15%",
		left:"1%",
		width:"98%",
		height:"50%"
	});
	self.add(calendarView);
	
	var photoListView = catalogue.createScrollView({
		top:"65%",
		left:0,
		width:"100%",
		height:"30%"
	});
	self.add(photoListView);
	
	var dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"];
	var daysOfMonth = [0,31,28,31,30,31,30,31,31,30,31,30,31];
	if(year %4 == 0){
		daysOfMonth[2] = daysOfMonth[2] + 1;
	}
	
	var formatDate = function(month,day) {
		if(month < 10){
			if(day < 10){
				return "0" + month + "/0" + day;
			}else{
				return "0" + month + "/" + day;
			}
		}else{
			
			if(day < 10){
				return month + "/0" + day;
			}else{
				return month + "/" + day;
			}
		}
	}
	
	var update = function(year,month){
		var children = calendarView.children;
		for(var i in children){
			var c = children[i];
			calendarView.remove(c);
		}
		client.getPhotosInMonth(year,month,function(data){
			Ti.API.debug("First" + data.firstDayOfWeek);
			
			var x = data.firstDayOfWeek - 1;
			var y = 0;
			for(var i = 1 ;i <= daysOfMonth[month] ; i++){
				var tag = formatDate(month,i);
				var photos = data[tag];
				var view = catalogue.createView({
					top:(18 * y + 10) + "%",
					left:(14 * x) + "%",
					height:"20%",
					width:"14%",
					photos : photos,
					backgroundColor:"#ffffcc",
					borderRadius:5,
					borderWidth:1,
					borderColor:"black"
				});
				view.add(catalogue.createLabel({
					text:tag,
					left:0,
					width:"100%",
					top:0,
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					bubbleParent:true,
					touchEnabled:false
				}));
				var l = "";
				if(photos){
					l = photos.length;
				}else{
					l = "0";
				}
				view.add(catalogue.createLabel({
					text : l,
					left:0,
					width:"100%",
					top:"50%",
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					bubbleParent:true,
					touchEnabled:false
				}));
				if(photos){
					view.addEventListener("click",function(e){
						var photos = e.source.photos;
						updateImageList(photos);
					});
				}
				x += 1;
				if(x == 7){
					y += 1;
					x = 0;
				}
				
				calendarView.add(view);
			}
			
		});
		monthLabel.text = L("month" + month);
		for (var i = 0; i < 7; i++) {
			calendarView.add(catalogue.createLabel({
				text : dayOfWeek[i],
				left : (14 * i) + "%",
				width : "14%",
				height : "10%",
				top : 0,
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				backgroundColor : "#ffff66",
				borderRadius : 5,
				borderWidth : 1,
				borderColor : "black"

			}));
		}

	}
	
	var updateImageList = function(photos){
		
		var children = photoListView.children;
		for(var i in children){
			var c = children[i];
			photoListView.remove(c);
		}
		
		for(var i in photos){
			var p = photos[i];
			
			var image = Ti.UI.createImageView({
				image : "images/now_loading.png",
				top:0,
				left:(20 * i) + "%",
				width:"20%",
				height:"100%",
				photo:p
			});

			client.getImage(p, function(data,imageView) {
				if (data) {
					imageView.image = data;
				}
			},image); 
			photoListView.add(image);
			
			image.addEventListener("click",function(e){
				var photo = e.source.photo;
				var win = new PhotoDetailWindow(client,photo);
				win.containingTab = self.containingTab;
				self.containingTab.open(win);
			});
		}
	}
	
	update(year,month);
	
	prevButton.addEventListener("click",function(){
		month -= 1;
		if(month == 0){
			month = 12;
			year -= 1;
		}
		update(year,month);
	});
	nextButton.addEventListener("click",function(){
		month += 1;
		if(month == 13){
			month = 1;
			year += 1;
		}
		update(year,month);
	});
	
	
	return self;
}

module.exports = CalendarWindow;
