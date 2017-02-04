/******************************

TYPETIP VERSION 0.3 2017-02-04
Created by Andreas Nylin | andreas.nylin@gmail.com | @andreasnylin | andreasnylin.com 

******************************/
((win, doc) => {
	
    const a = doc.createElement('div');
    const b = doc.createElement('div');
    let t = null;

		function pad(text, length, char = ' ') {
			if(text.length >= length) { 
				return text;
			}

			return new Array(length - 1).join(char) + text;
		}

    function rgb2hex(clr) {
    	const rgb = clr.match(/\d+/g);
		return '#' + pad(Number(rgb[0]).toString(16), 2) + pad(Number(rgb[1]).toString(16), 2) + pad(Number(rgb[2]).toString(16), 2);
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

				let hex;

				if(cs.color.startsWith('rgb(')) {
					hex = rgb2hex(cs.color)
				}

				a.innerHTML= `Family: ${cs.fontFamily}<br>
				Size: ${cs.fontSize}<br>
				Weight: ${cs.fontWeight}<br>
				Style: ${cs.fontStyle}<br>
				Stretch: ${cs.fontStretch}<br>
				Line height: ${cs.lineHeight}<br>
  				Letter spacing: ${cs.letterSpacing}<br>
  				Word spacing: ${cs.wordSpacing}<br>
  				Text decoration: ${cs.textDecoration}<br>
  				Text transform: ${cs.textTransform}<br>
  				Color: ${cs.color} ${hex}`;

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