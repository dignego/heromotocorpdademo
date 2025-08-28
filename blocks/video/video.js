import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Wrap video elements in a container
  const container = document.createElement('div');
  container.className = 'video-container';

  [...block.children].forEach((row) => {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';

    [...row.children].forEach((child) => {
      if (child.tagName === 'VIDEO') {
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
