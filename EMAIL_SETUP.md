# Configuration des emails avec Resend

## 📧 Vue d'ensemble

Le système d'envoi d'emails est configuré pour envoyer :
1. **Email de confirmation au client** avec :
   - Récapitulatif de la réservation
   - Adresse de dépôt : Nordstrasse 242, 8037 Zürich
   - Lien WhatsApp pour confirmer l'heure de dépôt
   - Informations de paiement

2. **Email de notification à l'admin** (info@zurichfaststring.ch) avec :
   - Détails de la nouvelle réservation
   - Informations du client
   - Lien vers le dashboard admin

## 🚀 Configuration

### Étape 1 : Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Le plan gratuit offre **3,000 emails/mois** - largement suffisant pour commencer !

### Étape 2 : Obtenir votre clé API

1. Dans le dashboard Resend, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez-lui un nom (ex: "Zurich Fast String Production")
4. Copiez la clé API (elle commence par `re_...`)

### Étape 3 : Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Resend API Key
RESEND_API_KEY=re_votre_cle_api_ici

# Email de l'expéditeur (voir étape 4)
FROM_EMAIL=onboarding@resend.dev

# Email de l'administrateur
ADMIN_EMAIL=info@zurichfaststring.ch
```

### Étape 4 : Configurer votre domaine (RECOMMANDÉ pour la production)

#### Option A : Mode développement (temporaire)
Utilisez l'email par défaut de Resend :
```
FROM_EMAIL=onboarding@resend.dev
```
⚠️ Les emails envoyés depuis `onboarding@resend.dev` peuvent finir dans les spams !

#### Option B : Domaine personnalisé (RECOMMANDÉ)
1. Dans Resend, allez dans **Domains**
2. Ajoutez votre domaine (ex: `zurichfaststring.ch`)
3. Configurez les enregistrements DNS (SPF, DKIM, DMARC) dans votre hébergeur de domaine
4. Une fois vérifié, utilisez :
```
FROM_EMAIL=noreply@zurichfaststring.ch
```

## 📝 Templates d'email

Les templates sont dans le dossier `/emails` :
- `ClientBookingConfirmation.tsx` - Email client
- `AdminBookingNotification.tsx` - Email admin

Les templates sont **multilingues** et s'adaptent automatiquement à la langue choisie par le client (🇫🇷 FR, 🇩🇪 DE, 🇬🇧 EN).

## 🧪 Test des emails

### Test en développement local

1. Assurez-vous que votre serveur est lancé :
```bash
npm run dev
```

2. Créez une réservation via l'interface
3. Vérifiez les logs dans le terminal pour voir si les emails ont été envoyés
4. Vérifiez dans le dashboard Resend pour voir l'état des emails

### Prévisualiser les templates

Pour prévisualiser les templates d'email avant de les envoyer :

```bash
npm run email
```

Cela lancera React Email Dev (si configuré) pour voir les templates dans le navigateur.

## 🔍 Dépannage

### Les emails ne sont pas envoyés

1. **Vérifiez les variables d'environnement**
   ```bash
   # Dans le terminal
   echo $RESEND_API_KEY
   ```

2. **Vérifiez les logs**
   - Regardez les logs du serveur Next.js
   - Vérifiez le dashboard Resend pour voir les erreurs

3. **Vérifiez que la clé API est valide**
   - Testez avec une requête simple dans le dashboard Resend

### Les emails arrivent en spam

1. **Configurez votre propre domaine** (voir Étape 4, Option B)
2. **Configurez SPF, DKIM, DMARC** correctement
3. **Ajoutez un lien de désabonnement** (optionnel)

### Erreur "Invalid API key"

1. Vérifiez que `RESEND_API_KEY` est bien définie dans `.env.local`
2. Vérifiez qu'il n'y a pas d'espaces avant/après la clé
3. Recréez une nouvelle clé API si nécessaire

## 📊 Monitoring

Dans le dashboard Resend, vous pouvez :
- Voir tous les emails envoyés
- Vérifier le statut (delivered, bounced, opened)
- Voir les taux d'ouverture
- Déboguer les erreurs

## 🎨 Personnalisation

Pour modifier les templates :

1. Éditez les fichiers dans `/emails/`
2. Les styles inline sont utilisés pour une meilleure compatibilité
3. Testez avec différents clients email (Gmail, Outlook, Apple Mail)

## 💰 Coûts

- **Plan gratuit** : 3,000 emails/mois (100 emails/jour)
- **Plan Pro** : 10$/mois pour 50,000 emails
- Pour vos besoins (~2 réservations/jour × 2 emails = 120 emails/mois), le plan gratuit est largement suffisant !

## 🔐 Sécurité

- ⚠️ **Ne commitez JAMAIS votre `.env.local`**
- Le fichier `.env.local` est déjà dans `.gitignore`
- En production (Vercel), ajoutez les variables d'environnement dans les settings du projet

## 🚀 Déploiement en production

Sur Vercel :
1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez :
   - `RESEND_API_KEY`
   - `FROM_EMAIL`
   - `ADMIN_EMAIL`
3. Redéployez votre application

## 📞 Support

- Documentation Resend : [resend.com/docs](https://resend.com/docs)
- Dashboard : [resend.com/dashboard](https://resend.com/dashboard)


