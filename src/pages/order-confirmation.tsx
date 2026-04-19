import { useParams, Link } from "wouter";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetOrder, getGetOrderQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";

export default function OrderConfirmation() {
  const params = useParams<{ id: string }>();
  const orderId = parseInt(params.id || "0", 10);
  const { data: order, isLoading } = useGetOrder(orderId, {
    query: { enabled: !!orderId, queryKey: getGetOrderQueryKey(orderId) },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse space-y-4 max-w-md mx-auto">
            <div className="h-16 w-16 bg-muted rounded-full mx-auto" />
            <div className="h-8 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Order Not Found</h1>
          <Link href="/shop">
            <Button data-testid="button-back-to-shop">Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">Thank you for your order, {order.customerName}!</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-heading font-semibold text-lg text-foreground">Order Details</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-mono font-medium text-foreground" data-testid="text-order-number">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-primary font-medium capitalize" data-testid="text-order-status">{order.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">{order.customerEmail}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping To</span>
              <span className="text-foreground text-right max-w-[60%]">{order.shippingAddress}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="font-heading font-semibold text-foreground">Total</span>
                <span className="font-heading font-bold text-lg text-primary">${(order.totalCents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-8">
          A confirmation email will be sent to {order.customerEmail}. Your magnets will be crafted and shipped within 3-5 business days.
        </p>

        <Link href="/shop">
          <Button size="lg" data-testid="button-continue-shopping-after-order">
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
