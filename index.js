module.exports.render = function (colors, options) {
	console.log(colors)
	const {
		shade0: dbg,
		shade0: lbfg,
		shade1: dbbg,
		shade1: lfg,
		shade6: dfg,
		shade6: lbbg,
		shade7: dbfg,
		shade7: lbg,
		accent0: red,
		accent1: a1,
		accent2: yellow,
		accent3: green,
		accent4: cyan,
		accent5: blue,
		accent6: purple,
		accent7: a7,
	} = colors.dark;
	//console.log(dbg, typeof dbg, yellow, typeof yellow);
	const prz = o => {
		return new Promise(function (s) {
			s(o)
		});
	}
	/**
	 * @param {string} s 
	 */
	const brighten = s => {
		let r = parseInt(s.substr(1, 2), 16);
		let g = parseInt(s.substr(3, 2), 16);
		let b = parseInt(s.substr(5, 2), 16);
		//console.log(r,g,b);
		r += 0x10;
		g += 0x10;
		b += 0x10;
		if (r > 0xff) r = 0xff;
		if (g > 0xff) g = 0xff;
		if (b > 0xff) b = 0xff;
		return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
	}
	const darken = s => {
		let r = +(s.substr(1, 2));
		let g = +(s.substr(3, 2));
		let b = +(s.substr(5, 2));
		r -= 0x10;
		g -= 0x10;
		b -= 0x10;
		if (r < 0x00) r = 0x00;
		if (g < 0x00) g = 0x00;
		if (b < 0x00) b = 0x00;
		return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
	}
	const dark = {
		name: 'Themer Dark',
		background: lbg,
		foreground: lfg,
		black: lbg,											//0		0		v		v
		blue: blue,											//1		1		v		v
		green: green,										//2		2		v		v
		cyan: cyan,											//3		3		v		v
		red: red,												//4		4		v		v
		purple: purple,									//5		5		v		v
		yellow: yellow,									//6		6		v		v
		white: lfg,											//7		7		v		v
		brightBlack: lbbg,							//8		8		v		v
		brightBlue: brighten(blue),			//9		9		v		v
		brightGreen: brighten(green),		//a		10	v		v
		brightCyan: brighten(cyan),			//b		11	v		v
		brightRed: brighten(red),				//c		12	v		v
		brightPurple: brighten(purple),	//d		13	v		v
		brightYellow: brighten(yellow),	//e		14	v		v
		brightWhite: lbfg								//f		15	v		v
	};
	const light = {
		name: 'Themer Light',
		background: dbg,
		foreground: dfg,
		black: dbg,											//0		0		v		v
		blue: blue,											//1		1		v		v
		green: green,										//2		2		v		v
		cyan: cyan,											//3		3		v		v
		red: red,												//4		4		v		v
		purple: purple,									//5		5		v		v
		yellow: yellow,									//6		6		v		v
		white: dfg,											//7		7		v		v
		brightBlack: dbbg,							//8		8		v		v
		brightBlue: darken(blue),				//9		9		v		v
		brightGreen: darken(green),			//a		10	v		v
		brightCyan: darken(cyan),				//b		11	v		v
		brightRed: darken(red),					//c		12	v		v
		brightPurple: darken(purple),		//d		13	v		v
		brightYellow: darken(yellow),		//e		14	v		v
		brightWhite: dbfg								//f		15	v		v
	};
	return [
		prz({
			name: 'dark.json',
			contents: Buffer.from(JSON.stringify(dark, null, 4)),
		}),
		prz({
			name: 'light.json',
			contents: Buffer.from(JSON.stringify(light, null, 4))
		}),
	]
}

module.exports.renderInstructions = p => `
	Open the settings of your Windows Terminal and paste ${p.join(' or ')} in the schemes array. To set your default scheme, set profiles.defaults.colorScheme to "Themer Dark" or "Themer Light".
`