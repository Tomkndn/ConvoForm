import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailDetails {
  to: string;
  name: string;
}

// Function to check if the mail service is configured correctly
const canSendMail = (): boolean => {
  return Boolean(process.env.RESEND_API_KEY);
};

export const sendMail = async ({ to, name }: EmailDetails) => {
  if (!canSendMail()) {
    console.warn("Resend API key is not configured. Skipping email send.");
    return; // Exit the function without sending email
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Convoform <onboarding@resend.dev>",
      to: [to],
      subject: "Welcome to Convoform!!!😊🎉",
      html: `Hello! ${name}`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};
