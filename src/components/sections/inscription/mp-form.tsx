import { Payment } from "@mercadopago/sdk-react";
import {
  IAdditionalCardFormData,
  IPaymentBrickCustomization,
  IPaymentFormData,
  TPaymentType,
} from "@mercadopago/sdk-react/bricks/payment/type";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";

const MP_PUBLIC_KEY = process.env.VITE_MP_PUBLIC_KEY;
const BACKEND_URL = process.env.VITE_BACKEND_URL;

initMercadoPago(MP_PUBLIC_KEY!);

interface Props {
  firstName: string;
  lastName: string;
  DNI: string;
  preferenceId: string;
  onMPSubmit: () => void;
}

const MPForm = ({ DNI, firstName, lastName, preferenceId, onMPSubmit }: Props) => {
  initialization.preferenceId = preferenceId;

  useEffect(() => {
    return () => {
      if ("paymentBrickController" in window) {
        type helper = { unmount: () => void };
        (window.paymentBrickController as helper).unmount();
        console.log("first");
      }
    };
  }, []);

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={(paymentFormData, additionalData) =>
        onSubmit(paymentFormData, additionalData, { firstName, lastName, DNI, onMPSubmit, preferenceId })
      }
    />
  );
};

export default MPForm;

const onSubmit = async (
  { formData, selectedPaymentMethod }: IPaymentFormData,
  additionalData: IAdditionalCardFormData | null | undefined,
  inscriptioData: Props
) => {
  try {
    const { DNI, firstName, lastName, onMPSubmit } = inscriptioData;

    if (selectedPaymentMethod === "wallet_purchase") {
      onMPSubmit();
      return;
    }

    const response = await fetch(BACKEND_URL + "/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: {
          TransactionAmount: formData.transaction_amount,
          Token: formData.token,
          // Description : formData.
          Installments: formData.installments,
          PaymentMethodId: formData.payment_method_id,
          Payer: {
            Id: formData.payer.id,
            Identification: formData.payer.identification,
            Email: formData.payer.email,
            Address: formData.payer.address,
            FirstName: formData.payer.first_name,
            LastName: formData.payer.last_name,
            Type: formData.payer.type,
          },
        },
        paymentMethod: selectedPaymentMethod,
        cardHolderName: additionalData?.cardholderName,
        lastFourDigits: additionalData?.lastFourDigits,
        firstName,
        lastName,
        DNI,
      }),
    });
    onMPSubmit();
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// const onError = async (error: object) => {
//   alert(error.message);
// };
// const onReady = async () => {};

const initialization: TPaymentType["initialization"] = {
  amount: 500,
  preferenceId: "1319511361-91ee1bc7-870e-48ba-a64c-2734021d884a",

  // payer: {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  // },
};

const customization: IPaymentBrickCustomization = {
  visual: {
    style: {
      theme: "dark" as const,
    },
  },
  paymentMethods: {
    creditCard: "all" as const,
    debitCard: "all" as const,
    mercadoPago: ["wallet_purchase"] as const,
  },
};