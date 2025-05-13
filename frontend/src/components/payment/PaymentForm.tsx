import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// Initialize Stripe


interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

interface PaymentFormProps {
  courseId: string;
  amount: number;
  onSuccess?: (paymentMethod: { id: string; type: string }) => void;
  onError?: (error: Error) => void;
}

export const PaymentForm = ({ courseId, amount, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [savedMethods, setSavedMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [saveMethod, setSaveMethod] = useState(false);

  useEffect(() => {
    const fetchSavedMethods = async () => {
      try {
        const { data } = await axios.get('/api/payment/payment-methods');
        setSavedMethods(data);
      } catch (err) {
        console.error('Error fetching saved payment methods:', err);
      }
    };
    fetchSavedMethods();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again.");
      return;
    }

    try {
      // Create payment intent
      const { data: intentData } = await axios.post('/api/payment/create-payment-intent', {
        amount,
        course_id: courseId,
        customer_id: selectedMethod ? undefined : null
      });

      let paymentIntent;
      if (selectedMethod) {
        // Use saved payment method
        paymentIntent = await stripe.confirmCardPayment(intentData.client_secret, {
          payment_method: selectedMethod
        });
      } else {
        // Use new card
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error("Card element not found");
        }
        paymentIntent = await stripe.confirmCardPayment(intentData.client_secret, {
          payment_method: {
            card: cardElement,
          },
        });
      }

      if (paymentIntent.error) {
        throw new Error(paymentIntent.error.message);
      }

      // Confirm payment on backend
      const { data: confirmData } = await axios.post('/api/payment/confirm-payment', {
        payment_intent_id: paymentIntent.paymentIntent.id,
        course_id: courseId,
        save_payment_method: saveMethod
      });

      if (confirmData.status === 'success') {
        onSuccess?.({
          id: paymentIntent.paymentIntent.id,
          type: 'card'
        });
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
      } else {
        throw new Error(confirmData.message || 'Payment confirmation failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteMethod = async (methodId: string) => {
    try {
      await axios.delete(`/api/payment/payment-methods/${methodId}`);
      setSavedMethods(methods => methods.filter(m => m.id !== methodId));
      if (selectedMethod === methodId) {
        setSelectedMethod(null);
      }
      toast({
        title: "Payment Method Removed",
        description: "The payment method has been removed successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to remove payment method.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {savedMethods.length > 0 && (
        <div className="space-y-4">
          <Label>Saved Payment Methods</Label>
          <div className="space-y-2">
            {savedMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="payment-method"
                    id={`payment-method-${method.id}`}
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id)}
                    className="h-4 w-4"
                    aria-label={`Select ${method.card.brand} card ending in ${method.card.last4}`}
                  />
                  <div>
                    <p className="font-medium">
                      {method.card.brand.toUpperCase()} ending in {method.card.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.card.exp_month}/{method.card.exp_year}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteMethod(method.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!selectedMethod || savedMethods.length === 0) && (
        <div className="space-y-4">
          <Label htmlFor="card">Card Details</Label>
          <CardElement
            id="card"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "hsl(var(--foreground))",
                  "::placeholder": {
                    color: "hsl(var(--muted-foreground))",
                  },
                  backgroundColor: "hsl(var(--background))",
                },
                invalid: {
                  color: "hsl(var(--destructive))",
                },
              },
            }}
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="save-method"
          checked={saveMethod}
          onCheckedChange={(checked) => setSaveMethod(checked as boolean)}
        />
        <Label htmlFor="save-method">Save this payment method for future use</Label>
      </div>

      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};