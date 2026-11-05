/* PERSONNALISATION DU PORTAIL : modifiez uniquement les valeurs entre guillemets.
   Les champs vides restent affichés comme "à confirmer" ou "prochainement".
   Publiez uniquement les informations approuvées par votre groupe RPE.
*/
window.RPE_CONFIG = {
  schoolName: "École primaire Daniel Alix",  // nom de l’école
  schoolYear: "2026–2027",
  city: "Coltainville",
  contactEmail: "",                       // ex. "parents.ecole@example.org"
  teamIntro: "Les représentants des parents d’élèves pour cette année scolaire :",
  titularMembers: ["Sophie DAMIRAL", "Jennifer BRILLOT", "Isabelle ROSSIGNOL BORDE", "Séverine KLOWSKOWSKY", "Soline BOROWCZYK"],
  substituteMembers: ["Gwendoline FUX", "Cabrié (prénom à confirmer)", "Quentin NASSOY", "Schneider (prénom à confirmer)", "Audrey COGNAULT", "Haddad (prénom à confirmer)"],
  unassignedMembers: ["Laura JAUNET", "Alexia PILLIAS"], // statut titulaire/suppléant à confirmer
  nextMeeting: "Date à confirmer",        // ex. "Mardi 16 mars 2027"
  meetingNote: "Vous pouvez proposer vos questions en amont du conseil d’école.",
  documents: [
    // Exemple à activer après avoir ajouté le fichier dans le dossier documents :
    // {title: "Compte rendu du conseil d’école", date: "Novembre 2026", url: "documents/compte-rendu-novembre-2026.pdf"},
  ],
  news: [
    {date: "Novembre 2026", title: "Bienvenue sur l’espace des parents d’élèves", text: "Retrouvez ici les informations pratiques et les moyens de contacter vos représentants."},
  ],
  readyForPublication: false             // passez à true quand tout a été vérifié
};
