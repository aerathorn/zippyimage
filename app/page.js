'use client';

import { useState } from 'react';

export default function HomePage() {
  const [image, setImage] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setOriginalSize((file.size / 1024).toFixed(2));
    setLoading(true);

    const res = await fetch('/api/compress', {
      method: 'POST',
      body: file,
    });

    const blob = await res.blob();
    setCompressed(URL.createObjectURL(blob));
    setCompressedSize((blob.size / 1024).toFixed(2));
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl font-bold">ZippyImage - Image Compressor</h1>

        <input type="file" accept="image/*" onChange={upload} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

        {loading && <p className="text-blue-600 font-medium">🔄 Compressing...</p>}

        {(image || compressed) && (
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-12 mt-6 w-full">
            {image && (
              <div className="flex flex-col items-center">
                <h2 className="font-semibold mb-2">Original Image ({originalSize} KB)</h2>
                <img src={image} alt="Original" className="border rounded max-w-xs" />
              </div>
            )}
            {compressed && (
              <div className="flex flex-col items-center">
                <h2 className="font-semibold mb-2">Compressed Image ({compressedSize} KB)</h2>
                <img src={compressed} alt="Compressed" className="border rounded max-w-xs" />
                <a
                  href={compressed}
                  download="compressed.png"
                  className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  ⬇️ Download Compressed
                </a>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 w-full max-w-2xl text-center border-t pt-6">
  <ins
    className="adsbygoogle"
    style={{ display: 'block', textAlign: 'center' }}
    data-ad-client="ca-pub-8929411914632480"
    data-ad-slot="5843447441"
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>
  <script>
    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
  </script>
</div>

      </div>
    </main>
  );
}
