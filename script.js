
"use strict";

// CONFIGURATION GAME TOP UP

const CONFIG = {
  whatsappEquipe: "50942023819",

  // Taux à renseigner quand tu définiras tes prix
  tauxUSD_HTG: null,

  // Prix en dollars US
  prix: {
    "Free Fire": {
      "100 Diamants": null,
      "310 Diamants": null,
      "520 Diamants": null,
      "1060 Diamants": null,
      "2180 Diamants": null
    },

    "eFootball": {
      "550 Coins": null,
      "1300 Coins": null,
      "2800 Coins": null,
      "6100 Coins": null
    },

    "Dream League Soccer": {
      "1000 Coins": null,
      "5000 Coins": null,
      "10000 Coins": null
    },

    "Blood Strike": {
      "100 Gold": null,
      "500 Gold": null,
      "1000 Gold": null,
      "Pass Blood Strike": null
    },

    "Blox Fruits": {
      "80 Robux": null,
      "400 Robux": null,
      "800 Robux": null,
      "1700 Robux": null
    },

    "Call of Duty Mobile": {
      "80 CP": null,
      "420 CP": null,
      "880 CP": null,
      "2400 CP": null
    }
  }
};

// CATALOGUE DES JEUX

const packs = {
  "Free Fire": [
    "100 Diamants",
    "310 Diamants",
    "520 Diamants",
    "1060 Diamants",
    "2180 Diamants"
  ],

  "eFootball": [
    "550 Coins",
    "1300 Coins",
    "2800 Coins",
    "6100 Coins"
  ],

  "Dream League Soccer": [
    "1000 Coins",
    "5000 Coins",
    "10000 Coins"
  ],

  "Blood Strike": [
    "100 Gold",
    "500 Gold",
    "1000 Gold",
    "Pass Blood Strike"
  ],

  "Blox Fruits": [
    "80 Robux",
    "400 Robux",
    "800 Robux",
    "1700 Robux"
  ],

  "Call of Duty Mobile": [
    "80 CP",
    "420 CP",
    "880 CP",
    "2400 CP"
  ]
};

// INITIALISATION

function initialiserSite() {
  const selectJeu = document.getElementById("jeu");

  Object.keys(packs).forEach(function(jeu) {
    const option = document.createElement("option");
    option.value = jeu;
    option.textContent = jeu;
    selectJeu.appendChild(option);
  });

  actualiserPacks();
}

// AFFICHER LES PACKS

function ouvrirJeu(jeu) {
  document.getElementById("jeu").value = jeu;

  document.getElementById("titreJeu").textContent =
    "Packs disponibles - " + jeu;

  document.getElementById("packs").style.display = "block";

  actualiserPacks();

  document.getElementById("packs").scrollIntoView({
    behavior: "smooth"
  });
}

// ACTUALISER LA LISTE

function actualiserPacks() {
  const jeu = document.getElementById("jeu").value;
  const select = document.getElementById("pack");

  select.innerHTML = "";

  const premiereOption = document.createElement("option");
  premiereOption.value = "";
  premiereOption.textContent = "Choisir un pack";

  select.appendChild(premiereOption);

  packs[jeu].forEach(function(nomPack) {
    const option = document.createElement("option");

    option.value = nomPack;
    option.textContent = nomPack;

    select.appendChild(option);
  });

  afficherListePacks(jeu);
  actualiserPrix();
}

// AFFICHER LES BOUTONS DE PACKS

function afficherListePacks(jeu) {
  const liste = document.getElementById("listePacks");
  liste.innerHTML = "";

  packs[jeu].forEach(function(nomPack) {
    const div = document.createElement("div");
    div.className = "pack";

    const texte = document.createElement("span");
    texte.textContent = nomPack;

    const bouton = document.createElement("button");
    bouton.textContent = "Choisir";

    bouton.addEventListener("click", function() {
      document.getElementById("pack").value = nomPack;

      actualiserPrix();

      document.getElementById("commande").scrollIntoView({
        behavior: "smooth"
      });
    });

    div.appendChild(texte);
    div.appendChild(bouton);

    liste.appendChild(div);
  });
}

// CALCUL ET AFFICHAGE DES PRIX

function actualiserPrix() {
  const jeu = document.getElementById("jeu").value;
  const pack = document.getElementById("pack").value;
  const devise = document.getElementById("devise").value;

  const champPrix = document.getElementById("prix");

  const prixUSD = CONFIG.prix[jeu]?.[pack];

  if (prixUSD == null) {
    champPrix.value = "Prix à confirmer";
    return;
  }

  if (devise === "HTG") {
    if (CONFIG.tauxUSD_HTG == null) {
      champPrix.value = "Taux de conversion à configurer";
      return;
    }

    const prixHTG = prixUSD * CONFIG.tauxUSD_HTG;

    champPrix.value = prixHTG.toFixed(2) + " HTG";

  } else {
    champPrix.value = prixUSD.toFixed(2) + " USD";
  }
}

// ENVOYER LA COMMANDE WHATSAPP

function envoyerCommande() {
  const jeu = document.getElementById("jeu").value;
  const pack = document.getElementById("pack").value;
  const prix = document.getElementById("prix").value;
  const uid = document.getElementById("uid").value.trim();
  const telephone = document.getElementById("tel").value.trim();
  const paiement = document.getElementById("paiement").value;
  const devise = document.getElementById("devise").value;

  if (!pack) {
    alert("Choisis un pack.");
    return;
  }

  if (!uid) {
    alert("Entre ton ID joueur.");
    return;
  }

  if (!telephone) {
    alert("Entre ton numéro WhatsApp.");
    return;
  }

  const message =
    "Bonjour GameTopUp ! Je souhaite passer une commande.\n\n" +
    "Jeu : " + jeu + "\n" +
    "Pack : " + pack + "\n" +
    "Prix : " + prix + "\n" +
    "Devise : " + devise + "\n" +
    "UID : " + uid + "\n" +
    "Mon WhatsApp : " + telephone + "\n" +
    "Paiement : " + paiement + "\n\n" +
    "Merci de confirmer ma commande et de m'envoyer les instructions de paiement.";

  const lien =
    "https://wa.me/" +
    CONFIG.whatsappEquipe +
    "?text=" +
    encodeURIComponent(message);

  window.open(lien, "_blank");
}

// ÉVÉNEMENTS

document.addEventListener("DOMContentLoaded", function() {
  initialiserSite();

  document.getElementById("jeu").addEventListener(
    "change",
    actualiserPacks
  );

  document.getElementById("pack").addEventListener(
    "change",
    actualiserPrix
  );

  document.getElementById("devise").addEventListener(
    "change",
    actualiserPrix
  );
});
