/******************************

TYPETIP VERSION 0.3 2017-02-04
Created by Andreas Nylin | andreas.nylin@gmail.com | @andreasnylin | andreasnylin.com 

******************************/
((win, doc) => {
	
    const a = doc.createElement('div');
    const b = doc.createElement('div');
    let t = null;

		function getRenderedFontFamily(cs) {
			const test = document.createElement('div');
			test.style = 'position:absolute;top:0;opacity:0;';
			test.innerText = 'ABCabcEFGefg@£$#¤%?+1234-_.,';
			document.querySelector('body').appendChild(test);

			// TODO: Handle default fonts for sans-serif, serif, etc

			return (() => {
				test.style.fontFamily = cs.fontFamily;
				let families = cs.fontFamily.split(',').map((s) => s.trim()),
					width = test.clientWidth,
					height = test.clientHeight,
					family;

				while (families.length) {
					family = families.shift()
					test.style.fontFamily = families.join(',');
					if (width !== test.clientWidth || height !== test.clientHeight) {
						break;
					}
				}

				return family;
			})();
		}

		function pad(text, length, char = ' ') {
			if(text.length >= length) { 
				return text;
			}

			return new Array(length).join(char) + text;
		}

    function rgb2hex(clr) {
    	const rgb = clr.match(/\d+/g);
			return '#' + pad(Number(rgb[0]).toString(16), 2, '0') + pad(Number(rgb[1]).toString(16), 2, '0') + pad(Number(rgb[2]).toString(16), 2, '0');
    }

    a.style = 'position:absolute;background:rgba(0,0,0,.9);color:white;padding:5px;font-family:monospace;font-size:11px;z-index:99999999;min-width:200px;min-height:150px;transition:all .25s;text-align:left;opacity:0;;pointer-events:none';
    b.style = 'position:absolute;outline: dotted 1px green;z-index:99999999;transition:all .25s;pointer-events:none';

    doc.body.appendChild(a);
    doc.body.appendChild(b);

    doc.addEventListener('mouseover', e => {

			if(e.target === a) { return; }

			if(t) {
				clearTimeout(t);
			}

			t = setTimeout(() => {

				a.style.visibiliy = 'none';

				const cs = getComputedStyle(e.target)
				const cr = e.target.getClientRects()[0];
				const renderedFont = getRenderedFontFamily(cs);
				const family = cs.fontFamily.replace(renderedFont, '<i>' + renderedFont + '</i>');
				let hex;

				if(cs.color.startsWith('rgb(')) {
					hex = rgb2hex(cs.color)
				}

				a.innerHTML= `<b>Family:</b> ${family}<br>
				<b>Size:</b> ${cs.fontSize}<br>
				<b>Weight:</b> ${cs.fontWeight}<br>
				<b>Style:</b> ${cs.fontStyle}<br>
				<b>Stretch:</b> ${cs.fontStretch}<br>
				<b>Line height:</b> ${cs.lineHeight}<br>
  				<b>Letter spacing:</b> ${cs.letterSpacing}<br>
  				<b>Word spacing:</b> ${cs.wordSpacing}<br>
  				<b>Text decoration:</b> ${cs.textDecoration}<br>
  				<b>Text transform:</b> ${cs.textTransform}<br>
  				<b>Color:</b> ${cs.color} ${hex}`;

  				const aWidth = a.offsetWidth;
  				const aHeight = a.offsetHeight;

				let top = win.innerHeight - cr.bottom > aHeight ?
					cr.bottom + win.scrollY :
					cr.top + win.scrollY - aHeight;
				let left = win.innerWidth - cr.left > aWidth ?
					cr.left + win.scrollX :
					cr.left + win.scrollX - (aWidth - cr.width);

				a.style.top = `${top}px`;
				a.style.left = `${left}px`;
				a.style.opacity = 1;
				b.style.top = `${cr.top + win.scrollY}px`;
				b.style.left = `${cr.left + win.scrollX}px`;
				b.style.width = e.target.offsetWidth + 'px';
				b.style.height = e.target.offsetHeight + 'px';

				a.style.visibiliy = '';

			}, 200);

		});
})(window, document);