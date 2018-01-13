///////////////////////////////////////////////////
// SearchBarCode
// searches data base for a barcode using upc.php
// Inpouts: action,codeUPC
//  Output: product information in JSON format
//  Author: Alireza
///////////////////////////////////////////////////
function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "UPC : " + result.text ; //+ "<br/>" +
			//"Format: " + result.format + "<br/>" +
			//"Cancelled: " + result.cancelled;
			//resultDiv.innerHTML = s;
			
			if(result.text.length == 12 || result.text.length == 8){
				searchProduct(result.text);
			}
			else{
				if(result.text != ""){
					alert("upc incorrect");
				}
			}
			
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);

}

function searchProduct(barcode){
 //   var barcode=$.trim($('#barcode1').val());
	//alert("heeeer    " + barcode);
    $.ajax({
        	type: 'GET',
           	url: 'http://50.63.186.48/mobile/upc.php',
           	data:{ 
           		action: "search", 
           		upc: barcode, 
           		},
           	cache: false,
           	datatype: 'json',

           	success: function(output){
            	var prods=JSON.parse(output);
				if (prods[0].desc_en){
            		var item= "<li class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                        "<a class=\"navigate-right\"><button class=\"btn\">+</button>" +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + prods[0].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    prods[0].desc_en +
                                    "<p>" + prods[0].form_en + "</p>" +
                                    "<p>" + prods[0].brand_en + "</p>" +
                                    "<p>" + scanDate($.now()) + "</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
           			$("#scanedItem").html(item);
            		// Repetion check
            		if (!checkItemRepetion(prods[0].code_image)){
            			addToLocalHistory(output);
            			//addToLocalHistory(prods);
            		}else{
						alert("This item is already exists in history list.");
					};
            			similarProducts(prods[0].code_image);
            	}else{
            		alert("Product not found.");
            	}
           	},  
           error: function (data) {
        		alert("ERROR  " + data.desc_en);
           	}
           });
        event.preventDefault();
};


//update localstorage history
function addToLocalHistory(newProductJSON){
	
	
	var newProduct= JSON.parse(newProductJSON);
	
	//var newProduct = newProductJSON;
	
	            			
	//console.log(newProduct);

	newProduct[0].tStamp= $.now();
	            			
	//console.log(newProduct);



    if (localStorage.getItem('history')){ 	
        var existingProduct = JSON.parse(localStorage.getItem('history'));      	
    	var newProductList=newProduct.concat(existingProduct);
    		localStorage.setItem('history', JSON.stringify(newProductList));
	    }
	else   {
			localStorage.setItem('history', JSON.stringify(newProduct));

		}
	     	
};


// prevent repetition in history list
function checkItemRepetion(imageCode) {
    if (localStorage.getItem('history')){  // if there is nothing there will be NULL = false
    var localData = JSON.parse(localStorage.getItem('history'));
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





/////////////////////////////////////////////////
// function: barcodeScan
//   action: starts barcode scanner plugin
//  returns: barcode 
/////////////////////////////////////////////////
function barcodeScan(){
	cordova.plugins.barcodeScanner.scan(
      function (result) {
                $("#barcode1").val(result.text);
                return result.text;
      }, 
      function (error) {
          alert("Scanning failed: " + error);
          return 0;
      }
   );
};

//ReferenceError: Can't find variable: cordova







function getProduct(){
	barcode = barcodeScan();
    if (barcode != 0){
    	$.ajax({
        	type: 'GET',
           	url: 'http://50.63.186.48/mobile/upc.php',
           	data:{ 
           		action: "search", 
           		upc: barcode 
           		},
           	cache: false,
           	datatype: 'json',
           	success: function(output)
           	{
            	var prods=JSON.parse(output);
				if (prods[0].desc_en){
            		var item= "<li class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                        //"<a class=\"navigate-right\"><button class=\"btn\">+</button>" +
                        "<a class=\"navigate-right\">" +
                            "<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + prods[0].path_image + "\"" +
                                "<div class=\"media-body\">" +
                                    prods[0].desc_en +
                                    "<p>" + prods[0].form_en + "</p>" +
                                    "<p>" + prods[0].brand_en + "</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
           			$("#scanedItem").html(item);
            		addToLocalHistory(prods[0]);

            	}
           	},  
           error: function (data) {
        		alert("ERROR");
           	}
        });
    }
};

/*
function scanDate(milisec){
var jNow = new Date(milisec);
var jMonth="";
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
}
*/
















////////////////////
// Temporary is here
//
/////////////////
function similarProducts(imageCode){   
	//var imageCode=localStorage.getItem('imageCode');   // imageCode from history
	
	
	var localHistory = JSON.parse(localStorage.getItem('history'));

	var simProdJSON;

	var desc;
	var brand;
	var format;
	var id_category;
	
	
	$.each(localHistory,function(key, value){

		if(localHistory[key].code_image == imageCode) {
		
		
			desc 	    = localHistory[key].decr_en;
			brand 	    = localHistory[key].brand_en;
			format      = localHistory[key].form_en;
			id_categorie = localHistory[key].id_categorie;
			simProdJSON = call_elasticsearch_similar_products(desc,brand,format,id_categorie);
		}

	}); 	

	chargeSimilar(simProdJSON);
	
}




////////////////////
// Temporary is here
//
/////////////////

function chargeSimilar(simProdJSON){
						
	var enseigne;
	$.getJSON("json/enseigne.json", function(jenseigne) {
    	enseigne=jenseigne;
//    	console.log(enseigne);
    
	});


	var item="";
		$.each(simProdJSON.hits.hits,function(key, value){
		
		var result = $.grep(enseigne, function(ens){ 
			return  ens.ei == simProdJSON.hits.hits[key]._source.e;
		});
		console.log(result[0]);
		//alert(simProdJSON.hits.hits[key]._source.i);
            item = item + "<li  class=\"table-view-cell media\">" +   //"<ul class=\"table-view\">" +
                            "<a id=\"" + simProdJSON.hits.hits[key]._source.i + "Z\" name=\"simProd\" class=\"navigate-right\"><button  id=\"" + simProdJSON.hits.hits[key]._source.i + "\" name=\"addFav\" class=\"btn\">?</button>" +
                            //"<img class=\"media-object pull-left\" src=\"http://50.63.186.48/images_upc/" + localData[key].path_image + "\"" +
                              "<img class=\"media-object pull-left\" src=\"http://mygrocerytour.com/images/correspondence.php?id_produit=" + simProdJSON.hits.hits[key]._source.i + "\" height=\"100\" " +
                                "<div class=\"media-body\">" +
                                    simProdJSON.hits.hits[key]._source.w +
                                    "<p>Product: " + simProdJSON.hits.hits[key]._source.x + "</p>" +
                                    //"<p>" + result[0].en + "</p>" +
                                    "<p><img src=\"http://www.mygrocerytour.ca/images/" + result[0].el + "\"></p>" +
                                    "<p>" + simProdJSON.hits.hits[key]._source.q + "</p>" +
                                    "<h style=\"background-color:red; color:black;  font-weight:bold; \">Special price: $" + simProdJSON.hits.hits[key]._source.s + "</h>" + 
                                    "<h>   Discount: " + simProdJSON.hits.hits[key]._source.b + "%</h>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
    	});
	$("#similarItems1").html(item);  
	console.log(item);  	           
};
