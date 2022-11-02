const shimmer = (w: string, h: string) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#DCDCDE" offset="20%" />
      <stop stop-color="#E6E6E7" offset="50%" />
      <stop stop-color="#DCDCDE" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#D3D3D6" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

const shimmer64 = (w: string, h: string) => toBase64(shimmer(w, h));

export default shimmer64;
