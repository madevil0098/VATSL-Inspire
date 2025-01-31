function rgbToHsv(r, g, b, hsv) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;
    
    var d = max - min;
    s = max === 0 ? 0 : d / max;
    
    if(max === min) {
        h = 0; // achromatic
    }
    else {
        // eslint-disable-next-line default-case
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    if (!hsv) hsv = {};
    hsv.h = Math.floor(h * 360);
    hsv.s = Math.floor(s * 255);
    hsv.v = Math.floor(v * 255);
    return hsv;
};

function hsvToRgb(h, s, v, rgb) {
    h = (h / 360) * 6;
    s = s / 255;
    v = v / 255;
    
    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];
    
    if (!rgb) rgb = {};
    rgb.r = Math.floor(r * 255);
    rgb.g = Math.floor(g * 255);
    rgb.b = Math.floor(b * 255);
    return rgb;
};

const applyAdjustments = async () => {
    try {
        var width = window.canvas.width;
        var height = window.canvas.height;
        var imgData = window.ctx.getImageData(0, 0, width, height);
        var offset = 0;
        var bri = Math.max(-255, Math.min(255, window.brightness || 0));
        var con = Math.max(-255, Math.min(255, window.contrast || 0));
        var hue = Math.max(-360, Math.min(360, window.Hue || 0));
        var sat = Math.max(-255, Math.min(255, window.saturation || 0));
        var rgb = {};
        var hsv = {};
        
        if (con) con = Math.pow((con + 255) / 255, 2);
        
        
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (imgData.data[offset + 3] > 0) {
                    let oldR = imgData.data[offset];
                    let oldG = imgData.data[offset + 1];
                    let oldB = imgData.data[offset + 2];
                    
                    rgb.r = oldR;
                    rgb.g = oldG;
                    rgb.b = oldB;
                    
                    if (bri) {
                        rgb.r = Math.max(0, Math.min(255, rgb.r + bri));
                        rgb.g = Math.max(0, Math.min(255, rgb.g + bri));
                        rgb.b = Math.max(0, Math.min(255, rgb.b + bri));
                    }
                    if (hue || sat) {
                        rgbToHsv(rgb.r, rgb.g, rgb.b, hsv);
                        if (hue) hsv.h = (hsv.h + hue + 360) % 360;
                        if (sat && hsv.s) {
                            hsv.s = Math.max(0, Math.min(255, Math.floor(hsv.s + (sat * ((255 - hsv.v) / 255)))));
                        }
                        hsvToRgb(hsv.h, hsv.s, hsv.v, rgb);
                    }
                    if (con) {
                        rgb.r = Math.floor(((rgb.r / 255 - 0.5) * con + 0.5) * 255);
                        rgb.g = Math.floor(((rgb.g / 255 - 0.5) * con + 0.5) * 255);
                        rgb.b = Math.floor(((rgb.b / 255 - 0.5) * con + 0.5) * 255);
                    }
                    
                    imgData.data[offset] = rgb.r;
                    imgData.data[offset + 1] = rgb.g;
                    imgData.data[offset + 2] = rgb.b;
                    
                }
                offset += 4;
            }
        }
        
        //console.log(`Average pixel change: ${percentChange.toFixed(2)}%`);
        
        window.ctx.putImageData(imgData, 0, 0);
    } catch (error) {
        console.error('Error applying adjustments:', error);
    }
};

export default applyAdjustments;