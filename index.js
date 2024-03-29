//import Random from 'random-math';
const Random = require('random-math');

const compliColor = {
	process: function (color) {
		// Function to convert RGB to HSL
		const rgbToHsl = function (r, g, b) {
			(r /= 255), (g /= 255), (b /= 255);
			const max = Math.max(r, g, b),
				min = Math.min(r, g, b);
			let h,
				s,
				l = (max + min) / 2;

			if (max === min) {
				h = s = 0;
			} else {
				const d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}

			return [h * 360, s * 100, l * 100];
		};

		// Function to convert HSL to RGB
		const hslToRgb = function (h, s, l) {
			let r, g, b;
			h /= 360;
			s /= 100;
			l /= 100;

			if (s === 0) {
				r = g = b = l;
			} else {
				const hue2rgb = function (p, q, t) {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1 / 6) return p + (q - p) * 6 * t;
					if (t < 1 / 2) return q;
					if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
					return p;
				};
				const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				const p = 2 * l - q;
				r = hue2rgb(p, q, h + 1 / 3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1 / 3);
			}

			return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
		};

		// Helper function to ensure value stays within valid range
		const clamp = function (value, min, max) {
			return Math.min(Math.max(value, min), max);
		};

		const complimentaryHex = function(hex) {
			if (!/^#[0-9A-F]{6}$/i.test(hex)) {
				throw new Error("Unsupported color format. Only RGB, HSL and HEX formats are supported.");
			}
			hex = hex.substring(1);
			let r = parseInt(hex.substring(0, 2), 16);
			let g = parseInt(hex.substring(2, 4), 16);
			let b = parseInt(hex.substring(4, 6), 16);
	
			r = (255 - r).toString(16).padStart(2, '0');
			g = (255 - g).toString(16).padStart(2, '0');
			b = (255 - b).toString(16).padStart(2, '0');
	
			return `#${r}${g}${b}`;
		}

		// Convert input color to HSL
		let hslColor;
		if (color.startsWith("#")) {
			return complimentaryHex(color);
		}
		else if (color.startsWith("rgb")) {
			const [r, g, b] = color.match(/\d+/g);
			hslColor = rgbToHsl(parseInt(r), parseInt(g), parseInt(b));
		} else if (color.startsWith("hsl")) {
			hslColor = color.match(/\d+/g).map(Number);
		} else {
			throw new Error(
				"Unsupported color format. Only RGB, HSL and HEX formats are supported."
			);
		}

		// Calculate complementary hue
		let complementaryHue = (hslColor[0] + 180) % 360;

		// Convert complementary hue back to original format
		complementaryHue = clamp(complementaryHue, 0, 360);
		let complementaryColor;

		// Check the original format and convert back accordingly
		if (color.startsWith("rgb")) {
			const [r, g, b] = hslToRgb(complementaryHue, hslColor[1], hslColor[2]);
			complementaryColor = `rgb(${r},${g},${b})`;
		} else {
			complementaryColor = `hsl(${complementaryHue.toFixed(
				0
			)},${hslColor[1].toFixed(2)}%,${hslColor[2].toFixed(2)}%)`;
		}

		return complementaryColor;
	},
};

module.exports = compliColor;

//console.log(compliColor.process("rgb(113,256,228)"));
// returns - rgb(256,113,141)

//console.log(compliColor.process("hsl(120,50%,50%)"));
// returns - hsl(300,50.00%,50.00%)

//console.log(compliColor.process("#ff00ff"));
// returns - #00ff0