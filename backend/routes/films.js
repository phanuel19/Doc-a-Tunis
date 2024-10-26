const express = require('express');
const router = express.Router();
const Film = require('../models/Film');
const multer = require('multer');
const path = require('path');

// Configurer le stockage de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Assurez-vous que ce chemin correspond à l'emplacement du dossier uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier avec un timestamp
  },
});

// Créer l'instance de Multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    console.log('MIME type:', file.mimetype); // Log pour le type MIME
    console.log('File extension:', path.extname(file.originalname).toLowerCase()); // Log pour l'extension

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Erreur: Seulement des fichiers images sont acceptés!'));
  },
});

// Route pour ajouter un film
router.post('/', upload.single('image'), async (req, res) => {
  const { codeFilm, titre, date, sujet, realisateur, producteur } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    // Extraire les informations du réalisateur et du producteur
    const { code: codeRealisateur, nom: nomRealisateur, prenom: prenomRealisateur, dateNaissance: dateNaissanceRealisateur } = JSON.parse(realisateur);
    const { code: codeProducteur, nom: nomProducteur, prenom: prenomProducteur, dateNaissance: dateNaissanceProducteur } = JSON.parse(producteur);

    const newFilm = new Film({
      codeFilm,
      titre,
      date,
      sujet,
      realisateur: {
        code: codeRealisateur,
        nom: nomRealisateur,
        prenom: prenomRealisateur,
        dateNaissance: dateNaissanceRealisateur,
      },
      producteur: {
        code: codeProducteur,
        nom: nomProducteur,
        prenom: prenomProducteur,
        dateNaissance: dateNaissanceProducteur,
      },
      image,
    });

    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (err) {
    console.error("Erreur lors de l'ajout du film :", err);
    res.status(400).json({ message: "Erreur lors de l'ajout du film", error: err.message });
  }
});

// Route pour récupérer tous les films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (err) {
    console.error('Erreur lors de la récupération des films :', err);
    res.status(500).json({ message: "Erreur lors de la récupération des films", error: err.message });
  }
});

// Exporter le routeur
module.exports = router;
