
(function () {
	function aptStart() {
		console.log('wordfreq loaded');

		$('body').contents().filter(function() {return this.nodeType == 8;}).remove();
		$('body').find('script').remove();

		var body_text = $('body').text();
		tasks.processText(body_text);
		word_counts = tasks.getSortedList();

		// highlight all key word
		$( word_counts.slice(0,20).map(function(a){return a[0]}) ).each(function(i,e){ $('body').highlight(e) })

		var css = document.createElement("link");
        css.rel = "stylesheet";
		css.type = "text/css";
		css.href = "https://appletone.github.io/Reader-Bot/menu.css";
		document.body.appendChild(css);

        var h_tags = $($('h1, h2, h3, h4, h5, h6, b, strong, u').map(function(i, a){ return a.innerText.trim() })).filter(function(i,a){ return a.trim().length != 0; });
        var menu_li = $(h_tags).map(function(i,a){ return "<li><a href=#>"+ a + "</a></li>"; }).toArray().join("");
        var menu_src = '<nav class="nav"><ul style="z-index: 9999; "><li><input type="button" onclick="$(\'#menu_ul\').toggle();" value="show/hide" style="float: right; "/></li></ul><ul id="menu_ul"><li>&nbsp;</li>' + menu_li + '</ul><nav>';

        $('body').prepend( menu_src );
	};

    function loadScript(url, callback) {
        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js", function () {
         //jQuery loaded
         console.log('jquery loaded');

 		loadScript("https://appletone.github.io/Reader-Bot/jquery.highlight-4.js", function() {
 			console.log('highlight loaded');

 			loadScript("https://appletone.github.io/Reader-Bot/wordfreq.worker.js", aptStart);
 		});
    });

})();
