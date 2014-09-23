var Presentation = function(src) {
    var blocks = [];
    var blockComment = /\s*\/\/\s*block\s*/;

    // parse incoming src
    (function() {
        var srcLines = src.split('\n');
        var blockLines = [];

        for (var i = 0; i < srcLines.length; i++) {
            var line = srcLines[i];
            if (line.match(blockComment)) {
                if (blockLines.length) {
                    blocks.push(blockLines.join('\n'));
                }
                blockLines = [];
            } else {
                blockLines.push(line);
            }
        }

        // last one
        if (blockLines.length) {
            blocks.push(blockLines.join('\n'));
        }
    })();

    // stateful bits for below
	var blockIndex = 0;
	var pos = 0;
	var $out;

	var typeBlocks = function() {
		if (blockIndex > blocks.length - 1) return;

        $out.text($out.text() + blocks[blockIndex].charAt(pos));

        if (pos < blocks[blockIndex].length) {
            pos++;
            setTimeout(function() {
                typeBlocks();
            }, 20);

            return;
        }

        pos = 0;
        blockIndex++;
        typeBlocks();
    };

    this.typeInto = function($output) {
    	$output.text('');
    	$out = $output;
      	typeBlocks();
    }
}
