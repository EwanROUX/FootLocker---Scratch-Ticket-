# 👟 Foot Locker - Scratch & Win (Concept)

Un prototype de jeu interactif "Carte à gratter" (Scratch Card) conçu pour une activation marketing mobile-first. Ce projet simule une expérience de grattage réaliste directement dans le navigateur sans rechargement de page (SPA).

![Project Preview](https://via.placeholder.com/800x400?text=Ajouter+une+capture+d'ecran+ici)
*(N'hésite pas à remplacer ce lien par une vraie capture d'écran de ton projet)*

## ✨ Fonctionnalités

* **Effet de Grattage Réaliste :** Utilisation de l'API HTML5 Canvas pour simuler le grattage physique (support souris et tactile).
* **Logique de Jeu Aléatoire :** Le système détermine au chargement si l'utilisateur gagne ou perd (actuellement réglé à 50% de chance).
* **Navigation Fluide (SPA) :** Transitions entre les écrans (Jeu -> Résultat -> Formulaire) gérées en JavaScript sans rechargement.
* **Design Responsive :** Adapté pour fonctionner parfaitement sur mobile et desktop.
* **Identité Visuelle :** Respect des codes couleurs de la marque (Noir, Blanc, Rouge).

## 🛠️ Stack Technique

* **HTML5 :** Structure sémantique.
* **CSS3 :** Flexbox pour la mise en page, Variables CSS pour la gestion des thèmes, Animations CSS.
* **JavaScript (Vanilla) :**
    * Gestion du `Canvas Rendering Context 2D` pour l'effet "gomme" (`globalCompositeOperation = 'destination-out'`).
    * Manipulation du DOM pour la gestion des états (Win/Lose).

## 🚀 Installation et Utilisation

Il s'agit d'un projet statique, aucune installation complexe (npm/node) n'est nécessaire.

1.  **Cloner le projet :**
    ```bash
    git clone [https://github.com/TON_NOM_UTILISATEUR/footlocker-scratch-game.git](https://github.com/TON_NOM_UTILISATEUR/footlocker-scratch-game.git)
    ```
2.  **Lancer :**
    Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur web moderne.

## 🎨 Personnalisation du code

### Changer la probabilité de gain
Dans la section `<script>`, cherchez la fonction `initGame()` :
```javascript
// Modifier 0.5 pour changer le % (ex: 0.2 pour 20% de chance de gagner)
isWinner = Math.random() > 0.5;
