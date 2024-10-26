const mongoose = require('mongoose');

// Définir le schéma de la musique
const musicSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  artiste: { type: String, required: true },
  genre: { type: String, required: true },
}, { timestamps: true });

// Créer le modèle Music
const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
