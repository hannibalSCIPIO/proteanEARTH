import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitQuote } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { useToast } from "@/hooks/use-toast";
import { Building2, Users, Gift, Briefcase } from "lucide-react";

export default function Business() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [designDescription, setDesignDescription] = useState("");
  const submitQuote = useSubmitQuote();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email || !quantity || !designDescription) return;

    submitQuote.mutate(
      { data: { name, company, email, quantity: parseInt(quantity, 10), designDescription } },
      {
        onSuccess: (response) => {
          toast({ title: "Quote Request Sent!", description: response.message });
          setName("");
          setCompany("");
          setEmail("");
          setQuantity("");
          setDesignDescription("");
        },
      }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Bulk Orders & Business</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Custom photo magnets for events, corporate gifts, weddings, and more. Get a personalized quote today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {[
            { icon: Building2, title: "Corporate Gifts", desc: "Branded magnets for clients and employees" },
            { icon: Gift, title: "Wedding Favors", desc: "Custom magnets for your special day" },
            { icon: Users, title: "Event Giveaways", desc: "Memorable magnets for any event" },
            { icon: Briefcase, title: "Retail Partners", desc: "Wholesale pricing for retailers" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-6 text-center">
              <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-card border border-card-border rounded-xl p-8">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6">Request a Bulk Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="biz-name">Your Name</Label>
                <Input id="biz-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required data-testid="input-business-name" />
              </div>
              <div>
                <Label htmlFor="biz-company">Company Name</Label>
                <Input id="biz-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." required data-testid="input-business-company" />
              </div>
              <div>
                <Label htmlFor="biz-email">Email</Label>
                <Input id="biz-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@acme.com" required data-testid="input-business-email" />
              </div>
              <div>
                <Label htmlFor="biz-quantity">Quantity Needed</Label>
                <Input id="biz-quantity" type="number" min="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="100" required data-testid="input-business-quantity" />
              </div>
              <div>
                <Label htmlFor="biz-design">Design Description</Label>
                <Textarea id="biz-design" value={designDescription} onChange={(e) => setDesignDescription(e.target.value)} placeholder="Describe your design needs, branding requirements, etc." rows={4} required data-testid="input-business-design" />
              </div>
              <Button type="submit" disabled={submitQuote.isPending} className="w-full" data-testid="button-submit-quote">
                {submitQuote.isPending ? "Submitting..." : "Submit Quote Request"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
