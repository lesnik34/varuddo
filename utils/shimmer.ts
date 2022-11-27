const shimmer = (w: string, h: string) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#FFFFFF" offset="20%" />
      <stop stop-color="#F2F2F2" offset="50%" />
      <stop stop-color="#FFFFFF" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ffffff" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="0.8s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

const imageShimmer = () => `data:image/svg+xml;base64,${toBase64(shimmer('1000px', '1000px'))}`;

export default imageShimmer;
