# Guide Rapide - Tennis String Zürich

## 🚀 Démarrage rapide

### 1. Installer et lancer

```bash
npm install
npm run dev
```

### 2. Configurer les variables d'environnement

Créez un fichier `.env` :

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="your_admin_email@example.com"
ADMIN_PASSWORD="your_secure_password_here"
RESEND_API_KEY="your_resend_api_key_here"
FROM_EMAIL="noreply@yourdomain.com"
```

### 3. Accéder à l'application

- **Site client** : http://localhost:3000
- **Admin** : http://localhost:3000/admin
  - Utilisez les credentials que vous avez définis dans `.env.local`

## 📊 Base de données Prisma

### Commandes utiles

```bash
# Interface visuelle de la BDD
npx prisma studio

# Créer une migration
npx prisma migrate dev

# Réinitialiser la BDD
npx prisma migrate reset

# Générer le client
npx prisma generate
```

## 🎯 Workflow typique

### Côté client

1. **Accueil** → Clic sur "Réserver"
2. **Étape 1** : Choisir date et créneau
3. **Étape 2** : Détails raquette et cordage
4. **Étape 3** : Coordonnées et paiement
5. **Confirmation** : Email + numéro de réservation

### Côté admin

1. **Connexion** : /admin
2. **Réservations** : Voir et gérer les réservations
3. **Changer statut** : booked → received → in_progress → ready → delivered
4. **Paramètres** : Modifier capacité quotidienne
5. **Jours fermés** : Bloquer des dates

## 💡 Règles métier

- **Capacité** : 2 raquettes max/jour (modifiable)
- **Prix** : 25 CHF main-d'œuvre + cordage si fourni
- **Statuts** : booked, received, in_progress, ready, delivered, cancelled
- **Délai** : 24-48h standard

## 🔧 Personnalisation

### Changer le prix

Modifiez dans `prisma/schema.prisma` :
```prisma
laborPrice Float @default(25.0)
```

### Changer la capacité par défaut

Modifiez dans `prisma/schema.prisma` :
```prisma
dailyCapacity Int @default(2)
```

### Ajouter un nouveau statut

1. Ajoutez dans les composants admin
2. Mettez à jour les API routes
3. Ajoutez les traductions

## 📧 Email (optionnel)

Pour activer Resend :

1. Créez un compte sur [resend.com](https://resend.com)
2. Ajoutez dans `.env` :
```env
RESEND_API_KEY="re_votre_clé"
```
3. Décommentez le code dans `app/api/bookings/route.ts`

## 🚢 Déploiement production

### Avant de déployer

- [ ] Changer les identifiants admin
- [ ] Passer à PostgreSQL
- [ ] Configurer les emails
- [ ] Activer HTTPS
- [ ] Configurer NextAuth proprement

### Sur Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables d'environnement sur Vercel
# 4. Ajouter Vercel Postgres
# 5. Migrer la base
npx prisma migrate deploy
```

## 🐛 Dépannage

### La BDD ne fonctionne pas
```bash
npx prisma migrate reset
npx prisma generate
```

### Erreur de build
```bash
rm -rf .next
npm run build
```

### Problème de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Contact

- 📧 Email : info@zurichfaststring.ch
- 📱 WhatsApp : +41 78 207 46 77

---

**Astuce** : Utilisez `npx prisma studio` pour voir et modifier facilement les données de votre base ! 🎾

