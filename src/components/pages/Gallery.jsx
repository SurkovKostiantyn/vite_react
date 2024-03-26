import {ThemeContext} from "../ThemeContext.jsx";
import {useContext, useEffect, useState} from "react";
// file upload to firebase storage
import {getDownloadURL, getStorage, listAll, ref, uploadBytes} from "firebase/storage";

const fetchImageUrls = async () => {
    const storage = getStorage();
    const listRef = ref(storage, 'some-directory/');

    try {
        const res = await listAll(listRef);
        const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return await Promise.all(urlPromises);
    } catch (error) {
        console.error("Error fetching images: ", error);
        return [];
    }
};

// Припускаємо, що 'file' - це файл, отриманий від <input type="file"/>
const uploadFile = async (file) => {
    // Перевірка чи файл є зображенням
    if (!file.type.startsWith('image/')) {
        console.error('Not an image file');
        return null;
    }

    // Перевірка розміру файлу (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
        console.error('File is too large. Max size is 2MB.');
        return null;
    }

    const storage = getStorage();
    const storageRef = ref(storage, 'some-directory/' + file.name);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File uploaded! Accessible at', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Upload failed', error);
        // Обробка помилок
    }
};


const Gallery = () => {
    const { lightMode } = useContext(ThemeContext);
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const handleUpload = async () => {
        if (selectedFile) {
            const downloadURL = await uploadFile(selectedFile);
            if (downloadURL) {
                setImages((prevImages) => [...prevImages, downloadURL]);
            }
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            const urls = await fetchImageUrls();
            setImages(urls);
        };

        loadImages();
    }, []);

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, []);

    return (
        <div
            className={"main"}
            style={{
                backgroundColor: lightMode ? "white" : "black",
                color: lightMode ? "black" : "white",
            }}
        >
            <h1>Gallery</h1>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={handleUpload}>Надіслати</button> {/* Додана кнопка надіслати */}
            
            <div>
                {images.map((url, index) => (
                    <img src={url} style={{ width: "100%" }}  alt={'x'} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Gallery
