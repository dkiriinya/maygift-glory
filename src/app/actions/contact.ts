"use server";

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Simulate transactional processing or logging delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log("Contact form submitted:", { name, email, subject, message });

  // In production, you would configure an email transporter (e.g., Resend, Nodemailer) here.
  return { success: true };
}
