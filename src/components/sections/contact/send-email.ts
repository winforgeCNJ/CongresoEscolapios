import { InitialValuesT } from "./form";

export async function sendEmail(values: InitialValuesT) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };
  const res = await fetch("/api/mail", config);
  const data = await res.json();
  return data;
}
