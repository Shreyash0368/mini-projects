let db
let storeName = "galleryDB";

const request = indexedDB.open(storeName, 1);

request.onupgradeneeded = (e) => {
    console.log("upgrade end");
    db = e.target.result;

    const videoStore = db.createObjectStore("video", { keyPath: "id" });
    const imageStore = db.createObjectStore("image", { keyPath: "id" });
}

request.onsuccess = (e) => {
    db = e.target.result;
    console.log("db success");

    const transaction = db.transaction(["video", "image"], 'readonly');
    const videoStore = transaction.objectStore("video");
    const imageStore = transaction.objectStore("image");

    displayStoredVideos(videoStore);
    displayStoredImages(imageStore);
}

request.onerror = (e) => {
    console.log("db error");
}

function displayStoredImages(store) {

    const cursoRequest = store.openCursor();

    cursoRequest.onsuccess = (e) => {
        const display = document.querySelector(".display-area");
        const cursor = e.target.result;

        if (cursor) {
            const blob = cursor.value.fileBlob;
            const url = URL.createObjectURL(blob);
            
            let mediaCont = document.createElement('div');
            mediaCont.setAttribute("class", "media-cont");
            mediaCont.setAttribute("fileURL", `${cursor.key}`);
            mediaCont.innerHTML = `
                <div class="media"><img src="${url}" alt="image-from-gallery"></div>
                <div class="delete action-btn">Delete</div>
                <div class="download action-btn">Download</div>
            `;

            deleteImage(mediaCont.querySelector('.delete'));
            downloadImage(mediaCont.querySelector('.download'));
            
            display.appendChild(mediaCont)
            cursor.continue();
        }
    }

}

function displayStoredVideos(store) {

    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = (e) => {
        const display = document.querySelector(".display-area");
        const cursor = e.target.result;

        if (cursor) {
            const blob = cursor.value.fileBlob;
            const url = URL.createObjectURL(blob);
            
            let mediaCont = document.createElement('div');
            mediaCont.setAttribute("class", "media-cont");
            mediaCont.setAttribute("fileURL", `${cursor.key}`);
            
            mediaCont.innerHTML = `
            <div class="media"><video muted autoplay loop src="${url}"></video></div>
            <div class="delete action-btn">Delete</div>
            <div class="download action-btn">Download</div>
            `;

            deleteVideo(mediaCont.querySelector(".delete")); 
            downloadVideo(mediaCont.querySelector('.download'));
                   
            display.appendChild(mediaCont);
            cursor.continue();        
        }
    }

}