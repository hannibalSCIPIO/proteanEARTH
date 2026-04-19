import { Link } from "wouter";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export function Layout({ children }: { children: React.ReactNode }) {
  const itemCount = useCart((state) => state.getItemCount());
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/shop" className="text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>Shop</Link>
      <Link href="/faq" className="text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>FAQ</Link>
      <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>Contact</Link>
      <Link href="/business" className="text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>Business Quotes</Link>
    </>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md group-hover:scale-105 transition-transform">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-primary">SnapMagnet Co.</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-primary" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full bg-accent text-accent-foreground border-none">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative">
        {children}
      </main>

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="font-heading font-bold text-lg text-primary">SnapMagnet Co.</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Artisan-crafted, small-batch custom photo magnets. Turn your memories into daily joy.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold mb-4 text-foreground">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/shop" className="text-muted-foreground hover:text-primary text-sm transition-colors">All Magnets</Link></li>
                <li><Link href="/cart" className="text-muted-foreground hover:text-primary text-sm transition-colors">Shopping Cart</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-muted-foreground hover:text-primary text-sm transition-colors">FAQ</Link></li>
                <li><Link href="/refund-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">Refund Policy</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-4 text-foreground">Business</h3>
              <ul className="space-y-2">
                <li><Link href="/business" className="text-muted-foreground hover:text-primary text-sm transition-colors">Bulk Quotes</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SnapMagnet Co. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
