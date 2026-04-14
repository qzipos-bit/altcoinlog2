"use server";

import { LeadSource } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const emailSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().max(8000).optional(),
});

export type LeadActionState = { ok: boolean; error?: string };

export async function submitAntiskamLead(
  prev: LeadActionState | undefined,
  formData: FormData,
): Promise<LeadActionState> {
  return submitMarketingLead("ANTISCAM_AUDIT", prev, formData);
}

export async function submitNewsletterLead(
  prev: LeadActionState | undefined,
  formData: FormData,
): Promise<LeadActionState> {
  return submitMarketingLead("NEWSLETTER", prev, formData);
}

export async function submitRegistrationInterestLead(
  prev: LeadActionState | undefined,
  formData: FormData,
): Promise<LeadActionState> {
  return submitMarketingLead("REGISTRATION_INTEREST", prev, formData);
}

export async function submitMarketingLead(
  source: LeadSource,
  _prev: LeadActionState | undefined,
  formData: FormData,
): Promise<LeadActionState> {
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const parsed = emailSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") || undefined,
    phone: formData.get("phone") || undefined,
    message: formData.get("message") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: "Проверьте email и длину полей." };
  }

  await prisma.marketingLead.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name || null,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
      source,
    },
  });

  return { ok: true };
}
