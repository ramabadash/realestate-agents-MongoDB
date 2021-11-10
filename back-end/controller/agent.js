const Agent = require('../models/agent');

// Get All cities
exports.getAllCities = async (req, res, next) => {
  Agent.find({})
    .distinct('city') // distinct values
    .then((citiesArrary) => res.json(citiesArrary))
    .catch((error) => next({ status: error.status, messege: error }));
};

// Get All cities
exports.getAgentsByCity = async (req, res, next) => {
  const { city } = req.query;
  Agent.find({ city })
    .then((agentsArray) => res.json(agentsArray))
    .catch((error) => next({ status: error.status, messege: error }));
};
