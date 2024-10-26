// Importer les modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Ajouter CORS
const path = require('path'); // Ajouter le module path pour gérer les chemins de fichiers

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Définir le port (5000 par défaut)
const PORT = process.env.PORT || 5000;

// Middleware pour traiter les données JSON
app.use(express.json());
app.use(cors()); // Utiliser CORS pour autoriser les requêtes du front-end

// Servir les fichiers statiques dans le dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Adaptation ici

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données PROJET AGL réussie'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Importer les routes
const userRoutes = require('./routes/userRoutes'); // Routes pour les utilisateurs
const filmRoutes = require('./routes/films'); // Routes pour les films
const musicRoutes = require('./routes/musicRoutes'); // Routes pour la musique
const planningRoutes = require('./routes/planning'); // Routes pour le planning

// Utiliser les routes
app.use('/api/users', userRoutes);
app.use('/api/films', filmRoutes); // Utiliser les routes de films
app.use('/api/musics', musicRoutes); // Utiliser les routes de musique
app.use('/api/planning', planningRoutes); // Utiliser les routes de planning

// Route de test
app.get('/', (req, res) => {
  res.send('Serveur Express fonctionne correctement');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
