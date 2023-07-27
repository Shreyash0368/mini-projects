const download = document.getElementById("download");

download.onclick = (e) => {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.png';
    a.click();
    console.log(url);
}


