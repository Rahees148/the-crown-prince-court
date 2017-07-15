(function(myApp) {
	myApp.autoSuggestModule
		.service('contacts', function($filter) {
		  this.JSON = [
						{
							"name": "Ann Liebmann",
							"phone": "+27-61-453-5444",
							"email": "ann.lie@",
							"policy_no": "0023283887"
						},
						{
							"name": "Ann Summer",
							"phone": "+27-61-453-5444",
							"email": "ann.summer@",
							"policy_no": "0013983887"
						},
						{
							"name": "Anabelle Samuel",
							"phone": "+27-61-453-5444",
							"email": "ana.sam@",
							"policy_no": "0013983887"
						},
						{
							"name": "Rayees",
							"phone": "+27-61-453-5444",
							"email": "rayees.xyz@",
							"policy_no": "0045683887"
						},
						{
							"name": "Shameer",
							"phone": "+27-61-453-5444",
							"email": "shameer.efg@",
							"policy_no": "0013983887"
						},
						{
							"name": "Jasir",
							"phone": "+27-61-453-5444",
							"email": "jasir.hij@",
							"policy_no": "0013983887"
						}
					]
			    
    			this.getData = function(searchKey) {
    			  var filteredArr = [];
    			  if(searchKey && searchKey.length > 2){
							filteredArr = $filter('filter')(this.JSON, searchKey);
						}
    			  return {filteredArr};
    			}
		})
})(myApp || {});