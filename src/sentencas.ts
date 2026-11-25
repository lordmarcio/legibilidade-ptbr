/** Abreviações comuns cujo ponto não encerra a sentença. */
const ABREVIACOES = [
  "sr", "sra", "srs", "sras", "srta", "dr", "dra", "drs", "dras", "prof", "profa",
  "profs", "exmo", "exma", "ilmo", "ilma", "av", "pág", "págs", "cap", "art", "arts",
  "fig", "tel", "obs", "ltda", "cia", "ex", "vs", "nº", "apt", "min", "máx", "aprox",
  "gov", "dep", "sen", "jr", "st", "sta",
];

const RE_ABREVIACOES = new RegExp(`\\b(${ABREVIACOES.join("|")})\\.`, "giu");
const MARCA = "\u0001";

/** Extrai as palavras (letras, com hífen ou apóstrofo internos). Números são ignorados. */
export function separarPalavras(texto: string): string[] {
  return texto.match(/\p{L}+(?:[-'’]\p{L}+)*/gu) ?? [];
}

/**
 * Divide o texto em sentenças. Considera fim de sentença: . ! ? … seguidos de
 * espaço ou fim de texto, e linhas em branco (parágrafos). Não quebra em
 * abreviações comuns (Dr., Sra.), iniciais (J. K.) nem números decimais (3.5).
 */
export function dividirSentencas(texto: string): string[] {
  const protegido = texto
    .replace(RE_ABREVIACOES, `$1${MARCA}`)
    .replace(/\b(\p{Lu})\./gu, `$1${MARCA}`)
    .replace(/(\d)[.,](?=\d)/g, `$1${MARCA}`);

  return protegido
    .split(/(?<=[.!?…])["')\]»”]*\s+|[.!?…]+$|\n\s*\n+/u)
    .map((parte) => parte.replaceAll(MARCA, "."))
    .filter((parte) => /\p{L}/u.test(parte));
}

export function contarSentencas(texto: string): number {
  return dividirSentencas(texto).length;
}
