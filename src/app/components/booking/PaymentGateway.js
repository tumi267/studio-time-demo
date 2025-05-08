'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PaymentGateway({ amount, onSuccess, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load PayFast script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payfast.co.za/onsite/engine.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayFastPayment = () => {
    setIsProcessing(true);
    // This would be replaced with actual PayFast integration
    window.payfast_do_onsite_payment({
      amount: amount,
      // other required PayFast parameters
      onComplete: function() {
        setIsProcessing(false);
        onSuccess();
      },
      onError: function() {
        setIsProcessing(false);
        alert('Payment failed. Please try again.');
      }
    });
  };

  const handlePayGatePayment = () => {
    setIsProcessing(true);
    // Implement PayGate integration
    // This would typically redirect to PayGate
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
      
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Due:</span>
            <span className="font-medium">R {amount}</span>
          </div>
          
          <div className="space-y-4 mt-6">
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'payfast' ? 'border-primary border-2' : ''}`}
              onClick={() => setPaymentMethod('payfast')}
            >
              <div className="flex items-center gap-4">
                <img src="/payfast-logo.png" alt="PayFast" className="h-8" />
                <span>PayFast</span>
              </div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'paygate' ? 'border-primary border-2' : ''}`}
              onClick={() => setPaymentMethod('paygate')}
            >
              <div className="flex items-center gap-4">
                <img src="/paygate-logo.png" alt="PayGate" className="h-8" />
                <span>PayGate</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button 
          onClick={paymentMethod === 'payfast' ? handlePayFastPayment : handlePayGatePayment}
          disabled={!paymentMethod || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Complete Payment'}
        </Button>
      </div>
    </div>
  );
}