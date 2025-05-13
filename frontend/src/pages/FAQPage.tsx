import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What services does DataQuest Solutions offer?",
      answer: "We offer a comprehensive range of services including data analysis, research writing, graphic design, web development, and consulting services. Our team of experts is dedicated to helping you achieve your goals through data-driven solutions."
    },
    {
      question: "How do I get started with your services?",
      answer: "Getting started is easy! Simply browse our services page, select the service you're interested in, and contact us through our website. Our team will get back to you promptly to discuss your needs and create a customized solution."
    },
    {
      question: "What are your pricing options?",
      answer: "Our pricing varies depending on the service and project scope. We offer competitive rates and can provide custom quotes based on your specific requirements. Contact us for detailed pricing information."
    },
    {
      question: "Do you offer any discounts for students?",
      answer: "Yes! We offer special discounts for students and educational institutions. Please contact us with your student ID or institutional details to learn more about our educational pricing."
    },
    {
      question: "What is your turnaround time?",
      answer: "Turnaround times vary by service and project complexity. We typically complete most projects within 1-2 weeks, but we can accommodate urgent requests. Contact us to discuss your timeline requirements."
    },
    {
      question: "How do you ensure quality in your work?",
      answer: "We maintain high quality standards through rigorous quality control processes, experienced team members, and regular client feedback. Each project goes through multiple review stages to ensure accuracy and excellence."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Find answers to common questions about our services and how we can help you.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-[#0f172a] mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#b3e5fc] text-[#0f172a] px-6 py-3 rounded-lg hover:bg-[#4fc3f7] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
