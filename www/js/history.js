
/*  replaced with chargeRecords

function chargeHistory(){
    if(localStorage.getItem('history')){ // if there is nothing there will be NULL = false
    	var localData = JSON.parse(localStorage.getItem('history'));
		//alert ("It is found");
		var item="";
		var jtemp="Go To Favorits";
		$.each(localData,function(key, value){
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + localData[key].code_image + "Z\" name=\"simProd\" class=\"navigate-right\"><button  id=\"" + localData[key].code_image + "\" name=\"addFav\" class=\"btn\">+Fav</button>" +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + localData[key].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    localData[key].desc_en +
                                    "<p>" + localData[key].form_en + "</p>" +
                                    "<p>" + localData[key].brand_en + "</p>" +
                                    "<p>" + scanDate(localData[key].tStamp) + "</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
    	//	alert(localData[key].desc_en);
    	//	alert(localData[key].form_en);
    	});
    	           
    	$("#historyItems").html(item);
    }
};

*/



function addFavoriteItem(imageCode){
    if (!checkItemRepetitionFav(imageCode)){
    	var newFavorite;
    	var existingHistory = JSON.parse(localStorage.getItem('history'));
		$.each(existingHistory,function(key, value){
			if(existingHistory[key].code_image == imageCode){	
				newFavorite= makeJsonString(existingHistory[key]);
			};
		});
		addToLocalFavorite(newFavorite);
	}else{
		alert("This item already exists in favorites list.");
	};
};

//update localstorage history
function addToLocalFavorite(newFavorite){
	var newProduct = JSON.parse(newFavorite);
    if (localStorage.getItem('favorite')){ 	
    	var existingProducts = JSON.parse(localStorage.getItem('favorite'));      	
    	var newProductList=existingProducts.concat(newProduct);
    		localStorage.setItem('favorite', JSON.stringify(newProductList));
	    }
	else   {
			localStorage.setItem('favorite', JSON.stringify(newProduct));

		}
	     	
};


// prevent repetition in history list
function checkItemRepetitionFav(imageCode) {
	if(localStorage.getItem('favorite')){
    	var localData = JSON.parse(localStorage.getItem('favorite'));
		 // if there is nothing there will be NULL = false
		var exists= false;
		$.each(localData, function(key, value) {
		  	if(localData[key].code_image == imageCode) {
		  	//alert("This item exists in history.");
			exists= true;
		  }    
	   });
}
return exists;
}






function removeItem(barcode) {
    var localData = JSON.parse(localStorage.getItem('history'));
    if (localData){  // if there is nothing there will be NULL = false
	   $.each(localData, function(key, value) {
		  if(result[property] == value) {
			  //Remove from array
			  array.splice(index, 1);
		  }    
	   });
}
}

function showHistory(){
    var localData = JSON.parse(localStorage.getItem('history'));
    if (localData){  // if there is nothing there will be NULL = false
		$.each(function(key, value){
    		alert(key);
    		alert(value);
    	});
    }
}


document.addEventListener('click', function(e) {
    var elementName=e.target.name;
    if (elementName == "addFav"){
    	addFavoriteItem(e.target.id);
    	var jhid="#" + e.target.id;
    	$(jhid).hide();
    }
    if (elementName == "simProd"){
    	var imageCodeZ=e.target.id; 
    	var imageCode=imageCodeZ.substring(0, imageCodeZ.length-1);  // to have uniq id’s we added an Z to the id of this item, here he cut this Z to obtain the real code
    	

    	
    	setSimilar(imageCode);
    }
});

////////////////////////////////////
// make json string using an array
// parameter: array refrence
// return: json string
// Author: Alireza Goodarzi
////////////////////////////////////
function makeJsonString(arrJSON){
	var jsonString='[{';
	$.each(arrJSON,function(key, value){
		jsonString = jsonString + '"' + key + '":"' + arrJSON[key] + '",';
	});
	jsonString = jsonString.substring(0, jsonString.length -1) + '}]';
	console.log(jsonString);
	return jsonString;
}


////////////////////////////////////
// delete one row from json string using an image code
// parameter: image code
// return: nothing
// Author: Alireza Goodarzi
////////////////////////////////////
function deleteFromHistory(imageCode){
	if (confirm('It will delete this item from the list.')){
		var jsonString="";
		var subJSON;
		var localData = JSON.parse(localStorage.getItem('history'));
		$.each(localData,function(key, value){
			if(localData[key].code_image != imageCode) {
				subJSON = makeJsonString(localData[key]);
				jsonString=jsonString + subJSON.substring(1, subJSON.length -1)  + ',';
			  }
		}); 	
		jsonString='[' + jsonString.substring(0, jsonString.length -1) + ']';
		localStorage.setItem('history', jsonString);
		chargeHistory();
	}
}



function setSimilar(imageCode){

	localStorage.setItem('imageCode', imageCode);
	location.href="similar.html";

};












