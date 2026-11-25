/**
 * Contagem de sílabas do português, por regras (sem dicionário).
 *
 * É uma aproximação: acerta a grande maioria das palavras comuns, mas há casos
 * ambíguos (ex.: "Maria", "ainda"). Os casos conhecidos ficam em EXCECOES —
 * contribuições com novas exceções são bem-vindas (veja CONTRIBUTING.md).
 */

const FORTES = new Set(["a", "á", "à", "â", "ã", "e", "é", "ê", "o", "ó", "ô", "õ"]);
const FRACAS = new Set(["i", "u", "ü", "y"]);
const FRACAS_ACENTUADAS = new Set(["í", "ú"]); // sempre formam hiato

const RE_NUCLEO_VOCALICO = /[aáàâãeéêoóôõiíuúüy]+/g;

/** Palavras em que a regra geral erra. Chave em minúsculas, valor = nº de sílabas. */
export const EXCECOES: Readonly<Record<string, number>> = {
  ainda: 3,
  juiz: 2,
  raiz: 2,
  maria: 3,
  mediana: 4,
  oito: 2,
  coisa: 2,
};

function ehForte(c: string): boolean {
  return FORTES.has(c);
}

function ehFraca(c: string): boolean {
  return FRACAS.has(c);
}

function contarNucleos(
  grupo: string,
  caractereAnterior: string,
  unicoGrupo: boolean,
  fimDaPalavra: boolean,
): number {
  let n = 1;
  for (let i = 1; i < grupo.length; i++) {
    const ant = grupo[i - 1]!;
    const atual = grupo[i]!;
    const antAnt = i >= 2 ? grupo[i - 2]! : "";

    // ditongos nasais: ão, ãe, õe
    if ((ant === "ã" && (atual === "o" || atual === "e")) || (ant === "õ" && atual === "e")) {
      continue;
    }
    // i/u tônicos acentuados formam hiato com a vogal vizinha
    if (FRACAS_ACENTUADAS.has(atual) || FRACAS_ACENTUADAS.has(ant)) {
      n++;
      continue;
    }
    // duas vogais fortes: hiato (po-e-ta, vo-o)
    if (ehForte(ant) && ehForte(atual)) {
      n++;
      continue;
    }
    // fraca + forte: ditongo crescente ou hiato
    if (ehFraca(ant) && ehForte(atual)) {
      // forte-fraca-forte: i-dei-a, sai-a
      if (antAnt && ehForte(antAnt)) {
        n++;
        continue;
      }
      // "qu"/"gu" + vogal: quando, água, guarda → mesma sílaba
      const depoisDeQG =
        i === 1 && ant === "u" && (caractereAnterior === "q" || caractereAnterior === "g");
      if (depoisDeQG) continue;
      // i/u + vogal nasal: a-vi-ão, u-ni-ão → hiato
      if (atual === "ã" || atual === "õ") {
        n++;
        continue;
      }
      if (fimDaPalavra) {
        // dia, rua, rio (palavra de um só grupo) → hiato; história, série → ditongo
        if (unicoGrupo && grupo.length === 2) {
          n++;
        }
        continue;
      }
      // no meio da palavra: cli-en-te, pi-a-no, so-ci-al
      n++;
      continue;
    }
    // forte + fraca (ditongo decrescente) ou fraca + fraca: mesma sílaba
  }
  return n;
}

/**
 * Conta as sílabas de uma palavra. Palavras sem vogais (siglas como "SP")
 * contam como 1.
 */
export function contarSilabas(palavra: string): number {
  const p = palavra.toLowerCase().normalize("NFC");
  const excecao = EXCECOES[p];
  if (excecao !== undefined) return excecao;

  // o "u" de que/qui/gue/gui é mudo na grande maioria dos casos
  const normalizada = p.replace(/([qg])u(?=[eiéêí])/g, "$1");

  const grupos = [...normalizada.matchAll(RE_NUCLEO_VOCALICO)];
  if (grupos.length === 0) return 1;

  let total = 0;
  for (const m of grupos) {
    const inicio = m.index ?? 0;
    const grupo = m[0];
    total += contarNucleos(
      grupo,
      inicio > 0 ? normalizada[inicio - 1]! : "",
      grupos.length === 1,
      inicio + grupo.length === normalizada.length,
    );
  }
  return Math.max(1, total);
}
