# Překladový slovník & databáze

Tento projekt slouží k překladu současných anglických termínů do češtiny. Webová aplikace poskytuje uživatelsky přívětivý rozhraní, kde si můžete vyhledat překlady pro různá slova a pojmy, a nabízí podrobné informace o jejich původu, důvodech pro překlad a příkladech použití. Je postavena na Next.js, využívá Tailwind CSS pro stylizaci a backend je na Strapi. Web je dostupný na [Novo-čeština](https://novo-cestina.lynder.dev/)

## 🚀 Funkce

- Vyhledávání překladů v angličtině i češtině
- Detailní karty překladů včetně:
  - Překlad slova (podstatné jméno/sloveso)
  - Etymologie
  - Odůvodnění překladu
  - Příklady použití
- Responzivní design
- Stránkování výsledků
- Okamžité vyhledávání

## 🛠️ Technologie

- **Frontend:**
  - Next.js 14 (React)
  - TypeScript
  - Tailwind CSS
  - Lucide Icons

- **Backend:**
  - Strapi CMS
  - PostgreSQL
  - Node.js

## 📋 Požadavky

- Node.js 18.17 nebo novější
- PostgreSQL 14 nebo novější
- NPM nebo Yarn

## 🔧 Instalace

1. Klonování repozitáře:
```bash
git clone https://github.com/FoxDeFacto/Preklady-V2.git
cd Preklady-V2
```

2. Instalace závislostí:
```bash
npm install
# nebo
yarn install
```

3. Vytvoření .env v strapi souboru:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified


# Database
DATABASE_CLIENT=sqlite
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_FILENAME=.tmp/data.db
```

5. Úprava config.js souboru v nextu:
```env
// config.js
export const API ='http://localhost:1337';
```

6. Spuštění vývojového serveru:
```bash
npm run dev
# nebo
yarn dev
```

## 📚 API Dokumentace

### Endpointy

Všechny API endpointy jsou přístupné přes základní URL: `${API_URL}/api`

#### Překlady

- **Získání náhodných překladů**
  ```typescript
  GET /translations?populate=*&pagination[start]=${randomStart}&pagination[limit]=${limit}&sort=updatedAt:${randomSort}
  ```

- **Vyhledávání překladů**
  ```typescript
  GET /translations?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$or][0][english][$containsi]=${query}&filters[$or][1][czech][noun][$containsi]=${query}&filters[$or][2][czech][verb][$containsi]=${query}
  ```

- **Získání konkrétního překladu**
  ```typescript
  GET /translations/${id}?populate=*
  ```

- **Získání nejnovějších překladů**
  ```typescript
  GET /translations?populate=*&pagination[limit]=${limit}&sort=createdAt:desc
  ```

#### Vtipy

- **Získání náhodného vtipu**
  ```typescript
  GET /jokes?pagination[start]=${randomStart}&pagination[limit]=1&populate=*
  ```

## 👥 Autoři

- Ondřej Liška ([@FoxDeFacto](https://github.com/FoxDeFacto))
- Kryštof Malinda ([@Lynder063](https://github.com/Lynder063))