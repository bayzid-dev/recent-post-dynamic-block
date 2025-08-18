document.addEventListener('DOMContentLoaded', function () {
    const swiperContainers = document.querySelectorAll('.swiper-container');
    if (swiperContainers.length) {
        swiperContainers.forEach(container => {
            const nextEl = container.querySelector('.swiper-button-next');
            const prevEl = container.querySelector('.swiper-button-prev');
            const paginationEl = container.querySelector('.swiper-pagination');

            // Extract data attributes from the container for configuration if needed
            // const slidesPerView = container.dataset.slidesPerView || 1;
            const swiper = new Swiper(container, {
                slidesPerView: 1, // Default
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: nextEl,
                    prevEl: prevEl,
                },
                pagination: {
                    el: paginationEl,
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 }, // Example: adjust as needed
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                },
            });
        });
    }
});