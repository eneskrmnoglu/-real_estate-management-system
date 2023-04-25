import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({
  amount,
  onSuccess,
  error,
  setError,
  setProcessing,
  processing,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      onSuccess(paymentMethod.id);
    }
  };

  return (
    <>
      <CardElement />
      {error && <div className="error">{error}</div>}
      <button
        disabled={!stripe || processing}
        type="button"
        onClick={handlePayment}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {processing ? "İşlem yapılıyor..." : "İlanı Yayınla"}
      </button>
    </>
  );
};

export default PaymentForm;
