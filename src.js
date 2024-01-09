document.addEventListener("DOMContentLoaded", () => {
    const openButton = document.getElementById("open_button");
    openButton.onchange = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("image").setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(openButton.files[0]);
    };
});
