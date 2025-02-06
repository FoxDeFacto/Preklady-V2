# Překladový slovník & databáze

Tento projekt slouží k překladu současných anglických termínů do češtiny. Webová aplikace poskytuje uživatelsky přívětivý rozhraní, kde si můžete vyhledat překlady pro různá slova a pojmy, a nabízí podrobné informace o jejich původu, důvodech pro překlad a příkladech použití. Je postavena na Next.js, využívá Tailwind CSS pro stylizaci a backend je na Strapi.

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
  GET /translations?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[$or][0][english][$containsi]=${query}
  ```

- **Získání konkrétního překladu**
  ```typescript
  GET /translations/${id}?populate=*
  ```

#### Vtipy

- **Získání náhodného vtipu**
  ```typescript
  GET /jokes?pagination[start]=${randomStart}&pagination[limit]=1&populate=*
  ```

### Datové Typy

```typescript
interface CzechTranslation {
  id: number;
  noun: string | null;
  verb: string | null;
}

export interface Translation {
  id: number;
  documentId: string;
  english: string;
  czech: CzechTranslation[];
  etymology?: string | null;
  reason?: string | null;
  example?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    pagination: PaginationMeta;
  };
}

export interface ApiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface Joke {
  id: number;
  content: string;
  attributes: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface PageParams {
  id: string;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type PageProps = {
  params: Promise<PageParams>;
  searchParams?: Promise<SearchParams>;
}
```

### Příklad použití API

```typescript
// Příklad vyhledávání překladů
const searchResults = await searchTranslations('hello', 1, 10);

// Příklad získání konkrétního překladu
const translation = await getTranslation('123');

// Příklad získání náhodného vtipu
const randomJoke = await getRandomJoke();
```

## 🤝 Přispívání

1. Forkněte repozitář
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitněte změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

## 👥 Autoři

- Ondřej Liška ([@FoxDeFacto](https://github.com/FoxDeFacto))