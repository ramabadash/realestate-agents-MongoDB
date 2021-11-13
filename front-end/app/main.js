import './styles/index.css';

/* ---------- VARIIABLES DECLARATION ----------*/
const BASEURL = '';

const citiesSelectBar = document.getElementById('cities');
const agentCard = document.getElementById('agent-card');

/* ---------- DOM RELATED ----------*/
// General create element function
function createElement(tagName, textContent, className) {
  const newElem = document.createElement(tagName);
  newElem.textContent = textContent;
  newElem.classList.add(className);
  return newElem;
}

/* ---------- ERROR HANDLER ----------*/
// Display Error massege
function errorMessege(messege) {
  swal({
    title: `${messege}, please try again!`,
    buttons: 'OK',
    timer: 5000,
    icon: 'error',
    class: 'swal-button',
    closeOnClickOutside: true,
  });
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
    errorMessege(error.response.data.error);
  }
}

/* ---------- AGENTS LIST ----------*/
// Produces a list of agent names from a particular city to the DOM based on API request information
async function showAgentsList(event) {
  try {
    removeAgentsList();
    removeAgentCard();
    const agentsArray = await getNamesByCity(event.target.value);
    const agentsList = createElement('select', '', 'agents-select');
    agentsList.addEventListener('change', showAgentDetails);
    for (const agent of agentsArray) {
      const agentElem = createElement('option', agent.full_name, 'agent-name');
      agentElem.value = agent.full_name;
      agentsList.appendChild(agentElem);
    }
    const mainElem = document.getElementsByTagName('main')[0];
    mainElem.appendChild(agentsList);
  } catch (error) {
    errorMessege(error.response.data.error);
  }
}

function removeAgentsList() {
  const agentsList = document.querySelector('.agents-select');
  if (agentsList) agentsList.remove();
}

/* ---------- AGENT CARD ----------*/
//
async function showAgentDetails(event) {
  try {
    removeAgentCard();
    const agentName = event.target.value;
    const nameElem = createElement('label', agentName, 'agent-card-elem');
    const idElem = createElement('label', ':מספר רישוי', 'agent-card-elem');
    const cityElem = createElement(
      'label',
      `${citiesSelectBar.value} `,
      'agent-card-elem'
    );
    // cityElem.addAttribute('contenteditable', true);
    const closeBtnElem = createElement('button', 'X', 'agent-card-elem');
    closeBtnElem.addEventListener('click', removeAgentCard);
    // Appens elements
    agentCard.appendChild(closeBtnElem);
    agentCard.appendChild(nameElem);
    agentCard.appendChild(idElem);
    agentCard.appendChild(cityElem);
  } catch (error) {
    errorMessege(error.response.data.error);
  }
}

function removeAgentCard() {
  document.querySelectorAll('.agent-card-elem').forEach((element) => {
    // remove card drom DOM
    element.remove();
  });
}
/* ---------- NETWORK ----------*/
// API request for all cities names
async function getAllCities() {
  try {
    const response = await axios.get(`${BASEURL}/cities`);
    const citiesArray = response.data;
    return citiesArray;
  } catch (error) {
    errorMessege(error.response.data.error);
  }
}

// Get all agents from city name
async function getNamesByCity(city) {
  try {
    const response = await axios.get(`${BASEURL}/agents/?city=${city}`);
    return response.data;
  } catch (error) {
    errorMessege(error.response.data.error);
  }
}

/* ---------- EVENT LISTENERS ----------*/
window.addEventListener('load', generateCitiesToDom);
citiesSelectBar.addEventListener('change', showAgentsList);
