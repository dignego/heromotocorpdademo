import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'video-container';

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'video-wrapper';

  const thumbnails = document.createElement('div');
  thumbnails.className = 'thumbnail-navigation';

  [...block.children].forEach((row, index) => {
    [...row.children].forEach((child) => {
      const text = child.textContent?.trim();

      if (text && text.includes('youtube.com/watch')) {
        const videoId = new URL(text).searchParams.get('v');
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`;
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

        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt || `Thumbnail ${index + 1}`;
        thumb.className = index === 0 ? 'active' : '';
        thumbnails.appendChild(thumb);
      } else {
        const caption = document.createElement('div');
        caption.className = 'video-caption';
        caption.textContent = text;
        videoWrapper.appendChild(caption);
      }
    });
  });

  const footerText = document.createElement('div');
  footerText.className = 'footer-text';
  footerText.textContent = 'How can we help you?';

  container.appendChild(videoWrapper);
  container.appendChild(thumbnails);
  container.appendChild(footerText);

  block.replaceChildren(container);
}
