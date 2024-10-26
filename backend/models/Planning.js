// models/Planning.js
const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Film', // Référence au modèle Film
  },
  titre: {
    type: String,
    required: true,
  },
  jour: {
    type: Date,
    required: true,
  },
  heure: {
    type: String, // Utiliser String pour stocker l'heure au format HH:mm
    required: true,
  },
  lieu: {
    type: String,
    required: true,
  },
});

const Planning = mongoose.model('Planning', planningSchema);
module.exports = Planning;
