const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const data = [];

fetch(endpoint)
  .then((res) => res.json())
  .then((body) => data.push(...body));

const numberWithCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const findMatches = (word, data) =>
  data.filter((place) => {
    const regexp = new RegExp(word, "gi");
    return place.state.match(regexp) || place.city.match(regexp);
  });

function displayMatches() {
  const res = findMatches(this.value, data);
  const html = res
    .map((place) => {
      const regexp = new RegExp(this.value, "gi");
      const city = place.city.replace(
        regexp,
        `<span class="hl">${this.value}</span>`
      );
      const state = place.state.replace(
        regexp,
        `<span class="hl">${this.value}</span>`
      );

      return `<li>
    <span class="name">${city}, ${state}</span>
    <span class="population">${numberWithCommas(place.population)}</span>
    <li>`;
    })
    .join("");

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
