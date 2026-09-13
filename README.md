# ÉLVARA - Luxury E-Commerce Website

A premium luxury fashion e-commerce website built with React, Vite, and Tailwind CSS. ÉLVARA represents a fictional high-end brand focused on craftsmanship, exclusivity, and timeless design.

![ÉLVARA](https://img.shields.io/badge/ÉLVARA-Luxury%20Reimagined-elvaragold)

## 🌟 Features

### Core Functionality
- **Product Catalog**: 14+ luxury products across 4 collections (Timepieces, Atelier, Leather, Essentials)
- **Advanced Filtering**: Filter by collection, category, price range, and sort options
- **Product Search**: Full-text search with instant results and suggestions
- **Shopping Cart**: Fully functional cart with quantity management and localStorage persistence
- **Wishlist**: Save favorite products with localStorage persistence
- **Checkout Flow**: Multi-step checkout process (Contact → Delivery → Payment)
- **Order Management**: Order history with status tracking

### Unique Features
- **ÉLVARA Atelier**: Interactive product customization with dynamic pricing
- **Private Drop**: Limited edition products with countdown timer
- **Editorial Content**: About page with brand story and philosophy

### Design & UX
- **Cinematic Homepage**: Full-screen hero with subtle animations
- **Premium Aesthetics**: Luxury color palette (black, charcoal, ivory, gold accents)
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Loading Screen**: Elegant brand introduction animation
- **Toast Notifications**: Non-intrusive user feedback
- **Scroll Effects**: Navbar transformation on scroll

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Development
- **JavaScript (ES6+)** - Language
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Deployment
- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
elvara/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   └── vite.svg
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── Toast.jsx
│   ├── data/                   # Static data
│   │   └── products.js         # Product catalog
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCart.jsx         # Cart state management
│   │   ├── useOrders.jsx       # Order state management
│   │   └── useWishlist.jsx     # Wishlist state management
│   ├── pages/                  # Page components
│   │   ├── About.jsx
│   │   ├── Account.jsx
│   │   ├── Atelier.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Orders.jsx
│   │   ├── PrivateDrop.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Shop.jsx
│   │   └── Wishlist.jsx
│   ├── utils/                  # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js              # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/elvara.git
cd elvara
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 GitHub Pages Deployment

### Automatic Deployment

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` folder

3. **Configure GitHub Actions**
   - The workflow is already configured in `.github/workflows/deploy.yml`
   - It will automatically build and deploy on push to `main`

### Manual Deployment

If you prefer manual deployment:

1. **Build the project**
```bash
npm run build
```

2. **Deploy to gh-pages branch**
```bash
npm install -D gh-pages
npx gh-pages -d dist
```

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      'elvara-black': '#0a0a0a',
      'elvara-charcoal': '#1a1a1a',
      'elvara-ivory': '#f5f0e8',
      'elvara-gold': '#c9a962',
      'elvara-gold-light': '#d4b978',
    }
  }
}
```

### Product Data

Edit `src/data/products.js` to add or modify products:

```javascript
export const products = [
  {
    id: 1,
    name: 'PRODUCT NAME',
    category: 'Category',
    collection: 'collection-id',
    price: 1000,
    images: ['image-url-1', 'image-url-2'],
    description: 'Product description...',
    material: 'Material information',
    rating: 4.5,
    reviews: 100,
    availability: 'In Stock',
    featured: true,
    isNew: false
  }
]
```

### GitHub Pages Base Path

If deploying to a different repository name, update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security Notes

- This is a frontend-only demo
- No real payment processing
- No backend authentication
- All data stored in localStorage
- Do not use for production e-commerce without proper backend

## 🤝 Contributing

This is a college project. Feel free to fork and modify for your own use.

## 📄 License

This project is for educational purposes.

## 🎓 Credits

### External Assets
- Product images from Unsplash (free stock photography)
- Icons from Lucide React
- Fonts: Playfair Display (serif), Inter (sans-serif)

### Libraries
- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 🎯 Future Enhancements

Potential improvements for future versions:
- Real backend integration
- Payment gateway Integration
- User authentication
- Admin dashboard
- Product reviews system
- Advanced search filters
- Multi-language support
- Currency conversion

---

**Built with ❤️ for a college project**

*ÉLVARA - Luxury, Reimagined.*
