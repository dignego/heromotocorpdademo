import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'video-container';

  [...block.children].forEach((row) => {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';

    [...row.children].forEach((child) => {
      const text = child.textContent?.trim();

      // Check for YouTube URL
      if (text && text.includes('youtube.com/watch')) {
        const videoId = new URL(text).searchParams.get('v');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.className = 'video-player';
        videoWrapper.appendChild(iframe);
      } else if (child.tagName === 'VIDEO') {
        child.setAttribute('controls', true);
        child.setAttribute('tabindex', '0');
        child.className = 'video-player';
        videoWrapper.appendChild(child);
      } else if (child.querySelector('picture')) {
        const img = child.querySelector('img');
        const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        videoWrapper.appendChild(optimized);
      } else {
        child.className = 'video-caption';
        videoWrapper.appendChild(child);
      }
    });

    container.appendChild(videoWrapper);
  });

  block.replaceChildren(container);
}
