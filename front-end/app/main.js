import './styles/index.css';

/* ---------- VARIIABLES DECLARATION ----------*/
const BASEURL = '';

const citiesSelectBar = document.getElementById('cities');

/* ---------- DOM RELATED ----------*/
// General create element function
function createElement(tagName, textContent, className) {
  const newElem = document.createElement(tagName);
  newElem.textContent = textContent;
  newElem.classList.add(className);
  return newElem;
}

/* ---------- CITY LIST ----------*/
async function generateCitiesToDom() {
  try {
    const citiesArray = await getAllCities();
    for (const name of citiesArray) {
      const cityElem = createElement('option', name, 'city-name');
      cityElem.value = name;
      citiesSelectBar.appendChild(cityElem);
    }
  } catch (error) {
    console.log(error);
  }
}

/* ---------- AGENTS LIST ----------*/
async function showAgentsList(event) {
  try {
    removeAgentsList();
    const agentsArray = await getNamesByCity(event.target.value);
    const agentsList = createElement('select', '', 'agents-select');
    for (const agent of agentsArray) {
      const agentElem = createElement('option', agent.full_name, 'agent-name');
      agentElem.value = agent.full_name;
      agentsList.appendChild(agentElem);
    }
    const mainElem = document.getElementsByTagName('main')[0];
    mainElem.appendChild(agentsList);
  } catch (error) {
    console.log(error);
  }
}

function removeAgentsList() {
  const agentsList = document.querySelector('.agents-select');
  if (agentsList) agentsList.remove();
}

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

// Get all agents from city name
async function getNamesByCity(city) {
  try {
    const response = await axios.get(`${BASEURL}/agents/?city=${city}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/* ---------- EVENT LISTENERS ----------*/
window.addEventListener('load', generateCitiesToDom);
citiesSelectBar.addEventListener('change', showAgentsList);
