# 🧠 Teach Yourself Conceptual Mathematics

**A Four-Week Course on the Ideas Behind the Symbols — From the Integers to Gödel and the Halting Problem**

---

## 🧩 Overview

Teach Yourself Conceptual Mathematics is a self-paced, single-user web course that asks the question math classes usually skip: *what are these things, really?* What is a number? What is an operation? What is a proof? What does it mean for a series to add up to a finite value? What does it mean for a theorem to be unprovable?

The course is a content reskin of the **QuantReason** Quantitative Reasoning app. The full QuantReason runtime — lectures with short / medium / long depth, section-scoped AI tutor, adaptive practice, AI-graded homework / tests / midterm / final, two-layer AI-authorship detection, and one-click diagnostics — is preserved unchanged. The **purpose** of this build is to teach the conceptual backbone of modern mathematics — the same backbone that every undergraduate eventually meets in an analysis or algebra class, presented in one connected arc.

---

## 🧠 What It Does

- **Four-Week Curriculum of 32 Micro-Lectures** — Eight per week, organized by theme:
  - **Week 1 — The number systems**: counting and the number line; rationals and ratios; irrationals and the $\sqrt 2$ scandal; real numbers and completeness; imaginary and complex numbers as rotations; zero, negatives, and other conceptual leaps; bases and place value; countable vs. uncountable infinity.
  - **Week 2 — Operations and structures**: what an operation is; commutativity, associativity, distributivity; groups and symmetry; rings and fields; vector spaces; functions as mappings; relations, equivalence classes, and isomorphism; modular arithmetic.
  - **Week 3 — The continuum: calculus, geometry, topology**: limits and the taming of infinity; continuity; derivatives as instantaneous rate; integrals as accumulation; the Fundamental Theorem of Calculus; sequences, series, and Zeno; Euclidean vs. non-Euclidean geometry; topology, dimension, and curvature.
  - **Week 4 — Foundations: logic, proof, undecidability**: propositional and predicate logic; what a proof is; mathematical induction; sets and Russell's paradox; axioms and independence results; Gödel's incompleteness theorems; probability (measure, frequency, credence); computability and the halting problem.
- **One Real Example per Lecture** — Every micro-lecture grounds its concept in a worked example from science, history, or another part of mathematics — e.g. the Pythagoreans throwing Hippasus overboard for $\sqrt 2$, Cantor's diagonal argument, the Banach–Tarski paradox, Eddington's 1919 eclipse confirming non-Euclidean spacetime, the RSA cryptosystem as computation in $\mathbb{Z}/n\mathbb{Z}$, Cohen's forcing argument for the independence of CH, and Turing's diagonal proof of the undecidability of the halting problem.
- **One Symbolic Question per Lecture** — Every homework / test / midterm / final problem requires the student to *write the key statement in symbols* (set-builder notation, $\varepsilon$–$\delta$, quantifiers, $\Sigma$, $\equiv \ldots \pmod n$), not just describe it in English. The on-screen math keyboard is the only practical way to compose these answers.
- **Three-Depth Lectures, Section-Scoped Tutor, Adaptive Practice, AI Grading, Two-Layer Detection, One-Click Diagnostics** — All inherited unchanged from the QuantReason runtime.
- **Built-In Product Demo Video** — The companion `qr-course-demo` artifact still ships as a short screencast of the live UI.

---

## ⚙️ Technical Features

- **Symbolic Answer Harness** — Every problem prompt is structured so the canonical answer is a piece of mathematical notation. Both the prompt rendering (KaTeX) and the answer entry/grading (LaTeX-aware AI grader with numeric short-circuit) must handle set-builder, quantifiers, blackboard-bold, congruence-modulo, $\varepsilon$–$\delta$, and the rest cleanly.
- **Two-Layer AI-Authorship Detection** —
  - **Static (GPTZero):** Every submitted answer is sent to GPTZero's `predict/text` endpoint; the per-document AI probability is blended `0.85 × GPTZero + 0.15 × structural-heuristic` for the final score. If GPTZero is unavailable, the system silently falls back to an LLM scorer plus heuristic.
  - **Diachronic (Keystroke Pattern):** The student textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration. A scorer penalizes paste-then-reword behavior, low keystroke-to-output ratios, and impossibly sustained typing speeds.
- **Two Diagnostic Self-Tests** —
  - **System Diagnostic** (`/diagnostics/system`): environment, database round-trip, course-seed integrity, OpenAI chat completion, OpenAI JSON mode, detection pipeline, AI-positive control sample, and GPTZero connectivity.
  - **Synthetic-Student Diagnostic** (`/diagnostics/synthetic-run`): end-to-end stack proof — fake student takes a practice session, takes a full assignment attempt, submits, and verifies grading + detection + analytics all reflect the run.
- **Auto-Reseed on Curriculum Change** — `seedIfEmpty` compares the set of topic slugs in the database to the expected curriculum *and* checks a sentinel phrase in a designated lecture. If either differs, it wipes and re-seeds in dependency order. This is what lets a single content swap propagate cleanly when the seed file changes.
- **Contract-First API** — Single OpenAPI document; React Query hooks for the UI and Zod validators for the server are generated from it.
- **Streaming AI Tutor** — Token-by-token Server-Sent-Event streaming with a section-scoped system prompt grounded in the active lecture.
- **Adaptive Practice Engine** — Per-session difficulty (1–4) adjusts after each attempt; problems are generated on demand.
- **Operator Console** — Dedicated Diagnostics page surfaces both self-tests with one-click execution and raw error output.

---

## 🔐 Required Secrets

- `OPENAI_API_KEY` — required at boot. Powers the tutor, practice generator, AI graders, and lecture-expansion job.
- `GPTZERO_API_KEY` — required for the GPTZero leg of the static-AI-detection layer. If absent, the system falls back to the LLM scorer + heuristic, but you lose the primary detection signal.

Both are requested via the secrets panel; neither is hard-coded.

---

## 🎓 Designed For

- **Anyone Who Took a Calculus Class and Wondered "But What *Is* This?":** A short, focused course on the conceptual scaffolding behind the symbols — number, operation, structure, limit, proof, undecidability.
- **The Maintainer of QuantReason and Its Clones:** A pure stress test of the math-notation stack — keyboard, LaTeX rendering, grading, and AI detection — under a different curriculum, with answers that lean on quantifiers and set-builder notation.

---

## 💡 Core Idea

Most mathematics courses teach the *moves* — how to differentiate, how to multiply matrices, how to solve a congruence. Far fewer teach the *objects* — what a number is, what an operation is, what a proof is, what an axiom can and cannot do. This course is built around the second list.

Read the idea, see it grounded in a real example, then write the defining statement in symbols of your own.

**Teach Yourself Conceptual Mathematics — read the idea, ground the idea, write the idea.**

---

## User preferences

_(none recorded yet)_
