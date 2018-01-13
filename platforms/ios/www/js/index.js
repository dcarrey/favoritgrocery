
//////////////////////////////////////////////////
//   function: addProductToList
//     action: add a current product to our list of product
//    param:  scan_product (result of the scan)
//            to_add_product(product that the user want to add to his list)

function addProductToList(scan_product, to_add_product) {
	// TO DO
	return true;
}


function scanDate(milisec){
var jNow = new Date(milisec);
var jMonth="";
        //alert(jNow);

switch(jNow.getMonth()){
        case 1:jMonth= "January";
            break;
        case 2:jMonth= "February";
            break;
        case 3:jMonth= "March";
            break;
        case 4:jMonth= "April";
            break;
        case 5:jMonth= "May";
            break;
        case 6:jMonth= "June"; 
            break;
        case 7:jMonth= "July";
            break;
        case 8:jMonth= "August";
            break;
        case 9:jMonth= "September";
            break;
        case 10:jMonth= "October";
            break;
        case 11:jMonth= "November";
            break;
        case 12:jMonth= "December";
            break;
        }
var jNowString= "Scaned on " + jMonth + " " + jNow.getDay() + ", " + jNow.getFullYear() + "  at " +
				jNow.getHours()  + ":" + jNow.getMinutes() + ":" + jNow.getSeconds();
				
return jNowString; 
};



//////////////////////////////////////////////////
//   function: chargeRecords
//     action: make product list in html
// parameters: localField is localHistory record name, history or favorite
//             idRecordsPlace is id name of records container in html body
//    returns: nothing 
//
// Author: Alireza Goodarzi
/////////////////////////////////////////////////////
function chargeRecords(localField,idRecordsPlace){
    if(localStorage.getItem(localField)){ // if there is nothing there will be NULL = false
    	if (localField == "history"){
    		var jbutton="+Fav";
    		var jname="addFav";
    	}else{
    	    var jbutton="-";
    		var jname="delFav";
		}
    	var localData = JSON.parse(localStorage.getItem(localField));
		console.log(localData);
		var item="";
		var jtemp="Go To Favorits";
		$.each(localData,function(key, value){
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + localData[key].code_image + "Z\" name=\"simProd\" class=\"navigate-right\"><button  id=\"" + localData[key].code_image + "\" name=\"" + jname + "\" class=\"btn\">" + jbutton + "</button>" +
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
    	           
    	$("#" + idRecordsPlace).html(item);
    }
};


