// Brand Name Character Animation
function initBrandNameAnimation() {
    const brandName = document.querySelector('.brand-name');

    if (!brandName) return;

    // Get the text content
    const text = brandName.textContent;

    // Clear the original text
    brandName.textContent = '';

    // Split into characters and wrap each in a span
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.textContent = char === ' ' ? '\u00A0' : char; // Preserve spaces
        span.style.transitionDelay = `${index * 0.05}s`; // Stagger animation
        brandName.appendChild(span);
    });

    // Trigger animation after a short delay
    setTimeout(() => {
        const chars = brandName.querySelectorAll('.char');
        chars.forEach(char => {
            char.classList.add('is-revealed');
        });
    }, 500); // Start after 500ms
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrandNameAnimation);
} else {
    initBrandNameAnimation();
}

// If you're using the preloader, trigger after preloader hides
const preloader = document.querySelector('.preloader');
if (preloader) {
    // Watch for when preloader gets hidden
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('is-hidden')) {
                setTimeout(initBrandNameAnimation, 300);
                observer.disconnect();
            }
        });
    });

    observer.observe(preloader, {
        attributes: true,
        attributeFilter: ['class']
    });
}