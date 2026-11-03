// Fonction Vercel : reçoit le formulaire de contact et l'envoie à contact@ depuis le compte mail OVH du site.
// Variables d'environnement : SMTP_USER, SMTP_PASS ; facultatives : TURNSTILE_SECRET, SMTP_HOST, SMTP_PORT.
// OVH impose que l'expéditeur soit le compte authentifié : SMTP_USER sert donc aussi d'adresse d'envoi.
import nodemailer from "nodemailer";
import { CHAMP_PIEGE, contactSchema, type ChampContact } from "../src/contact.js";

const DESTINATAIRE = "contact@olivier-gaillard.fr";

const json = (statut: number, corps: Record<string, unknown>) =>
  new Response(JSON.stringify(corps), {
    status: statut,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

// Sans JavaScript, le navigateur poste le formulaire directement : on le renvoie vers l'accueil.
const repondre = (request: Request, statut: number, corps: Record<string, unknown> = {}) =>
  request.headers.get("accept")?.includes("application/json")
    ? json(statut, { ok: statut === 200, ...corps })
    : Response.redirect(new URL(`/?contact=${statut === 200 ? "envoye" : "erreur"}#contact`, request.url), 303);

// Sans TURNSTILE_SECRET, seul le champ piège protège le formulaire.
const humainVerifie = async (jeton: string, ip: string | null) => {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (!jeton) return false;
  const corps = new URLSearchParams({ secret, response: jeton });
  if (ip) corps.set("remoteip", ip);
  const reponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: corps,
  });
  const resultat = (await reponse.json()) as { success?: boolean };
  return resultat.success === true;
};

const transport = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "ssl0.ovh.net",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

export async function POST(request: Request) {
  const formulaire = await request.formData().catch(() => null);
  if (!formulaire) return repondre(request, 400);

  const champ = (nom: string) => String(formulaire.get(nom) ?? "");

  // Robot qui remplit tout : on répond comme si tout allait bien, sans rien envoyer.
  if (champ(CHAMP_PIEGE)) return repondre(request, 200);

  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
  const humain = await humainVerifie(champ("cf-turnstile-response"), ip).catch((erreur) => {
    console.error("Vérification anti-robot impossible", erreur);
    return null;
  });
  if (humain === null) return repondre(request, 502);
  if (!humain) {
    return repondre(request, 403, { erreur: "robot" });
  }

  const r = contactSchema.safeParse({
    nom: champ("nom"),
    email: champ("email"),
    tel: champ("tel") || undefined,
    message: champ("message"),
  });
  if (!r.success) {
    const erreurs: Partial<Record<ChampContact, string>> = {};
    for (const i of r.error.issues) erreurs[i.path[0] as ChampContact] ??= i.message;
    return repondre(request, 400, { erreurs });
  }

  const { nom, email, tel, message } = r.data;
  const nomSurUneLigne = nom.replace(/[\r\n]+/g, " ");

  try {
    await transport().sendMail({
      from: { name: "Site olivier-gaillard.fr", address: process.env.SMTP_USER ?? DESTINATAIRE },
      to: DESTINATAIRE,
      replyTo: { name: nomSurUneLigne, address: email },
      subject: `Nouveau message de ${nomSurUneLigne}`,
      text: [
        `Nom : ${nomSurUneLigne}`,
        `Email : ${email}`,
        `Téléphone : ${tel || "non indiqué"}`,
        "",
        message,
        "",
        "Répondre à ce mail répond directement à la personne.",
      ].join("\n"),
    });
  } catch (erreur) {
    console.error("Envoi du formulaire de contact impossible", erreur);
    return repondre(request, 502);
  }

  return repondre(request, 200);
}
