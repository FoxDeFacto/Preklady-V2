# Překladový slovník & databáze

Webová aplikace pro správu a vyhledávání překladů mezi angličtinou a češtinou s důrazem na etymologii a kontext použití.

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

3. Vytvoření .env souboru:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=váš-strapi-token
```

4. Spuštění vývojového serveru:
```bash
npm run dev
# nebo
yarn dev
```

## 🗄️ Struktura databáze

### Translation
- `id`: unikátní identifikátor
- `documentId`: externí ID dokumentu
- `english`: anglický překlad
- `czech`: pole českých překladů
  - `noun`: podstatné jméno
  - `verb`: sloveso (volitelné)
- `etymology`: etymologie slova
- `reason`: odůvodnění překladu
- `example`: příklad použití

## 🔍 API Endpoints

### Vyhledávání překladů
```typescript
GET /api/translations
```

Parametry:
- `q`: hledaný výraz
- `page`: číslo stránky
- `pageSize`: počet výsledků na stránku

## 🤝 Přispívání

1. Forkněte repozitář
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitněte změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request


## 👥 Autoři

- Ondřej Liška ([@FoxDeFacto](https://github.com/FoxDeFacto))