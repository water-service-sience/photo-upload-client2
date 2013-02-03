function CameraWindow(client){
	
	var catalogue = require("ui/common/UICatalogue");
	var UploadWindow = require("ui/handheld/UploadWindow");
    var self = catalogue.createWindow({
    	title:L("camera")
    });
    
    var startCameraButton = catalogue.createButton({
    	title:L("capturePhoto"),
    	left:"20%",
    	top:"5%",
    	width:"60%",
    	height:"10%"
    });
    self.add(startCameraButton);
    
    var fromGallaryButton = catalogue.createButton({
    	title:L("gallary"),
    	left:"20%",
    	top:"20%",
    	width:"60%",
    	height:"10%"
    });
    
    
    startCameraButton.addEventListener("click",function(){
    	Titanium.Media.showCamera({

			success : function(event) {
				Ti.API.debug("picture was taken");
				//imageView.image = event.media;
				
				var win = new UploadWindow(client,event.media);
				win.open();
			},
			cancel : function() {
				if(self.onClosed){
					self.onClosed();
				}
				
			},
			error : function(error) {
				var a = Titanium.UI.createAlertDialog({
					title : 'Camera'
				});
				if (error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('No camera');
				    a.show();
				} else {
					a.setMessage('Unexpected error: ' + error.code);
					
					if(self.onClosed){
						self.onClosed();
					}
				}
			},
			//overlay : overlay,
       	    saveToPhotoGallery:false,
			mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
		});
    });
    fromGallaryButton.addEventListener("click", function() {
		Titanium.Media.openPhotoGallery({
			success : function(e) {
				var win = new UploadWindow(client,e.media);
				//win.open();
				self.containingTab.open(win);
			}
		});
	}); 
    self.add(fromGallaryButton);
    
    
    var startCamera =function(){
		Titanium.Media.showCamera({

			success : function(event) {
				Ti.API.debug("picture was taken");
				imageView.image = event.media;
			},
			cancel : function() {
				if(self.onClosed){
					self.onClosed();
				}
				
			},
			error : function(error) {
				var a = Titanium.UI.createAlertDialog({
					title : 'Camera'
				});
				if (error.code == Titanium.Media.NO_CAMERA) {
					a.setMessage('No camera');
				    a.show();
					
					Titanium.Media.openPhotoGallery({
						success:function(e) {
							imageView.image = e.media;
						}
					});
				} else {
					a.setMessage('Unexpected error: ' + error.code);
					
					if(self.onClosed){
						self.onClosed();
					}
				}
			},
			//overlay : overlay,
       	    saveToPhotoGallery:false,
			mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
		});

	}; 
    
    
    return self;
}

module.exports = CameraWindow;