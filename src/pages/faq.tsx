import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "@/components/layout";

const faqs = [
  {
    question: "How do I create a custom photo magnet?",
    answer: "It's easy! Browse our shop, select your preferred magnet style (square, rectangle, or puzzle set), click 'Add to Cart', and upload your photo. We accept JPG and PNG files up to 10MB. Once you've uploaded your photo and placed your order, we'll handcraft your custom magnet and ship it right to your door.",
  },
  {
    question: "What photo quality do I need?",
    answer: "For the best results, we recommend using photos that are at least 1000x1000 pixels. Higher resolution photos will produce sharper, more vibrant magnets. Avoid using blurry or low-resolution images. Our team will reach out if we notice any quality issues before printing.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Since each magnet is custom-made, please allow 2-3 business days for production before shipping begins. Orders over $25 qualify for free shipping!",
  },
  {
    question: "Can I order magnets in bulk for events or business?",
    answer: "Absolutely! We offer bulk pricing for events, corporate gifts, wedding favors, and more. Visit our Business Quotes page to submit a request, and our team will get back to you with a custom quote within 1-2 business days.",
  },
  {
    question: "What materials are the magnets made of?",
    answer: "Our magnets feature a premium glossy or matte photo surface mounted on a flexible magnetic backing. They're strong enough to hold papers on any metal surface while being thin and lightweight. Each magnet is UV-coated for durability and fade resistance.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship within the United States only. We're working on expanding our shipping options to include international destinations. Stay tuned for updates!",
  },
  {
    question: "What if my magnet arrives damaged?",
    answer: "We stand behind the quality of our products. If your magnet arrives damaged or defective, contact us within 14 days of delivery and we'll remake it for free. Please include a photo of the damaged item in your message. Note that due to the custom nature of our products, we cannot offer refunds, but we will always remake defective items.",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">Find answers to common questions about our custom photo magnets.</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-card-border rounded-xl px-6" data-testid={`accordion-faq-${index}`}>
              <AccordionTrigger className="font-heading font-semibold text-foreground hover:text-primary text-left py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
