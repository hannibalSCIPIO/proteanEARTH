import { Link } from "wouter";
import { ArrowRight, Star, Truck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListProducts, useListReviews, useGetShopSummary } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";

export default function Home() {
  const { data: products } = useListProducts();
  const { data: reviews } = useListReviews();
  const { data: summary } = useGetShopSummary();

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">Handcrafted with care</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Turn Your Favorite Photos Into Beautiful Magnets
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed">
              Artisan-crafted, small-batch custom photo magnets. Upload your photo, and we'll create a stunning magnet you'll love seeing every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="text-lg px-8 py-6" data-testid="button-shop-now">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/business">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6" data-testid="button-bulk-orders">
                  Bulk Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center">
              <Truck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold text-foreground">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $25</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <Shield className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold text-foreground">Quality Guarantee</p>
                <p className="text-sm text-muted-foreground">We remake if defective</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <Heart className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-heading font-semibold text-foreground">Handcrafted</p>
                <p className="text-sm text-muted-foreground">Each magnet made with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {products && products.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Magnets</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Choose your style, upload your photo, and let us do the rest.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((product) => (
                <div key={product.id} className="bg-card rounded-xl border border-card-border p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow" data-testid={`card-product-${product.id}`}>
                  <div className="w-full aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground text-sm">Photo Magnet</div>
                    )}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">${(product.priceCents / 100).toFixed(2)}</span>
                    {product.originalPriceCents && (
                      <span className="text-sm text-muted-foreground line-through">${(product.originalPriceCents / 100).toFixed(2)}</span>
                    )}
                  </div>
                  <Link href="/shop">
                    <Button className="w-full" data-testid={`button-view-product-${product.id}`}>View Details</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {reviews && reviews.length > 0 && (
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
              {summary && (
                <p className="text-muted-foreground text-lg">
                  {summary.averageRating} average rating from {summary.reviewCount} reviews
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-card border border-card-border rounded-xl p-6" data-testid={`card-review-${review.id}`}>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-foreground mb-4 text-sm leading-relaxed">"{review.reviewText}"</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">{review.customerName}</span>
                    {review.verifiedPurchase && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Verified Purchase</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/shop">
                <Button variant="outline" data-testid="button-see-all-reviews">See All Reviews</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Create Your Magnets?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            It only takes a minute. Pick a style, upload your photo, and we'll handle the rest.
          </p>
          <Link href="/shop">
            <Button size="lg" className="text-lg px-8 py-6" data-testid="button-start-creating">
              Start Creating <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
