import { Layout } from "@/components/layout";

export default function RefundPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Refund Policy</h1>
          <p className="text-muted-foreground text-lg">Our commitment to your satisfaction.</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-8 space-y-8">
          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">Custom Products</h2>
            <p className="text-muted-foreground leading-relaxed">
              Because each photo magnet is custom-made specifically for you using your personal photos, we are unable to offer refunds on completed orders. Each magnet is a unique, one-of-a-kind product that cannot be resold.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">Defective Products</h2>
            <p className="text-muted-foreground leading-relaxed">
              If your magnet arrives damaged, defective, or significantly different from what was ordered, we will remake it at no additional cost. Please contact us within 14 days of receiving your order and include a photo of the issue. Our team will review your claim and ship a replacement as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">Shipping Issues</h2>
            <p className="text-muted-foreground leading-relaxed">
              If your order is lost in transit, we will work with the shipping carrier to locate your package. If it cannot be found, we will remake and reship your order at no charge. Please allow 10 business days past the estimated delivery date before reporting a lost package.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">Order Cancellation</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may cancel your order within 2 hours of placing it, provided production has not yet begun. To cancel, contact us immediately at hello@snapmagnet.co with your order number. Once production has started, cancellation is no longer possible.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">Photo Quality</h2>
            <p className="text-muted-foreground leading-relaxed">
              We print your magnets using the exact photo you upload. We recommend using high-resolution images (at least 1000x1000 pixels) for the best results. We cannot offer remakes for issues caused by low-resolution or blurry source images. If we notice a quality concern before printing, we will reach out to you first.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our refund policy or need to report an issue with your order, please reach out to us at hello@snapmagnet.co or use our Contact page. We're here to help!
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
