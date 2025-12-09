# Guide de Design - Tennis String Zürich 🎾

## 🎨 Palette de couleurs

### Couleurs principales

```
Vert Émeraude (Tennis Court)
━━━━━━━━━━━━━━━━━━━━━━━━
emerald-50   #ecfdf5  ░░░░░  Fonds légers
emerald-100  #d1fae5  ░░░░░  Badges, états
emerald-200  #a7f3d0  ████   Bordures actives
emerald-600  #059669  ████   Couleur primaire
emerald-700  #047857  ████   Hover states
emerald-800  #065f46  ████   Accents foncés

Jaune/Orange (Tennis Ball)
━━━━━━━━━━━━━━━━━━━━━━━━
yellow-50    #fefce8  ░░░░░  Fonds
yellow-100   #fef9c3  ████   Badges
yellow-600   #ca8a04  ████   Accents
yellow-700   #a16207  ████   Texte

Neutre (Slate)
━━━━━━━━━━━━━━━━━━━━━━━━
slate-50     #f8fafc  ░░░░░  Fonds
slate-100    #f1f5f9  ░░░░░  Fonds secondaires
slate-600    #475569  ████   Texte secondaire
slate-900    #0f172a  ████   Texte principal
```

## 🎯 Composants clés

### Navigation
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  🎾 Tennis String Zürich          [Réserver] ┃
┃     Service professionnel         [Admin]    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- Logo avec icône de raquette personnalisée
- Sous-titre "Service professionnel"
- Backdrop blur + shadow
- Effet hover scale sur le logo

### Hero Section
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                              ┃
┃        [🎾 Service de cordage...]           ┃
┃                                              ┃
┃     Votre raquette entre bonnes mains       ┃
┃            ~~~~~~~~~~~~                      ┃
┃                                              ┃
┃     Cordage professionnel à Zürich...       ┃
┃                                              ┃
┃          [🎾 Réserver maintenant]           ┃
┃                                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- Titre avec gradient de texte
- Badge avec icône de balle
- CTA prominent avec icône
- Bulles animées en arrière-plan

### Cartes de fonctionnalités
```
┏━━━━━━━┓ ┏━━━━━━━┓ ┏━━━━━━━┓ ┏━━━━━━━┓
┃  🎾   ┃ ┃   ⏰   ┃ ┃   📍   ┃ ┃   ✨   ┃
┃       ┃ ┃       ┃ ┃       ┃ ┃       ┃
┃ Prix  ┃ ┃ Délai ┃ ┃ Local ┃ ┃ Simple┃
┃       ┃ ┃       ┃ ┃       ┃ ┃       ┃
┃25 CHF ┃ ┃24-48h ┃ ┃Zürich ┃ ┃Online ┃
┗━━━━━━━┛ ┗━━━━━━━┛ ┗━━━━━━━┛ ┗━━━━━━━┛
   ↑ hover: translate-y + shadow
```
- Gradients de fond subtils
- Icônes grandes et centrées
- Animation au hover
- Bordures colorées

### Étapes (Comment ça marche)
```
┏━━━━━━━━━┓      →      ┏━━━━━━━━━┓      →      ┏━━━━━━━━━┓
┃    1    ┃             ┃    2    ┃             ┃    3    ┃
┃   📅    ┃             ┃   🎾    ┃             ┃   🏆    ┃
┃         ┃             ┃         ┃             ┃         ┃
┃Réservez ┃             ┃Déposez  ┃             ┃Récupérez┃
┗━━━━━━━━━┛             ┗━━━━━━━━━┛             ┗━━━━━━━━━┛
```
- Cartes avec gradients colorés
- Flèches décoratives entre étapes
- Numéros avec shadow et scale au hover
- Layout en grille responsive

## 📐 Espacements

```
Section Padding:
─────────────────
Hero:      py-20 md:py-28
Features:  py-20
Steps:     py-20
CTA:       py-20
Footer:    py-12

Card Spacing:
─────────────────
Gap:       gap-6 (features)
           gap-8 (steps)
Border:    border-2
Radius:    rounded-2xl / rounded-3xl
```

## 🎭 Animations et transitions

### Classes d'animation
```css
/* Scale au hover */
hover:scale-105
group-hover:scale-110

/* Translation */
hover:-translate-y-1

/* Shadow progression */
shadow-lg → hover:shadow-xl → hover:shadow-2xl

/* Transition fluide */
transition-all
transition-transform
transition-colors

/* Animations Tailwind */
animate-pulse (bulles background)
animate-spin (loaders)
```

### Effets de profondeur
```css
/* Navigation */
backdrop-blur-md + shadow-sm

/* Cards */
shadow-lg / shadow-xl
border-2 border-emerald-100

/* Boutons CTA */
shadow-2xl hover:shadow-3xl

/* État actif (step indicator) */
ring-4 ring-emerald-200
```

## 🔤 Typographie

```
Titres:
───────
Hero:        text-5xl md:text-7xl font-extrabold
Section:     text-3xl md:text-4xl font-bold
Card title:  text-xl font-bold
Sub-title:   text-lg

Corps:
───────
Lead:        text-xl md:text-2xl
Normal:      text-base
Small:       text-sm
X-Small:     text-xs

Poids:
───────
Normal:      font-normal
Medium:      font-medium
Semibold:    font-semibold
Bold:        font-bold
Extrabold:   font-extrabold
```

## 🎯 Points clés du design

### ✅ À faire
- Utiliser les icônes personnalisées (RacketIcon, TennisBallIcon)
- Couleurs émeraude pour les éléments principaux
- Gradients pour ajouter de la profondeur
- Animations subtiles au hover
- Backdrop blur sur les navigations
- Shadows pour la hiérarchie visuelle

### ❌ À éviter
- Trop d'animations (garder subtil)
- Couleurs vives qui clashent
- Ombres trop prononcées
- Texte trop petit sur mobile
- Manque de contraste

## 📱 Responsive Design

```
Mobile First:
─────────────
Base:     Design pour mobile
md:       768px+ (tablet)
lg:       1024px+ (desktop)

Grid:
─────────────
Mobile:   grid-cols-1
Tablet:   md:grid-cols-2
Desktop:  lg:grid-cols-3 / lg:grid-cols-4

Spacing:
─────────────
Mobile:   px-4 py-12
Desktop:  px-6 py-20
```

## 🎨 Exemples de code

### Bouton principal
```tsx
<Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all hover:scale-105">
  <RacketIcon />
  <span>Réserver</span>
</Button>
```

### Card avec hover
```tsx
<Card className="border-2 hover:border-emerald-300 transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-emerald-50/30 group">
  <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl group-hover:scale-110 transition-transform">
    <RacketIcon />
  </div>
</Card>
```

### Section avec fond décoratif
```tsx
<section className="relative overflow-hidden">
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
  </div>
  {/* Contenu */}
</section>
```

---

**Design System Version**: 2.0  
**Last Updated**: October 4, 2025  
**Brand**: Tennis String Zürich 🎾

