# GOMA PRO Devs </> — 6e Promotion

Site officiel d'inscription à la 6e promotion de GOMA PRO Devs.

- Début : **lundi 7 septembre 2026**
- Format : **présentiel + en ligne**
- Horaires : **lundi à vendredi, à partir de 14h selon le parcours**
- Public : **passionnés de programmation et de technologie, de 11 ans à l'infini**
- Inscription : **gratuite**
- Formateur : **Salomon BENGZ**
- Slogan : **LE CODE**
- Devise : **« Il y a deux façons d'écrire des programmes sans erreur, seule la troisième fonctionne. »**

## Formations

- Arduino — 10 $/mois
- Web Frontend — 5 $/mois
- Web Backend — 5 $/mois
- Cybersécurité — 10 $/mois
- Informatique Complet — 5 $/mois

## Pages

- `index.html` — accueil
- `formations.html` — parcours et tarifs
- `inscription.html` — formulaire multi-étapes
- `succes.html` — confirmation + WhatsApp
- `anciens.html` — satisfaction des anciennes promotions + galerie photos/certificats
- `plus-infos.html` — informations complémentaires et bouton vers la page externe
- `admin.html` — tableau de bord local + export CSV

## Photos

Les photos fournies sont conservées dans le dépôt et seront utilisées depuis `assets/images` :

- `assets/images/logo.png` — copie du fichier **GOMA PRO Devs.jpg**
- `assets/images/formateur.jpg` — copie du fichier **bngz_pic.png**
- les autres photos `image-*.jpg` — galerie/certificats disponibles

## E-mail et WhatsApp

Le formulaire utilise FormSubmit pour transmettre les inscriptions à **shukurusalomon228@gmail.com**. Le bouton de confirmation ouvre WhatsApp avec un message prérempli vers **+243 975731096**.

> Pour un envoi WhatsApp totalement automatique sans action du candidat, il faut connecter l'API WhatsApp Business à un backend sécurisé. Le site statique ne doit jamais contenir un token API.

## GitHub Pages

Dans GitHub : **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Le workflow `.github/workflows/pages.yml` publie automatiquement le site après chaque mise à jour de `main`.

## Administration

`admin.html` fonctionne actuellement en mode local (localStorage). C'est volontaire : un mot de passe ou une clé secrète ne doit pas être exposé dans un dépôt GitHub public. Pour une administration centralisée de toutes les inscriptions, il faudra connecter un backend sécurisé (par exemple Google Apps Script ou Supabase).

## Lien d'informations

Le site contient un bouton vers : https://formation-goma-pro-devs.lovable.app/
