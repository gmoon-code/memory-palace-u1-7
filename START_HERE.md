# Start Here · Units 1–7 Mainline + Unit 7 F6 Final Validation

This package contains the current student-ready `memory-palace-v2` mainline for AP Biology Units 1–7. Unit 7 preserves its locked F1 science, F2 learning architecture, F3 scene briefs, all six frozen F4 narratives, the complete F5 runtime curriculum, and the final F6 classroom/browser-facing validation record.

## Included

Units 1 through 7 are student-ready. Units 3 through 7 have completed F6 functional browser-facing/classroom validation. Unit 7 is fully validated at F6.

### Unit 6 final accounting

- 202 canonical records accounted
- 161 runtime Memory Objects
- 6 guided journeys
- 53 permanent scenes
- 18 optional first-exposure Quick Recalls
- 134 delayed exact-name Review targets
- 27 palace records without forced exact-name retrieval
- 37 mixed-discrimination sets
- 94 mixed-discrimination questions
- 16 live Challenge Lab tasks
- 25 non-runtime scope guards
- 0 unaccounted canonical records
- 0 mandatory spelling gates

The zero-loss partition is **161 story/runtime records + 16 Challenge Lab records + 25 scope guards = 202 canonical records**.

### Frozen Unit 6 narratives

1. **The Archive That Could Not Make a Copy** — 12 scenes
2. **The Message That Was Not Ready to Leave** — 8 scenes
3. **The Assembly Line That Lost Its Reading Frame** — 8 scenes
4. **The Control Center That Forgot Its Cell Identities** — 12 scenes
5. **The Mutation Yard Where Every Change Was Blamed** — 8 scenes
6. **The Lab That Kept Using the Wrong Tool** — 5 scenes

All six narrative files remain byte-identical to their frozen F4 releases.


## Unit 7 F6 final validated state

- 215 / 215 canonical records accounted
- 174 runtime Memory Objects
- 6 / 6 guided journeys
- 55 / 55 permanent scenes
- 18 / 18 optional first-exposure Quick Recalls
- 16 / 16 live Challenge Lab tasks
- 94 / 94 delayed exact-name Review targets
- 80 meaning/mechanism-only palace records
- 33 mixed-discrimination sets
- 102 mixed-discrimination questions
- 25 / 25 non-runtime scope guards
- 0 unaccounted canonical records
- 0 mandatory spelling gates
- all six F4 narratives remain frozen

The Unit 7 zero-loss partition is **174 story/runtime records + 16 Challenge Lab records + 25 scope guards = 215 canonical records**.

Unit 7 is **student released and F6 validated**. Its locked curriculum remains unchanged from F5.


## Unit 7 F6 validation

- 55 / 55 production scene renders
- 18 / 18 hidden Quick Recall renders
- 165 scene/viewport responsive-contract checks
- 54 recall/viewport responsive-contract checks
- refresh/resume persistence PASS
- switching across Units 1–7 PASS
- 94 exact-name Review targets PASS
- 33 mixed sets with 102 questions PASS
- five-item visible Review cap PASS
- 48-hour mixed-review delay PASS
- 16 / 16 Challenge Lab tasks PASS
- Unit 7 speech preparation PASS
- live FastAPI/HTTP behavior PASS

Chromium timed out during a direct 8-second headless `about:blank` probe in this sandbox, so the release does not claim screenshot-level or pixel-level validation.

## Unit 6 F6 validation

- 53 / 53 production scene renders
- 18 / 18 hidden Quick Recall renders
- 159 scene/viewport responsive-contract checks
- 54 recall/viewport responsive-contract checks
- refresh/resume persistence PASS
- switching among the then-released Units 1–6 PASS
- 134 exact-name Review targets PASS
- 37 mixed sets with 94 questions PASS
- five-item visible Review cap PASS
- 16 / 16 Challenge Lab tasks PASS
- speech preparation for frequent Unit 6 notation PASS
- live FastAPI/HTTP behavior PASS

Chromium timed out during a direct 8-second headless `about:blank` probe in this sandbox, so the release does not claim screenshot-level or pixel-level validation.

## Update GitHub

Unzip the release, open the included `memory-palace-v2` folder, and copy **the contents of that folder** into the root of the existing private `memory-palace-v2` repository, replacing matching files.

Do not upload the ZIP itself, source PDFs, SQLite files, `.env`, caches, or historical work folders.

A suitable commit message is

```text
Finalize AP Biology Unit 7 F6 validation
```

## Run before committing

```bash
python scripts/qa_unit1_full.py
python scripts/qa_unit2_f5.py
python scripts/qa_unit3_f6.py
python scripts/qa_unit4_f6.py
python scripts/qa_unit5_f6.py
python scripts/qa_unit6_f1.py
python scripts/qa_unit6_f2.py
python scripts/qa_unit6_f3.py
python scripts/qa_unit6_f4a.py
python scripts/qa_unit6_f4b.py
python scripts/qa_unit6_f4c.py
python scripts/qa_unit6_f4d.py
python scripts/qa_unit6_f4e.py
python scripts/qa_unit6_f4f.py
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

## Browser runtime

Run the application with

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Units 1 through 7 are available through the student runtime. The main navigation remains **Home · Learn · Review**, and each released unit exposes its Challenge Lab from Home when application tasks are available.

Current runtime

```text
v2-apbio-0.28.0-u7-f6
```

## Review Unit 7 F6

Open

- `docs/UNIT7_F1_RELEASE.md`
- `docs/UNIT7_F1_QA.md`
- `docs/UNIT7_F1_PACKAGE_QA.md`
- `content/ap-biology/unit-7/audit/F1_SOURCE_AUDIT.md`
- `content/ap-biology/unit-7/audit/F1_REVIEW_FLAGS.md`
- `content/ap-biology/unit-7/audit/APBIO_Unit7_F1_Source_Lock.xlsx`
- `content/ap-biology/unit-7/source/canonical-unit7-f1.json`
- `content/ap-biology/unit-7/content-lock-f1.json`
- `content/ap-biology/unit-7/f1-release-manifest.json`
- `docs/UNIT7_F2_RELEASE.md`
- `docs/UNIT7_F2_ARCHITECTURE.md`
- `content/ap-biology/unit-7/architecture/palace-architecture-f2.json`
- `docs/UNIT7_F3_RELEASE.md`
- `docs/UNIT7_F4A_RELEASE.md`
- `docs/UNIT7_F4A_JOURNEY1_STORY.md`
- `docs/UNIT7_F4A_QA.md`
- `docs/UNIT7_F4A_PACKAGE_QA.md`
- `docs/UNIT7_F4B_RELEASE.md`
- `docs/UNIT7_F4B_JOURNEY2_STORY.md`
- `docs/UNIT7_F4B_QA.md`
- `docs/UNIT7_F4B_PACKAGE_QA.md`
- `docs/UNIT7_F4C_RELEASE.md`
- `docs/UNIT7_F4C_JOURNEY3_STORY.md`
- `docs/UNIT7_F4C_QA.md`
- `docs/UNIT7_F4C_PACKAGE_QA.md`
- `docs/UNIT7_F4D_RELEASE.md`
- `docs/UNIT7_F4D_JOURNEY4_STORY.md`
- `docs/UNIT7_F4D_QA.md`
- `docs/UNIT7_F4D_PACKAGE_QA.md`
- `docs/UNIT7_F4E_RELEASE.md`
- `docs/UNIT7_F4E_JOURNEY5_STORY.md`
- `docs/UNIT7_F4E_QA.md`
- `docs/UNIT7_F4E_PACKAGE_QA.md`
- `docs/UNIT7_F4F_RELEASE.md`
- `docs/UNIT7_F4F_JOURNEY6_STORY.md`
- `docs/UNIT7_F4F_QA.md`
- `docs/UNIT7_F4F_PACKAGE_QA.md`
- `docs/UNIT7_F5_RELEASE.md`
- `docs/UNIT7_F5_QA.md`
- `docs/UNIT7_F5_INTEGRATION_AUDIT.md`
- `docs/UNIT7_F5_PACKAGE_QA.md`
- `docs/UNIT7_F6_RELEASE.md`
- `docs/UNIT7_F6_CLASSROOM_BROWSER_QA.md`
- `docs/UNIT7_F6_INTEGRATION_AUDIT.md`
- `docs/UNIT7_F6_PACKAGE_QA.md`
- `content/ap-biology/unit-7/ux-validation-f6.json`
- `content/ap-biology/unit-7/f6-release-manifest.json`
- `content/ap-biology/unit-7/content-lock-f6.json`
- `docs/MAINLINE_RELEASE_U1_U7.md`
- `content/ap-biology/unit-7/memory-objects-f5.json`
- `content/ap-biology/unit-7/application-lab.json`
- `content/ap-biology/unit-7/review-manifest-f5.json`
- `content/ap-biology/unit-7/mixed-discrimination-f5.json`
- `content/ap-biology/unit-7/scope-guards-f5.json`
- `content/ap-biology/unit-7/finalization-f5.json`
- `docs/UNIT7_F3_SCENE_BRIEFS.md`
- `content/ap-biology/unit-7/briefs/journey-briefs-f3.json`
- `content/ap-biology/unit-7/briefs/scene-briefs-f3.json`
- `content/ap-biology/unit-7/audit/APBIO_Unit7_F3_Scene_Briefs.xlsx`

## Review Unit 6 F6

Open

- `docs/UNIT6_F6_RELEASE.md`
- `docs/UNIT6_F6_CLASSROOM_BROWSER_QA.md`
- `docs/UNIT6_F6_INTEGRATION_AUDIT.md`
- `docs/UNIT6_F6_PACKAGE_QA.md`
- `docs/MAINLINE_RELEASE_U1_U6.md`
- `content/ap-biology/unit-6/ux-validation-f6.json`
- `content/ap-biology/unit-6/f6-release-manifest.json`
- `content/ap-biology/unit-6/content-lock-f6.json`

## Next branch gate

Proceed to **Unit 8 source inventory and scientific locking** from this frozen Units 1–7 baseline. Do not alter Unit 7 F1–F6 science, architecture, narratives, runtime curriculum, or validation artifacts.
