import { useLocation } from "wouter";
import { ArrowRight, BookOpen, LineChart, Calculator, Brain } from "lucide-react";

const weeks = [
  {
    title: "Foundations & the Time Value of Money",
    detail: "Interest, present value, discounting, annuities, real vs. nominal rates.",
  },
  {
    title: "Financial Statements & Analysis",
    detail: "The balance sheet, income statement, cash flows, ratios, DuPont.",
  },
  {
    title: "Risk, Return & Markets",
    detail: "Volatility, diversification, the Sharpe ratio, CAPM, market efficiency.",
  },
  {
    title: "Valuation & Corporate Finance",
    detail: "Bonds, stocks, NPV, WACC, capital structure, Modigliani–Miller.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "29 micro-lectures",
    detail: "Each idea at short, medium, or long depth, grounded in a real example.",
  },
  {
    icon: Calculator,
    title: "Write the math",
    detail: "Compose finance formulas in symbols with a built-in math keyboard.",
  },
  {
    icon: Brain,
    title: "AI tutor & grading",
    detail: "A section-scoped tutor, adaptive practice, and instant AI-graded work.",
  },
  {
    icon: LineChart,
    title: "Track your progress",
    detail: "Homework, tests, a midterm, and a final — all in one connected arc.",
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-serif font-bold text-lg">
            ∑
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight">
            Finance
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLocation("/sign-in")}
            className="px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary transition-colors"
            data-testid="button-signin"
          >
            Sign in
          </button>
          <button
            onClick={() => setLocation("/sign-up")}
            className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            data-testid="button-signup"
          >
            Get started
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        <section className="py-16 md:py-24 text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            A four-week course on the ideas behind the money
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
            Read the idea, ground the idea, write the idea.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Most finance courses teach the recipes — how to build a DCF, compute
            WACC, price a bond. This one teaches the objects underneath: what an
            interest rate really is, why a balance sheet balances, and why one
            equation sits beneath all of it.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setLocation("/sign-up")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              data-testid="button-start"
            >
              Start the course
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLocation("/sign-in")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-base font-medium border border-border hover:bg-secondary transition-colors"
            >
              Sign in
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-card-border bg-card p-5"
            >
              <f.icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="font-serif font-semibold text-base mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground">{f.detail}</p>
            </div>
          ))}
        </section>

        <section className="pb-24">
          <h2 className="font-serif text-2xl font-bold text-center mb-8">
            Four weeks, one connected arc
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeks.map((w, i) => (
              <div
                key={w.title}
                className="rounded-xl border border-card-border bg-card p-6 flex gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-md bg-secondary flex items-center justify-center font-serif font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif font-semibold mb-1">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Finance — read the idea, ground the idea, write the idea.
      </footer>
    </div>
  );
}
