var typeChar = function ($el) {
	var text = $el.data('text');
	var pos = $el.data('pos');
	$el.text($el.text() + text.charAt(pos));
	if (pos < text.length) {
		pos++;
		$el.data('pos', pos);
		setTimeout(function() {
			typeChar($el);
		}, 20);		
	}
};

var type = function  (text, $el) {
	$el.data('text', text);
	$el.data('pos', 0);
	typeChar($el);
};
