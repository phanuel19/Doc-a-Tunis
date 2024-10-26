const mongoose = require('mongoose');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  motDePasse: { 
    type: String, 
    required: true 
  },
  role: { // Ajout du champ rôle
    type: String,
    required: true,
  }
}, { timestamps: true }); // Ajoute les champs createdAt et updatedAt

// Créer le modèle User
const User = mongoose.model('User', userSchema);

module.exports = User;
