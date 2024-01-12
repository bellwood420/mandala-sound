const defaultImageSrc = "Geometric_triangles_mandala.png";

const soundsSrc = [
    "38732__hollandm__steel-tongue-drum/mp3/692569__hollandm__c3-steel-tongue-drum.mp3",
    "38732__hollandm__steel-tongue-drum/mp3/692570__hollandm__d3-steel-tongue-drum.mp3",
    "38732__hollandm__steel-tongue-drum/mp3/692571__hollandm__e3-steel-tongue-drum.mp3",
    "38732__hollandm__steel-tongue-drum/mp3/692829__hollandm__f3-steel-tongue-drum.mp3",
    "38732__hollandm__steel-tongue-drum/mp3/692568__hollandm__g3-steel-tongue-drum.mp3",
    "38732__hollandm__steel-tongue-drum/mp3/692561__hollandm__a3-steel-tongue-drum.mp3",
    "38732__hollandm__steel-tongue-drum/mp3/692562__hollandm__bb3-steel-tongue-drum.mp3",
];

const whiteThreshold = 10;
const blackThreshold = 10;

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = defaultImageSrc;
    image.onload = () => {
        draw(canvas, ctx, image);
    };
    window.addEventListener("resize", () => {
        draw(canvas, ctx, image);
    });

    const openButton = document.getElementById("open_button");
    openButton.onchange = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(openButton.files[0]);
    };

    canvas.onclick = (e) => {
        const mouseX = parseInt(e.offsetX);
        const mouseY = parseInt(e.offsetY);
        const data = ctx.getImageData(mouseX, mouseY, 1, 1).data;
        const {h, s, v} = rgb2hsv(data[0], data[1], data[2]);
        console.log({h, s, v});

        if (s < whiteThreshold || v < blackThreshold) {
            // Do not play on white or black area
            return;
        }

        let soundSrc = "";
        if (h > 320 || h <= 15) {
            // 1st chakra
            soundSrc = soundsSrc[0];
        }
        else if (h > 15 && h <= 40) {
            // 2nd chakra
            soundSrc = soundsSrc[1];
        }
        else if (h > 40 && h <= 65) {
            // 3rd chakra
            soundSrc = soundsSrc[2];
        }
        else if (h > 65 && h <= 155) {
            // 4th chakra
            soundSrc = soundsSrc[3];
        }
        else if (h > 155 && h <= 200) {
            // 5th chakra
            soundSrc = soundsSrc[4];
        }
        else if (h > 200 && h <= 260) {
            // 6th chakra
            soundSrc = soundsSrc[5];
        }
        else if (h > 260 && h <= 320) {
            // 7th chakra
            soundSrc = soundsSrc[6];
        }

        const audio = new Audio(soundSrc);
        audio.play();
    };
});

function draw(canvas, ctx, img) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cw = canvas.width;
    const ch = canvas.height;
    const cr = cw / ch;

    const iw = img.width;
    const ih = img.height;
    const ir = iw / ih;

    if (cr >= ir) {
        // Canvas is wider than image => Fit height
        const dw = ch * ir;
        ctx.drawImage(img, cw / 2 - dw / 2, 0, dw, ch);

    } else {
        // Canvas is taller than image => Fit width
        const dh = cw / ir;
        ctx.drawImage(img, 0, ch / 2 - dh / 2, cw, dh);
    }
}

function rgb2hsv(r, g, b) {
    let h = 0;
    let s = 0;
    let v = 0;

    r = r / 255.0;
    g = g / 255.0;
    b = b / 255.0;

    const cmax = Math.max(r, g, b);
    const cmin = Math.min(r, g, b);
    const diff = cmax - cmin;

    if (cmax === cmin) {
        h = 0;
    }
    else if (cmax === r) {
        h = (60 * ((g - b) / diff) + 360) % 360;
    }
    else if (cmax === g) {
        h = (60 * ((b - r) / diff) + 120) % 360;
    }
    else if (cmax === b) {
        h = (60 * ((r - g) / diff) + 240) % 360;
    }

    if (cmax === 0) {
        s = 0;
    }
    else {
        s = (diff / cmax) * 100;
    }

    v = cmax * 100;

    return {h, s, v};
}