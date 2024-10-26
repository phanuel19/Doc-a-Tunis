const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  codeFilm: { 
    type: String, 
    required: true 
  },
  titre: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  sujet: { 
    type: String, 
    required: true 
  },
  realisateur: {
    code: { type: String, required: true }, 
    nom: { type: String, required: true },   
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
  },
  producteur: {
    code: { type: String, required: true },   
    nom: { type: String, required: true },    
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
  },
  image: { 
    type: String 
  }, 
}, { timestamps: true });

module.exports = mongoose.model('Film', filmSchema);
