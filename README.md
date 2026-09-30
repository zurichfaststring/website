# Zurich Fast String 🎾

Application web de réservation de cordage rapide de raquettes de tennis à Zürich.

## 🚀 Fonctionnalités

### Pour les clients
- **Page d'accueil** informative avec présentation du service
- **Réservation en ligne** en 3 étapes simples :
  1. Choix de la date et du créneau horaire
  2. Détails de la raquette et du cordage
  3. Coordonnées et mode de paiement
- **Confirmation** par email (à configurer)
- **Vérification automatique** de la disponibilité (max 2 raquettes/jour)

### Pour l'admin
- **Tableau de bord** complet pour gérer les réservations
- **Gestion des statuts** : réservé, reçu, en cours, prêt, remis, annulé
- **Paramètres** : configuration de la capacité quotidienne
- **Jours fermés** : blocage de dates (jours fériés, congés)
- **Authentification simple** par mot de passe

## 🛠️ Technologies

- **Framework** : Next.js 16 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **Base de données** : Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Authentification** : Session storage (MVP) - à améliorer pour la production
- **Emails** : Prêt pour Resend ou Nodemailer

## 🔎 SEO & langues

- URLs par langue : `/` (anglais), `/de` (allemand), `/fr` (français), via `next-intl` (`i18n/routing.ts`, `proxy.ts`). Les traductions sont rendues côté serveur, donc visibles par Google.
- Titres, descriptions, canonical et balises hreflang : `lib/seo.ts`, textes dans `messages/*.json` (clé `meta`).
- Données structurées LocalBusiness : `components/seo/LocalBusinessJsonLd.tsx`.
- `robots.txt` et `sitemap.xml` : `app/robots.ts`, `app/sitemap.ts`. La page admin est en `noindex`.
- Hors code, à faire pour le référencement local : créer une fiche Google Business Profile, soumettre le sitemap dans Google Search Console, s'inscrire sur local.ch / search.ch.

## 📦 Installation

### Prérequis
- Node.js 18+ et npm

### Étapes

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer les variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL="file:./dev.db"

# Admin credentials (SET YOUR OWN!)
ADMIN_EMAIL="your_admin_email@example.com"
ADMIN_PASSWORD="your_secure_password_here"

# Email service (Resend)
RESEND_API_KEY="your_resend_api_key_here"
FROM_EMAIL="noreply@yourdomain.com"
```

3. **Initialiser la base de données**

La base de données SQLite est déjà initialisée, mais si vous voulez la recréer :

```bash
npx prisma migrate reset
npx prisma generate
```

4. **Lancer le serveur de développement**

```bash
npm run dev
```

5. **Ouvrir l'application**

Accédez à [http://localhost:3000](http://localhost:3000)

## 🎯 Utilisation

### Accès client
- **Page d'accueil** : http://localhost:3000
- **Réservation** : http://localhost:3000/booking

### Accès admin
- **Tableau de bord** : http://localhost:3000/admin
- **Identifiants** : Utilisez ceux définis dans votre `.env.local`

⚠️ **Important** : Utilisez un mot de passe fort et ne le partagez jamais publiquement !

## 📋 Structure du projet

```
tennis-string/
├── app/
│   ├── api/                    # API Routes
│   │   ├── bookings/          # Gestion des réservations
│   │   ├── settings/          # Paramètres
│   │   └── closed-days/       # Jours fermés
│   ├── admin/                 # Tableau de bord admin
│   ├── booking/               # Flow de réservation
│   ├── page.tsx               # Page d'accueil
│   └── layout.tsx             # Layout principal
├── components/
│   ├── admin/                 # Composants admin
│   │   ├── BookingsTable.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── ClosedDaysPanel.tsx
│   ├── booking/               # Composants réservation
│   │   ├── DateStep.tsx
│   │   ├── DetailsStep.tsx
│   │   ├── ContactStep.tsx
│   │   └── ConfirmationStep.tsx
│   └── ui/                    # Composants shadcn/ui
├── lib/
│   └── prisma.ts              # Client Prisma
├── prisma/
│   ├── schema.prisma          # Schéma de base de données
│   └── dev.db                 # Base SQLite (dev)
└── package.json
```

## 💾 Base de données

### Modèles Prisma

- **Booking** : Réservations avec tous les détails
- **Settings** : Paramètres globaux (capacité quotidienne)
- **ClosedDay** : Jours où le service est fermé

### Commandes utiles

```bash
# Ouvrir Prisma Studio (interface visuelle)
npx prisma studio

# Créer une nouvelle migration
npx prisma migrate dev --name description

# Générer le client Prisma
npx prisma generate

# Réinitialiser la base de données
npx prisma migrate reset
```

## 🚢 Déploiement

### Option 1 : Vercel (recommandé pour Next.js)

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre dépôt GitHub
3. Configurez les variables d'environnement
4. Passez à PostgreSQL pour la production (Vercel Postgres ou Supabase)

```env
# Remplacez dans .env pour la production
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

5. Déployez automatiquement

### Option 2 : Docker (à venir)

Un `Dockerfile` peut être ajouté pour un déploiement containerisé.

## ✉️ Configuration des emails (optionnel)

Pour activer les emails de confirmation, ajoutez Resend :

1. Créez un compte sur [Resend](https://resend.com)
2. Obtenez votre clé API
3. Ajoutez-la dans `.env` :
```env
RESEND_API_KEY="re_..."
```

4. Décommentez le code d'envoi d'email dans `app/api/bookings/route.ts`

## 🔒 Sécurité

Pour la production :
- ✅ Changez les identifiants admin
- ✅ Utilisez NextAuth avec provider OAuth
- ✅ Activez HTTPS
- ✅ Configurez CORS si nécessaire
- ✅ Validez toutes les entrées utilisateur
- ✅ Utilisez PostgreSQL au lieu de SQLite

## 📱 Fonctionnalités futures

- [ ] Envoi automatique d'emails de confirmation
- [ ] Notifications SMS via Twilio
- [ ] Paiement en ligne (Stripe)
- [ ] Calendrier de récupération
- [ ] Historique des clients
- [ ] Export des données (CSV/PDF)
- [ ] Multi-langue (DE, EN)
- [ ] Application mobile

## 🤝 Support

Pour toute question ou problème :
- 📧 Email : info@zurichfaststring.ch
- 📱 WhatsApp : +41 78 207 46 77

## 📄 Licence

© 2025 Zurich Fast String. Tous droits réservés.