import './styles/index.css';

/* ---------- VARIIABLES DECLARATION ----------*/
const BASEURL = '';

const citiesSelectBar = document.getElementById('cities');

/* ---------- EVENT LISTENERS ----------*/
window.addEventListener('load', generateCitiesToDom);
/* ---------- NETWORK ----------*/
// API request for all cities names
async function getAllCities() {
  try {
    const response = await axios.get(`${BASEURL}/cities`);
    const citiesArray = response.data;
    return citiesArray;
  } catch (error) {
    console.log(error);
  }
}

/* ---------- CITY LIST ----------*/
async function generateCitiesToDom() {
  try {
    const citiesArray = await getAllCities();
    for (const name of citiesArray) {
      const cityElem = createElement('option', name, 'city-name');
      citiesSelectBar.appendChild(cityElem);
    }
  } catch (error) {
    console.log(error);
  }
}

/* ---------- DOM RELATED ----------*/
// General create element function
function createElement(tagName, textContent, className) {
  const newElem = document.createElement(tagName);
  newElem.textContent = textContent;
  newElem.classList.add(className);
  return newElem;
}
