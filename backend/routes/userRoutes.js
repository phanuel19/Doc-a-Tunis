const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assurez-vous que le modèle User est bien importé

// Route pour l'inscription (ajouter un nouvel utilisateur)
router.post('/', async (req, res) => {
  const { nom, email, motDePasse, role } = req.body; // Inclure le rôle

  try {
    const newUser = new User({ nom, email, motDePasse, role });
    await newUser.save(); // Sauvegarder l'utilisateur dans la base de données

    res.status(201).json(newUser); // Retourner l'utilisateur créé
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur", error: err.message });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  const { email, motDePasse} = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le mot de passe est correct
    if (user.motDePasse !== motDePasse) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Si tout est correct, renvoyer les informations utilisateur, y compris le rôle
    res.status(200).json({ 
      message: 'Connexion réussie', 
      user: {
        nom: user.nom,
        email: user.email,
        role: user.role, // Inclure le rôle ici
      } 
    });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
});

// Route pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // Retourner tous les utilisateurs
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route pour supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id); // Supprimer l'utilisateur par ID
    res.status(204).send(); // Envoyer une réponse vide pour succès
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', err);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
});

module.exports = router;
