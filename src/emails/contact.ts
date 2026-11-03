import type { Contact } from "../contact.js";

// Mail reçu par Olivier pour chaque message du formulaire : version HTML aux couleurs du site + version texte.
const C = {
  fond: "#0f0f0f",
  texte: "#fffdfa",
  accent: "#e87a3d",
  encre: "#1a1a1a",
  gris: "#6b6b6b",
  papier: "#ffffff",
  doux: "#f6f3ee",
  trait: "#e7e2da",
};
const POLICE = "'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const TITRE = "'Anton', Impact, 'Arial Narrow Bold', sans-serif";
const SITE = "https://olivier-gaillard.fr";

const echapper = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const paragraphes = (v: string) =>
  echapper(v)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px;">${p.replace(/\n/g, "<br />")}</p>`)
    .join("");

const bouton = (href: string, libelle: string, plein: boolean) =>
  `<a href="${href}" style="display:inline-block;margin:0 8px 10px 0;padding:13px 22px;border-radius:999px;font-family:${POLICE};font-size:15px;font-weight:600;text-decoration:none;${
    plein ? `background:${C.accent};color:${C.fond};border:2px solid ${C.accent};` : `background:transparent;color:${C.encre};border:2px solid ${C.encre};`
  }">${libelle}</a>`;

const ligne = (libelle: string, valeur: string) =>
  `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.trait};width:110px;font-size:13px;color:${C.gris};vertical-align:top;">${libelle}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.trait};font-size:15px;color:${C.encre};vertical-align:top;">${valeur}</td>
  </tr>`;

export const mailContact = ({ nom, email, tel, message }: Contact, recu = new Date()) => {
  const nomPropre = nom.replace(/\s+/g, " ").trim();
  const prenom = nomPropre.split(" ")[0];
  const quand = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(recu);
  const telLien = tel?.replace(/[^\d+]/g, "");
  const reponse = `mailto:${echapper(email)}?subject=${encodeURIComponent("Votre message sur olivier-gaillard.fr")}`;
  const apercu = message.replace(/\s+/g, " ").slice(0, 110);

  const subject = `Nouveau message de ${nomPropre}`;

  const text = [
    `Nouveau message reçu le ${quand}`,
    "",
    `Nom : ${nomPropre}`,
    `Email : ${email}`,
    `Téléphone : ${tel || "non indiqué"}`,
    "",
    message,
    "",
    "Répondre à ce mail répond directement à la personne.",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${echapper(subject)}</title>
<style>
  @font-face { font-family: "Anton"; src: url("${SITE}/fonts/anton-latin.woff2") format("woff2"); }
  @font-face { font-family: "Inter"; font-weight: 400 600; src: url("${SITE}/fonts/inter-latin-var.woff2") format("woff2"); }
  @media (max-width: 620px) {
    .cadre { padding-left: 22px !important; padding-right: 22px !important; }
    .nom { font-size: 30px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.doux};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${echapper(apercu)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.doux};">
  <tr>
    <td align="center" style="padding:28px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-radius:16px;overflow:hidden;background:${C.papier};font-family:${POLICE};">
        <tr><td style="height:6px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td class="cadre" style="background:${C.fond};padding:28px 36px 30px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;padding-right:14px;">
                  <img src="${SITE}/icon-192.png" width="44" height="44" alt="OG." style="display:block;border:0;border-radius:10px;" />
                </td>
                <td style="vertical-align:middle;font-size:13px;color:#b9b6b0;">
                  Nouveau message depuis <span style="color:${C.texte};">olivier-gaillard.fr</span>
                </td>
              </tr>
            </table>
            <p class="nom" style="margin:24px 0 0;font-family:${TITRE};font-size:36px;line-height:1.05;letter-spacing:0.01em;color:${C.texte};">${echapper(nomPropre)}<span style="color:${C.accent};">.</span></p>
            <p style="margin:10px 0 0;font-size:13px;color:#b9b6b0;">Reçu le ${quand}</p>
          </td>
        </tr>
        <tr>
          <td class="cadre" style="padding:30px 36px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.trait};">
              ${ligne("Email", `<a href="mailto:${echapper(email)}" style="color:${C.encre};text-decoration:underline;text-decoration-color:${C.accent};">${echapper(email)}</a>`)}
              ${ligne(
                "Téléphone",
                telLien
                  ? `<a href="tel:${telLien}" style="color:${C.encre};text-decoration:underline;text-decoration-color:${C.accent};">${echapper(tel!)}</a>`
                  : `<span style="color:${C.gris};">Non indiqué</span>`,
              )}
            </table>
          </td>
        </tr>
        <tr>
          <td class="cadre" style="padding:18px 36px 6px;">
            <p style="margin:0 0 10px;font-size:13px;color:${C.gris};">Son message</p>
            <div style="background:${C.doux};border-left:4px solid ${C.accent};border-radius:0 10px 10px 0;padding:18px 20px 6px;font-size:15px;line-height:1.65;color:${C.encre};">
              ${paragraphes(message)}
            </div>
          </td>
        </tr>
        <tr>
          <td class="cadre" style="padding:22px 36px 26px;">
            ${bouton(reponse, `Répondre à ${echapper(prenom)}`, true)}
            ${telLien ? bouton(`tel:${telLien}`, "Appeler", false) : ""}
          </td>
        </tr>
        <tr>
          <td class="cadre" style="background:${C.fond};padding:20px 36px;font-size:12px;line-height:1.6;color:#9a968f;">
            Envoyé par le formulaire de contact de
            <a href="${SITE}" style="color:${C.texte};text-decoration:none;">olivier-gaillard.fr</a>.
            Un simple « Répondre » écrit directement à ${echapper(email)}.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, text, html };
};
