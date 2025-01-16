import { useState } from 'react';
import { rareImages, cuteImages } from './rares';
import "./style.css";

function App() {
  const [images, setImages] = useState<string[]>(Array(10).fill('/public/img/box.png'));
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setImages(Array(10).fill('/public/img/box.png'));
    setLoading(true);
    document.querySelectorAll(".rare").forEach((elm) => elm.classList.remove("rare"));
    document.querySelectorAll(".cute").forEach((elm) => elm.classList.remove("cute"));
    const parser: DOMParser = new DOMParser();
    const selectedImages: NodeListOf<HTMLImageElement> = document.querySelectorAll("img");

    try {
      for (let i=0; i<10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // バックエンドAPIにリクエストを送信
        const response = await fetch(
          'http://localhost:8787/api/proxy?url=https://web.wakayama-u.ac.jp/~yoshino/'
        );
        const html = await response.text(); // HTMLを文字列として取得

        // DOMParserでHTMLを解析
        const doc = parser.parseFromString(html, 'text/html');
        const imgSrc = doc.querySelector('img')?.getAttribute('src'); // imgタグのsrcを取得

        if (imgSrc) {
          const absoluteUrl = new URL(imgSrc, 'https://web.wakayama-u.ac.jp/~yoshino/').href;
          setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[i] = absoluteUrl;
            if (rareImages.includes(absoluteUrl)) {
              selectedImages[i].classList.add('rare');
            }
            if (cuteImages.includes(absoluteUrl)) {
              selectedImages[i].classList.add('cute');
            }
            selectedImages[i].style.cursor = "pointer";
            return newImages;
          }); // 画像をリストに追加
        }

        }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className='title'>Yoshinon Gacha</h1>
      <button onClick={fetchImages} 
              disabled={loading} 
              className='button'
      >
        {loading ? 'Loading...' : 'Push!'}
      </button>
      <div className='imageContainer'
      >
        {images.map((src, index) => (
          <div className='imageBase' key={index}>
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              className='image'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
