import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const API_KEY = "re_TjRHtmd7_C6fJe3LhkGbukUHaTow4XTeg";

const resend = new Resend(API_KEY);

interface BodyProps {
  name: string;
  lastName: string;
  mail: string;
  consult: string;
}

export async function POST(request: NextRequest) {
  const body: BodyProps = await request.json();

  const { mail, consult, name, lastName } = body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "congresodeeducacionhumanista@gmail.com",
      subject: `Mensaje desde web - ${name} ${lastName}`,
      html: `<p>${consult}</p>
      <p>Correo : ${mail}</p>
      `,
    });

    return NextResponse.json(
      {
        message: "El correo fue enviado correctamente",
        type: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Ocurrio un error en el servidor.",
        type: "error",
      },
      { status: 500 },
    );
  }
}
