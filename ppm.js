$.get( location.href, function( data ) {
	var page = data.match(/TShop.Setup\(([\s\S]*?)\)/)
	init(JSON.parse(page[1]));
});

function init(cfg){
	var skuMap = cfg.valItemInfo.skuMap;

	$( ".tb-prop" ).delegate( "li", "click", function() {

		var result;
		var data = [];

		$('.tb-selected').each(function(){
			var value = $(this).data('value');
			if (value && value.indexOf('-') === -1) {
				data.push(value);
			};
		});

		if(data.length == 0) return;

		for(var sku in skuMap){
			var found = true;
			for(j in data){
				if(sku.indexOf(data[j]) ===-1) found = false;
			}
			if(found == true){
				result = skuMap[sku].skuId;
				printSku(result);
				return;
			}
		}

	});

}

function printSku(skuId){
	if($('#ppm-sku').size() == 0){
		$('.tb-sku').before('<dl class="tb-amount tm-clear" id="ppm-sku"><dt class="tb-metatit">skuId</dt><dd><span id="ppm-sku-id" style="color:red"></span><em id="ppm-sku-url"></em></dd></dl>');
	}	
	$('#ppm-sku-id').html(skuId);
	$('#ppm-sku-url').html('<a href="'+buildProductURL(skuId)+'" target="_blank">链接<a/>');
}

function buildProductURL(skuId){
	var match = location.href.match(/id=(\d+)/);
	var id = match[1];
	var product_url = 'http://detail.tmall.com/item.html?id=' + id + '&skuId=' + skuId;
	return product_url;
}
