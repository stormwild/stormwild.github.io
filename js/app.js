
(function ($, window) {

	/* Reference: https://reanimus.github.io/2014/04/14/fun-times-with-jekylls-code-highlighting.html */

	var $code = $('pre code'),
		$line = $('pre code .line');

	$code.html(function(index, html){
		return html.trim().replace(/^(.*)$/mg, '<span class="line">$1</span>');
	});

	$code.each(function(index){
		var codetype = $(this).data('lang'),
			$hilite = $(this).parent();

		$hilite.wrap('<div class="codecontainer"></div>');
		
	    if(codetype) {
	      $hilite.before('<span class="codelabel">code: ' + codetype + '</span>');
	    } 		
	});

	$line.html(function(index, html) {
	    if(!html) {
	    	return "&nbsp";
	    } else {
	    	return html;
        }
  	});

})(jQuery, window, undefined);

