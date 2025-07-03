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
    setOriginalSize((file.size / 1024).toFixed(2)); // in KB
    setLoading(true);

    const res = await fetch('/api/compress', {
      method: 'POST',
      body: file,
    });

    const blob = await res.blob();
    setCompressed(URL.createObjectURL(blob));
    setCompressedSize((blob.size / 1024).toFixed(2)); // in KB
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">ZippyImage - Image Compressor</h1>

      <input type="file" accept="image/*" onChange={upload} />

      {loading && <p className="text-blue-600 font-semibold">🔄 Compressing...</p>}

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {image && (
          <div className="text-center">
            <h2 className="font-semibold mb-2">Original Image ({originalSize} KB)</h2>
            <img src={image} alt="Original" className="border rounded max-w-full mx-auto" />
          </div>
        )}

        {compressed && (
          <div className="text-center">
            <h2 className="font-semibold mb-2">Compressed Image ({compressedSize} KB)</h2>
            <img src={compressed} alt="Compressed" className="border rounded max-w-full mx-auto" />
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

      {/* Google AdSense Placeholder */}
      <div className="mt-12 w-full max-w-2xl text-center border-t pt-6 text-gray-500 text-sm">
        [ Google AdSense space here – integrate ad code when ready ]
      </div>
    </main>
  );
}
