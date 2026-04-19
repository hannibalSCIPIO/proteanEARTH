import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Lock, ShieldCheck } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 2500;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const items = useCart((s) => s.items);
  const getCartTotal = useCart((s) => s.getCartTotal);
  const clearCart = useCart((s) => s.clearCart);
  const createOrder = useCreateOrder();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = getCartTotal();
  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email address";
    if (!address.trim()) errs.address = "Shipping address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createOrder.mutate(
      {
        data: {
          customerName: name,
          customerEmail: email,
          shippingAddress: address,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.priceCents,
            photoUrl: null,
          })),
        },
      },
      {
        onSuccess: (order) => {
          clearCart();
          setLocation(`/order-confirmation/${order.id}`);
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-8">Add items to your cart first.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">Complete your order details below.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card border border-card-border rounded-xl p-6 space-y-4">
            <h2 className="font-heading font-semibold text-lg text-foreground">Shipping Information</h2>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" data-testid="input-checkout-name" />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" data-testid="input-checkout-email" />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="address">Shipping Address</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, State, ZIP" data-testid="input-checkout-address" />
              {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6">
            <h2 className="font-heading font-semibold text-lg text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground">{item.productName} x{item.quantity}</span>
                  <span className="text-foreground font-medium">${((item.priceCents * item.quantity) / 100).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={isFreeShipping ? "text-primary font-medium" : "text-foreground"}>
                  {isFreeShipping ? "FREE" : "$4.99"}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-heading font-semibold text-foreground">Total</span>
                <span className="font-heading font-bold text-xl text-primary">
                  ${((total + (isFreeShipping ? 0 : 499)) / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
            <Lock className="h-4 w-4" />
            <span>Secure checkout</span>
            <ShieldCheck className="h-4 w-4 ml-2" />
            <span>SSL encrypted</span>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={createOrder.isPending}
            data-testid="button-place-order"
          >
            {createOrder.isPending ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
