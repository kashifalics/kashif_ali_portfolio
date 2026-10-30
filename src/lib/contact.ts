/** Shared rules for the contact form, used by the browser and the API route. */
export const limits = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<Record<keyof ContactInput, unknown>>) {
  const value = {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    subject: String(input.subject ?? "").trim(),
    message: String(input.message ?? "").trim(),
  };
  const errors: FieldErrors = {};

  if (value.name.length < limits.name.min) errors.name = "Enter your name.";
  else if (value.name.length > limits.name.max) errors.name = `Keep your name under ${limits.name.max} characters.`;

  if (!emailPattern.test(value.email) || value.email.length > limits.email.max)
    errors.email = "Enter an email address like name@example.com.";

  if (value.subject.length < limits.subject.min) errors.subject = "Add a short subject.";
  else if (value.subject.length > limits.subject.max) errors.subject = `Keep the subject under ${limits.subject.max} characters.`;

  if (value.message.length < limits.message.min)
    errors.message = `Write at least ${limits.message.min} characters so I know how to help.`;
  else if (value.message.length > limits.message.max)
    errors.message = `Keep the message under ${limits.message.max} characters.`;

  return { value, errors, ok: Object.keys(errors).length === 0 };
}
