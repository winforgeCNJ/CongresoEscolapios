import { Payment } from "@mercadopago/sdk-react";
import {
  IAdditionalCardFormData,
  IPaymentBrickCustomization,
  IPaymentFormData,
} from "@mercadopago/sdk-react/bricks/payment/type";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";

// const ProdCredential = "APP_USR-83872e79-69c8-42cc-9eb1-4483078a7bc6";
const TestCredential = "TEST-d168ae94-9076-4522-a5e6-2411b1a57800";
const BACKEND_URL = "http://localhost:5212/api/v1/MercadoPago";
// const MP_URL = "https://api.mercadopago.com/v2/process_payment";

initMercadoPago(TestCredential);

const initialization = {
  amount: 10000,
  preferenceId: undefined,
  payer: {
    firstName: "",
    lastName: "",
    email: "",
  },
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

function App() {
  const [data, setData] = useState<typeof initialization>();

  useEffect(() => {
    fetch(BACKEND_URL + "/create")
      .then((response) => response.json())
      .then((json) => {
        const newData = { ...initialization, preferenceId: json.id };

        setData(newData);
      })
      .catch((e) => console.log(e));
  }, []);

  debugger;
  if (!data) return <>Loading...</>;
  if (!data.preferenceId) return <>Loading...</>;
  return (
    <div style={{ display: "grid", placeContent: "center", width: "100vw", height: "100vh" }}>
      <Payment
        initialization={data}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
}

export default App;

const onSubmit = async (
  { formData, paymentType, selectedPaymentMethod, additionalData: addData }: IPaymentFormData,
  additionalData: IAdditionalCardFormData | null | undefined
) => {
  console.log(paymentType);
  console.log(addData);
  console.log(selectedPaymentMethod);
  console.log(additionalData);
  // callback llamado al hacer clic en el botón enviar datos
  try {
    const response = await fetch(BACKEND_URL + "/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });
    const json = response.json();
    debugger;
    return;
  } catch (error) {
    console.log(error);
  }
};
const onError = async (error: object) => {
  // callback llamado para todos los casos de error de Brick
  console.log(error);
};
const onReady = async () => {
  debuuger;
};
