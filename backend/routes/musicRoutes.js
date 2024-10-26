const express = require('express');
const router = express.Router();
const Music = require('../models/Music'); // Assurez-vous que le modèle Music est bien importé

// Route pour ajouter une musique
router.post('/', async (req, res) => {
  const { titre, artiste, genre } = req.body;

  try {
    const newMusic = new Music({ titre, artiste, genre });
    await newMusic.save();
    res.status(201).json({ message: 'Musique ajoutée avec succès', music: newMusic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la musique' });
  }
});

module.exports = router;
