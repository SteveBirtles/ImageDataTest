function pageLoad() {

    const img = new Image();
    img.src = "demo.png";

    img.onload = function () {

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < imageData.data.length; i += 4) {

            let red = imageData.data[i];
            let green = imageData.data[i + 1];
            let blue = imageData.data[i + 2];
            let alpha = imageData.data[i + 3];

            imageData.data[i] = 255 - red;
            imageData.data[i + 1] = 255 - green;
            imageData.data[i + 2] = 255 - blue;
            imageData.data[i + 3] = 255;

        }

        context.putImageData(imageData, 0, 0);

        const newImage = document.getElementById("after");
        newImage.src = canvas.toDataURL();

        const download = function(){
            const link = document.createElement('a');
            link.download = 'filename.png';
            link.href = newImage.src;
            link.click();
          }();

    };

}
