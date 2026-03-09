"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCart();

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image,
        })),
      }),
    });

    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] cursor-pointer"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-charcoal border-l border-cream/10 z-[70] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-cream/10">
            <h2 className="font-headline text-2xl tracking-[0.2em] text-cream">
              YOUR CART
            </h2>
            <button
              onClick={closeCart}
              className="font-headline text-cream/50 hover:text-cream text-2xl transition-colors"
              aria-label="Close cart"
            >
              &times;
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="font-body text-cream/40 text-sm italic text-center mt-12">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b border-cream/5 pb-6"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 flex-shrink-0 bg-charcoal/50 border border-cream/10 overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline text-sm tracking-wider text-cream truncate">
                        {item.product.name}
                      </h3>
                      <p className="font-headline text-sm text-cream/50 mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-0 mt-3 border border-cream/20 w-fit">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 font-headline text-sm text-cream/60 hover:text-cream hover:bg-cream/10 transition-colors disabled:opacity-30"
                        >
                          &minus;
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-headline text-xs text-cream border-x border-cream/20">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 font-headline text-sm text-cream/60 hover:text-cream hover:bg-cream/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="font-body text-xs text-cream/30 hover:text-sienna transition-colors self-start"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-cream/10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-headline text-sm tracking-[0.2em] text-cream/60 uppercase">
                  Total
                </span>
                <span className="font-headline text-2xl text-cream">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-cream text-charcoal font-headline text-sm tracking-[0.2em] uppercase border-2 border-cream hover:bg-transparent hover:text-cream transition-colors duration-300"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
