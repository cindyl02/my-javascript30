function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function handleScroll() {
  images.forEach((img) => {
    const yPos = window.scrollY + window.innerHeight;
    const imgHalfPoint = yPos - img.height / 2;
    const imgBottom = img.offsetTop + img.height;

    const isHalfShown = imgHalfPoint > img.offsetTop;
    const isNotScrolledPast = window.scrollY < imgBottom;

    if (isHalfShown && isNotScrolledPast) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}

const images = document.querySelectorAll(".slide-in");
window.addEventListener("scroll", debounce(handleScroll));
