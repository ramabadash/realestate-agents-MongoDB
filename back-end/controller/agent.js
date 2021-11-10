const Agent = require('../models/agent');

// Get All cities
exports.getAllCities = async (req, res, next) => {
  Agent.find({})
    .distinct('city') // distinct values
    .then((citiesArrary) => res.json(citiesArrary))
    .catch((error) => next({ status: error.status, messege: error }));
};

// Get agents objects by city name
exports.getAgentsByCity = async (req, res, next) => {
  const { city } = req.query;
  Agent.find({ city })
    .then((agentsArray) => res.json(agentsArray))
    .catch((error) => next({ status: error.status, messege: error }));
};

// Update agent city by id
exports.updateCityById = async (req, res, next) => {
  const { id } = req.params;
  const { city } = req.body;
  Agent.findOneAndUpdate({ license_id: id }, { city })
    .then(() => res.json(true))
    .catch((error) => next({ status: error.status, messege: error }));
};
