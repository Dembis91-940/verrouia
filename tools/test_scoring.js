// Test runtime de la logique VerrouIA (questions + scoring) sans navigateur
const fs = require("fs");
const vm = require("vm");

global.window = {};
const ctx = { window: global.window };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("js/questions.js", "utf8"), ctx);
vm.runInContext(fs.readFileSync("js/scoring.js", "utf8"), ctx);

const V = ctx.window.VERROUIA;
const Q = ctx.window.VERROUIA_QUESTIONS;

let totalQ = 0;
Q.forEach((p) => {
  totalQ += p.questions.length;
  if (!(p.weight > 0 && p.weight < 1)) throw new Error("poids invalide " + p.id);
});
console.log("Questions:", totalQ, "| Piliers:", Q.length);

const weights = Q.reduce((s, p) => s + p.weight, 0);
console.log("Somme poids:", weights.toFixed(2));
if (Math.abs(weights - 1) > 0.001) throw new Error("poids != 1");

// Jeu 1 : tout parfait (100 partout) -> note 100
const perfect = {};
Q.forEach((p) => p.questions.forEach((q) => { perfect[q.id] = 100; }));
let r = V.compute(perfect);
console.log("Perfect ->", r.global, r.face);
if (r.global !== 100) throw new Error("perfect != 100");

// Jeu 2 : tout au minimum (0) -> note 0
const zero = {};
Q.forEach((p) => p.questions.forEach((q) => { zero[q.id] = 0; }));
r = V.compute(zero);
console.log("Zero ->", r.global, r.face);
if (r.global !== 0) throw new Error("zero != 0");

// Jeu 3 : mix réaliste
const mix = { a1: 33, a2: 40, a3: 50, a4: 50, a5: 50, b1: 33, b2: 33, b3: 0, b4: 50, c1: 40, c2: 50, c3: 50, c4: 50, c5: 50, d1: 33, d2: 40, d3: 70, d4: 50 };
r = V.compute(mix);
console.log("Mix ->", r.global, r.face, "| piliers:", r.pillars.map((p) => p.name + ":" + p.score).join(" "));
const plan = V.buildPlan(r.pillars);
console.log("Plan actions:", plan.all.length, "| semaines:", plan.weeks.length, "| 1ere action:", plan.all[0] ? plan.all[0].text.slice(0, 60) : "-");
if (!plan.all.length) throw new Error("plan vide attendu non vide");

// Jeu 4 : quasi-parfait -> plan réduit
const good = Object.assign({}, perfect);
good.b3 = 50; good.a4 = 50; good.d1 = 66; // petites faiblesses
r = V.compute(good);
console.log("Good ->", r.global, r.face);
const plan2 = V.buildPlan(r.pillars);
console.log("Plan actions (good):", plan2.all.length);

console.log("TESTS OK");
