# Memory Palace V2 · AP Biology

## Mainline Units 1–7

This repository is the consolidated student-ready mainline for **AP Biology Units 1–7**. Together they contain **1,306 canonical records, 50 guided journeys, 390 permanent scenes/loci, and 99 Challenge Lab items**. Units 3, 4, 5, 6, and 7 have completed F6 functional browser-facing/classroom validation. Unit 7 is now fully validated and student ready. Unit 8 remains a registered source-ready placeholder.

See `docs/MAINLINE_RELEASE_U1_U7.md` for the integrated release audit.

## Current course state

- **Unit 1 · Chemistry of Life** — student-ready, 229 canonical records, 9 journeys, 78 loci, 16 Challenge Lab items.
- **Unit 2 · Cells** — student-ready, 142 canonical records, 7 journeys, 49 loci, 9 Challenge Lab items.
- **Unit 3 · Cellular Energetics** — student-ready and F6 validated, 186 canonical records, 7 journeys, 54 loci, 11 Challenge Lab items.
- **Unit 4 · Cell Communication and Cell Cycle** — student-ready and F6 validated, 180 canonical records, 162 runtime Memory Objects, 7 journeys, 51 loci, 15 Challenge Lab items, 3 scope guards, 162 exact-name Review targets, and 33 mixed-discrimination sets.
- **Unit 5 · Heredity** — student-ready and F6 validated, 152 canonical records, 131 runtime Memory Objects, 8 journeys, 50 loci, 18 optional first-exposure recalls, 16 Challenge Lab items, 5 scope guards, 130 exact-name Review targets, and 32 mixed-discrimination sets with 79 questions.
- **Unit 6 · Gene Expression and Regulation** — **student-ready and F6 validated**, with 202 canonical records fully accounted, 161 runtime Memory Objects, 6 journeys, 53 scenes, 18 optional first-exposure recalls, 16 Challenge Lab tasks, 25 non-runtime scope guards, 134 delayed exact-name Review targets, and 37 mixed-discrimination sets with 94 questions.
- **Unit 7 · Natural Selection** — **student-ready and F6 validated**, with 215 canonical records fully accounted, 174 runtime Memory Objects, 6 frozen journeys, 55 scenes, 18 optional first-exposure recalls, 16 Challenge Lab tasks, 25 non-runtime scope guards, 94 delayed exact-name Review targets, 80 meaning/mechanism-only palace records, and 33 mixed-discrimination sets with 102 questions. The zero-loss partition is **174 story/runtime + 16 Challenge Lab + 25 scope guards = 215**.

The learner interface remains **Home · Learn · Review**. Challenge Lab launches from Home. Mixed discrimination appears inside Review only after all associated science has been encountered and the delay has elapsed.

## Development server

```bash
pip install -r requirements.txt
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Open a released unit with `/?unit=unit-1` through `/?unit=unit-7`.

## QA

GitHub Actions verifies the locked historical gates for Units 1–6, preserves the frozen Unit 6 F6 artifacts under the later Unit 7 runtime, and runs Unit 7 F1 scientific-lock, F2 architecture, F3 scene-brief, every narrative gate from F4A through F4F, the F5 runtime-finalization gate, the F6 classroom/browser-facing gate, and the current Units 1–7 mainline gate. CI also runs the full Python suite, Unit 3 through Unit 7 UI-logic QA, JavaScript syntax checks, Python compilation, and repository-cleanliness checking.

For the current mainline

```bash
python scripts/qa_unit6_f5.py
python scripts/build_unit6_f6.py
python scripts/qa_unit6_f6.py
python scripts/qa_mainline_u1_u6.py
python scripts/qa_unit7_f1.py
python scripts/qa_unit7_f2.py
python scripts/qa_unit7_f3.py
python scripts/qa_unit7_f4a.py
python scripts/qa_unit7_f4b.py
python scripts/qa_unit7_f4c.py
python scripts/qa_unit7_f4d.py
python scripts/qa_unit7_f4e.py
python scripts/qa_unit7_f4f.py
python scripts/qa_unit7_f5.py
python scripts/qa_unit7_f6.py
python scripts/qa_mainline_u1_u7.py
node scripts/qa_unit6_f6_ui.mjs
node scripts/qa_unit7_f6_ui.mjs
python -m pytest -q
```

## Unit 7 F6 validation boundary

F6 exercised the production HTML rendering functions for all **55 Unit 7 scenes** and all **18 hidden Quick Recall states**. Responsive contracts were checked against **1440×1000 desktop, 820×1180 tablet, and 390×844 phone** targets, giving **165 scene/viewport** and **54 recall/viewport** checks. State-machine QA covers refresh/resume persistence, released-unit switching across Units 1–7, the 94 exact-name targets, all 33 mixed sets and 102 questions, the five-item visible Review cap, the 48-hour mixed-review delay, and all 16 Challenge Lab tasks.

Chromium was directly probed with an 8-second headless `about:blank` render and timed out without DOM output in this sandbox. The release therefore does **not** claim screenshot-level or pixel-level validation. It records production-render, state-machine, responsive-contract, speech-preparation, and live HTTP/API validation.

## Unit 6 F6 validation boundary

F6 exercised the production HTML rendering functions for all **53 Unit 6 scenes** and all **18 hidden Quick Recall states**. Responsive contracts were checked against **1440×1000 desktop, 820×1180 tablet, and 390×844 phone** targets, giving **159 scene/viewport** and **54 recall/viewport** checks. State-machine QA covers refresh/resume persistence, released-unit switching across Units 1–6, the 134 exact-name targets, all 37 mixed sets and 94 questions, the five-item visible Review cap, and all 16 Challenge Lab tasks.

Chromium was directly probed with an 8-second headless `about:blank` render and timed out without DOM output in this sandbox. The release therefore does **not** claim screenshot-level or pixel-level validation. It records production-render, state-machine, responsive-contract, and live HTTP/API validation.

## Current runtime

```text
v2-apbio-0.28.0-u7-f6
```

## Next curriculum stage

Unit 7 has completed **F6 classroom/browser-facing validation** and is now frozen as the validated Units 1–7 mainline. The next curriculum stage is **Unit 8 source inventory and scientific locking**. Unit 7 F1–F6 science, architecture, narratives, runtime curriculum, Review configuration, and browser/classroom validation should remain unchanged.
