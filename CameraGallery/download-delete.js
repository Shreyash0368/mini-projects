function downloadImage(downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        const mediaCont = downloadBtn.parentElement;
        const key = mediaCont.getAttribute("fileURL");

        const transaction = db.transaction(["image"], 'readwrite');
        const imageStore = transaction.objectStore("image");
        const fileObj = imageStore.get(key);

        fileObj.onsuccess = (e) => {
            const result = e.target.result;
            const blob = result.fileBlob;
            const url = URL.createObjectURL(blob);
            const fileName = result.name;

            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.png`;
            a.click();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 10000);
        }

    })
}

function downloadVideo(downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        const mediaCont = downloadBtn.parentElement;
        const key = mediaCont.getAttribute("fileURL");

        const transaction = db.transaction(["video"], 'readwrite');
        const videoStore = transaction.objectStore("video");
        const fileObj = videoStore.get(key);

        fileObj.onsuccess = (e) => {
            const result = e.target.result;
            const blob = result.fileBlob;
            const url = URL.createObjectURL(blob);
            const fileName = result.name;

            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.mp4`;
            a.click();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 10000);
        }

    })  

}

function deleteImage(deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
        const mediaCont = deleteBtn.parentElement;
        const key = mediaCont.getAttribute("fileURL");

        const transaction = db.transaction(["image"], 'readonly');
        const imageStore = transaction.objectStore("image");

        imageStore.delete(key); // delete in DB
        mediaCont.remove(); // delete in UI
    })
}
function deleteVideo(deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
        const mediaCont = deleteBtn.parentElement;
        const key = mediaCont.getAttribute("fileURL");

        const transaction = db.transaction(["video"], 'readwrite');
        const videoStore = transaction.objectStore("video");

        videoStore.delete(key); // delete in DB
        mediaCont.remove(); // delete in UI
    })
}
