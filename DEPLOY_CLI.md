# 🚀 Déploiement Direct avec Vercel CLI (sans Git)

## Installation et Configuration

### 1. Installer Vercel CLI

```bash
npm install -g vercel
```

### 2. Se connecter

```bash
vercel login
```

Cela ouvrira votre navigateur pour vous connecter.

---

## Déploiement Initial

### 3. Aller dans le dossier du projet

```bash
cd /Users/luxe/Desktop/tennis-string
```

### 4. Lancer le déploiement

```bash
vercel
```

Vercel va vous poser quelques questions :

- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → Choisissez votre compte personnel
- **Link to existing project?** → `N` (No)
- **What's your project's name?** → `zurichfaststring` (ou ce que vous voulez)
- **In which directory is your code located?** → `./` (appuyez Entrée)
- **Want to override the settings?** → `N` (No)

⏳ Vercel va maintenant :
- Uploader votre code
- Installer les dépendances
- Builder le projet
- Déployer !

Après 2-3 minutes, vous verrez :
```
✅ Production: https://zurichfaststring-xxx.vercel.app
```

---

## Configuration des Variables d'Environnement

### 5. Ajouter les variables une par une

```bash
# Resend API Key
vercel env add RESEND_API_KEY production
# Coller votre clé et appuyer Entrée

# Email configuration
vercel env add FROM_EMAIL production
# Taper: noreply@zurichfaststring.ch

vercel env add ADMIN_EMAIL production
# Taper: info@zurichfaststring.ch

# Admin password
vercel env add ADMIN_PASSWORD production
# Taper: votre_mot_de_passe_fort

# Database URL (sera ajouté automatiquement par Vercel Postgres)
```

### 6. Redéployer avec les variables

```bash
vercel --prod
```

---

## Configuration de la Base de Données

### 7. Créer Vercel Postgres (via l'interface web)

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur votre projet `zurichfaststring`
3. **Storage** → **Create Database** → **Postgres**
4. Nom: `zurichfaststring-db`
5. Région: `Frankfurt` (proche Suisse)
6. **Create**

Vercel ajoute automatiquement `DATABASE_URL` ! ✅

### 8. Lancer les migrations Prisma

```bash
# Récupérer les variables d'environnement (incluant DATABASE_URL)
vercel env pull

# Lancer les migrations
npx prisma migrate deploy
```

---

## Configuration du Domaine

### 9. Ajouter votre domaine

**Option A : Via l'interface web**
1. [vercel.com/dashboard](https://vercel.com/dashboard) → votre projet
2. **Settings** → **Domains**
3. Ajoutez `zurichfaststring.ch`

**Option B : Via CLI**
```bash
vercel domains add zurichfaststring.ch
```

### 10. Configurer les DNS

Vercel vous donnera des enregistrements DNS. Ajoutez-les chez votre registrar :

```
Type: A
Name: @
Value: 76.76.21.21 (exemple, utilisez la vraie valeur de Vercel)

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

---

## Mises à Jour Futures

Pour déployer des changements :

```bash
# Aller dans le dossier
cd /Users/luxe/Desktop/tennis-string

# Déployer en production
vercel --prod
```

C'est tout ! Pas besoin de Git ! 🎉

---

## Commandes Utiles

```bash
# Voir les déploiements
vercel list

# Voir les logs en temps réel
vercel logs

# Supprimer un déploiement
vercel remove [deployment-url]

# Voir les variables d'environnement
vercel env ls

# Récupérer les variables en local
vercel env pull
```

---

## Avantages de cette méthode

✅ **Pas besoin de Git/GitHub**
✅ **Déploiement direct depuis votre Mac**
✅ **Rapide et simple**
✅ **Gratuit (plan Hobby)**
✅ **Mêmes fonctionnalités que via Git**

---

## Notes Importantes

⚠️ **Sauvegardez votre code** : Même si vous n'utilisez pas Git pour déployer, pensez à faire des backups réguliers de votre code !

⚠️ **Environnements** : 
- `vercel` (sans flag) → Preview deployment
- `vercel --prod` → Production deployment

⚠️ **Base de données** : La DB est en production, faites attention avec `prisma migrate` !

---

## Troubleshooting

### Build échoue ?
```bash
# Tester le build en local d'abord
npm run build
```

### Variables d'environnement manquantes ?
```bash
# Vérifier
vercel env ls

# Ajouter si manquante
vercel env add VARIABLE_NAME production
```

### Migrations Prisma échouent ?
```bash
# Vérifier la connection
vercel env pull
npx prisma db pull

# Forcer les migrations
npx prisma migrate deploy --force
```

---

## Support

- Documentation Vercel CLI : https://vercel.com/docs/cli
- Documentation Prisma : https://www.prisma.io/docs

