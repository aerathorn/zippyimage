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
    setCompressedSize((blob.size / 1024).toFixed(2));
    setCompressed(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 space-y-4">
      <h1 className="text-3xl font-bold">ZippyImage - Image Compressor</h1>
      <input type="file" accept="image/*" onChange={upload} />
      {loading && <p>🔄 Compressing...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-4xl">
  {image && (
    <div>
      <h2 className="font-semibold mb-2">Original Image ({originalSize} KB)</h2>
      <img src={image} alt="Original" className="border rounded max-w-full" />
    </div>
  )}

  {compressed && (
    <div>
      <h2 className="font-semibold mb-2">Compressed Image ({compressedSize} KB)</h2>
      <img src={compressed} alt="Compressed" className="border rounded max-w-full" />
      <a
        href={compressed}
        download="compressed.png"
        className="inline-block mt-2 text-blue-600 underline"
      >
        ⬇️ Download Compressed
      </a>
    </div>
  )}
</div>


      <div className="mt-6 w-full max-w-xl text-center border-t pt-4 text-gray-500">
        [Ad space here – connect Google AdSense]
      </div>
    </main>
  );
}
																																																																									