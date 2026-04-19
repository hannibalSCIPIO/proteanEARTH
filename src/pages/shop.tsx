import { useState } from "react";
import { Star, Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useListProducts, useListReviews, useCreateReview } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListReviewsQueryKey } from "@workspace/api-client-react";
import { useCart } from "@/hooks/use-cart";
import { Layout } from "@/components/layout";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function PhotoUploadModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: { id: number; name: string; priceCents: number } | null;
}) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please upload a JPG or PNG file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!product || !photoPreview) return;
    addItem({
      productId: product.id,
      productName: product.name,
      priceCents: product.priceCents,
      quantity: 1,
      photoUrl: photoPreview,
    });
    toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
    setPhotoPreview(null);
    setError(null);
    onClose();
  };

  const handleClose = () => {
    setPhotoPreview(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Upload Your Photo</DialogTitle>
          <DialogDescription>Upload a JPG or PNG image (max 10MB) for your {product?.name}.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {!photoPreview ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" data-testid="input-photo-upload">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload your photo</span>
              <span className="text-xs text-muted-foreground mt-1">JPG or PNG, max 10MB</span>
              <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="relative">
              <img src={photoPreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => setPhotoPreview(null)}
                data-testid="button-remove-photo"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button
            onClick={handleAddToCart}
            disabled={!photoPreview}
            className="w-full"
            data-testid="button-confirm-add-to-cart"
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Shop() {
  const { data: products, isLoading: productsLoading } = useListProducts();
  const { data: reviews, isLoading: reviewsLoading } = useListReviews();
  const createReview = useCreateReview();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; priceCents: number } | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleSubmitReview = () => {
    if (!reviewName || !reviewText) return;
    createReview.mutate(
      { data: { customerName: reviewName, rating: reviewRating, reviewText: reviewText } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey() });
          setShowReviewForm(false);
          setReviewName("");
          setReviewRating(5);
          setReviewText("");
        },
      }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Our Photo Magnets</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose your magnet style, upload a photo, and we'll craft your custom magnet with care.
          </p>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl border border-card-border p-6 animate-pulse">
                <div className="w-full aspect-square bg-muted rounded-lg mb-6" />
                <div className="h-6 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {products?.map((product) => (
              <div key={product.id} className="bg-card rounded-xl border border-card-border p-6 flex flex-col hover:shadow-lg transition-all duration-300" data-testid={`card-product-${product.id}`}>
                <div className="w-full aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Image className="h-12 w-12" />
                      <span className="text-sm">Your photo here</span>
                    </div>
                  )}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{product.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">${(product.priceCents / 100).toFixed(2)}</span>
                  {product.originalPriceCents && (
                    <span className="text-sm text-muted-foreground line-through">${(product.originalPriceCents / 100).toFixed(2)}</span>
                  )}
                  {product.originalPriceCents && (
                    <span className="text-xs bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full">
                      Save ${((product.originalPriceCents - product.priceCents) / 100).toFixed(2)}
                    </span>
                  )}
                </div>
                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedProduct({ id: product.id, name: product.name, priceCents: product.priceCents });
                    setShowUploadModal(true);
                  }}
                  data-testid={`button-add-to-cart-${product.id}`}
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        )}

        <PhotoUploadModal
          open={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          product={selectedProduct}
        />

        <section className="mt-20 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Customer Reviews</h2>
            <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)} data-testid="button-write-review">
              Write a Review
            </Button>
          </div>

          {showReviewForm && (
            <div className="bg-card border border-card-border rounded-xl p-6 mb-8">
              <h3 className="font-heading font-semibold text-lg mb-4">Share Your Experience</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="review-name">Your Name</Label>
                  <Input id="review-name" value={reviewName} onChange={(e) => setReviewName(e.target.value)} placeholder="Enter your name" data-testid="input-review-name" />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setReviewRating(star)} data-testid={`button-star-${star}`}>
                        <Star className={`h-6 w-6 cursor-pointer transition-colors ${star <= reviewRating ? "fill-accent text-accent" : "text-muted"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review-text">Your Review</Label>
                  <Textarea id="review-text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Tell us about your experience..." rows={4} data-testid="input-review-text" />
                </div>
                <Button onClick={handleSubmitReview} disabled={!reviewName || !reviewText || createReview.isPending} data-testid="button-submit-review">
                  {createReview.isPending ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>
          )}

          {reviewsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-card-border rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-32 mb-3" />
                  <div className="h-16 bg-muted rounded mb-3" />
                  <div className="h-4 bg-muted rounded w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {reviews?.map((review) => (
                <div key={review.id} className="bg-card border border-card-border rounded-xl p-6" data-testid={`card-review-${review.id}`}>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-foreground mb-3 leading-relaxed">"{review.reviewText}"</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">{review.customerName}</span>
                    {review.verifiedPurchase && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Verified Purchase</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
