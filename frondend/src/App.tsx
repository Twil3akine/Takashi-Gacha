import React, { useState } from 'react';

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setImages([]);
    setLoading(true);
    try {
      for (let i=0; i<10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // バックエンドAPIにリクエストを送信
        const response = await fetch(
          'http://localhost:8787/api/proxy?url=https://web.wakayama-u.ac.jp/~yoshino/'
        );
        const html = await response.text(); // HTMLを文字列として取得

        // DOMParserでHTMLを解析
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgSrc = doc.querySelector('img')?.getAttribute('src'); // imgタグのsrcを取得

        if (imgSrc) {
          const absoluteUrl = new URL(imgSrc, 'https://web.wakayama-u.ac.jp/~yoshino/').href;
          setImages((prevImages) => [...prevImages, absoluteUrl]); // 画像をリストに追加
        }

        }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2.5%', height: '80vh', width: '100vw' }}>
      <h1 style={{ fontSize: '40px', fontFamily: 'Ubuntu Mono' }}>Takashi Gacha</h1>
      <button onClick={fetchImages} disabled={loading} style={{ width: '6em', height: '3em', backgroundColor: '#222', color: '#eee', borderRadius: '10px', border: '2px solid #222', fontFamily: 'Ubuntu Mono', fontSize: '20px' }}>
        {loading ? 'Loading...' : 'Gacharu!'}
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px', width: '100vw', height: '40vh', gap: '5%' }}>
        {images.map((src, index) => (
          <div style={{ width: '15vw', height: '15%', marginBottom: '16.5%' }}>
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
