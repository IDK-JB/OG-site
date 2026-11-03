import { z } from "zod/mini";

// Règles du formulaire de contact, partagées par le navigateur et la fonction d'envoi.
const NOM = "Indiquez votre nom et votre prénom.";

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
  tel: z.optional(z.string().check(z.trim(), z.maxLength(30, { error: "Ce numéro semble trop long." }))),
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

// Clés de test Cloudflare (toujours valides), utilisées hors production.
export const TURNSTILE_CLE_TEST = "1x00000000000000000000AA";
