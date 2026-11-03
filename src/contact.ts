import { z } from "zod/mini";

// Règles du formulaire de contact, partagées par le navigateur et la fonction d'envoi.
const NOM = "Indiquez votre nom et votre prénom.";
const TEL = "Ce numéro ne semble pas valide (exemple : 06\u00a012\u00a034\u00a056\u00a078).";

// Numéro français (06…, +33 6…, 0033 6…) ou étranger au format international (+…), séparateurs libres.
const telValide = (v: string) =>
  /^(0[1-9]\d{8}|(\+|00)33[1-9]\d{8}|\+(?!33)[1-9]\d{6,14})$/.test(v.replace(/\(0\)/g, "").replace(/[\s.\-()]/g, ""));

export const contactSchema = z.object({
  nom: z.string().check(
    z.trim(),
    z.minLength(1, { error: NOM }),
    z.maxLength(120, { error: NOM }),
    z.refine((v) => v.split(/\s+/).length >= 2, { error: NOM }),
  ),
  email: z.pipe(
    z.string().check(z.trim(), z.maxLength(254)),
    z.email({ error: "Cette adresse email ne semble pas valide." }),
  ),
  tel: z.optional(
    z.string().check(
      z.trim(),
      z.maxLength(30, { error: TEL }),
      z.refine((v) => v === "" || telValide(v), { error: TEL }),
    ),
  ),
  message: z.string().check(
    z.trim(),
    z.minLength(10, { error: "Votre message est un peu court (10 caractères minimum)." }),
    z.maxLength(3000, { error: "Votre message est trop long (3000 caractères maximum)." }),
  ),
});

export type Contact = z.infer<typeof contactSchema>;
export type ChampContact = keyof Contact;

// Champ piège invisible : un humain le laisse vide, un robot le remplit.
export const CHAMP_PIEGE = "site_web";
