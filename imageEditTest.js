function pageLoad() {

    document.getElementById("imageForm").onsubmit = function(e) {
        
        e.preventDefault();

        const sourceImageFile = document.getElementById("sourceImageFile");

        const selectedFile = sourceImageFile.files[0];

        formSubmit(selectedFile);

    }

}

function formSubmit(file) {

    const img = document.getElementById("before");

    const reader = new FileReader();        
    reader.onload = function(event) {
        img.src = event.target.result;
    };
      
    reader.readAsDataURL(file);

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
        
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = newImage.src;
        link.click();
          
    };

}
