import sharp from 'sharp';

export async function POST(req) {
  const buffer = await req.arrayBuffer();
  const compressed = await sharp(Buffer.from(buffer))
    .jpeg({ quality: 60 })
    .toBuffer();

  return new Response(compressed, {
    headers: { 'Content-Type': 'image/jpeg' },
  });
}
