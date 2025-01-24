
    // Funkcja pobierająca dane produktów na podstawie ID
    async function fetchProductData(ids) {
      const response = await fetch(`https://www.doz.pl/lp-data/products/ids/${ids.join(',')}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }

    // Funkcja dodająca produkty do wybranej karuzeli
    function renderProductToSwiper(product, swiperWrapper) {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.classList.add('es-products__swiper-slide');

      const image = document.createElement('img');
      image.src = product.images['220x220'].url;
      image.alt = product.name;
      image.classList.add('es-products__img');

      const name = document.createElement('div');
      name.textContent = product.name;
      name.classList.add('es-products__name');

      const price = document.createElement('div');
      price.classList.add('es-products__price')
      price.textContent = `${product.price}`;

      const link = document.createElement('a');
      link.classList.add('es-products__button');
      link.classList.add('product__add-to-cart-js');
      link.setAttribute('data-add-url', '/koszyk/dodaj-produkt');
      link.setAttribute('data-id', product.id);
      link.href = product.add_to_cart_url;
      link.textContent = 'Do koszyka';

      slide.appendChild(image);
      slide.appendChild(name);
      slide.appendChild(price);
      slide.appendChild(link);

      swiperWrapper.appendChild(slide);
    }

    // Funkcja inicjalizująca karuzelę z danymi produktów
    async function initCarousel(carouselId, productIds) {
      const swiperWrapper = document.querySelector(`#${carouselId} .swiper-wrapper`);

      try {
        const products = await fetchProductData(productIds);
        products.forEach(product => {
          renderProductToSwiper(product, swiperWrapper);
        });

        // Inicjalizacja SwiperJS dla tej karuzeli
        new Swiper(`#${carouselId}`, {
          slidesPerView: 1,
          spaceBetween: 10,
          autoheight: true,
          navigation: {
            nextEl: `#${carouselId} .es-swiper-button-next`,
            prevEl: `#${carouselId} .es-swiper-button-prev`,
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          },
        });
      } catch (error) {
        console.error(`Error initializing carousel ${carouselId}:`, error);
      }
    }

    // Inicjalizacja wszystkich karuzel
    async function initAllCarousels() {
      await initCarousel('carousel-1', ['175311', '166906','175655', '175137']);
      await initCarousel('carousel-2', ['175765', '175137','175311', '166906']);
      await initCarousel('carousel-3', ['175765', '175137','175311', '166906']);
      await initCarousel('carousel-4', ['175612', '177812','175311', '166906']);
      await initCarousel('carousel-5', ['177865', '177496','175311', '166906']);
    }

    // Uruchomienie wszystkich karuzel
    initAllCarousels();