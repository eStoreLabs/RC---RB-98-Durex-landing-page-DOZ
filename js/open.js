const imgElement = document.querySelector('.es-tip__img--top');
const windowHeight = window.innerHeight;


function handleScroll() {
  const scrollPosition = window.scrollY;
  const maxMarginBottom = -150;
  const minMarginBottom = 150;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollPosition / maxScroll;
  const margin = ((1 - scrollPercentage) * (maxMarginBottom - minMarginBottom)) + minMarginBottom;

  imgElement.style.marginBottom = `${margin}px`;
}

window.addEventListener('scroll', handleScroll);