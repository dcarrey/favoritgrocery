


////////////////////////////////////
// get similar products base on category using an image code
// parameter: image code
// return: similar product json
// Author: Alireza Goodarzi
////////////////////////////////////
function similarProducts(){   
	var imageCode=localStorage.getItem('imageCode');   // imageCode from history
	
	
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




function chargeSimilar(simProdJSON){
	var enseigne;
	$.getJSON("json/enseigne.json", function(jenseigne) {
    	enseigne=jenseigne;
    	console.log(enseigne);
    
	});


	var item="";
		$.each(simProdJSON.hits.hits,function(key, value){
		
		var result = $.grep(enseigne, function(ens){ 
			return  ens.ei == simProdJSON.hits.hits[key]._source.e;
		});
		//alert(result[0].en);

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
                                    "<p>Special price: $" + simProdJSON.hits.hits[key]._source.s + 
                                    "   Discount: " + simProdJSON.hits.hits[key]._source.b + "%</p>" +
                                "</div>" +
                        "</a>" +
                    "</li>" ;
    	});
    	console.log(item);
	$("#similarItems").html(item);    	           
};
