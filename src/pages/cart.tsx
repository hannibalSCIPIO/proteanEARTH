import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/hooks/use-cart";
import { Layout } from "@/components/layout";

const FREE_SHIPPING_THRESHOLD = 2500;

export default function Cart() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const getCartTotal = useCart((s) => s.getCartTotal);

  const total = getCartTotal();
  const shippingProgress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - total;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some custom magnets to get started!</p>
          <Link href="/shop">
            <Button size="lg" data-testid="button-continue-shopping">Browse Our Magnets</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="bg-card border border-card-border rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {isFreeShipping
                ? "You've earned free shipping!"
                : `$${(amountToFreeShipping / 100).toFixed(2)} away from free shipping`}
            </span>
            <span className="text-sm text-muted-foreground">${(FREE_SHIPPING_THRESHOLD / 100).toFixed(2)}</span>
          </div>
          <Progress value={shippingProgress} className="h-3" data-testid="progress-free-shipping" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-card-border rounded-xl p-4 flex gap-4" data-testid={`card-cart-item-${item.id}`}>
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.photoUrl} alt="Your photo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-foreground">{item.productName}</h3>
                  <p className="text-primary font-bold">${(item.priceCents / 100).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    data-testid={`button-decrease-${item.id}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium text-foreground" data-testid={`text-quantity-${item.id}`}>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    data-testid={`button-increase-${item.id}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                    data-testid={`button-remove-${item.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-xl p-6 sticky top-24">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={`font-medium ${isFreeShipping ? "text-primary" : "text-foreground"}`}>
                    {isFreeShipping ? "FREE" : "$4.99"}
                  </span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-heading font-semibold text-foreground">Total</span>
                    <span className="font-heading font-bold text-lg text-primary">
                      ${((total + (isFreeShipping ? 0 : 499)) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full" size="lg" data-testid="button-proceed-checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
