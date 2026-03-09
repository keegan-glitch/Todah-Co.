# Todah Co. — Gift Gratitude

Premium greeting card e-commerce site built with Next.js 14, Tailwind CSS, Stripe Checkout, and Resend.

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local with required keys (see below)

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Resend (wholesale inquiry form)
RESEND_API_KEY=re_...
RESEND_TO_EMAIL=you@example.com

# Base URL (set to your production domain on deploy)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Where to get keys

- **Stripe**: [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
- **Supabase**: Project Settings > API in your [Supabase dashboard](https://app.supabase.com)
- **Resend**: [resend.com/api-keys](https://resend.com/api-keys)

## Project Structure

```
src/
  app/
    page.tsx              # Homepage
    layout.tsx            # Root layout (CartProvider, Header, CartDrawer)
    products/[slug]/      # Product detail pages
    collection/           # Complete Collection bundle page
    wholesale/            # Wholesale inquiry page + form
    success/              # Post-checkout success page
    cancelled/            # Post-checkout cancelled page
    api/checkout/         # Stripe Checkout session API route
    api/wholesale/        # Wholesale form email API route
  components/
    Header.tsx            # Global header with nav + cart button
    CartDrawer.tsx        # Slide-out cart drawer
    AddToCartButton.tsx   # Add to cart (wired to CartContext)
    QuantitySelector.tsx  # Quantity +/- selector
    ScrollReveal.tsx      # Scroll-triggered reveal animations
    WholesaleForm.tsx     # Wholesale inquiry form
  context/
    CartContext.tsx        # React context for cart state
  data/
    products.ts           # Product data (3 cards + bundle)
public/
  images/                 # Card images
```

## Deploy to Vercel

1. Push the repo to GitHub.

2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.

3. Set the **Root Directory** to `todah-co` (if the repo root is the parent folder).

4. Add all environment variables from `.env.local` in the Vercel project settings. Set `NEXT_PUBLIC_BASE_URL` to your production URL (e.g., `https://todahco.com`).

5. Click **Deploy**. Vercel auto-detects Next.js and handles the build.

6. After deploy, update your Stripe dashboard:
   - Add your production domain to the allowed redirect URLs.
   - Switch from test keys to live keys when ready to accept real payments.

## Swap in Production Assets

Search the codebase for comments containing "swap" to find image placeholders:
- Individual card images are in `/public/images/`
- The bundle product currently reuses `heartland-thanks.jpg` as a placeholder
# Todah-Co.
