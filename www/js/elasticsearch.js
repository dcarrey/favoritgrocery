//========================================================================================
//== Call ajax vers ElasticSearch qui retourne les produits similaires courants. Le 
//== tableau de résultats se trouve dans "result.hits.hits"
//== En cas d'erreur, "result" est vide.
//== auteur : Alix Boc
//== date : mai 2014
//== version : 0.1
//========================================================================================
function call_elasticsearch_similar_products (desc,brand,format,id_categorie){
	
	var result = "";
	desc 	= encodeURI(desc);
	brand 	= encodeURI(brand);
	format 	= encodeURI(format);
	var query = 	{
					"size" : 10,					
					"query" :{
						"bool" : {
							"must" : {
								"fuzzy_like_this" : {
									"fields" : ["x","xe"],
									"like_text" : desc
								}
							},
							"must" : {
								"term" : { 
									"c" : id_categorie
								}
							},
							"should" : {
								"fuzzy_like_this" : {
									"fields" : ["q","qe"],
									"like_text" : format
								}
							},
							"should" : {
								"fuzzy_like_this" : {
									"fields" : ["w","we"],
									"like_text" : brand
								}
							}
						}
						
					}
				};
	$.ajaxSetup({async: false});
	$.get("http://www.trex.uqam.ca/es/_search?source=" + JSON.stringify(query)).success(function(data){
		console.log(data); 
		result = data;
	}).error(function(data){
	});
	
	return result;
}