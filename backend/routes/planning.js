// routes/planning.js
const express = require('express');
const router = express.Router();
const Planning = require('../models/Planning');

// Endpoint pour enregistrer un planning
router.post('/', async (req, res) => {
  const { filmId, titre, jour, heure, lieu } = req.body;

  try {
    const newPlanning = new Planning({
      filmId,
      titre,
      jour,
      heure,
      lieu,
    });
    
    await newPlanning.save();
    res.status(201).json({ message: 'Planning enregistré avec succès!' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du planning', error);
    res.status(400).json({ message: error.message });
  }
});

// Endpoint pour récupérer tous les plannings
router.get('/', async (req, res) => {
  try {
    const plannings = await Planning.find().populate('filmId', 'titre'); // Peupler filmId pour obtenir le titre
    res.json(plannings);
  } catch (error) {
    console.error('Erreur lors de la récupération des plannings', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des plannings.' });
  }
});

module.exports = router;
