This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
# Folder Structure
``` 
CUREWAY-PROJECT
├── .next/                       # Next.js build output (auto-generated)
├── src/                         # Main source folder
│   ├── app/                     # App Router - pages and routes
│   │   ├── layout.tsx           # Main layout (Navbar, Footer, etc.)
│   │   ├── page.tsx             # Home page
│   │   ├── categories/          # Catalog routes
│   │   │   ├── [categoryId]/    # Dynamic category pages
│   │   │   │   ├── page.tsx     # Category page showing products
│   │   │   │   └── products/    # Products inside a category
│   │   │   │       └── [productId]/ # Dynamic product page
│   │   │   │           └── page.tsx
│   │   ├── nearbyPharmacies/    # Nearby pharmacies page
│   │   └── profile/             # User profile page
│   │
│   ├── components/              # Reusable components
│   │   ├── features/            # Feature-specific components (business logic)
│   │   │   ├── categories/
│   │   │   │   ├── components/  # All React components for categories
│   │   │   │   │   ├── CategoryCard.tsx
│   │   │   │   │   └── CategoryList.tsx
│   │   │   │   └── services.ts  # API calls and data logic
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── components/  # All React components for products
│   │   │   │   │   ├── ProductCard.tsx
│   │   │   │   │   └── ProductDetails.tsx
│   │   │   │   └── services.ts  # API calls and data logic
│   │   │   │
│   │   │   ├── login/
│   │   │   │   ├── components/
│   │   │   │   │   └── LoginForm.tsx
│   │   │   │   └── services.ts
│   │   │   │
│   │   │   └── search/
│   │   │       ├── components/  # Search bar or search results components
│   │   │       └── services.ts
│   │   │
│   │   ├── layout/              # Layout-related components (header, footer)
│   │   │   └── header.tsx
│   │   └── ui/                  # Basic UI components (buttons, inputs, etc.)
│   │       └── button.tsx
│   │
│   ├── context/                 # Global state management (e.g., cart)
│   ├── hooks/                   # Custom React hooks
│   ├── libs/                    # External libraries or setup (Axios, Prisma, etc.)
│   ├── public/                  # Static assets (images, icons, etc.)
│   ├── styles/                  # CSS/Tailwind styles
│   └── types/                   # TypeScript interfaces and types
│
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── next.config.js               # Next.js configuration
```