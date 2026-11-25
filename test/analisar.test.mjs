import { test } from "node:test";
import assert from "node:assert/strict";
import { analisar, fleschPtBr, classificarFlesch } from "../dist/index.js";

test("fórmula de Flesch adaptada (Martins et al., 1996)", () => {
  // 248,835 − 1,015 × 5 − 84,6 × 1,8 = 91,48
  assert.ok(Math.abs(fleschPtBr(5, 1.8) - 91.48) < 0.001);
});

test("analisa uma frase curta", () => {
  const r = analisar("O gato subiu no telhado.");
  assert.equal(r.palavras, 5);
  assert.equal(r.sentencas, 1);
  assert.equal(r.silabas, 9);
  assert.ok(Math.abs((r.flesch ?? 0) - 91.48) < 0.001);
  assert.equal(r.classificacao?.nivel, "facil");
});

test("texto longo e técnico fica mais difícil que texto simples", () => {
  const simples = analisar("O sol nasceu. A casa é boa. Eu vou ao mar.");
  const tecnico = analisar(
    "A implementação da responsabilidade socioambiental corporativa pressupõe a institucionalização de mecanismos transparentes de governança estratégica.",
  );
  assert.ok((simples.flesch ?? 0) > (tecnico.flesch ?? 0));
  assert.equal(tecnico.classificacao?.nivel, "muito-dificil");
});

test("texto sem palavras", () => {
  const r = analisar("   123   ");
  assert.equal(r.palavras, 0);
  assert.equal(r.flesch, null);
  assert.equal(r.classificacao, null);
});

test("faixas de classificação", () => {
  assert.equal(classificarFlesch(80).nivel, "facil");
  assert.equal(classificarFlesch(60).nivel, "medio");
  assert.equal(classificarFlesch(30).nivel, "dificil");
  assert.equal(classificarFlesch(10).nivel, "muito-dificil");
});
