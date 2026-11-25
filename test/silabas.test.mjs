import { test } from "node:test";
import assert from "node:assert/strict";
import { contarSilabas } from "../dist/index.js";

// palavra → número de sílabas (separação gramatical)
const casos = {
  casa: 2, livro: 2, computador: 4, janela: 3, história: 3, série: 2, água: 2,
  quase: 2, quando: 2, queijo: 2, guerra: 2, saúde: 3, país: 2, ideia: 3,
  poeta: 3, leão: 2, mãe: 1, pão: 1, coração: 3, avião: 3, não: 1, também: 2,
  muito: 2, fui: 1, viu: 1, brasil: 2, empresa: 3, comunicação: 5, produção: 3,
  pessoas: 3, voo: 2, cooperar: 4, sol: 1, "guarda-chuva": 4, língua: 2,
  tranquilo: 3, cliente: 3, piano: 3, social: 3, frequência: 3, dia: 2, rua: 2,
  feira: 2, pouco: 2, família: 3, ruído: 3, ainda: 3, juiz: 2, maria: 3,
};

for (const [palavra, esperado] of Object.entries(casos)) {
  test(`contarSilabas("${palavra}") = ${esperado}`, () => {
    assert.equal(contarSilabas(palavra), esperado);
  });
}

test("ignora maiúsculas", () => {
  assert.equal(contarSilabas("COMUNICAÇÃO"), 5);
});

test("siglas sem vogais contam como 1", () => {
  assert.equal(contarSilabas("SP"), 1);
});
