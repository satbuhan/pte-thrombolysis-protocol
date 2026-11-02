/* Clinical Algorithm Atlas — Reperfusion therapy for acute pulmonary
   thromboembolism (PE).

   Source: Thrombolytic Therapy in Acute Pulmonary Thromboembolism: A
   Narrative Review of Systemic and Catheter-Directed Reperfusion
   (unpublished manuscript, Dr Özgür Karcıoğlu, 2026), and its Figure 1
   decision algorithm. All label/sub/dose text below is transcribed
   byte-for-byte from the author's corrected Figure 1; only meaning,
   rationale, cautions, references and glossary are added by this tool.

   Every reference was independently re-verified against its primary
   source rather than trusted from the manuscript's own citation. Two
   references could not be fully confirmed independently ([38] overstates
   a non-significant finding; [50] could not be located/accessed at all)
   and are flagged in their own kind field below rather than silently
   included. Reference [7] (HI-PEITHO), which is used directly in two
   flowchart nodes, carries two honest nuances in those nodes' own
   rationale text — see "severity" and "activate_pert" in NODES below.
*/

const REFERENCES = [
  {
    id: 1,
    kind:
      "General epidemiological review of venous thromboembolism's global disease burden — supports the framing of PE as a major, common cardiovascular disease, not a source of treatment-specific data.",
    text: "Wendelboe, A.M. and Raskob, G.E. (2016) 'Global burden of thrombosis: epidemiologic aspects', Circulation Research, 118(9), pp. 1340-1347.",
    url: "https://doi.org/10.1161/CIRCRESAHA.115.306841"
  },
  {
    id: 2,
    kind:
      "Population-level WHO mortality-database analysis of PE-related death trends across the European Region, 2000-15 — supports the declining-mortality framing in the introduction, not a treatment trial.",
    text: "Barco, S. et al. (2020) 'Trends in mortality related to pulmonary embolism in the European Region, 2000-15: analysis of vital registration data from the WHO Mortality Database', The Lancet Respiratory Medicine, 8(3), pp. 277-287.",
    url: "https://doi.org/10.1016/S2213-2600(19)30354-6"
  },
  {
    id: 3,
    kind:
      "Companion age-sex-specific mortality analysis for the USA and Canada, same data sources and period as ref 2 — background epidemiology, not treatment evidence.",
    text: "Barco, S. et al. (2021) 'Age-sex specific pulmonary embolism-related mortality in the USA and Canada, 2000-18: an analysis of the WHO Mortality Database and of the CDC Multiple Cause of Death database', The Lancet Respiratory Medicine, 9(1), pp. 33-42.",
    url: "https://doi.org/10.1016/S2213-2600(20)30417-3"
  },
  {
    id: 4,
    kind:
      "The 2019 ESC guideline — the central guideline reference for this whole tool: it defines the high-risk/intermediate-high-risk/intermediate-low-risk/low-risk taxonomy that the 'unstable', 'high-risk PE' and 'RV dysfunction' nodes are built on, recommends systemic fibrinolysis for high-risk PE, and restricts it to rescue therapy in intermediate-high-risk PE.",
    text: "Konstantinides, S.V. et al. (2020) '2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the European Respiratory Society (ERS)', European Heart Journal, 41(4), pp. 543-603.",
    url: "https://doi.org/10.1093/eurheartj/ehz405"
  },
  {
    id: 5,
    kind:
      "The first dedicated 2026 AHA/ACC multisociety PE guideline, with nine co-sponsoring societies — introduces the five-tier A-to-E clinical classification directly cited on the 'HIGH-RISK PE' node (category E) and elevates PERT activation to a Class 1 recommendation.",
    text: "Creager, M.A. et al. (2026) '2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN guideline for the evaluation and management of acute pulmonary embolism in adults: a report of the American College of Cardiology/American Heart Association Joint Committee on Clinical Practice Guidelines', Circulation, 153(12), pp. e977-e1051.",
    url: "https://doi.org/10.1161/CIR.0000000000001415"
  },
  {
    id: 6,
    kind:
      "A companion 'guideline-at-a-glance' summary of ref 5 from the same society — a condensed secondary restatement, not independent evidence.",
    text: "Dudzinski, D.M., Cibotti-Sun, M. and Moore, M.M. (2026) '2026 acute pulmonary embolism guideline-at-a-glance', Journal of the American College of Cardiology.",
    url: "https://doi.org/10.1016/j.jacc.2025.12.023"
  },
  {
    id: 7,
    kind:
      "HI-PEITHO, NEJM 2026 — the pivotal trial used directly on two flowchart nodes ('severity' and 'activate PERT'): 544 patients with RV dysfunction, troponin elevation and ≥2 additional severity criteria, randomised to ultrasound-facilitated catheter-directed thrombolysis plus anticoagulation versus anticoagulation alone, found a 4.0% vs 10.3% seven-day composite (RR 0.39, P=0.005, NNT≈16) driven by less decompensation, with no significant bleeding excess. Independent verification confirms the trial but surfaces two honest nuances the manuscript doesn't state and this tool's flowchart (following the source figure) does not fully capture: the trial's actual enrolment criterion combined respiratory rate and oxygen saturation into one item, so it required 2 of 3 independent severity criteria, not 2 of 4 as both the figure and this manuscript present it; and PE-related death and all-cause mortality were numerically, though not significantly, higher in the catheter-directed-thrombolysis arm (0.4% vs 1.1% PE-related death) — a detail the manuscript omits and this tool restores in the 'activate PERT' node's own rationale.",
    text: "Rosenfield, K. et al. (2026) 'Ultrasound-facilitated, catheter-directed fibrinolysis for acute pulmonary embolism', New England Journal of Medicine.",
    url: "https://doi.org/10.1056/NEJMoa2516567"
  },
  {
    id: 8,
    kind:
      "A general NEJM clinical-practice review of PE diagnosis and management — background context, not reperfusion-specific trial evidence.",
    text: "Kahn, S.R. and de Wit, K. (2022) 'Pulmonary embolism', New England Journal of Medicine, 387(1), pp. 45-57.",
    url: "https://doi.org/10.1056/NEJMcp2116489"
  },
  {
    id: 9,
    kind:
      "A critical-care-focused review of acute PE management — underlies the pathophysiology framing of RV failure and the self-reinforcing ischaemic spiral referenced in this tool's background reasoning.",
    text: "Yuriditsky, E. et al. (2026) 'Critical care management of acute pulmonary embolism', Journal of Intensive Care Medicine.",
    url: "https://doi.org/10.1177/08850666241311512"
  },
  {
    id: 10,
    kind:
      "A JAMA general review of acute PE — background context.",
    text: "Freund, Y., Cohen-Aubart, F. and Bloom, B. (2022) 'Acute pulmonary embolism: a review', JAMA, 328(13), pp. 1336-1345.",
    url: "https://doi.org/10.1001/jama.2022.16815"
  },
  {
    id: 11,
    kind:
      "An AHA scientific statement on interventional therapies for acute PE — guideline-level context for the catheter-based and mechanical reperfusion options, not a single trial.",
    text: "Giri, J. et al. (2019) 'Interventional therapies for acute pulmonary embolism: current status and principles for the development of novel evidence. A scientific statement from the American Heart Association', Circulation, 140(20), pp. e774-e801.",
    url: "https://doi.org/10.1161/CIR.0000000000000707"
  },
  {
    id: 12,
    kind:
      "A systematic literature synthesis estimating chronic thromboembolic pulmonary hypertension (CTEPH) incidence after acute PE at roughly 3% of survivors — supports the long-term-sequelae rationale for reperfusion generally, not a specific box on this flowchart.",
    text: "Ende-Verhaar, Y.M. et al. (2017) 'Incidence of chronic thromboembolic pulmonary hypertension after acute pulmonary embolism: a contemporary view of the published literature', European Respiratory Journal, 49(2), 1601792.",
    url: "https://doi.org/10.1183/13993003.01792-2016"
  },
  {
    id: 13,
    kind:
      "Post hoc analysis of the PEITHO trial population showing that adding simple bedside physiological-stress markers to RV dysfunction and troponin elevation identifies a higher-short-term-risk subgroup — the enrichment strategy HI-PEITHO (ref 7) later adopted, and the direct evidentiary basis for the 'two or more severity criteria?' node alongside ref 7.",
    text: "Barco, S. et al. (2018) 'Improved identification of thrombolysis candidates amongst intermediate-risk pulmonary embolism patients: implications for future trials', European Respiratory Journal, 51(1), 1701775.",
    url: "https://doi.org/10.1183/13993003.01775-2017"
  },
  {
    id: 14,
    kind:
      "A narrative review of high-risk PE management in the emergency department — underlies the fourth of this review's 'four sequential questions' framework (bleeding-risk assessment), used in this tool's 'contraindication?' node reasoning.",
    text: "Rouleau, S.G. et al. (2024) 'Management of high-risk pulmonary embolism in the emergency department: a narrative review', American Journal of Emergency Medicine, 79, pp. 1-11.",
    url: "https://doi.org/10.1016/j.ajem.2024.01.039"
  },
  {
    id: 15,
    kind:
      "A focused pharmacology review of thrombolysis in PE — the direct source for the full-dose alteplase regimen (100 mg over 2 h, or 0.6 mg/kg over 15 min) shown on the 'full-dose systemic fibrinolysis' node, cited alongside ref 4 exactly as the source figure shows.",
    text: "Kaplovitch, E., Shaw, J.R. and Douketis, J. (2020) 'Thrombolysis in pulmonary embolism', Critical Care Clinics, 36(3), pp. 465-480.",
    url: "https://doi.org/10.1016/j.ccc.2020.02.004"
  },
  {
    id: 16,
    kind:
      "PEITHO, NEJM 2014 — the defining intermediate-risk systemic-thrombolysis trial: 1006 patients with RV dysfunction and elevated troponin randomised to tenecteplase or placebo (both plus heparin); seven-day death-or-decompensation 2.6% vs 5.6% (driven entirely by decompensation, no mortality difference), with extracranial major bleeding 6.3% vs 1.2% and haemorrhagic stroke 2.0% vs 0.2%. Confirmed as described; the trade-off was explicitly age-dependent, unfavourable above 75 years.",
    text: "Meyer, G. et al. (2014) 'Fibrinolysis for patients with intermediate-risk pulmonary embolism', New England Journal of Medicine, 370(15), pp. 1402-1411.",
    url: "https://doi.org/10.1056/NEJMoa1302097"
  },
  {
    id: 17,
    kind:
      "A Chinese randomised multicentre trial (n=118) comparing 50 mg vs 100 mg alteplase — found comparable efficacy with numerically fewer bleeding events at the lower dose, concentrated in lower-body-weight patients. One of three small studies underlying reduced-dose systemic thrombolysis; no trial has compared this dose against catheter-directed therapy.",
    text: "Wang, C. et al. (2010) 'Efficacy and safety of low dose recombinant tissue-type plasminogen activator for the treatment of acute pulmonary thromboembolism: a randomized, multicenter, controlled trial', Chest, 137(2), pp. 254-262.",
    url: "https://doi.org/10.1378/chest.09-0765"
  },
  {
    id: 18,
    kind:
      "MOPETT, Am J Cardiol 2013 — weight-adjusted half-dose alteplase (max 50 mg) in 121 patients with moderate PE, showing a sustained reduction in pulmonary artery systolic pressure at 28 months with no bleeding in either arm. Single-centre, open-label, and a physiological rather than clinical-outcome endpoint — appropriately described as hypothesis-generating rather than definitive.",
    text: "Sharifi, M. et al. (2013) 'Moderate pulmonary embolism treated with thrombolysis (from the MOPETT trial)', American Journal of Cardiology, 111(2), pp. 273-277.",
    url: "https://doi.org/10.1016/j.amjcard.2012.09.027"
  },
  {
    id: 19,
    kind:
      "A systematic review and meta-analysis of reduced-dose rt-PA regimens — found efficacy apparently preserved with a signal towards improved safety, but pooling small, heterogeneous studies; supportive rather than definitive, consistent with how the manuscript frames it.",
    text: "Zhang, Z. et al. (2014) 'Lower dosage of recombinant tissue-type plasminogen activator (rt-PA) in the treatment of acute pulmonary embolism: a systematic review and meta-analysis', Thrombosis Research, 133(3), pp. 357-363.",
    url: "https://doi.org/10.1016/j.thromres.2013.12.026"
  },
  {
    id: 20,
    kind:
      "ULTIMA, Circulation 2014 — the first randomised trial of catheter-based reperfusion in PE (n=59, RV/LV ratio ≥1.0); ultrasound-assisted CDT with 10-20 mg alteplase over 15 h reversed RV dilatation significantly more than heparin alone, no major bleeding in either group. A surrogate-imaging endpoint, like every other first-generation catheter trial — not a clinical-outcome result.",
    text: "Kucher, N. et al. (2014) 'Randomized, controlled trial of ultrasound-assisted catheter-directed thrombolysis for acute intermediate-risk pulmonary embolism', Circulation, 129(4), pp. 479-486.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.113.005544"
  },
  {
    id: 21,
    kind:
      "Registry-based report that 90-day mortality exceeds 50% in patients presenting with massive PE — the absolute-risk evidence underlying the 'reperfusion is indicated unless futile' framing on the 'HIGH-RISK PE' node, not a treatment trial itself.",
    text: "Kucher, N. et al. (2006) 'Massive pulmonary embolism', Circulation, 113(4), pp. 577-582.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.105.592592"
  },
  {
    id: 22,
    kind:
      "The current (2021) Cochrane review of thrombolysis for PE — 21 trials, 2401 participants: thrombolytics plus heparin probably reduce death (OR 0.58, 95% CI 0.38-0.88) and recurrent PE (OR 0.54, 95% CI 0.32-0.91), with more major and minor bleeding including haemorrhagic stroke, certainty rated low; the mortality effect was driven substantially by the single trial enrolling massive PE. Confirmed as described.",
    text: "Zuo, Z. et al. (2021) 'Thrombolytic therapy for pulmonary embolism', Cochrane Database of Systematic Reviews, 4(4), CD004437.",
    url: "https://doi.org/10.1002/14651858.CD004437.pub6"
  },
  {
    id: 23,
    kind:
      "The preceding (2018) version of the same Cochrane review — pooling 12 trials reporting major haemorrhage, OR for major bleeding with thrombolysis 2.90 (95% CI 1.95-4.31). Cited as the bleeding-risk figure superseded in detail, but not contradicted, by the 2021 update (ref 22).",
    text: "Hao, Q. et al. (2018) 'Thrombolytic therapy for pulmonary embolism', Cochrane Database of Systematic Reviews, 12(12), CD004437.",
    url: "https://doi.org/10.1002/14651858.CD004437.pub5"
  },
  {
    id: 24,
    kind:
      "A 2024 review of percutaneous interventions for PE — one of the two references on the 'catheter-based or surgical reperfusion' node and the 'if lysis fails or arrest occurs' node, supporting CDT, mechanical thrombectomy, embolectomy and VA-ECMO as the alternatives when systemic lysis is contraindicated, failed, or in cardiac arrest.",
    text: "Finocchiaro, S. et al. (2024) 'Percutaneous interventions for pulmonary embolism', EuroIntervention, 20(7), pp. e408-e424.",
    url: "https://doi.org/10.4244/EIJ-D-23-00895"
  },
  {
    id: 25,
    kind:
      "Long-term (≈3-year median) PEITHO follow-up — found no between-arm difference in mortality, persistent dyspnoea, functional limitation, echocardiographic pulmonary hypertension or CTEPH. An important negative result: full-dose systemic lysis averts a short-term event without demonstrable durable gain.",
    text: "Konstantinides, S.V. et al. (2017) 'Impact of thrombolytic therapy on the long-term outcome of intermediate-risk pulmonary embolism', Journal of the American College of Cardiology, 69(12), pp. 1536-1544.",
    url: "https://doi.org/10.1016/j.jacc.2016.12.039"
  },
  {
    id: 26,
    kind:
      "TOPCOAT, J Thromb Haemost 2014 — 83 patients with submassive PE randomised to tenecteplase or placebo; favoured tenecteplase on a 3-month composite clinical outcome but terminated early, underpowered, and with one fatal intracranial haemorrhage in the active arm. Appropriately described as hypothesis-generating rather than practice-defining.",
    text: "Kline, J.A. et al. (2014) 'Treatment of submassive pulmonary embolism with tenecteplase or placebo: cardiopulmonary outcomes at 3 months. Multicenter double-blind, placebo-controlled randomized trial', Journal of Thrombosis and Haemostasis, 12(4), pp. 459-468.",
    url: "https://doi.org/10.1111/jth.12521"
  },
  {
    id: 27,
    kind:
      "A JAMA meta-analysis of 16 randomised trials (2115 patients) — thrombolysis associated with lower all-cause mortality (2.17% vs 3.89%), more major bleeding and intracranial haemorrhage; critically, major bleeding was NOT significantly increased at age ≤65 (OR 1.25, 95% CI 0.50-3.14) while the excess was substantial above that age — the direct primary-source basis for Table 2's age-65 bleeding-risk modifier referenced in this tool's contraindication reasoning.",
    text: "Chatterjee, S. et al. (2014) 'Thrombolysis for pulmonary embolism and risk of all-cause mortality, major bleeding, and intracranial hemorrhage: a meta-analysis', JAMA, 311(23), pp. 2414-2421.",
    url: "https://doi.org/10.1001/jama.2014.5990"
  },
  {
    id: 28,
    kind:
      "A systematic review/meta-analysis of 15 trials (2057 patients) in the European Heart Journal — overall mortality reduction with thrombolysis (OR 0.59, 95% CI 0.36-0.96) that lost significance once high-risk-PE trials were excluded (OR 0.64, 95% CI 0.35-1.17), alongside a reduction in death-or-escalation and an increase in major/fatal/intracranial haemorrhage. Broadly concordant with the Cochrane reviews (refs 22-23).",
    text: "Marti, C. et al. (2015) 'Systemic thrombolytic therapy for acute pulmonary embolism: a systematic review and meta-analysis', European Heart Journal, 36(10), pp. 605-614.",
    url: "https://doi.org/10.1093/eurheartj/ehu218"
  },
  {
    id: 29,
    kind:
      "A network meta-analysis comparing CDT, systemic thrombolysis and anticoagulation — found CDT associated with lower mortality than anticoagulation alone, but the authors themselves caution this rests heavily on non-randomised evidence with substantial confounding by indication; presented here with that same caution, not as confirmatory RCT evidence.",
    text: "Planer, D. et al. (2023) 'Catheter-directed thrombolysis compared with systemic thrombolysis and anticoagulation in patients with intermediate- or high-risk pulmonary embolism: systematic review and network meta-analysis', CMAJ, 195(24), pp. E833-E843.",
    url: "https://doi.org/10.1503/cmaj.220960"
  },
  {
    id: 30,
    kind:
      "PEITHO-3 trial design/rationale paper — an ongoing, not-yet-reported randomised placebo-controlled trial of reduced-dose alteplase vs anticoagulation alone in intermediate-high-risk PE. Cited correctly as a design paper describing a trial still in progress, not as reported results.",
    text: "Sanchez, O. et al. (2022) 'Reduced-dose intravenous thrombolysis for acute intermediate-high-risk pulmonary embolism: rationale and design of the Pulmonary Embolism International THrOmbolysis (PEITHO)-3 trial', Thrombosis and Haemostasis, 122(5), pp. 857-866.",
    url: "https://doi.org/10.1055/a-1653-4699"
  },
  {
    id: 31,
    kind:
      "A German nationwide administrative-data analysis of thrombolytic treatment trends — found fibrinolysis used in only a small proportion of hospitalised PE patients, with high in-hospital mortality persisting in those with instability, and identified both underuse in shock and inappropriate use in unlikely-to-benefit patients.",
    text: "Keller, K. et al. (2020) 'Trends in thrombolytic treatment and outcomes of acute pulmonary embolism in Germany', European Heart Journal, 41(4), pp. 522-529.",
    url: "https://doi.org/10.1093/eurheartj/ehz236"
  },
  {
    id: 32,
    kind:
      "US national administrative-data trends in thrombolysis use for PE (2006-2011) — low and variable uptake, consistent with the German data in ref 31.",
    text: "Rush, B. et al. (2017) 'The use of thrombolysis for acute pulmonary embolism in the United States: national trends and patient characteristics from 2006 to 2011', Journal of Emergency Medicine, 52(5), pp. 615-621.",
    url: "https://doi.org/10.1016/j.jemermed.2016.10.044"
  },
  {
    id: 33,
    kind:
      "A contemporary cohort study of massive and submassive PE management and outcomes — documents wide inter-hospital variation in advanced-therapy use, supporting the manuscript's call for structured, team-based decision-making.",
    text: "Secemsky, E. et al. (2018) 'Contemporary management and outcomes of patients with massive and submassive pulmonary embolism', American Journal of Medicine, 131(12), pp. 1506-1514.e0.",
    url: "https://doi.org/10.1016/j.amjmed.2018.07.035"
  },
  {
    id: 34,
    kind:
      "A further contemporary US national-trends analysis of PE outcomes — corroborates the variation described in refs 31-33.",
    text: "Sedhom, R. et al. (2022) 'Contemporary national trends and outcomes of pulmonary embolism in the United States', American Journal of Cardiology, 176, pp. 132-138.",
    url: "https://doi.org/10.1016/j.amjcard.2022.03.060"
  },
  {
    id: 35,
    kind:
      "A 2022 ESC Working Group/EAPCI clinical consensus statement on percutaneous treatment options — the second reference on the 'catheter-based or surgical reperfusion' node and on the free-floating 'rescue reperfusion' caveat: recommends CDT be considered for high-risk PE with a contraindication to systemic lysis or for deterioration despite anticoagulation, while explicitly noting no technique has been shown superior to another.",
    text: "Pruszczyk, P. et al. (2022) 'Percutaneous treatment options for acute pulmonary embolism: a clinical consensus statement by the ESC Working Group on Pulmonary Circulation and Right Ventricular Function and the European Association of Percutaneous Cardiovascular Interventions', EuroIntervention, 18(8), pp. e623-e638.",
    url: "https://doi.org/10.4244/EIJ-D-22-00246"
  },
  {
    id: 36,
    kind:
      "A multidisciplinary research consensus panel's 8-year update on submassive PE — sets priorities for evidence generation rather than reporting new trial data; background context for the research-agenda framing, not a node-level citation.",
    text: "Sista, A.K. et al. (2023) 'Research consensus panel follow-up: 8-year update on submassive pulmonary embolism', Journal of Vascular and Interventional Radiology, 34(10), pp. 1658-1663.",
    url: "https://doi.org/10.1016/j.jvir.2023.06.032"
  },
  {
    id: 37,
    kind:
      "SEATTLE II, JACC: Cardiovasc Interv 2015 — single-arm study of 150 patients treated with 24 mg alteplase by ultrasound-facilitated CDT; reduced RV/LV ratio and pulmonary artery systolic pressure, major bleeding ≈10%, no intracranial haemorrhage. Single-arm (no control group) and a surrogate-imaging primary endpoint, as the manuscript itself notes.",
    text: "Piazza, G. et al. (2015) 'A prospective, single-arm, multicenter trial of ultrasound-facilitated, catheter-directed, low-dose fibrinolysis for acute massive and submassive pulmonary embolism: the SEATTLE II study', JACC: Cardiovascular Interventions, 8(10), pp. 1382-1392.",
    url: "https://doi.org/10.1016/j.jcin.2015.04.020"
  },
  {
    id: 38,
    kind:
      "A secondary analysis of SEATTLE II bleeding risk factors. Independent verification found this source's own reported statistics do not support treating age or comorbidity as significant bleeding predictors in that cohort — age (p=.16) and comorbidity burden (p=.095) were both non-significant in the paper's own analysis. This source is not used to support any node in this flowchart (it does not appear on Figure 1 itself); it is retained in the bibliography because the manuscript cites it as general supporting context for age/comorbidity being associated with higher catheter-based-therapy bleeding risk, a framing this tool flags as an overstatement of what the cited paper itself actually found.",
    text: "Sadiq, I. et al. (2017) 'Risk factors for major bleeding in the SEATTLE II trial', Vascular Medicine, 22(1), pp. 44-50.",
    url: "https://doi.org/10.1177/1358863X16676355"
  },
  {
    id: 39,
    kind:
      "OPTALYSE PE, JACC: Cardiovasc Interv 2018 — 101 patients across four dose/duration CDT arms; total doses as low as 8 mg over 2 h produced RV/LV reductions comparable with longer, higher-dose regimens. A procedural-efficiency and plausible-safety finding on a surrogate endpoint, not a clinical-outcome trial.",
    text: "Tapson, V.F. et al. (2018) 'A randomized trial of the optimum duration of acoustic pulse thrombolysis procedure in acute intermediate-risk pulmonary embolism: the OPTALYSE PE trial', JACC: Cardiovascular Interventions, 11(14), pp. 1401-1410.",
    url: "https://doi.org/10.1016/j.jcin.2018.04.008"
  },
  {
    id: 40,
    kind:
      "One-year echocardiographic, functional and quality-of-life follow-up after the accelerated OPTALYSE-type regimens — broadly favourable but uncontrolled (no comparator arm), as the manuscript itself notes.",
    text: "Piazza, G. et al. (2020) 'One-year echocardiographic, functional, and quality of life outcomes after ultrasound-facilitated catheter-based fibrinolysis for pulmonary embolism', Circulation: Cardiovascular Interventions, 13(8), e009012.",
    url: "https://doi.org/10.1161/CIRCINTERVENTIONS.120.009012"
  },
  {
    id: 41,
    kind:
      "CANARY, JAMA Cardiology 2022 — 94 patients randomised to conventional (non-ultrasound) CDT plus anticoagulation vs anticoagulation alone; terminated prematurely for the COVID-19 pandemic, did not meet its primary RV/LV-ratio endpoint, though several secondary imaging endpoints favoured CDT with no excess major bleeding. An underpowered, early-terminated trial — appropriately described as such.",
    text: "Sadeghipour, P. et al. (2022) 'Catheter-directed thrombolysis vs anticoagulation in patients with acute intermediate-high-risk pulmonary embolism: the CANARY randomized clinical trial', JAMA Cardiology, 7(12), pp. 1189-1197.",
    url: "https://doi.org/10.1001/jamacardio.2022.3591"
  },
  {
    id: 42,
    kind:
      "The PERFECT registry — multicentre prospective observational data across a range of catheter-based techniques; registry-level (non-randomised) supportive data, not a controlled trial.",
    text: "Kuo, W.T. et al. (2015) 'Pulmonary embolism response to fragmentation, embolectomy, and catheter thrombolysis (PERFECT): initial results from a prospective multicenter registry', Chest, 148(3), pp. 667-673.",
    url: "https://doi.org/10.1378/chest.15-0119"
  },
  {
    id: 43,
    kind:
      "A meta-analysis of ultrasound-assisted CDT studies — reports consistent RV/LV improvement with pooled major bleeding on the order of 4-10%, synthesising mostly single-arm or small-comparator studies rather than large RCTs.",
    text: "Pei, D.T. et al. (2019) 'Meta-analysis of catheter directed ultrasound-assisted thrombolysis in pulmonary embolism', American Journal of Cardiology, 124(9), pp. 1470-1477.",
    url: "https://doi.org/10.1016/j.amjcard.2019.07.040"
  },
  {
    id: 44,
    kind:
      "The HI-PEITHO trial design/rationale paper, published ahead of the primary results in ref 7 — describes the trial's methodology; the results themselves are in ref 7, which is what this tool's nodes actually cite for outcomes.",
    text: "Klok, F.A. et al. (2022) 'Ultrasound-facilitated, catheter-directed thrombolysis vs anticoagulation alone for acute intermediate-high-risk pulmonary embolism: rationale and design of the HI-PEITHO study', American Heart Journal, 251, pp. 43-53.",
    url: "https://doi.org/10.1016/j.ahj.2022.05.011"
  },
  {
    id: 45,
    kind:
      "PEERLESS, Circulation 2025 — primary results: 550 patients with intermediate-risk PE randomised to large-bore mechanical thrombectomy (FlowTriever) vs CDT at operator discretion; thrombectomy won a hierarchical win-ratio composite (5.01, 95% CI 3.68-6.97), driven by less deterioration/bailout and less ICU use, with no difference in mortality, intracranial haemorrhage or major bleeding. An important limitation the manuscript itself states clearly: no anticoagulation-alone control arm, open-label, non-standardised CDT protocol in the comparator arm, and only 30-day follow-up.",
    text: "Jaber, W.A. et al. (2025) 'Large-bore mechanical thrombectomy versus catheter-directed thrombolysis in the management of intermediate-risk pulmonary embolism: primary results of the PEERLESS randomized controlled trial', Circulation, 151(5), pp. 260-273.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.124.072364"
  },
  {
    id: 46,
    kind:
      "The PEERLESS trial design/rationale paper, published ahead of the primary results in ref 45.",
    text: "Gonsalves, C.F. et al. (2023) 'Randomized controlled trial of mechanical thrombectomy vs catheter-directed thrombolysis for acute hemodynamically stable pulmonary embolism: rationale and design of the PEERLESS study', American Heart Journal, 266, pp. 128-137.",
    url: "https://doi.org/10.1016/j.ahj.2023.09.002"
  },
  {
    id: 47,
    kind:
      "STORM-PE, Circulation 2025 — 100 patients with intermediate-high-risk PE randomised to computer-assisted vacuum thrombectomy plus anticoagulation vs anticoagulation alone; thrombectomy produced an ≈2.3-fold greater RV/LV reduction at 48 h and fewer major adverse events at 7 days (4.3% vs 7.5%). Small trial with a surrogate primary endpoint, but the first randomised evidence that mechanical thrombectomy outperforms anticoagulation alone physiologically — described accurately as such.",
    text: "Lookstein, R.A. et al. (2025) 'Randomized controlled trial of mechanical thrombectomy with anticoagulation versus anticoagulation alone for acute intermediate-high risk pulmonary embolism: primary outcomes from the STORM-PE trial', Circulation.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.125.077232"
  },
  {
    id: 48,
    kind:
      "The FLASH mechanical-thrombectomy registry (full US cohort) — large single-arm registry reporting consistent RV/LV improvement with low periprocedural major-adverse-event rates; non-randomised supportive data, not a controlled comparison.",
    text: "Toma, C. et al. (2023) 'Acute outcomes for the full US cohort of the FLASH mechanical thrombectomy registry in pulmonary embolism', EuroIntervention, 18(14), pp. 1201-1212.",
    url: "https://doi.org/10.4244/EIJ-D-22-00732"
  },
  {
    id: 49,
    kind:
      "The APEX-AV trial of a newer mechanical aspiration thrombectomy system — another single-arm/registry-style report corroborating the thrombectomy-device evidence base described in refs 42, 43 and 48.",
    text: "Ranade, M. et al. (2025) 'Novel mechanical aspiration thrombectomy in patients with acute pulmonary embolism: results from the prospective APEX-AV trial', Journal of the Society for Cardiovascular Angiography and Interventions, 4, 103661.",
    url: "https://doi.org/10.1016/j.jscai.2025.103661"
  },
  {
    id: 50,
    kind:
      "A cited network meta-analysis of thrombolysis for PE. Independent verification could not locate or access this source through its stated DOI or by title/author search elsewhere — it could not be confirmed as a real, retrievable publication. It is not used to support any node on this flowchart (the manuscript cites it only in passing, to note how sparse direct comparisons between catheter-based and systemic reduced-dose therapy remain), and is flagged here rather than silently presented as verified.",
    text: "Ross, A. et al. (2026) 'Thrombolysis for pulmonary embolism: a network meta-analysis', Journal of the Intensive Care Society.",
    url: "https://doi.org/10.1177/17511437261450011"
  },
  {
    id: 51,
    kind:
      "The Bleeding Academic Research Consortium (BARC) standardised bleeding-definitions consensus — methodological background explaining why bleeding rates vary across trials using different definitions, not PE-specific treatment evidence.",
    text: "Mehran, R. et al. (2011) 'Standardized bleeding definitions for cardiovascular clinical trials: a consensus report from the Bleeding Academic Research Consortium', Circulation, 123(23), pp. 2736-2747.",
    url: "https://doi.org/10.1161/CIRCULATIONAHA.110.009449"
  },
  {
    id: 52,
    kind:
      "The CHEST antithrombotic-therapy-for-VTE guideline (2021 update) — one of three guideline sources (with refs 4-5) underlying the contraindication checklist referenced on the 'absolute contraindication?' node.",
    text: "Stevens, S.M. et al. (2021) 'Antithrombotic therapy for VTE disease: second update of the CHEST guideline and expert panel report', Chest, 160(6), pp. e545-e608.",
    url: "https://doi.org/10.1016/j.chest.2021.07.055"
  },
  {
    id: 53,
    kind:
      "The American Society of Hematology 2020 VTE treatment guideline — recommends against routine thrombolysis in haemodynamically stable PE with RV dysfunction, and is the source for cancer/thrombocytopenia/renal-impairment bleeding-risk modifiers referenced in Table 2's risk-balance factors.",
    text: "Ortel, T.L. et al. (2020) 'American Society of Hematology 2020 guidelines for management of venous thromboembolism: treatment of deep vein thrombosis and pulmonary embolism', Blood Advances, 4(19), pp. 4693-4738.",
    url: "https://doi.org/10.1182/bloodadvances.2020001830"
  },
  {
    id: 54,
    kind:
      "TROICA, NEJM 2008 — 1050 patients with out-of-hospital cardiac arrest of presumed cardiac origin randomised to tenecteplase or placebo during resuscitation; no 30-day survival improvement, more intracranial haemorrhage. The manuscript correctly cautions this trial enrolled predominantly coronary-aetiology arrests and its findings do not extrapolate to confirmed or strongly suspected PE-related arrest.",
    text: "Bottiger, B.W. et al. (2008) 'Thrombolysis during resuscitation for out-of-hospital cardiac arrest', New England Journal of Medicine, 359(25), pp. 2651-2662.",
    url: "https://doi.org/10.1056/NEJMoa070570"
  },
  {
    id: 55,
    kind:
      "The TROICA trial protocol/design paper, published ahead of the results reported in ref 54.",
    text: "Spohr, F. et al. (2005) 'International multicentre trial protocol to assess the efficacy and safety of tenecteplase during cardiopulmonary resuscitation in patients with out-of-hospital cardiac arrest: the Thrombolysis in Cardiac Arrest (TROICA) study', European Journal of Clinical Investigation, 35(5), pp. 315-323.",
    url: "https://doi.org/10.1111/j.1365-2362.2005.01491.x"
  },
  {
    id: 56,
    kind:
      "French national out-of-hospital cardiac arrest registry data — thrombolysis during resuscitation for arrest attributed to PE was associated with improved 30-day survival. Observational (registry) rather than randomised evidence, as the manuscript itself frames it, but the strongest PE-specific signal available.",
    text: "Javaudin, F. et al. (2019) 'Thrombolysis during resuscitation for out-of-hospital cardiac arrest caused by pulmonary embolism increases 30-day survival: findings from the French national cardiac arrest registry', Chest, 156(6), pp. 1167-1175.",
    url: "https://doi.org/10.1016/j.chest.2019.07.015"
  },
  {
    id: 57,
    kind:
      "A companion analysis from the same French registry group, emphasising that under-recognition of PE as the arrest aetiology — not reluctance to treat — is the principal obstacle to appropriate thrombolysis use in this setting.",
    text: "Javaudin, F. et al. (2019) 'Improving identification of pulmonary embolism-related out-of-hospital cardiac arrest to optimize thrombolytic therapy during resuscitation', Critical Care, 23(1), 409.",
    url: "https://doi.org/10.1186/s13054-019-2672-6"
  },
  {
    id: 58,
    kind:
      "A systematic review/meta-analysis restricted to cardiac arrest from confirmed or presumed PE (13 studies, 803 patients) — higher return of spontaneous circulation with thrombolysis (OR 2.55, 95% CI 1.50-4.34) but no significant difference in survival to discharge or bleeding. The direct source, alongside ref 24, for the 'if lysis fails or arrest occurs' node's 60-90 minute extended-resuscitation guidance, since delayed thrombolytic response during arrest is well described.",
    text: "Feltes, J. et al. (2024) 'Thrombolytics in cardiac arrest from pulmonary embolism: a systematic review and meta-analysis', Journal of Intensive Care Medicine.",
    url: "https://doi.org/10.1177/08850666231214754"
  },
  {
    id: 59,
    kind:
      "A broader meta-analysis including both cardiac- and presumed-PE-aetiology arrests — increased ROSC and hospital admission, no significant survival benefit, and a 65% relative increase in bleeding. A wider, less PE-specific signal than ref 58, appropriately distinguished from it.",
    text: "Alshaya, O.A. et al. (2022) 'Thrombolytic therapy in cardiac arrest caused by cardiac etiologies or presumed pulmonary embolism: an updated systematic review and meta-analysis', Research and Practice in Thrombosis and Haemostasis, 6(4), e12745.",
    url: "https://doi.org/10.1002/rth2.12745"
  },
  {
    id: 60,
    kind:
      "A systematic review of 83 published cases of severe PE treated with thrombolysis, thrombectomy or ECMO during pregnancy or within 6 weeks of delivery — 94% maternal survival after thrombolysis, with major bleeding in 18% of antepartum but 58% of postpartum cases, a clinically decisive asymmetry favouring mechanical approaches in the immediate postpartum period. Pregnancy-specific context, not used on any flowchart node directly (this algorithm does not branch on pregnancy status).",
    text: "Martillotti, G. et al. (2017) 'Treatment options for severe pulmonary embolism during pregnancy and the postpartum period: a systematic review', Journal of Thrombosis and Haemostasis, 15(10), pp. 1942-1950.",
    url: "https://doi.org/10.1111/jth.13802"
  },
  {
    id: 61,
    kind:
      "A pharmacotherapy-focused review of thrombolysis for massive PE in pregnancy — reaches conclusions concordant with ref 60; background special-population context.",
    text: "Heavner, M.S. et al. (2017) 'Thrombolysis for massive pulmonary embolism in pregnancy', Pharmacotherapy, 37(11), pp. 1449-1457.",
    url: "https://doi.org/10.1002/phar.2025"
  },
  {
    id: 62,
    kind:
      "A review of diagnostic and therapeutic decision-making for PE in pregnancy — background special-population context, not used on any flowchart node.",
    text: "Hobohm, L. et al. (2022) 'Pulmonary embolism and pregnancy: challenges in diagnostic and therapeutic decisions in high-risk patients', Frontiers in Cardiovascular Medicine, 9, 856594.",
    url: "https://doi.org/10.3389/fcvm.2022.856594"
  },
  {
    id: 63,
    kind:
      "A comparison of international societal guidelines for suspected-PE diagnosis in pregnancy — diagnostic rather than reperfusion-decision context.",
    text: "Cohen, S.L. et al. (2020) 'Comparison of international societal guidelines for the diagnosis of suspected pulmonary embolism during pregnancy', The Lancet Haematology, 7(3), pp. e247-e258.",
    url: "https://doi.org/10.1016/S2352-3026(19)30250-9"
  },
  {
    id: 64,
    kind:
      "An ERS statement on CTEPH — guideline-level background on the long-term sequelae referenced in the manuscript's closing discussion, not a reperfusion-decision citation.",
    text: "Delcroix, M. et al. (2021) 'ERS statement on chronic thromboembolic pulmonary hypertension', European Respiratory Journal, 57(6), 2002828.",
    url: "https://doi.org/10.1183/13993003.02828-2020"
  },
  {
    id: 65,
    kind:
      "The FOCUS prospective cohort study — quantifies the burden of persistent functional and haemodynamic impairment after PE, providing a benchmark for outcome-oriented trials; long-term-outcomes background, not reperfusion-decision evidence.",
    text: "Valerio, L. et al. (2022) 'Chronic thromboembolic pulmonary hypertension and impairment after pulmonary embolism: the FOCUS study', European Heart Journal, 43(36), pp. 3387-3398.",
    url: "https://doi.org/10.1093/eurheartj/ehac206"
  },
  {
    id: 66,
    kind:
      "The FOCUS study design/rationale paper, published ahead of the results in ref 65.",
    text: "Konstantinides, S.V. et al. (2016) 'Late outcomes after acute pulmonary embolism: rationale and design of FOCUS, a prospective observational multicenter cohort study', Journal of Thrombosis and Thrombolysis, 42(4), pp. 600-609.",
    url: "https://doi.org/10.1007/s11239-016-1415-7"
  },
  {
    id: 67,
    kind:
      "The worldwide CTEPH Registry — reports that diagnostic delay for CTEPH remains common; long-term-outcomes background.",
    text: "Guth, S. et al. (2021) 'Current strategies for managing chronic thromboembolic pulmonary hypertension: results of the worldwide prospective CTEPH Registry', ERJ Open Research, 7(3), 00850-2020.",
    url: "https://doi.org/10.1183/23120541.00850-2020"
  },
  {
    id: 68,
    kind:
      "The 2022 ESC/ERS pulmonary hypertension guidelines — sets out the contemporary CTEPH diagnostic/management pathway; background, not reperfusion-decision evidence for acute PE.",
    text: "Humbert, M. et al. (2022) '2022 ESC/ERS guidelines for the diagnosis and treatment of pulmonary hypertension', European Heart Journal, 43(38), pp. 3618-3731.",
    url: "https://doi.org/10.1093/eurheartj/ehac237"
  },
  {
    id: 69,
    kind:
      "The InShape II study — a non-invasive algorithm for early CTEPH exclusion during PE follow-up; long-term-follow-up background, not acute-phase reperfusion evidence.",
    text: "Boon, G. et al. (2021) 'Non-invasive early exclusion of chronic thromboembolic pulmonary hypertension after acute pulmonary embolism: the InShape II study', Thorax, 76(10), pp. 1002-1009.",
    url: "https://doi.org/10.1136/thoraxjnl-2020-216324"
  },
  {
    id: 70,
    kind:
      "The PERT Consortium's consensus practice document on diagnosis, treatment and follow-up of acute PE — the primary source describing what a PERT is and does, underlying the 'activate PERT' node's framing.",
    text: "Rivera-Lebron, B. et al. (2019) 'Diagnosis, treatment and follow up of acute pulmonary embolism: consensus practice from the PERT Consortium', Clinical and Applied Thrombosis/Hemostasis, 25, 1076029619853037.",
    url: "https://doi.org/10.1177/1076029619853037"
  },
  {
    id: 71,
    kind:
      "An earlier (2016) CHEST antithrombotic-therapy-for-VTE guideline, superseded in detail by the 2021 update (ref 52) but cited for its specific guidance restricting catheter approaches to high bleeding risk, failed systemic lysis, or imminently fatal shock.",
    text: "Kearon, C. et al. (2016) 'Antithrombotic therapy for VTE disease: CHEST guideline and expert panel report', Chest, 149(2), pp. 315-352.",
    url: "https://doi.org/10.1016/j.chest.2015.11.026"
  },
  {
    id: 72,
    kind:
      "The PE-TRACT trial design paper — an ongoing, not-yet-reported randomised trial comparing endovascular therapy with anticoagulation alone, using long-term functional endpoints (peak oxygen consumption, NYHA class) rather than short-term composites. Correctly cited as a design paper for a trial still in progress.",
    text: "Sista, A.K. et al. (2025) 'Rationale and design of the PE-TRACT trial: a multicenter randomized trial to evaluate catheter-directed therapy for the treatment of intermediate-risk pulmonary embolism', American Heart Journal, 281, pp. 112-122.",
    url: "https://doi.org/10.1016/j.ahj.2024.11.016"
  },
  {
    id: 73,
    kind:
      "The PEERLESS II trial design paper — a further ongoing trial of large-bore thrombectomy vs anticoagulation alone in intermediate-risk PE, building on the physiological signal from STORM-PE (ref 47). Correctly cited as a design paper, not reported results.",
    text: "Giri, J. et al. (2024) 'PEERLESS II: a randomized controlled trial of large-bore thrombectomy versus anticoagulation in intermediate-risk pulmonary embolism', Journal of the Society for Cardiovascular Angiography and Interventions, 3(6), 101982.",
    url: "https://doi.org/10.1016/j.jscai.2024.101982"
  }
];

const NODES = [
  {
    id: "trigger",
    type: "terminal",
    label: "Confirmed acute pulmonary embolism",
    meaning:
      "The entry point for this tool: a patient with imaging-confirmed acute PE, where the question is no longer diagnosis but which reperfusion strategy — if any — should sit on top of anticoagulation.",
    rationale:
      "Anticoagulation is the therapeutic foundation for the overwhelming majority of patients with PE; this flowchart exists only to identify the minority — those with obstructive shock or with right ventricular dysfunction and impending decompensation — who may benefit from added pharmacological or mechanical reperfusion.",
    refs: [4]
  },
  {
    id: "unstable",
    type: "decision",
    label: "Haemodynamically unstable?",
    sub: "Cardiac arrest, obstructive shock, or persistent hypotension not explained by another cause",
    meaning:
      "The single most important branch point in the whole algorithm: haemodynamic instability — not clot burden on a scan — is what defines high-risk PE and justifies accepting a far higher bleeding risk from full-dose systemic fibrinolysis.",
    rationale:
      "The ESC framework classifies a patient as high risk precisely when haemodynamic instability — cardiac arrest, obstructive shock, or persistent hypotension not explained by another cause — is present. This definition, carried verbatim into the box above, is the first of four sequential questions this review proposes for selecting candidates for reperfusion: is the patient unstable now; if not, is there RV dysfunction with myocardial injury; if so, are there further signals of a trajectory towards decompensation; and what is the bleeding risk.",
    refs: [4, 14]
  },
  {
    id: "high_risk",
    type: "branch",
    label: "HIGH-RISK PE",
    sub: "AHA/ACC category E; ESC high risk. Reperfusion is indicated unless futile [4,5]",
    meaning:
      "Haemodynamic instability alone reclassifies the patient as highest-acuity: AHA/ACC category E (established cardiopulmonary failure) under the 2026 five-tier scheme, equivalent to the older ESC high-risk tier — and in this group the default shifts from 'consider reperfusion' to 'reperfuse unless it would be futile.'",
    rationale:
      "Systemic fibrinolysis is recommended by all major guidelines for haemodynamically unstable PE, a recommendation resting on physiological plausibility, registry data reporting 90-day mortality exceeding 50% in massive PE, and a small number of randomised patients rather than one large dedicated trial — an absolute-risk argument, not a relative one: even a substantial bleeding risk is judged acceptable against mortality this high.",
    refs: [4, 5, 21]
  },
  {
    id: "normotensive",
    type: "branch",
    label: "NORMOTENSIVE PE",
    sub: "Assess right ventricular function and cardiac troponin",
    meaning:
      "The much larger group of patients, where the question shifts from 'reperfuse now' to 'how closely should this patient be watched, and is there already evidence they are failing on anticoagulation alone?'",
    rationale:
      "RV dysfunction on imaging and elevated troponin are the two findings the ESC framework uses to separate intermediate-risk PE from low-risk PE, and both are checked together before any further severity assessment — the second of this review's four sequential questions ('if not unstable, is there objective RV dysfunction with myocardial injury?').",
    refs: [4]
  },
  {
    id: "contraindication",
    type: "decision",
    label: "Absolute contraindication to systemic fibrinolysis?",
    sub: "Apply the structured checklist in Table 2",
    meaning:
      "Before full-dose lysis is given to a crashing patient, the absolute contraindications — prior haemorrhagic stroke, recent major trauma or surgery, active bleeding, suspected aortic dissection, and similar — have to be actively ruled out, not merely assumed absent.",
    rationale:
      "Contraindications should be applied as a structured checklist rather than recalled from memory, and their weight scaled to the indication: in cardiac arrest from confirmed PE a relative contraindication such as recent surgery may reasonably be overridden, since the alternative is death, whereas in a normotensive patient the same finding should usually preclude systemic lysis and redirect the discussion towards catheter-based or mechanical options. The absolute contraindications themselves — prior haemorrhagic stroke or stroke of unknown origin, ischaemic stroke within 6 months, CNS neoplasm/arteriovenous malformation/aneurysm, major trauma/surgery/head injury within 3 weeks, active bleeding, known bleeding diathesis, and suspected aortic dissection — derive largely from the acute coronary and stroke literature and have been carried into PE guidance with little PE-specific validation.",
    refs: [4, 5, 52]
  },
  {
    id: "rv_dysfunction",
    type: "decision",
    label: "RV dysfunction on imaging AND elevated troponin?",
    meaning:
      "The formal definition of intermediate-high-risk PE. The figure's own caption is explicit about what happens next: a patient positive for both findings passes directly to the severity-criteria question below, and 'anticoagulation alone' is reached only when at least one of the two is absent.",
    rationale:
      "A structural ambiguity in an earlier draft of this figure (only a NO arrow was drawn from this box, with a 'YES' label sitting on the arrow leading onward from 'Anticoagulation alone') was identified and checked against this review's own text, which states the definition plainly: intermediate-high risk is 'normotensive but has both RV dysfunction on imaging and elevated cardiac troponin', usually with PESI class III-V or sPESI ≥1. The corrected figure's own caption now states this explicitly — patients with both findings pass directly to the severity-criteria assessment, and anticoagulation alone is an endpoint only for those in whom RV dysfunction and troponin elevation are not both present — confirming the correction.",
    refs: [4]
  },
  {
    id: "anticoag_alone",
    type: "process",
    label: "Anticoagulation alone",
    sub: "Consider early discharge if PESI class I-II, sPESI 0, or Hestia <1 [5]",
    meaning:
      "Without both RV dysfunction and troponin elevation, this patient is low- or intermediate-low-risk, and anticoagulation alone — the therapeutic foundation for the large majority of PE patients — is correct management; a subset identified by validated clinical scores are well enough for outpatient treatment rather than admission.",
    rationale:
      "PESI, simplified PESI (sPESI) and the Hestia criteria are validated clinical decision rules used by major guidelines to identify PE patients at low enough short-term risk to be considered for early discharge or fully outpatient management rather than routine admission. This review's own text does not itself re-derive or re-validate these scores or discuss the Hestia criteria specifically; the early-discharge thresholds shown here follow the figure as authored and are flagged for the reader as established guideline-level practice rather than a primary finding verified within this particular review.",
    needsAuthor: true,
    refs: [5]
  },
  {
    id: "full_dose",
    type: "process",
    label: "Full-dose systemic fibrinolysis",
    sub: "Alteplase 100 mg over 2 h, or 0.6 mg/kg over 15 min (max 50 mg) [4,15]",
    dose: [
      ["Standard", "Alteplase 100 mg IV over 2 hours"],
      ["Accelerated (e.g. cardiac arrest, immediate effect required)", "Alteplase 0.6 mg/kg IV over 15 minutes (maximum 50 mg)"]
    ],
    meaning:
      "With no absolute contraindication, full-dose systemic alteplase is the default for high-risk PE — the one place in this entire algorithm where the evidence and the risk-benefit balance clearly favour this regimen as first-line therapy over a reduced dose or a catheter-based approach.",
    rationale:
      "Alteplase is given as a 100 mg infusion over two hours, with an accelerated 0.6 mg/kg regimen (maximum 50 mg) reserved for situations such as cardiac arrest where immediate effect is required — standard dosing across guidelines and this review's own pharmacology table. Systemic fibrinolysis is recommended by all major guidelines for haemodynamically unstable PE, resting on physiological plausibility, registry mortality data and a small number of randomised patients rather than one large dedicated high-risk-PE trial.",
    refs: [4, 15]
  },
  {
    id: "catheter_based",
    type: "process",
    label: "Catheter-based or surgical reperfusion",
    sub: "CDT, mechanical thrombectomy, embolectomy, or VA-ECMO as a bridge [24,35]",
    meaning:
      "When an absolute contraindication rules out systemic lysis but the patient is still crashing, the alternatives are local or mechanical: catheter-directed thrombolysis (CDT) using a fraction of the systemic dose, purely mechanical thrombectomy avoiding lytic drugs altogether, open surgical embolectomy, or VA-ECMO used as a bridge to one of these.",
    rationale:
      "A 2022 ESC/EAPCI clinical consensus statement recommended CDT be considered for high-risk PE with a contraindication to systemic thrombolysis or when it has failed, while explicitly noting no technique has been shown superior to another. Surgical embolectomy is indicated for high-risk PE when thrombolysis is contraindicated or has failed, for right heart thrombus in transit, and for paradoxical embolism through a patent foramen ovale; VA-ECMO can stabilise the failing right ventricle or bridge to one of these other options, though its evidence base remains observational.",
    refs: [24, 35]
  },
  {
    id: "severity",
    type: "decision",
    label: "Two or more severity criteria?",
    sub: "Systolic BP <=110 mmHg; respiratory rate >20/min; heart rate >=100/min; SpO2 <90% on air [7,13]",
    meaning:
      "RV dysfunction and troponin elevation alone identify a large, heterogeneous group in which only a small fraction will actually decompensate; adding these bedside markers of physiological stress enriches for the smaller subgroup in whom a reperfusion trial has actually shown benefit.",
    rationale:
      "Post hoc analysis of the PEITHO population showed that adding simple bedside markers of physiological stress to RV dysfunction and troponin elevation identifies a subgroup at appreciably higher short-term risk, an enrichment strategy subsequently adopted by HI-PEITHO, which required RV dysfunction and elevated troponin plus at least two of the four criteria shown above. One nuance worth flagging here: HI-PEITHO's own published enrolment criteria combined respiratory rate above 20/min and SpO2 below 90% into a single composite item, so the trial actually required two of three independent criteria, not two of four fully independent ones as this box (following the source figure) presents them. The underlying clinical substance — more physiological-stress markers identifies higher-risk patients — is unaffected by this simplification, but it is worth knowing the exact trial threshold differs slightly from how it is drawn here.",
    refs: [7, 13]
  },
  {
    id: "anticoag_monitor",
    type: "process",
    label: "Anticoagulation and close monitoring",
    sub: "Reassess frequently; rescue reperfusion if the patient deteriorates [4]",
    meaning:
      "With RV dysfunction and troponin elevation but fewer than two additional severity criteria, this patient is intermediate-high risk but not in the enriched subgroup HI-PEITHO studied — the correct default remains anticoagulation, with frequent reassessment rather than routine reperfusion.",
    rationale:
      "Systemic fibrinolysis is explicitly not recommended as first-line therapy for intermediate-high-risk PE, in whom close monitoring with rescue reperfusion on deterioration is preferred; the ESC framework is built around this contingency, and this review states plainly that for most intermediate-risk patients the correct answer remains anticoagulation with close observation and a clear escalation plan.",
    refs: [4]
  },
  {
    id: "escalate",
    type: "process",
    tone: "alarm",
    label: "If lysis fails or arrest occurs",
    sub: "Escalate to catheter-based or surgical reperfusion, and continue resuscitation for 60-90 min after the lytic is given [24,58]",
    meaning:
      "Persistent or recurrent instability after full-dose systemic lysis defines failed thrombolysis. Repeating the systemic dose is generally discouraged because it compounds bleeding risk, so the next step is catheter-based or surgical reperfusion instead, with resuscitation continued for an extended period because thrombolytic effect during cardiac arrest can be delayed.",
    rationale:
      "Guidelines and consensus statements support proceeding to catheter-based reperfusion or surgical embolectomy after failed systemic lysis, ideally with mechanical circulatory support where the patient is in refractory shock. Where thrombolysis is given during cardiac arrest specifically, a systematic review and meta-analysis restricted to PE-related arrest found higher rates of return of spontaneous circulation but no significant difference in survival to discharge, and the broader literature supports continuing resuscitation for at least 60 to 90 minutes before termination, since delayed responses to thrombolysis during arrest are well described.",
    refs: [24, 58]
  },
  {
    id: "activate_pert",
    type: "process",
    label: "Activate PERT and consider reperfusion",
    sub: "Catheter-directed thrombolysis reduced 7-day decompensation without excess bleeding (HI-PEITHO) [7]. Full-dose systemic lysis is not first-line [4,5]",
    meaning:
      "This is the enriched intermediate-risk subgroup — RV dysfunction, troponin elevation, and two or more severity criteria — in which a randomised trial has, for the first time, shown that catheter-based reperfusion improves a clinical outcome. A multidisciplinary pulmonary embolism response team (PERT) is the recommended way to weigh that option against the default of anticoagulation alone.",
    rationale:
      "HI-PEITHO enrolled 544 patients meeting exactly this profile and found the seven-day composite of PE-related death, cardiorespiratory decompensation or collapse, and symptomatic recurrent PE occurred in 4.0% of the catheter-directed-thrombolysis group versus 10.3% of the anticoagulation-alone group (relative risk 0.39, P=0.005, number needed to treat approximately 16), with no significant difference in major bleeding. Two caveats this review's own discussion raises are worth stating alongside that headline result: the benefit was driven almost entirely by less cardiorespiratory decompensation, a softer composite component than mortality — PE-related death was rare and, while not significantly different, numerically higher in the catheter-directed-thrombolysis arm (0.4% versus 1.1% with anticoagulation alone) — and the trial was open-label, so decompensation, though blindly adjudicated, was still ascertained in an unblinded clinical environment. Full-dose systemic lysis is explicitly not recommended as first-line therapy in this population, which is why this box specifies catheter-directed treatment rather than systemic thrombolysis. The 2026 multisociety guideline elevates PERT activation itself to a Class 1 recommendation for intermediate- and high-risk PE.",
    refs: [4, 5, 7]
  },
  {
    id: "caveat",
    type: "process",
    tone: "note",
    label: "At any point, haemodynamic deterioration on adequate anticoagulation is an indication for rescue reperfusion [4,35]",
    meaning:
      "A floating safety-net reminder that applies across every branch of this algorithm, not only the two explicit 'reassess and rescue' boxes above: a patient's risk category on presentation is a starting point, not a fixed label, and any trajectory towards decompensation — wherever it is first noticed — should prompt reconsidering reperfusion.",
    rationale:
      "Guidelines and consensus statements consistently build rescue reperfusion into the management of patients who deteriorate on anticoagulation, regardless of their initial risk category; the ESC framework in particular is explicitly structured around this contingency. The source figure places this note disconnected from the rest of the diagram, with no arrows in or out, for exactly this reason: it is not one more step in a sequence but a standing condition that overrides the sequence whenever it applies.",
    refs: [4, 35]
  }
];

const GLOSSARY = [
  {
    match: "PERT",
    full: "pulmonary embolism response team",
    def: "A multidisciplinary team — emergency medicine, cardiology, pulmonology, critical care, haematology, interventional radiology and cardiac surgery — convened for rapid consultation on intermediate- and high-risk PE. The 2026 multisociety guideline elevates its activation to a Class 1 recommendation."
  },
  {
    match: "PESI",
    full: "Pulmonary Embolism Severity Index",
    def: "An externally validated clinical score built from 11 patient variables, used to estimate 30-day mortality risk in PE and to help identify patients (class I-II) suitable for outpatient or early-discharge management."
  },
  {
    match: "sPESI",
    full: "simplified Pulmonary Embolism Severity Index",
    def: "A simplified 6-item version of the PESI score; an sPESI of 0 identifies patients at low enough short-term risk to be considered for outpatient treatment."
  },
  {
    match: "Hestia",
    def: "An alternative 11-item European checklist — rather than a numeric score — used to identify PE patients safe for outpatient or early-discharge management. A patient with none of the Hestia exclusion criteria present is sometimes described as \"Hestia-negative\" or \"Hestia <1.\""
  },
  {
    match: "CDT",
    full: "catheter-directed thrombolysis",
    def: "Delivery of a fraction — roughly one-fifth to one-tenth — of the systemic thrombolytic dose directly into the pulmonary-artery thrombus through a catheter, with or without adjunctive ultrasound energy, aiming for local clot lysis while limiting systemic bleeding risk."
  },
  {
    match: "VA-ECMO",
    full: "venoarterial extracorporeal membrane oxygenation",
    def: "A form of mechanical circulatory support that can stabilise a failing right ventricle, buy time for clot resolution, or bridge a patient to surgical or catheter-based reperfusion in refractory shock or cardiac arrest."
  },
  {
    match: "number needed to treat",
    def: "The number of patients who would need to receive an intervention for one additional patient to benefit, compared with the control. HI-PEITHO's number needed to treat of approximately 16 means roughly 1 in 16 patients treated with catheter-directed thrombolysis instead of anticoagulation alone avoided the seven-day composite outcome."
  },
  {
    match: "category E",
    def: "The highest-acuity tier (established cardiopulmonary failure) of the 2026 AHA/ACC five-category clinical classification (A to E) for acute PE, intended to characterise severity more finely than the older low/intermediate/high-risk taxonomy."
  }
];

// Clinical agent (drug) names to visually emphasise wherever they appear —
// in the diagram boxes themselves and in the readout panel's prose. This
// is a rendering-only concern (app.js wraps each match in a styled span at
// render time); it never touches label/sub, which stay byte-exact as
// authored. Matching is case-insensitive and whole-word, longest name
// first.
// Added at Dr. Özgür Karcıoğlu's request, 2026-11-02 — see METHODOLOGY.md.
const AGENTS = [
  "Alteplase"
];
