const defaultImageSrc = "Geometric_triangles_mandala.png";

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