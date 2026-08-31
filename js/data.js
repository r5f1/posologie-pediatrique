/* ================= language ================= */
var lang = 'e';
function T(e, f){ return {e:e, f:f}; }
function t(v){ return (v && typeof v === 'object' && v.e !== undefined) ? v[lang] : v; }

var UI = {
  h1a: T('Pediatric dosage ', 'Posologie pédiatrique '),
  h1b: T('for dummies', 'pour les nuls'),
  sub: T('Pick a diagnosis, type a weight, get the dose in milligrams and in millilitres — with the adult maximum already applied.',
         'Choisissez un diagnostic, entrez un poids, obtenez la dose en milligrammes et en millilitres — le maximum adulte est déjà appliqué.'),
  caution: T('<span><b>Study tool.</b> Always confirm the final dose against your unit\'s reference, the product monograph, or a pharmacist before giving anything to a patient.</span>',
             '<span><b>Outil d\'étude.</b> Validez toujours la dose finale avec la référence de votre unité, la monographie du produit ou un pharmacien avant d\'administrer quoi que ce soit à un patient.</span>'),
  diagnosis: T('Diagnosis', 'Diagnostic'),
  medication: T('Medication', 'Médicament'),
  weight: T('Weight', 'Poids'),
  age: T('Age', 'Âge'),
  all: T('All options for this diagnosis', 'Toutes les options pour ce diagnostic'),
  estimate: T('Estimate from age', 'Estimer selon l\'âge'),
  yr: T('yr', 'ans'), mo: T('mo', 'mois'),
  months: T('months', 'mois'), years: T('years', 'ans'),
  needWeight: T('Enter a weight to see numbers', 'Entrez un poids pour voir les chiffres'),
  estimated: T('estimated', 'estimé'),
  adultZone: T('adult dosing territory — most maximums below will apply',
               'on entre dans les doses adultes — la plupart des maximums ci-dessous s\'appliquent'),
  perDose: T('Per dose', 'Par dose'),
  give: T('Give', 'Donner'),
  per24: T('Per 24 h', 'Par 24 h'),
  max24: T('Max / 24 h', 'Max / 24 h'),
  howOften: T('How often', 'Fréquence'),
  singleDose: T('single dose', 'dose unique'),
  dose: T('Dose', 'Dose'),
  byAge: T('By age', 'Selon l\'âge'),
  rate: T('Rate', 'Rythme'),
  rule: T('Rule', 'Règle'),
  onceDaily: T('once daily', 'une fois par jour'),
  enterAge: T('enter an age', 'entrez un âge'),
  seeNotes: T('see notes', 'voir les notes'),
  using: T('Using', 'Avec'),
  alsoComes: T('Also comes as: ', 'Existe aussi en : '),
  capped: T('The weight-based calculation lands above the maximum for this drug — the number above is already capped at it.',
            'Le calcul selon le poids dépasse le maximum de ce médicament — le chiffre ci-dessus est déjà plafonné.'),
  epiSmall: T('Under 7.5 kg: no auto-injector fits — draw the dose up from the ampoule.',
              'Moins de 7,5 kg : aucun auto-injecteur ne convient — prélevez la dose dans l\'ampoule.'),
  epiJr: T('Auto-injector equivalent: EpiPen Jr / Allerject 0.15 mg.', 'Équivalent auto-injecteur : EpiPen Jr / Allerject 0,15 mg.'),
  epiAd: T('Auto-injector equivalent: EpiPen / Allerject 0.30 mg.', 'Équivalent auto-injecteur : EpiPen / Allerject 0,30 mg.'),
  ondanSmall: T('Under 8 kg, ondansetron is normally avoided.', 'Sous 8 kg, on évite habituellement l\'ondansétron.'),
  mgkgday: T(' mg/kg/day', ' mg/kg/jour'),
  mgkgdose: T(' mg/kg/dose', ' mg/kg/dose'),
  mlkg: T(' mL/kg', ' mL/kg'),
  divided: T('divided ', 'divisé '),
  byAgeRule: T('dosed by age', 'selon l\'âge'),
  deeper: T('Go deeper', 'Aller plus loin'),
  mClass: T('Class and how it works', "Classe et mode d'action"),
  mWatch: T('What to watch for', 'À surveiller'),
  mNurse: T('Nursing care', 'Surveillance infirmière'),
  mTeach: T('Teaching the family', 'Enseignement à la famille'),
  askGo: T('Ask Claude about it', 'Demander à Claude'),
  askCopy: T('Copy the question', 'Copier la question'),
  askDone: T('Copied \u2713', 'Copié \u2713'),
  askNote: T('The button opens a new Claude conversation with the question already written. Answers come from Claude\'s general pharmacology knowledge — not from RxVigilance or the Guide des médicaments. Verify there before relying on anything.',
             'Le bouton ouvre une nouvelle conversation Claude avec la question déjà écrite. Les réponses viennent des connaissances générales de Claude en pharmacologie — pas de RxVigilance ni du Guide des médicaments. Validez-y avant de vous fier à quoi que ce soit.'),
  tabCalc: T('Calculator', 'Calcul'),
  tabRef: T('Reference', 'Référence'),
  tabFav: T('Favourites', 'Favoris'),
  search: T('Search a medication', 'Chercher un médicament'),
  usedFor: T('Used for', 'Utilisé pour'),
  noFav: T('Tap the star on any medication to keep it here.', 'Touchez l\'étoile d\'un médicament pour le garder ici.'),
  noHit: T('Nothing matches that.', 'Aucun résultat.'),
  favAdd: T('Add to favourites', 'Ajouter aux favoris'),
  favOn: T('In favourites', 'Dans les favoris'),
  usingW: T('Doses below use the weight from the Calculator tab.', 'Les doses ci-dessous utilisent le poids de l\'onglet Calcul.'),
  setW: T('Set a weight on the Calculator tab to see doses here.', 'Entrez un poids dans l\'onglet Calcul pour voir les doses ici.'),
  tabMethod: T('Method', 'Méthode'),
  tabPractice: T('Practice', 'Pratique'),
  pinOn: T('Keep this bar visible', 'Garder cette barre visible'),
  pinOff: T('Let this bar hide when you scroll down', 'Laisser la barre se cacher en défilant'),
  order: T('Prescription', 'Ordonnance'),
  child: T('Child', 'Enfant'),
  youHave: T('You have', 'Vous avez'),
  askDose: T('What is the dose for ONE administration, in mg?', 'Quelle est la dose pour UNE prise, en mg ?'),
  askDay: T('What is the total dose for 24 hours, in mg?', 'Quelle est la dose totale pour 24 heures, en mg ?'),
  askVol: T('What volume do you draw up for ONE dose, in mL?', 'Quel volume prélevez-vous pour UNE prise, en mL ?'),
  yourAnswer: T('Your answer', 'Votre réponse'),
  check: T('Check', 'Vérifier'),
  newQ: T('New question', 'Nouvelle question'),
  reveal: T('Show me', 'Voir la réponse'),
  right: T('Correct.', 'Exact.'),
  wrong: T('Not quite.', 'Pas tout à fait.'),
  shown: T('Here is the calculation.', 'Voici le calcul.'),
  howGot: T('Step by step', 'Étape par étape'),
  theAnswer: T('The answer is', 'La réponse est'),
  score: T('correct', 'bonnes'),
  needNum: T('Type a number first.', 'Entrez d\'abord un nombre.'),
  genericWrong: T('That is not the number this calculation gives. Follow it through step by step:',
                  'Ce n\'est pas le nombre que donne ce calcul. Reprenons étape par étape :'),
  practiceIntro: T('Real orders, random weights. Work out the answer on paper, type it in, and it will tell you exactly where the arithmetic went wrong.',
                   'De vraies ordonnances, des poids au hasard. Faites le calcul sur papier, entrez la réponse, et l\'application vous dira exactement où le calcul a dérapé.'),
  credit: T('A nursing-student study project. Not affiliated with any hospital, school or publisher, and not a clinical reference.',
            'Projet d\'étude d\'une étudiante en soins infirmiers. Sans lien avec un hôpital, une école ou un éditeur, et ce n\'est pas une référence clinique.'),
  foot: T('Doses reflect common Quebec and Canadian pediatric outpatient practice for otherwise healthy children with normal kidney and liver function. Concentrations listed are the products usually stocked in Quebec pharmacies — check the bottle in your hand. Neonates, renal impairment, obesity, IV routes and local protocols all change these numbers.',
          'Les doses reflètent la pratique pédiatrique ambulatoire courante au Québec et au Canada, chez des enfants par ailleurs en santé avec fonction rénale et hépatique normale. Les concentrations indiquées sont les produits habituellement disponibles en pharmacie au Québec — vérifiez toujours la bouteille que vous avez en main. Nouveau-nés, insuffisance rénale, obésité, voies IV et protocoles locaux modifient tous ces chiffres.')
};

/* ================= Quebec formulations ================= */
var C = {
  amox: [
    {l:T('250 mg / 5 mL suspension (Novamoxin)','suspension 250 mg / 5 mL (Novamoxin)'), m:50},
    {l:T('125 mg / 5 mL suspension','suspension 125 mg / 5 mL'), m:25}],
  amoxclav: [
    {l:T('Clavulin-400 · 400 mg amox / 5 mL (7:1)','Clavulin-400 · 400 mg amox / 5 mL (7:1)'), m:80},
    {l:T('Clavulin-200 · 200 mg amox / 5 mL (7:1)','Clavulin-200 · 200 mg amox / 5 mL (7:1)'), m:40}],
  penv: [
    {l:T('250 mg / 5 mL (400,000 U) suspension','suspension 250 mg / 5 mL (400 000 U)'), m:50},
    {l:T('125 mg / 5 mL (200,000 U) suspension','suspension 125 mg / 5 mL (200 000 U)'), m:25}],
  cephalexin: [
    {l:T('250 mg / 5 mL suspension (Keflex)','suspension 250 mg / 5 mL (Keflex)'), m:50},
    {l:T('125 mg / 5 mL suspension','suspension 125 mg / 5 mL'), m:25}],
  azithro: [
    {l:T('200 mg / 5 mL suspension (Zithromax)','suspension 200 mg / 5 mL (Zithromax)'), m:40},
    {l:T('100 mg / 5 mL suspension','suspension 100 mg / 5 mL'), m:20}],
  clarithro: [
    {l:T('250 mg / 5 mL suspension (Biaxin)','suspension 250 mg / 5 mL (Biaxin)'), m:50},
    {l:T('125 mg / 5 mL suspension','suspension 125 mg / 5 mL'), m:25}],
  clinda: [{l:T('75 mg / 5 mL granules (Dalacin C)','granules 75 mg / 5 mL (Dalacin C)'), m:15}],
  tmp: [{l:T('40 mg TMP / 200 mg SMX per 5 mL (Septra)','40 mg TMP / 200 mg SMX par 5 mL (Septra)'), m:8}],
  cefixime: [{l:T('100 mg / 5 mL suspension (Suprax)','suspension 100 mg / 5 mL (Suprax)'), m:20}],
  cefprozil: [
    {l:T('250 mg / 5 mL suspension (Cefzil)','suspension 250 mg / 5 mL (Cefzil)'), m:50},
    {l:T('125 mg / 5 mL suspension','suspension 125 mg / 5 mL'), m:25}],
  ceftriax: [{l:T('250 mg / mL reconstituted for IM','250 mg / mL reconstitué pour IM'), m:250}],
  acet: [
    {l:T('160 mg / 5 mL — children\'s suspension','160 mg / 5 mL — suspension pour enfants'), m:32},
    {l:T('80 mg / mL — infant drops','80 mg / mL — gouttes pour nourrissons'), m:80}],
  ibu: [
    {l:T('100 mg / 5 mL — children\'s suspension','100 mg / 5 mL — suspension pour enfants'), m:20},
    {l:T('40 mg / mL — infant drops','40 mg / mL — gouttes pour nourrissons'), m:40}],
  pred: [{l:T('Pediapred 5 mg / 5 mL (1 mg/mL)','Pediapred 5 mg / 5 mL (1 mg/mL)'), m:1}],
  dexa: [
    {l:T('4 mg / mL injectable vial, given by mouth','fiole injectable 4 mg / mL, donnée par la bouche'), m:4},
    {l:T('1 mg / mL compounded solution','solution magistrale 1 mg / mL'), m:1}],
  ondan: [{l:T('4 mg / 5 mL oral solution','solution orale 4 mg / 5 mL'), m:0.8}],
  dphm: [{l:T('12.5 mg / 5 mL elixir (Benadryl)','élixir 12,5 mg / 5 mL (Benadryl)'), m:2.5}],
  epi: [{l:T('1 mg / mL (1:1000) ampoule','ampoule 1 mg / mL (1:1000)'), m:1}]
};

var S = {
  amox: T('250 & 500 mg capsules · 875 mg tablet','capsules de 250 et 500 mg · comprimé de 875 mg'),
  amoxclav: T('Clavulin 500/125 & 875/125 tablets','comprimés Clavulin 500/125 et 875/125'),
  penv: T('300 mg (500,000 U) tablet','comprimé de 300 mg (500 000 U)'),
  cephalexin: T('250 & 500 mg capsules','capsules de 250 et 500 mg'),
  azithro: T('250 mg tablets','comprimés de 250 mg'),
  clarithro: T('250 & 500 mg tablets','comprimés de 250 et 500 mg'),
  clinda: T('150 & 300 mg capsules','capsules de 150 et 300 mg'),
  tmp: T('Septra 80 mg TMP · Septra DS 160 mg TMP','Septra 80 mg TMP · Septra DS 160 mg TMP'),
  cefixime: T('400 mg tablet','comprimé de 400 mg'),
  cefprozil: T('250 & 500 mg tablets','comprimés de 250 et 500 mg'),
  acet: T('80 & 160 mg chewables · 325 & 500 mg tablets · 120, 160 & 325 mg suppositories','croquables de 80 et 160 mg · comprimés de 325 et 500 mg · suppositoires de 120, 160 et 325 mg'),
  ibu: T('100 mg chewable · 200 mg tablet','croquable de 100 mg · comprimé de 200 mg'),
  pred: T('prednisone 1, 5 & 50 mg tablets','prednisone en comprimés de 1, 5 et 50 mg'),
  dexa: T('0.5 & 4 mg tablets','comprimés de 0,5 et 4 mg'),
  ondan: T('4 & 8 mg dissolving tablets (ODT)','comprimés qui fondent de 4 et 8 mg (ODT)'),
  dphm: T('25 & 50 mg capsules','capsules de 25 et 50 mg'),
  nitro: T('Macrodantin 50 & 100 mg capsules · MacroBID 100 mg','capsules Macrodantin 50 et 100 mg · MacroBID 100 mg')
};

/* ================= warnings ================= */
var W = {
  ibuAge:{lvl:'warn', minM:6, t:T('Not recommended under 6 months.','Non recommandé avant 6 mois.')},
  ibuHydr:{lvl:'warn', always:true, t:T('Hold if the child is dehydrated, vomiting, or has kidney disease. Give with food.','À suspendre si l\'enfant est déshydraté, vomit ou a une maladie rénale. À donner avec de la nourriture.')},
  tmpAge:{lvl:'stop', minM:2, t:T('Contraindicated under 2 months of age.','Contre-indiqué avant l\'âge de 2 mois.')},
  nitroAge:{lvl:'stop', minM:1, t:T('Contraindicated under 1 month of age.','Contre-indiqué avant l\'âge de 1 mois.')},
  nitroPyelo:{lvl:'warn', always:true, t:T('Bladder only — it does not reach the kidney. Not for pyelonephritis.','Vessie seulement — ne se rend pas au rein. Pas pour la pyélonéphrite.')},
  nitroForm:{lvl:'warn', always:true, t:T('No oral suspension is marketed in Canada — capsules only, or a compounded suspension from the pharmacy.','Aucune suspension orale n\'est commercialisée au Canada — capsules seulement, ou une suspension magistrale préparée en pharmacie.')},
  ondanAge:{lvl:'warn', minM:6, t:T('Usually reserved for 6 months and older, and at least 8 kg.','Habituellement réservé à 6 mois et plus, et au moins 8 kg.')},
  ctxNeo:{lvl:'warn', minM:1, t:T('Avoid in jaundiced newborns and never with calcium-containing IV fluids.','À éviter chez le nouveau-né ictérique et jamais avec un soluté contenant du calcium.')},
  cetirAge:{lvl:'warn', minM:6, t:T('Not established under 6 months.','Non établi avant 6 mois.')}
};

/* ================= regimens ================= */
var R = {
  first: T('First line','Premier choix'),
  alt: T('Alternative','Alternative'),
  penMild: T('Penicillin allergy (mild)','Allergie pénicilline (légère)'),
  penSev: T('Penicillin allergy (severe)','Allergie pénicilline (grave)'),
  mrsa: T('If MRSA suspected','Si SARM suspecté')
};
var F = {
  qd: T('once daily','une fois par jour'),
  bid: T('twice daily','deux fois par jour'),
  tid: T('three times daily','trois fois par jour'),
  qid: T('four times daily','quatre fois par jour'),
  d1: T('once daily on day 1','une fois par jour au jour 1')
};
var D = {
  d10: T('10 days','10 jours'), d5: T('5 days','5 jours'), d7: T('7 days','7 jours'),
  d57: T('5–7 days','5–7 jours'), d710: T('7–10 days','7–10 jours'),
  d1014: T('10–14 days','10–14 jours'), d13: T('1–3 days','1–3 jours'),
  d5tot: T('5 days total','5 jours au total'), d35: T('3–5 days','3–5 jours')
};
var RT = {
  po: T('PO','PO'), imiv: T('IM or IV','IM ou IV'), pomiv: T('PO, IM or IV','PO, IM ou IV'),
  neb: T('Nebulized','En nébulisation'), imThigh: T('IM, outer thigh','IM, face externe de la cuisse'),
  odt: T('PO or dissolving tablet','PO ou comprimé qui fond')
};

var PATHS = [
{id:'strep', name:T('Strep throat (GAS pharyngitis)','Angine streptococcique (pharyngite à SGA)'), drugs:[
  {n:T('Amoxicillin','Amoxicilline'), role:R.first, route:RT.po, kind:'daily', mgkg:50, doses:1, freq:F.qd, maxDay:1000, dur:D.d10, conc:C.amox, solid:S.amox,
   notes:[T('Once-daily dosing works as well as twice daily for strep and is far easier to finish.','Une prise par jour est aussi efficace que deux pour l\'angine, et bien plus facile à terminer.'),
          T('Finish all 10 days even once the throat feels better — the point is preventing rheumatic fever.','Terminez les 10 jours même si la gorge va mieux — le but est de prévenir le rhumatisme articulaire aigu.')]},
  {n:T('Penicillin V','Pénicilline V'), role:T('Narrowest option','Spectre le plus étroit'), route:RT.po, kind:'daily', mgkg:40, doses:2, freq:F.bid, maxDose:500, maxDay:1000, dur:D.d10, conc:C.penv, solid:S.penv,
   notes:[T('The classic first choice, but it tastes bad — amoxicillin is usually better tolerated by kids.','Le choix classique, mais le goût est mauvais — l\'amoxicilline passe généralement mieux chez l\'enfant.')]},
  {n:T('Cephalexin','Céphalexine'), role:R.penMild, route:RT.po, kind:'daily', mgkg:40, doses:2, freq:F.bid, maxDay:1000, dur:D.d10, conc:C.cephalexin, solid:S.cephalexin,
   notes:[T('Fine with a mild, non-anaphylactic penicillin rash. Avoid if the reaction was anaphylaxis.','Acceptable si l\'allergie à la pénicilline était une éruption légère, non anaphylactique. À éviter si la réaction était une anaphylaxie.')]},
  {n:T('Azithromycin','Azithromycine'), role:R.penSev, route:RT.po, kind:'daily', mgkg:12, doses:1, freq:F.qd, maxDay:500, dur:D.d5, conc:C.azithro, solid:S.azithro,
   notes:[T('Resistance in group A strep is rising — keep it for a true severe penicillin allergy.','La résistance du streptocoque du groupe A augmente — à réserver aux vraies allergies graves à la pénicilline.')]},
  {n:T('Clindamycin','Clindamycine'), role:R.penSev, route:RT.po, kind:'daily', mgkg:20, doses:3, freq:F.tid, maxDay:1800, dur:D.d10, conc:C.clinda, solid:S.clinda,
   notes:[T('Watch for diarrhea; the C. difficile risk is higher than with the other options.','Surveillez la diarrhée; le risque de C. difficile est plus élevé qu\'avec les autres options.')]}
]},
{id:'aom', name:T('Ear infection (acute otitis media)','Otite moyenne aiguë'), drugs:[
  {n:T('Amoxicillin (high dose)','Amoxicilline (haute dose)'), role:R.first, route:RT.po, kind:'daily', mgkg:90, doses:2, freq:F.bid, maxDay:4000,
   dur:T('10 days if under 2 y · 5–7 days if older','10 jours si moins de 2 ans · 5–7 jours si plus vieux'), conc:C.amox, solid:S.amox,
   notes:[T('The high dose is deliberate — it overcomes resistant pneumococcus in middle-ear fluid.','La haute dose est voulue — elle vient à bout du pneumocoque résistant dans le liquide de l\'oreille moyenne.'),
          T('Watchful waiting for 48 h is reasonable in a well child over 2 with mild, one-sided symptoms.','Une observation de 48 h est raisonnable chez un enfant de plus de 2 ans en bon état, avec des symptômes légers et unilatéraux.')]},
  {n:T('Amoxicillin–clavulanate','Amoxicilline–clavulanate'), role:T('Recent antibiotics / failure','Antibio récents / échec'), route:RT.po, kind:'daily', mgkg:90, doses:2, freq:F.bid, maxDay:4000, dur:D.d10, conc:C.amoxclav, solid:S.amoxclav,
   notes:[T('The dose is calculated on the amoxicillin part only.','La dose se calcule uniquement sur la portion amoxicilline.'),
          T('Use Clavulin-200 or -400 (7:1) for high dose — Clavulin-125F is 4:1 and gives too much clavulanate.','Utilisez Clavulin-200 ou -400 (7:1) pour la haute dose — le Clavulin-125F est du 4:1 et donne trop de clavulanate.'),
          T('Diarrhea is the usual reason a family stops this one.','La diarrhée est la raison habituelle pour laquelle une famille arrête celui-ci.')]},
  {n:T('Cefprozil','Cefprozil'), role:R.penMild, route:RT.po, kind:'daily', mgkg:30, doses:2, freq:F.bid, maxDay:1000, dur:D.d10, conc:C.cefprozil, solid:S.cefprozil},
  {n:T('Azithromycin','Azithromycine'), role:R.penSev, route:RT.po, kind:'daily', mgkg:10, doses:1, freq:F.d1, maxDay:500, dur:D.d5tot, conc:C.azithro, solid:S.azithro,
   notes:[T('Then 5 mg/kg once daily (max 250 mg) on days 2 through 5.','Puis 5 mg/kg une fois par jour (max 250 mg) du jour 2 au jour 5.')]},
  {n:T('Ceftriaxone','Ceftriaxone'), role:T('If vomiting everything','Si l\'enfant vomit tout'), route:RT.imiv, kind:'daily', mgkg:50, doses:1, freq:F.qd, maxDay:1000, dur:D.d13, conc:C.ceftriax, warn:[W.ctxNeo],
   notes:[T('Reconstitute with 1% lidocaine for IM to reduce the sting; split large volumes between two sites.','Reconstituer avec de la lidocaïne 1 % pour l\'IM afin de réduire la douleur; répartir les gros volumes sur deux sites.')]}
]},
{id:'cap', name:T('Pneumonia (community-acquired)','Pneumonie acquise en communauté'), drugs:[
  {n:T('Amoxicillin (high dose)','Amoxicilline (haute dose)'), role:R.first, route:RT.po, kind:'daily', mgkg:90, doses:2, freq:F.bid, maxDay:4000, dur:D.d57, conc:C.amox, solid:S.amox,
   notes:[T('Covers pneumococcus, the main bacterial cause in preschoolers.','Couvre le pneumocoque, la principale cause bactérienne chez les enfants d\'âge préscolaire.')]},
  {n:T('Amoxicillin–clavulanate','Amoxicilline–clavulanate'), role:R.alt, route:RT.po, kind:'daily', mgkg:90, doses:2, freq:F.bid, maxDay:4000, dur:D.d710, conc:C.amoxclav, solid:S.amoxclav,
   notes:[T('Dose on the amoxicillin component.','Calculez la dose sur la portion amoxicilline.')]},
  {n:T('Azithromycin','Azithromycine'), role:T('Atypical cover (school age)','Couverture atypique (âge scolaire)'), route:RT.po, kind:'daily', mgkg:10, doses:1, freq:F.d1, maxDay:500, dur:D.d5tot, conc:C.azithro, solid:S.azithro,
   notes:[T('Then 5 mg/kg once daily (max 250 mg) on days 2 through 5.','Puis 5 mg/kg une fois par jour (max 250 mg) du jour 2 au jour 5.'),
          T('Think Mycoplasma: older child, dry hacking cough, looks better than the chest x-ray suggests.','Pensez au Mycoplasme : enfant plus âgé, toux sèche persistante, meilleure allure que ce que la radiographie laisse croire.')]},
  {n:T('Clarithromycin','Clarithromycine'), role:T('Atypical alternative','Alternative atypique'), route:RT.po, kind:'daily', mgkg:15, doses:2, freq:F.bid, maxDay:1000, dur:D.d710, conc:C.clarithro, solid:S.clarithro}
]},
{id:'sinus', name:T('Bacterial sinusitis','Sinusite bactérienne'), drugs:[
  {n:T('Amoxicillin–clavulanate','Amoxicilline–clavulanate'), role:R.first, route:RT.po, kind:'daily', mgkg:[45,90], doses:2, freq:F.bid, maxDay:4000, dur:D.d1014, conc:C.amoxclav, solid:S.amoxclav,
   notes:[T('Use the higher end for daycare attendees, recent antibiotics, or no improvement after 72 h.','Visez le haut de la fourchette pour un enfant en garderie, une antibiothérapie récente, ou aucune amélioration après 72 h.'),
          T('Dose on the amoxicillin component.','Calculez la dose sur la portion amoxicilline.')]},
  {n:T('Amoxicillin (high dose)','Amoxicilline (haute dose)'), role:R.alt, route:RT.po, kind:'daily', mgkg:90, doses:2, freq:F.bid, maxDay:4000, dur:D.d1014, conc:C.amox, solid:S.amox},
  {n:T('Cefprozil','Cefprozil'), role:R.penMild, route:RT.po, kind:'daily', mgkg:30, doses:2, freq:F.bid, maxDay:1000, dur:D.d10, conc:C.cefprozil, solid:S.cefprozil}
]},
{id:'uti', name:T('Urinary tract infection','Infection urinaire'), drugs:[
  {n:T('Cephalexin','Céphalexine'), role:R.first, route:RT.po, kind:'daily', mgkg:50, doses:3, freq:F.tid, maxDay:2000, dur:D.d710, conc:C.cephalexin, solid:S.cephalexin,
   notes:[T('Always send a proper culture before the first dose — a bag specimen is not good enough.','Envoyez toujours une culture valable avant la première dose — un prélèvement au sac n\'est pas suffisant.')]},
  {n:T('Cefixime','Céfixime'), role:T('Once-daily option','Option une fois par jour'), route:RT.po, kind:'daily', mgkg:8, doses:1, freq:F.qd, maxDay:400, dur:D.d710, conc:C.cefixime, solid:S.cefixime},
  {n:T('Trimethoprim–sulfamethoxazole','Triméthoprime–sulfaméthoxazole'), role:R.alt, route:RT.po, kind:'daily', mgkg:8, doses:2, freq:F.bid, maxDay:320, dur:D.d7, conc:C.tmp, solid:S.tmp, unitNote:'TMP', warn:[W.tmpAge],
   notes:[T('Everything here is the trimethoprim component. Local E. coli resistance often exceeds 20% — check the culture.','Tout est calculé sur la portion triméthoprime. La résistance locale d\'E. coli dépasse souvent 20 % — vérifiez la culture.')]},
  {n:T('Nitrofurantoin','Nitrofurantoïne'), role:T('Bladder only','Vessie seulement'), route:RT.po, kind:'daily', mgkg:[5,7], doses:4, freq:F.qid, maxDay:400, dur:D.d7, solid:S.nitro, warn:[W.nitroAge, W.nitroForm, W.nitroPyelo],
   notes:[T('Give with food to cut the nausea.','À donner avec de la nourriture pour réduire les nausées.'),
          T('MacroBID is a twice-daily capsule and does not fit this four-times-daily schedule — that one is Macrodantin.','Le MacroBID est une capsule deux fois par jour et ne convient pas à cet horaire quatre fois par jour — c\'est le Macrodantin qui convient.')]},
  {n:T('Amoxicillin–clavulanate','Amoxicilline–clavulanate'), role:R.alt, route:RT.po, kind:'daily', mgkg:40, doses:3, freq:F.tid, maxDay:1500, dur:D.d710, conc:C.amoxclav, solid:S.amoxclav}
]},
{id:'skin', name:T('Skin infection (cellulitis, impetigo)','Infection cutanée (cellulite, impétigo)'), drugs:[
  {n:T('Cephalexin','Céphalexine'), role:R.first, route:RT.po, kind:'daily', mgkg:50, doses:3, freq:F.tid, maxDay:2000, dur:D.d7, conc:C.cephalexin, solid:S.cephalexin,
   notes:[T('Covers strep and ordinary staph. Trace the edge of the redness with a pen to track it.','Couvre le streptocoque et le staphylocoque ordinaire. Tracez le contour de la rougeur au crayon pour la suivre.')]},
  {n:T('Clindamycin','Clindamycine'), role:R.mrsa, route:RT.po, kind:'daily', mgkg:30, doses:3, freq:F.tid, maxDay:1800, dur:D.d710, conc:C.clinda, solid:S.clinda,
   notes:[T('Also the choice when there is an abscess — but drainage matters more than the antibiotic.','Aussi le choix en présence d\'un abcès — mais le drainage compte plus que l\'antibiotique.')]},
  {n:T('Trimethoprim–sulfamethoxazole','Triméthoprime–sulfaméthoxazole'), role:R.mrsa, route:RT.po, kind:'daily', mgkg:[8,12], doses:2, freq:F.bid, maxDay:320, dur:D.d7, conc:C.tmp, solid:S.tmp, unitNote:'TMP', warn:[W.tmpAge],
   notes:[T('Poor strep coverage — pair it with cephalexin if you need both.','Couverture du streptocoque insuffisante — associez-le à la céphalexine si vous avez besoin des deux.')]},
  {n:T('Amoxicillin–clavulanate','Amoxicilline–clavulanate'), role:T('Bites and puncture wounds','Morsures et plaies perforantes'), route:RT.po, kind:'daily', mgkg:45, doses:2, freq:F.bid, maxDay:4000, dur:D.d57, conc:C.amoxclav, solid:S.amoxclav}
]},
{id:'fever', name:T('Fever and pain','Fièvre et douleur'), drugs:[
  {n:T('Acetaminophen','Acétaminophène'), role:R.first, route:RT.po, kind:'dose', mgkg:15, freq:T('every 4–6 h','aux 4–6 h'), maxDose:1000, maxDay:4000, maxDayKg:75,
   dur:T('as needed, max 5 doses in 24 h','au besoin, max 5 doses par 24 h'), conc:C.acet, solid:S.acet,
   notes:[T('Treat the discomfort, not the number on the thermometer.','On traite l\'inconfort, pas le chiffre sur le thermomètre.'),
          T('The biggest real-world danger is doubling up with a cold medicine that already contains acetaminophen.','Le vrai danger, c\'est de doubler la dose avec un sirop contre le rhume qui contient déjà de l\'acétaminophène.')]},
  {n:T('Ibuprofen','Ibuprofène'), role:R.alt, route:RT.po, kind:'dose', mgkg:10, freq:T('every 6–8 h','aux 6–8 h'), maxDose:400, maxDay:2400, maxDayKg:40,
   dur:T('as needed','au besoin'), conc:C.ibu, solid:S.ibu, warn:[W.ibuAge, W.ibuHydr],
   notes:[T('Lasts longer than acetaminophen and works better for ear pain and inflammation.','Agit plus longtemps que l\'acétaminophène et soulage mieux la douleur d\'oreille et l\'inflammation.')]}
]},
{id:'asthma', name:T('Asthma exacerbation','Crise d\'asthme'), drugs:[
  {n:T('Prednisone / prednisolone','Prednisone / prednisolone'), role:R.first, route:RT.po, kind:'daily', mgkg:[1,2], doses:1, freq:F.qd, maxDay:60, dur:D.d35, conc:C.pred, solid:S.pred,
   notes:[T('No taper needed for a short course. Give in the morning, with food.','Aucun sevrage progressif nécessaire pour une courte cure. À donner le matin, avec de la nourriture.'),
          T('Pediapred is only 1 mg/mL, so volumes get large fast — switch to prednisone tablets in a bigger child.','Le Pediapred n\'est qu\'à 1 mg/mL, donc les volumes deviennent vite énormes — passez aux comprimés de prednisone chez un enfant plus grand.')]},
  {n:T('Dexamethasone','Dexaméthasone'), role:T('Single-dose alternative','Alternative en dose unique'), route:RT.po, kind:'once', mgkg:0.6, maxDose:16,
   dur:T('1 dose, may repeat once at 24 h','1 dose, peut être répétée à 24 h'), conc:C.dexa, solid:S.dexa,
   notes:[T('One dose in the clinic beats five days a family may not finish.','Une dose donnée sur place vaut mieux que cinq jours qu\'une famille ne terminera peut-être pas.')]}
]},
{id:'croup', name:T('Croup','Laryngite striduleuse (croup)'), drugs:[
  {n:T('Dexamethasone','Dexaméthasone'), role:R.first, route:RT.pomiv, kind:'once', mgkg:0.6, maxDose:16, dur:T('single dose','dose unique'), conc:C.dexa, solid:S.dexa,
   notes:[T('Give it even for mild croup — it shortens the illness and prevents return visits.','À donner même pour un croup léger — cela raccourcit la maladie et évite les retours à l\'urgence.'),
          T('Many Quebec centres cap this at 10 mg.','Beaucoup de centres au Québec plafonnent à 10 mg.'),
          T('The injectable 4 mg/mL vial given by mouth is the usual way it is done here.','La fiole injectable de 4 mg/mL donnée par la bouche est la façon habituelle de faire ici.')]},
  {n:T('Nebulized epinephrine','Épinéphrine en nébulisation'), role:T('Moderate to severe','Modéré à grave'), route:RT.neb, kind:'mlkg', mlkg:0.5, maxMl:5,
   dur:T('single neb, may repeat','une nébulisation, peut être répétée'), conc:C.epi,
   notes:[T('This is a volume of 1:1000 solution, not a milligram dose.','Il s\'agit d\'un volume de solution 1:1000, pas d\'une dose en milligrammes.'),
          T('Watch at least 2–4 h afterward — the stridor can rebound as it wears off.','Surveillez au moins 2 à 4 h après — le stridor peut réapparaître quand l\'effet s\'estompe.')]}
]},
{id:'anaph', name:T('Anaphylaxis and allergic reaction','Anaphylaxie et réaction allergique'), drugs:[
  {n:T('Epinephrine','Épinéphrine'), role:T('First line — give first','Premier choix — à donner en premier'), route:RT.imThigh, kind:'dose', mgkg:0.01,
   freq:T('repeat every 5–15 min if needed','répéter aux 5–15 min au besoin'), maxDose:0.5, conc:C.epi, epiAuto:true,
   third:{k:T('Repeat','Répéter'), v:T('every 5–15 min','aux 5–15 min')},
   notes:[T('Nothing comes before this. No dose of antihistamine treats anaphylaxis.','Rien ne passe avant. Aucune dose d\'antihistaminique ne traite l\'anaphylaxie.'),
          T('Lay the child flat with the legs raised, unless they are struggling to breathe.','Couchez l\'enfant à plat avec les jambes surélevées, sauf s\'il a du mal à respirer.')]},
  {n:T('Diphenhydramine','Diphenhydramine'), role:T('Add-on only','Traitement d\'appoint'), route:RT.po, kind:'dose', mgkg:1, freq:T('every 6 h','aux 6 h'), maxDose:50, maxDay:300, conc:C.dphm, solid:S.dphm,
   notes:[T('Helps hives and itch. It does not touch airway swelling or low blood pressure.','Soulage l\'urticaire et les démangeaisons. N\'a aucun effet sur l\'œdème des voies respiratoires ni sur l\'hypotension.')]},
  {n:T('Cetirizine','Cétirizine'), role:T('Add-on, by age','Appoint, selon l\'âge'), route:RT.po, kind:'ageband',
   bands:[{min:6,max:23,d:T('2.5 mg','2,5 mg')},{min:24,max:71,d:T('2.5–5 mg','2,5–5 mg')},{min:72,max:9999,d:T('5–10 mg','5–10 mg')}], warn:[W.cetirAge],
   notes:[T('Dosed by age, not weight. Less sedating than diphenhydramine.','Dosée selon l\'âge, pas le poids. Moins sédative que la diphenhydramine.'),
          T('In Quebec: Reactine liquid 1 mg/mL, plus 5 and 10 mg tablets.','Au Québec : Reactine liquide 1 mg/mL, plus comprimés de 5 et 10 mg.')]}
]},
{id:'gastro', name:T('Gastroenteritis and vomiting','Gastro-entérite et vomissements'), drugs:[
  {n:T('Ondansetron','Ondansétron'), role:T('To stop the vomiting','Pour arrêter les vomissements'), route:RT.odt, kind:'dose', mgkg:0.15,
   freq:T('single dose, usually not repeated','dose unique, rarement répétée'), maxDose:8, maxDay:8, conc:C.ondan, solid:S.ondan, ondanBand:true, warn:[W.ondanAge],
   notes:[T('One dose lets oral rehydration work and often avoids an IV.','Une seule dose permet à la réhydratation orale de fonctionner et évite souvent un soluté.'),
          T('Usual shortcut by weight: 8–15 kg → 2 mg · 15–30 kg → 4 mg · over 30 kg → 8 mg.','Raccourci habituel selon le poids : 8–15 kg → 2 mg · 15–30 kg → 4 mg · plus de 30 kg → 8 mg.')]},
  {n:T('Oral rehydration solution','Solution de réhydratation orale'), role:T('The actual treatment','Le vrai traitement'), route:RT.po, kind:'mlkg', mlkg:50,
   dur:T('over 4 h for mild to moderate dehydration','sur 4 h pour une déshydratation légère à modérée'),
   notes:[T('Give it in tiny amounts — about 5 mL every 5 minutes with a syringe. Volume, not speed.','Donnez-la en toutes petites quantités — environ 5 mL aux 5 minutes à la seringue. C\'est le volume qui compte, pas la vitesse.'),
          T('Add roughly 10 mL/kg extra for each further large watery stool.','Ajoutez environ 10 mL/kg de plus pour chaque nouvelle selle liquide abondante.'),
          T('Pedialyte or Gastrolyte. Water, juice and sports drinks have the wrong salt and sugar balance.','Pedialyte ou Gastrolyte. L\'eau, les jus et les boissons sportives n\'ont pas le bon équilibre de sel et de sucre.')]}
]}
];

/* ================= go-deeper monographs ================= */
var M = {
"Amoxicillin":{
 c:T("Aminopenicillin. It blocks the bacterial cell wall from being built, so the bacteria burst as they try to divide.",
     "Aminopénicilline. Elle empêche la construction de la paroi bactérienne, si bien que la bactérie éclate en se divisant."),
 w:T("Diarrhea, nausea, rash. A flat non-itchy rash around day 5 is common and usually not a true allergy — hives, swelling and wheezing are.",
     "Diarrhée, nausées, éruption cutanée. Une éruption plate et non prurigineuse vers le 5e jour est fréquente et n'est habituellement pas une vraie allergie — l'urticaire, l'œdème et le sifflement, oui."),
 n:T("Ask about penicillin allergy and what the reaction actually was before the first dose. Shake the bottle well; the suspension keeps 14 days refrigerated.",
     "Vérifiez l'allergie à la pénicilline et la nature exacte de la réaction avant la première dose. Bien agiter la bouteille; la suspension se conserve 14 jours au réfrigérateur."),
 e:T("Finish the whole course even once the child feels better. With or without food.",
     "Terminer toute la prescription même si l'enfant va mieux. Avec ou sans nourriture.")},

"Amoxicillin–clavulanate":{
 c:T("Amoxicillin plus clavulanate, which blocks the enzyme resistant bacteria use to destroy penicillins.",
     "Amoxicilline avec du clavulanate, qui bloque l'enzyme utilisée par les bactéries résistantes pour détruire les pénicillines."),
 w:T("Diarrhea, far more than with plain amoxicillin — that is the clavulanate. Also thrush and diaper rash.",
     "Diarrhée, beaucoup plus qu'avec l'amoxicilline seule — c'est le clavulanate. Aussi muguet et érythème fessier."),
 n:T("Give at the start of a meal to cut the diarrhea. Never swap one 500 mg tablet for two 250 mg — the clavulanate dose would double.",
     "Donner au début d'un repas pour réduire la diarrhée. Ne jamais remplacer un comprimé de 500 mg par deux de 250 mg — la dose de clavulanate doublerait."),
 e:T("Loose stools are expected. Call if there is blood in them or the child stops drinking.",
     "Des selles molles sont attendues. Appeler s'il y a du sang ou si l'enfant cesse de boire.")},

"Penicillin V":{
 c:T("Narrow-spectrum penicillin. It hits strep and little else, which is exactly why it is still a first choice for strep throat.",
     "Pénicilline à spectre étroit. Elle atteint le streptocoque et peu d'autres choses, ce qui en fait encore un premier choix pour l'angine."),
 w:T("Nausea, diarrhea, rash. Allergy is the main concern.",
     "Nausées, diarrhée, éruption. L'allergie est la principale préoccupation."),
 n:T("Give on an empty stomach — 1 h before or 2 h after food — for the best absorption.",
     "Donner à jeun — 1 h avant ou 2 h après le repas — pour une meilleure absorption."),
 e:T("The taste is bitter; a cold drink right after helps. All 10 days matter.",
     "Le goût est amer; une boisson froide juste après aide. Les 10 jours comptent.")},

"Cephalexin":{
 c:T("First-generation cephalosporin. Same cell-wall attack as penicillin, with better coverage of ordinary staph.",
     "Céphalosporine de première génération. Même attaque de la paroi cellulaire que la pénicilline, avec une meilleure couverture du staphylocoque ordinaire."),
 w:T("Stomach upset, diarrhea, rash. Cross-reactivity with penicillin allergy is low, around 1 to 2%.",
     "Troubles digestifs, diarrhée, éruption. La réactivité croisée avec l'allergie à la pénicilline est faible, environ 1 à 2 %."),
 n:T("Safe after a mild penicillin rash, not after anaphylaxis. The suspension keeps 14 days refrigerated.",
     "Sécuritaire après une éruption légère à la pénicilline, pas après une anaphylaxie. La suspension se conserve 14 jours au réfrigérateur."),
 e:T("Give with food if it upsets the stomach, and space the doses evenly through the day.",
     "Donner avec de la nourriture si cela dérange l'estomac, et répartir les doses également dans la journée.")},

"Azithromycin":{
 c:T("Macrolide. It stops bacteria from building proteins and concentrates inside tissue, which is why 5 days of pills cover 10 days of treatment.",
     "Macrolide. Il empêche les bactéries de fabriquer leurs protéines et se concentre dans les tissus, d'où une cure de 5 jours qui couvre 10 jours de traitement."),
 w:T("Nausea, cramping, diarrhea. It prolongs the QT interval, which matters if the child takes other QT-prolonging drugs.",
     "Nausées, crampes, diarrhée. Il allonge l'intervalle QT, ce qui compte si l'enfant prend d'autres médicaments qui allongent le QT."),
 n:T("Scan the medication list for other QT-prolonging drugs. Do not give with an antacid containing aluminum or magnesium.",
     "Passez en revue la liste de médicaments pour d'autres agents allongeant le QT. Ne pas donner avec un antiacide contenant de l'aluminium ou du magnésium."),
 e:T("Once a day, at the same time. It keeps working for days after the last dose.",
     "Une fois par jour, à la même heure. Il continue d'agir plusieurs jours après la dernière dose.")},

"Clindamycin":{
 c:T("Lincosamide. It blocks protein building and covers MRSA and anaerobes well.",
     "Lincosamide. Il bloque la fabrication des protéines et couvre bien le SARM et les anaérobies."),
 w:T("Diarrhea is common, and this is the drug classically linked to C. difficile colitis. Metallic taste and esophageal irritation too.",
     "La diarrhée est fréquente, et c'est le médicament classiquement associé à la colite à C. difficile. Aussi un goût métallique et une irritation de l'œsophage."),
 n:T("Give with a full glass of water and keep the child upright for 30 minutes. Report watery or bloody diarrhea right away.",
     "Donner avec un grand verre d'eau et garder l'enfant redressé 30 minutes. Signaler immédiatement une diarrhée liquide ou sanglante."),
 e:T("Do not stop for ordinary loose stools, but call about severe, watery or bloody diarrhea — even weeks after finishing.",
     "Ne pas arrêter pour des selles molles ordinaires, mais appeler en cas de diarrhée grave, liquide ou sanglante — même des semaines après la fin.")},

"Cefprozil":{
 c:T("Second-generation cephalosporin, broader than cephalexin against the bacteria behind ear and sinus infections.",
     "Céphalosporine de deuxième génération, plus large que la céphalexine contre les bactéries responsables des otites et des sinusites."),
 w:T("Stomach upset, diarrhea, rash.",
     "Troubles digestifs, diarrhée, éruption."),
 n:T("Same penicillin-allergy rule as cephalexin: fine after a mild rash, avoid after anaphylaxis.",
     "Même règle que la céphalexine pour l'allergie à la pénicilline : acceptable après une éruption légère, à éviter après une anaphylaxie."),
 e:T("Can be given with food. Refrigerate the suspension and shake it before every dose.",
     "Peut être donné avec de la nourriture. Réfrigérer la suspension et l'agiter avant chaque dose.")},

"Ceftriaxone":{
 c:T("Third-generation cephalosporin given by injection — the option when a child cannot keep anything down.",
     "Céphalosporine de troisième génération administrée en injection — l'option quand l'enfant ne garde rien."),
 w:T("Pain at the injection site, diarrhea, rash. Rarely gallbladder sludge with repeated doses.",
     "Douleur au site d'injection, diarrhée, éruption. Rarement, boue biliaire avec des doses répétées."),
 n:T("Reconstitute with 1% lidocaine for IM. Never mix or run it with a calcium-containing solution, and avoid it in a jaundiced newborn.",
     "Reconstituer avec de la lidocaïne 1 % pour l'IM. Ne jamais le mélanger ni l'administrer avec une solution contenant du calcium, et l'éviter chez le nouveau-né ictérique."),
 e:T("The injection stings and the leg stays sore for a few hours.",
     "L'injection pique et la jambe reste sensible quelques heures.")},

"Clarithromycin":{
 c:T("Macrolide, like azithromycin, but with more drug interactions.",
     "Macrolide, comme l'azithromycine, mais avec plus d'interactions médicamenteuses."),
 w:T("A strong metallic taste children often refuse, plus nausea and diarrhea. It prolongs the QT interval.",
     "Un fort goût métallique que les enfants refusent souvent, avec nausées et diarrhée. Il allonge l'intervalle QT."),
 n:T("Check interactions — it blocks the liver enzyme that clears many other drugs. Do not refrigerate the suspension; it thickens.",
     "Vérifiez les interactions — il bloque l'enzyme hépatique qui élimine beaucoup d'autres médicaments. Ne pas réfrigérer la suspension; elle épaissit."),
 e:T("Store at room temperature. The taste is the usual reason families stop it — mixing it into food is allowed.",
     "Conserver à température ambiante. Le goût est la raison habituelle d'abandon — on peut le mélanger à de la nourriture.")},

"Cefixime":{
 c:T("Third-generation oral cephalosporin taken once a day, well suited to urinary infections.",
     "Céphalosporine orale de troisième génération prise une fois par jour, bien adaptée aux infections urinaires."),
 w:T("Diarrhea is the most common complaint, along with rash.",
     "La diarrhée est la plainte la plus fréquente, avec l'éruption cutanée."),
 n:T("Once-daily dosing helps a lot with a child who fights every dose.",
     "La prise unique quotidienne aide beaucoup avec un enfant qui résiste à chaque dose."),
 e:T("With or without food. Keep giving it even once the urine stops burning.",
     "Avec ou sans nourriture. Continuer même quand la miction ne brûle plus.")},

"Trimethoprim–sulfamethoxazole":{
 c:T("Two drugs blocking consecutive steps of folate production in bacteria — together they are far stronger than either alone.",
     "Deux médicaments qui bloquent deux étapes successives de la production de folates chez la bactérie — ensemble, ils sont bien plus puissants que séparément."),
 w:T("Rash, and rarely a severe one such as Stevens-Johnson syndrome. Photosensitivity. It raises potassium and creatinine.",
     "Éruption cutanée, et rarement une forme grave comme le syndrome de Stevens-Johnson. Photosensibilité. Il augmente le potassium et la créatinine."),
 n:T("Stop it and report any spreading rash, blistering or mouth sores. Contraindicated under 2 months and in sulfa allergy.",
     "Cesser et signaler toute éruption qui s'étend, des cloques ou des lésions buccales. Contre-indiqué avant 2 mois et en cas d'allergie aux sulfamides."),
 e:T("Drink plenty of fluids and wear sunscreen — sunburn happens fast on this one.",
     "Boire beaucoup et mettre de la crème solaire — les coups de soleil arrivent vite avec celui-ci.")},

"Nitrofurantoin":{
 c:T("It concentrates in the urine and damages bacterial DNA there. It works in the bladder only, because it never reaches useful levels in blood or kidney tissue.",
     "Il se concentre dans l'urine et y endommage l'ADN bactérien. Il n'agit que dans la vessie, car il n'atteint jamais de concentration utile dans le sang ou le rein."),
 w:T("Nausea, and urine turning dark yellow or brown — harmless, but alarming if nobody warned the family.",
     "Nausées, et urine qui devient jaune foncé ou brune — inoffensif, mais inquiétant si personne n'a prévenu la famille."),
 n:T("Give with food. Not for pyelonephritis, and not under 1 month of age.",
     "Donner avec de la nourriture. Pas pour la pyélonéphrite, ni avant 1 mois de vie."),
 e:T("The brown urine is expected. Take it with a meal or a snack to avoid nausea.",
     "L'urine brune est normale. À prendre avec un repas ou une collation pour éviter les nausées.")},

"Acetaminophen":{
 c:T("It works centrally, in the brain, to lower fever and dull pain. It is not an anti-inflammatory.",
     "Il agit au niveau central, dans le cerveau, pour abaisser la fièvre et atténuer la douleur. Ce n'est pas un anti-inflammatoire."),
 w:T("Very well tolerated at the right dose. An overdose damages the liver, often with no symptoms at all for the first 24 hours.",
     "Très bien toléré à la bonne dose. Un surdosage endommage le foie, souvent sans aucun symptôme pendant les 24 premières heures."),
 n:T("Add up every source — cold and combination products hide it. Confirm the concentration printed on the bottle before you calculate.",
     "Additionnez toutes les sources — les produits contre le rhume et les produits combinés en contiennent. Confirmez la concentration inscrite sur la bouteille avant de calculer."),
 e:T("Write down the time of each dose, and never give more than 5 doses in 24 hours.",
     "Noter l'heure de chaque dose, et ne jamais dépasser 5 doses par 24 heures.")},

"Ibuprofen":{
 c:T("An NSAID. It blocks prostaglandin production, so it treats fever, pain and inflammation at once.",
     "Un AINS. Il bloque la production de prostaglandines, donc il traite à la fois la fièvre, la douleur et l'inflammation."),
 w:T("Stomach upset and, in a dehydrated child, kidney injury. Rarely gastrointestinal bleeding.",
     "Maux d'estomac et, chez un enfant déshydraté, atteinte rénale. Rarement, saignement digestif."),
 n:T("Hold it in a child who is vomiting, not drinking, or dehydrated — that is when kidneys get hurt. Not under 6 months.",
     "Le suspendre chez un enfant qui vomit, ne boit pas ou est déshydraté — c'est là que les reins souffrent. Pas avant 6 mois."),
 e:T("Always with food or milk. It alternates well with acetaminophen, as long as both are written down.",
     "Toujours avec de la nourriture ou du lait. Il s'alterne bien avec l'acétaminophène, à condition de noter les deux.")},

"Prednisone / prednisolone":{
 c:T("Corticosteroid. It calms the airway swelling and mucus of an asthma attack over several hours — it is not a rescue medication.",
     "Corticostéroïde. Il calme l'œdème et le mucus des voies respiratoires en quelques heures — ce n'est pas un médicament de secours."),
 w:T("Mood swings, trouble sleeping, a big appetite, stomach upset, higher blood sugar.",
     "Sautes d'humeur, difficulté à dormir, gros appétit, maux d'estomac, glycémie plus élevée."),
 n:T("Give in the morning with food. A 3 to 5 day course needs no taper. Ask about chickenpox exposure.",
     "Donner le matin avec de la nourriture. Une cure de 3 à 5 jours ne nécessite pas de sevrage progressif. Questionner sur une exposition à la varicelle."),
 e:T("The child may be irritable and hungry for a few days; it passes. Keep using the reliever inhaler as prescribed.",
     "L'enfant peut être irritable et affamé quelques jours; cela passe. Continuer la pompe de secours telle que prescrite.")},

"Dexamethasone":{
 c:T("A long-acting corticosteroid — one dose lasts 2 to 3 days, which is why croup needs only one.",
     "Un corticostéroïde à longue action — une seule dose agit 2 à 3 jours, d'où la dose unique dans le croup."),
 w:T("Usually nothing after a single dose. It tastes very bitter and can make a child vomit.",
     "Habituellement rien après une dose unique. Le goût est très amer et peut faire vomir l'enfant."),
 n:T("Mix the injectable solution into a small amount of juice or syrup to get it down, then check that the child keeps it.",
     "Mélanger la solution injectable dans un peu de jus ou de sirop pour la faire passer, puis vérifier que l'enfant la garde."),
 e:T("One dose is the whole treatment. The barky cough eases over the next few hours.",
     "Une seule dose constitue tout le traitement. La toux aboyante s'atténue dans les heures qui suivent.")},

"Nebulized epinephrine":{
 c:T("It constricts the swollen blood vessels lining the airway, shrinking the swelling within minutes.",
     "Elle resserre les vaisseaux enflés qui tapissent les voies respiratoires, ce qui réduit l'œdème en quelques minutes."),
 w:T("Fast heart rate, paleness, tremor and agitation during the treatment and just after.",
     "Tachycardie, pâleur, tremblements et agitation pendant le traitement et juste après."),
 n:T("Watch at least 2 to 4 hours — the stridor can come back as it wears off. Monitor heart rate throughout.",
     "Surveiller au moins 2 à 4 heures — le stridor peut réapparaître quand l'effet s'estompe. Surveiller la fréquence cardiaque tout au long."),
 e:T("The fast effect is normal and temporary. The child has to stay for observation before going home.",
     "L'effet rapide est normal et temporaire. L'enfant doit rester en observation avant de retourner à la maison.")},

"Epinephrine":{
 c:T("It opens the airway, tightens leaking blood vessels and holds up blood pressure — the only drug that reverses anaphylaxis.",
     "Elle ouvre les voies respiratoires, resserre les vaisseaux qui fuient et soutient la tension artérielle — le seul médicament qui renverse l'anaphylaxie."),
 w:T("Racing heart, pallor, tremor, anxiety, headache. All expected, all short-lived.",
     "Cœur qui bat vite, pâleur, tremblements, anxiété, mal de tête. Tout cela est attendu et de courte durée."),
 n:T("IM in the outer thigh, never subcutaneous and never in the buttock. Delay is what kills, not the drug — give it, then call for help.",
     "IM dans la face externe de la cuisse, jamais en sous-cutané ni dans la fesse. C'est le retard qui tue, pas le médicament — administrer, puis appeler à l'aide."),
 e:T("Everyone goes to hospital afterward, even feeling fine — symptoms can return hours later.",
     "Tout le monde va à l'hôpital ensuite, même en se sentant bien — les symptômes peuvent revenir des heures plus tard.")},

"Diphenhydramine":{
 c:T("First-generation antihistamine. It blocks histamine at the skin, which is why it helps hives but does nothing for breathing.",
     "Antihistaminique de première génération. Il bloque l'histamine au niveau de la peau, d'où son effet sur l'urticaire et son absence d'effet sur la respiration."),
 w:T("Sedation and dry mouth — and in young children the opposite: hyperactivity and agitation.",
     "Sédation et bouche sèche — et chez le jeune enfant l'inverse : hyperactivité et agitation."),
 n:T("Never let it delay epinephrine in anaphylaxis. The sedation it causes can mask a reaction that is getting worse.",
     "Ne jamais le laisser retarder l'épinéphrine en cas d'anaphylaxie. La sédation qu'il cause peut masquer une réaction qui s'aggrave."),
 e:T("It causes drowsiness, and it is not for a child under 2 without medical advice.",
     "Il cause de la somnolence, et il n'est pas destiné à un enfant de moins de 2 ans sans avis médical.")},

"Cetirizine":{
 c:T("Second-generation antihistamine — it barely crosses into the brain, so it works without knocking the child out.",
     "Antihistaminique de deuxième génération — il passe très peu dans le cerveau, donc il agit sans assommer l'enfant."),
 w:T("Mild drowsiness in some children, dry mouth. Far less sedating than diphenhydramine.",
     "Légère somnolence chez certains enfants, bouche sèche. Beaucoup moins sédatif que la diphenhydramine."),
 n:T("Dosed by age, not by weight. It lasts 24 hours, so one dose a day is enough.",
     "Dosé selon l'âge, pas selon le poids. Il agit 24 heures, donc une prise par jour suffit."),
 e:T("Same time every day. Evening is a good choice if it makes the child sleepy.",
     "À la même heure chaque jour. Le soir est un bon choix s'il endort l'enfant.")},

"Ondansetron":{
 c:T("It blocks the serotonin receptors in the gut and brainstem that trigger vomiting.",
     "Il bloque les récepteurs de la sérotonine dans l'intestin et le tronc cérébral qui déclenchent le vomissement."),
 w:T("Headache, constipation, and slightly more diarrhea. It prolongs the QT interval at high doses.",
     "Mal de tête, constipation, et un peu plus de diarrhée. Il allonge l'intervalle QT à forte dose."),
 n:T("Give it, then wait 15 to 20 minutes before starting oral rehydration. One dose is usually all it takes.",
     "L'administrer, puis attendre 15 à 20 minutes avant de commencer la réhydratation orale. Une seule dose suffit habituellement."),
 e:T("The dissolving tablet melts on the tongue, no water needed. Then small sips, not a full glass.",
     "Le comprimé qui fond se dissout sur la langue, sans eau. Ensuite, de petites gorgées, pas un grand verre.")},

"Oral rehydration solution":{
 c:T("Sugar and salt in the exact ratio the gut needs to pull water back in — the sodium-glucose pump keeps working even during gastro.",
     "Du sucre et du sel dans le rapport exact dont l'intestin a besoin pour réabsorber l'eau — la pompe sodium-glucose continue de fonctionner même pendant une gastro."),
 w:T("The usual problem is refusal because of the salty taste, not a side effect.",
     "Le problème habituel est le refus à cause du goût salé, pas un effet secondaire."),
 n:T("Small volumes, constantly: about 5 mL every 5 minutes by syringe. Reassess hydration and weight after 4 hours.",
     "De petits volumes, constamment : environ 5 mL aux 5 minutes à la seringue. Réévaluer l'hydratation et le poids après 4 heures."),
 e:T("A big drink comes straight back up. Chilling it, or freezing it into popsicles, makes the taste bearable.",
     "Un grand verre ressort aussitôt. La refroidir, ou la congeler en sucettes glacées, rend le goût supportable.")}
};
function monoFor(d){ return M[d.n.e.replace(' (high dose)','')] || null; }

/* ================= how to calculate ================= */
var HOWTO = [
{h:T('The one rule','La règle de base'),
 p:T('Every weight-based dose starts the same way: take the milligrams per kilogram from the order and multiply by the child\'s weight in kilograms. Everything else is bookkeeping on top of that.',
     'Toute dose selon le poids commence de la même façon : prenez les milligrammes par kilogramme inscrits dans l\'ordonnance et multipliez par le poids de l\'enfant en kilogrammes. Tout le reste n\'est que de la comptabilité par-dessus.'),
 f:T('dose = mg/kg × weight in kg','dose = mg/kg × poids en kg')},

{h:T('Per day, or per dose?','Par jour, ou par prise ?'),
 p:T('This is where most errors happen. An order written mg/kg/DAY gives the total for 24 hours — you still have to divide it by the number of doses to get what goes in the syringe. An order written mg/kg/DOSE is already the amount for one administration: do not divide it. Read which one you have before you touch a calculator.',
     'C\'est ici que se produisent la plupart des erreurs. Une ordonnance en mg/kg/JOUR donne le total pour 24 heures — il faut encore diviser par le nombre de prises pour obtenir ce qu\'on met dans la seringue. Une ordonnance en mg/kg/DOSE est déjà la quantité pour une seule administration : ne la divisez pas. Vérifiez laquelle vous avez avant de toucher à la calculatrice.'),
 f:T('per dose = total per day ÷ number of doses','dose par prise = total par jour ÷ nombre de prises')},

{h:T('From milligrams to millilitres','Des milligrammes aux millilitres'),
 p:T('A bottle labelled 250 mg / 5 mL does not contain 250 mg in a millilitre. Divide the label to find what one millilitre actually holds: 250 ÷ 5 = 50 mg in every mL. Then divide your dose by that number. Dividing by the 250 instead of the 50 is the single most common volume error.',
     'Une bouteille étiquetée 250 mg / 5 mL ne contient pas 250 mg dans un millilitre. Divisez l\'étiquette pour trouver ce que contient vraiment un millilitre : 250 ÷ 5 = 50 mg par mL. Ensuite, divisez votre dose par ce nombre. Diviser par 250 au lieu de 50 est de loin l\'erreur de volume la plus fréquente.'),
 f:T('mL = dose in mg ÷ mg per mL','mL = dose en mg ÷ mg par mL')},

{h:T('Pounds to kilograms','Des livres aux kilogrammes'),
 p:T('Parents give you pounds. Divide by 2.2 before anything else. A 33 lb child is 15 kg. Dosing on the pound number gives you roughly twice the dose, and it is the error most likely to actually hurt a child.',
     'Les parents vous donnent des livres. Divisez par 2,2 avant toute chose. Un enfant de 33 lb pèse 15 kg. Calculer sur le nombre de livres donne environ le double de la dose, et c\'est l\'erreur la plus susceptible de vraiment nuire à un enfant.'),
 f:T('kg = pounds ÷ 2.2','kg = livres ÷ 2,2')},

{h:T('The ceiling','Le plafond'),
 p:T('Every drug has an adult maximum, and a big teenager will calculate past it. When your number lands above the maximum, the maximum IS the dose — you do not give more just because the arithmetic says so. A 60 kg teenager on amoxicillin 50 mg/kg/day calculates to 3000 mg, but the maximum is 1000 mg/day, so the answer is 1000.',
     'Chaque médicament a un maximum adulte, et un grand adolescent va le dépasser au calcul. Quand votre nombre dépasse le maximum, le maximum EST la dose — on n\'en donne pas plus simplement parce que le calcul le dit. Un adolescent de 60 kg sous amoxicilline 50 mg/kg/jour arrive à 3000 mg, mais le maximum est de 1000 mg/jour : la réponse est donc 1000.'),
 f:T('if calculated > maximum, give the maximum','si calculé > maximum, donner le maximum')}
];

var HOWEX = {
 title:T('A worked example, all the way through','Un exemple complet, du début à la fin'),
 order:T('Amoxicillin 90 mg/kg/day, divided twice daily, for a child of 14 kg. On hand: a 250 mg / 5 mL suspension.',
         'Amoxicilline 90 mg/kg/jour, divisé en deux prises, pour un enfant de 14 kg. En main : une suspension de 250 mg / 5 mL.'),
 steps:[
  T('90 mg/kg × 14 kg = 1260 mg for the whole day','90 mg/kg × 14 kg = 1260 mg pour toute la journée'),
  T('The maximum is 4000 mg/day, so 1260 is fine — no capping needed','Le maximum est de 4000 mg/jour, donc 1260 passe — aucun plafonnement nécessaire'),
  T('1260 mg ÷ 2 doses = 630 mg per dose','1260 mg ÷ 2 prises = 630 mg par prise'),
  T('250 mg ÷ 5 mL = 50 mg in every millilitre','250 mg ÷ 5 mL = 50 mg dans chaque millilitre'),
  T('630 mg ÷ 50 mg/mL = 12.6 mL per dose','630 mg ÷ 50 mg/mL = 12,6 mL par prise')
 ],
 answer:T('Give 12.6 mL twice a day.','Donner 12,6 mL deux fois par jour.')
};

var HOWWRONG = {
 title:T('Where it goes wrong','Où ça dérape'),
 items:[
  T('Giving the whole day\'s total as a single dose. Always ask yourself: day, or dose?',
    'Donner le total de la journée en une seule prise. Demandez-vous toujours : jour, ou prise ?'),
  T('Dividing an order that was already written per dose, so the child gets half of what was prescribed.',
    'Diviser une ordonnance déjà écrite par prise, si bien que l\'enfant reçoit la moitié de ce qui était prescrit.'),
  T('Dividing by the milligrams printed on the label instead of the milligrams in one millilitre.',
    'Diviser par les milligrammes inscrits sur l\'étiquette au lieu des milligrammes contenus dans un millilitre.'),
  T('Calculating on pounds. Convert first, every single time.',
    'Calculer sur les livres. Convertissez d\'abord, chaque fois.'),
  T('Sailing past the adult maximum on a teenager.',
    'Dépasser le maximum adulte chez un adolescent.'),
  T('A decimal in the wrong place. Sanity-check the answer: a syringe holds 10 mL, so 45 mL for a toddler means you slipped a decimal somewhere.',
    'Une virgule au mauvais endroit. Vérifiez la vraisemblance : une seringue contient 10 mL, alors 45 mL pour un tout-petit veut dire qu\'une virgule a glissé.')
 ]
};
