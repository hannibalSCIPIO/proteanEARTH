import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submitContact = useSubmitContact();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitContact.mutate(
      { data: { name, email, message } },
      {
        onSuccess: (response) => {
          toast({ title: "Message Sent!", description: response.message });
          setName("");
          setEmail("");
          setMessage("");
        },
      }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Have a question or need help? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required data-testid="input-contact-name" />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required data-testid="input-contact-email" />
              </div>
              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" rows={5} required data-testid="input-contact-message" />
              </div>
              <Button type="submit" disabled={submitContact.isPending} className="w-full" data-testid="button-send-message">
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6">Business Info</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground">hello@snapmagnet.co</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-muted-foreground">123 Artisan Way<br />Portland, OR 97201</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Hours</p>
                  <p className="text-muted-foreground">Monday - Friday: 9am - 5pm PST<br />Saturday: 10am - 2pm PST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
