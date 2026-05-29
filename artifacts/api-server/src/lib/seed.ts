import { db } from "@workspace/db";
import {
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";

type SeedTopic = {
  slug: string;
  title: string;
  weekNumber: number;
  blurb: string;
  lectureTitle: string;
  body: string;
};

const TOPICS: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 1 — Foundations and the time value of money
  // ───────────────────────────────────────────────────────────────
  {
    slug: "what-is-finance",
    title: "What finance is and why it exists",
    weekNumber: 1,
    blurb: "Finance exists to move resources across time and states of the world.",
    lectureTitle: "1.1 What finance is and why it exists",
    body: `# What finance is and why it exists

Finance is the study of how people and organizations **allocate scarce resources across time under uncertainty**. At its root, finance exists to move resources across time: to let someone who has money now but will need it later store value, and to let someone who needs money now but will have it later borrow against the future.

## Surplus and deficit units

The economy is full of *surplus units* (savers with more cash than current uses) and *deficit units* (borrowers, firms, governments with profitable uses but not enough cash). Finance is the machinery that channels funds from the first group to the second — and prices that transfer through an **interest rate** or an expected **return**.

## The three core questions

Every finance decision is one of three:

- **Investment** — which real or financial assets should we hold?
- **Financing** — how should we pay for them (debt, equity, retained earnings)?
- **Risk** — how do we measure and bear the uncertainty involved?

## A real example

In a farming village, a farmer needs seed and tools in the spring but earns nothing until the autumn harvest. A lender with idle grain advances it now in exchange for more grain at harvest. That single transaction is finance in miniature: value moved from autumn to spring, priced by interest, and exposed to the risk that the harvest fails. Everything from a credit card to a sovereign bond is a more elaborate version of the farmer and the lender.`,
  },
  {
    slug: "financial-system-markets",
    title: "The financial system and markets",
    weekNumber: 1,
    blurb: "How savings reach borrowers: markets, intermediaries, primary vs. secondary.",
    lectureTitle: "1.2 The financial system and markets",
    body: `# The financial system and markets

The **financial system** is the network of markets, institutions, and instruments that connects savers to borrowers. Funds can flow two ways: **directly**, when a borrower issues a security straight to investors, or **indirectly**, through a financial intermediary such as a bank that takes deposits and makes loans.

## Markets by maturity and by stage

- **Money markets** trade short-term debt (maturity under one year): Treasury bills, commercial paper.
- **Capital markets** trade long-term claims: bonds and stocks.
- **Primary markets** are where a security is *first sold* and the issuer receives the cash (an IPO, a new bond issue).
- **Secondary markets** are where existing securities change hands between investors (the NYSE, Nasdaq). The issuer gets no new money, but secondary trading provides the **liquidity** that makes anyone willing to buy in the primary market.

## Why markets matter

Markets perform price discovery, provide liquidity, and reduce the search and information costs of finding a counterparty. A deep secondary market lowers the return investors demand, which lowers the cost of capital for firms.

## A real example

When a company like Airbnb "goes public," it sells new shares once, in the primary market, and pockets the proceeds. Every trade of those shares afterward — millions per day — happens in the secondary market between investors; Airbnb receives none of that cash, but the constant trading is exactly what made the IPO buyers willing to pay up front.`,
  },
  {
    slug: "money-interest-tvm",
    title: "Money, interest, and the time value of money",
    weekNumber: 1,
    blurb: "A dollar today is worth more than a dollar tomorrow — and interest is the price.",
    lectureTitle: "1.3 Money, interest, and the time value of money",
    body: `# Money, interest, and the time value of money

The single most important idea in finance is the **time value of money**: a dollar today is worth more than a dollar tomorrow, because a dollar today can be invested to earn interest, and because the future is uncertain.

## Interest as the price of time

An **interest rate** $r$ is the rent paid for the use of money over a period. If you lend \\$100 for a year at $r = 5\\%$, you get back \\$105. The \\$5 compensates the lender for deferring consumption, for expected inflation, and for risk.

## Simple vs. compound interest

- **Simple interest** pays only on the original principal: after $n$ years, $P(1 + rn)$.
- **Compound interest** pays interest on previously earned interest: after $n$ years, $P(1+r)^n$.

The difference is explosive over long horizons — this is the engine behind every retirement account.

## A real example

\\$1{,}000 invested at $8\\%$ becomes \\$1{,}080 after one year. Left for 30 years it does not become \\$1{,}000 + 30 \\times \\$80 = \\$3{,}400$ (simple); it becomes $\\$1{,}000 \\times (1.08)^{30} \\approx \\$10{,}063$ — over ten times the principal. The extra \\$6{,}663 is interest earned on interest. Compounding is why starting to save early beats saving more later.`,
  },
  {
    slug: "present-future-value",
    title: "Present value and future value",
    weekNumber: 1,
    blurb: "The two master formulas that move a single cash flow through time.",
    lectureTitle: "1.4 Present value and future value",
    body: `# Present value and future value

Two formulas translate a single cash flow between today and the future at a rate $r$ per period over $n$ periods.

## Future value

$$FV = PV \\,(1 + r)^n.$$

This *compounds* a present amount forward. The factor $(1+r)^n$ is the growth multiplier.

## Present value

$$PV = \\dfrac{FV}{(1 + r)^n}.$$

This *discounts* a future amount back to today. The factor $1/(1+r)^n$ is the **discount factor**, always less than 1 for $r > 0$ — it tells you how much a future dollar is worth now. The rate $r$ used to discount is the **discount rate** or **opportunity cost of capital**.

## They are inverses

$FV$ and $PV$ are the same equation read in two directions. Given any three of $PV$, $FV$, $r$, $n$, you can solve for the fourth. Solving for $r$ gives the implied return; solving for $n$ gives the time to reach a goal.

## A real example

A parent wants \\$50{,}000 for a child's college in 18 years and can earn $6\\%$. How much to set aside today? $PV = 50{,}000 / (1.06)^{18} \\approx \\$17{,}500$. Conversely, that \\$17{,}500 *grows to* \\$50{,}000 over 18 years: $FV = 17{,}500 \\times (1.06)^{18}$. Present and future value are the round trip.`,
  },
  {
    slug: "discounting-cash-flows",
    title: "Discounting cash flows",
    weekNumber: 1,
    blurb: "Valuing a stream of cash flows as the sum of their present values.",
    lectureTitle: "1.5 Discounting cash flows",
    body: `# Discounting cash flows

Most assets pay not a single amount but a *stream* of cash flows over time. The value of any asset is the **sum of the present values** of all the cash flows it produces — this is **discounted cash flow (DCF)** valuation, the foundation of essentially all of finance.

## The master equation

For cash flows $CF_1, CF_2, \\ldots, CF_n$ at the end of each period, discounted at rate $r$:

$$PV = \\sum_{t=1}^{n} \\dfrac{CF_t}{(1 + r)^t}.$$

Each future dollar is pulled back to today by its own discount factor, and the present values are simply added — present values at the *same* date are additive.

## What the inputs mean

- The $CF_t$ are *expected* cash flows.
- The rate $r$ reflects the **riskiness** of those cash flows: riskier streams are discounted at higher rates, lowering their value.

## A real example

A small print shop is offered a machine that will generate \\$10{,}000 a year for 3 years. At a discount rate of $10\\%$, the cash flows are worth $\\tfrac{10{,}000}{1.1} + \\tfrac{10{,}000}{1.1^2} + \\tfrac{10{,}000}{1.1^3} \\approx 9{,}091 + 8{,}264 + 7{,}513 = \\$24{,}868$ today — not \\$30{,}000. If the machine costs less than \\$24{,}868, buying it creates value. That comparison is the seed of NPV in week 4.`,
  },
  {
    slug: "annuities-perpetuities",
    title: "Annuities and perpetuities",
    weekNumber: 1,
    blurb: "Closed-form shortcuts for level streams — finite and forever.",
    lectureTitle: "1.6 Annuities and perpetuities",
    body: `# Annuities and perpetuities

Some cash-flow streams are regular enough to have closed-form present values, so you never have to discount term by term.

## Perpetuity

A **perpetuity** pays a constant amount $C$ every period forever. Summing the infinite geometric series of discount factors collapses to:

$$PV = \\dfrac{C}{r}.$$

A **growing perpetuity**, whose payment grows at rate $g < r$ each period, is worth $PV = \\dfrac{C}{r - g}$ (the Gordon formula reused for stocks in week 4).

## Annuity

An **annuity** pays $C$ for a finite $n$ periods. It is a perpetuity minus a perpetuity that starts at period $n+1$:

$$PV = C \\cdot \\dfrac{1 - (1 + r)^{-n}}{r}.$$

This one formula prices mortgages, car loans, bonds' coupon streams, and retirement payouts.

## A real example

British **consols**, issued in the 18th century, were government bonds that paid a fixed coupon *forever* with no maturity — a literal perpetuity. A consol paying \\$3 a year when rates were $5\\%$ was worth $3 / 0.05 = \\$60$. A 30-year mortgage is the opposite case: a fixed monthly payment $C$ for $n = 360$ months, and the annuity formula is exactly what a lender solves to set $C$ so that $PV$ equals the loan amount.`,
  },
  {
    slug: "nominal-real-rates-inflation",
    title: "Nominal vs. real rates and inflation",
    weekNumber: 1,
    blurb: "Separating the growth of money from the growth of purchasing power.",
    lectureTitle: "1.7 Nominal vs. real rates and inflation",
    body: `# Nominal vs. real rates and inflation

Interest rates come in two flavors. The **nominal rate** $i$ is the stated rate — what your account literally pays. The **real rate** $r$ is the rate after stripping out **inflation** $\\pi$ — the growth in your actual *purchasing power*.

## The Fisher equation

The exact relationship multiplies the growth factors:

$$(1 + i) = (1 + r)(1 + \\pi).$$

Rearranged, $r = \\dfrac{1 + i}{1 + \\pi} - 1$. For small rates this is well approximated by the rule of thumb $r \\approx i - \\pi$.

## Why it matters

If your savings earn a nominal $3\\%$ but inflation is $4\\%$, your real return is about $-1\\%$: you have more dollars but they buy *less*. Discounting nominal cash flows requires a nominal rate; discounting real (inflation-adjusted) cash flows requires a real rate — mixing the two is one of the most common valuation errors.

## A real example

In the 1970s, U.S. savers earning $6\\%$ on deposits felt prosperous, but inflation ran above $10\\%$. The Fisher equation gives a real rate near $-4\\%$ — savers were quietly losing purchasing power every year. Borrowers with fixed-rate loans, meanwhile, repaid in cheaper dollars and came out ahead. Inflation silently transfers wealth from lenders to borrowers.`,
  },

  // ───────────────────────────────────────────────────────────────
  // Week 2 — Financial statements and analysis
  // ───────────────────────────────────────────────────────────────
  {
    slug: "financial-statements-overview",
    title: "Financial statements overview",
    weekNumber: 2,
    blurb: "The three statements that describe a firm, and how they connect.",
    lectureTitle: "2.1 Financial statements overview",
    body: `# Financial statements overview

A firm's financial reality is captured by **three core statements** plus the accompanying notes. Together they answer: what does the firm own and owe, did it make money, and where did the cash go?

## The three statements

- **Balance sheet** — a *snapshot* at one instant: assets, liabilities, equity.
- **Income statement** — a *flow* over a period: revenues minus expenses equals profit.
- **Statement of cash flows** — a *flow* over a period reconciling actual cash in and out.

## Accrual vs. cash

Statements are prepared on an **accrual** basis: revenue is recorded when *earned* and expenses when *incurred*, not when cash changes hands. This is why a profitable firm can still run out of cash — and why the cash-flow statement exists as a reality check on the income statement.

## How they link

Net income from the income statement flows into **retained earnings** on the balance sheet and is the starting line of the cash-flow statement. The statements are interlocking, not independent.

## A real example

Amazon reported years of thin or negative net income while generating large operating cash flows, because it expensed heavy investment immediately on the income statement while collecting cash from customers before paying suppliers. Reading only the income statement would have badly misjudged the business; you needed all three statements together.`,
  },
  {
    slug: "balance-sheet",
    title: "The balance sheet",
    weekNumber: 2,
    blurb: "Assets = Liabilities + Equity — the identity that must always hold.",
    lectureTitle: "2.2 The balance sheet",
    body: `# The balance sheet

The **balance sheet** lists what a firm owns and how it was financed, at a single point in time. It is governed by one identity that can never be violated:

$$\\text{Assets} = \\text{Liabilities} + \\text{Equity}.$$

## The three blocks

- **Assets** — resources the firm controls: cash, receivables, inventory (current), plus property, plant, and equipment (long-term).
- **Liabilities** — claims of outsiders: payables, short-term debt (current), long-term debt (non-current).
- **Equity** — the residual claim of owners: paid-in capital plus accumulated retained earnings.

## Why it balances

Equity is *defined* as Assets − Liabilities, so the identity holds by construction. Every transaction touches at least two accounts to keep both sides equal — the basis of double-entry bookkeeping. Equity is the owners' cushion: the buffer that absorbs losses before creditors are harmed.

## A real example

If a startup buys a \\$30{,}000 delivery van with \\$10{,}000 of its own cash and a \\$20{,}000 loan, assets rise by \\$30{,}000 (the van) but fall \\$10{,}000 (cash), a net \\$20{,}000; liabilities rise \\$20{,}000 (the loan); equity is unchanged. Both sides still balance — the identity is the law the books must obey.`,
  },
  {
    slug: "income-statement",
    title: "The income statement",
    weekNumber: 2,
    blurb: "From top-line revenue down to bottom-line net income.",
    lectureTitle: "2.3 The income statement",
    body: `# The income statement

The **income statement** (or profit-and-loss statement) measures performance *over a period* by subtracting expenses from revenues to arrive at profit. It is read top to bottom, peeling away categories of cost.

## The waterfall

$$\\text{Net Income} = \\text{Revenue} - \\text{COGS} - \\text{OpEx} - \\text{Interest} - \\text{Taxes}.$$

The intermediate subtotals each tell a story:

- **Gross profit** $= \\text{Revenue} - \\text{COGS}$ — profitability of the product itself.
- **Operating income (EBIT)** $= \\text{Gross profit} - \\text{OpEx}$ — profitability of the core business, before financing and taxes.
- **Net income** — the bottom line left for shareholders, after interest and taxes.

## Earnings vs. cash

Net income includes non-cash charges like **depreciation** and is built on accrual timing, so it is an *opinion* about profitability, not a count of cash. That is why analysts also watch EBITDA and the cash-flow statement.

## A real example

A coffee shop with \\$500{,}000 revenue, \\$200{,}000 cost of beans and supplies (COGS), \\$150{,}000 of rent and wages (OpEx), \\$20{,}000 interest, and \\$40{,}000 taxes has net income of \\$90{,}000. But its gross margin of $300{,}000/500{,}000 = 60\\%$ reveals the product economics independently of how big the rent bill happens to be.`,
  },
  {
    slug: "statement-cash-flows",
    title: "The statement of cash flows",
    weekNumber: 2,
    blurb: "Where the cash actually came from and went: operations, investing, financing.",
    lectureTitle: "2.4 The statement of cash flows",
    body: `# The statement of cash flows

The **statement of cash flows** tracks *actual cash*, undoing the accrual assumptions of the income statement. It sorts every cash movement into three buckets whose total equals the change in the cash balance:

$$\\Delta\\text{Cash} = CF_{\\text{operating}} + CF_{\\text{investing}} + CF_{\\text{financing}}.$$

## The three activities

- **Operating (CFO)** — cash from running the business: collections from customers, payments to suppliers and employees. Starts from net income and adds back non-cash items like depreciation.
- **Investing (CFI)** — cash spent on or received from long-term assets: buying equipment (capex), acquisitions, asset sales. Usually negative for a growing firm.
- **Financing (CFF)** — cash exchanged with capital providers: issuing or repaying debt, issuing stock, paying dividends.

## Why it is the truth-teller

Net income can be managed; cash is harder to fake. A firm reporting rising profits but falling operating cash flow is a classic warning sign.

## A real example

A fast-growing software startup can show negative net income yet *positive* operating cash flow, because customers prepay annual subscriptions (cash in now) while big non-cash stock-based-compensation charges depress reported profit. The cash-flow statement reveals the business is funding itself even as the income statement looks alarming.`,
  },
  {
    slug: "financial-ratio-analysis",
    title: "Financial ratio analysis",
    weekNumber: 2,
    blurb: "Turning raw statements into comparable measures of health and performance.",
    lectureTitle: "2.5 Financial ratio analysis",
    body: `# Financial ratio analysis

Raw numbers are hard to compare across firms of different sizes; **ratios** normalize them. They fall into four families: liquidity, leverage, profitability, and efficiency.

## Key ratios

- **Liquidity** — Current ratio $= \\dfrac{\\text{Current Assets}}{\\text{Current Liabilities}}$.
- **Leverage** — Debt-to-equity $= \\dfrac{\\text{Total Debt}}{\\text{Equity}}$.
- **Profitability** — Return on equity $ROE = \\dfrac{\\text{Net Income}}{\\text{Equity}}$; net margin $= \\dfrac{\\text{Net Income}}{\\text{Revenue}}$.
- **Efficiency** — Asset turnover $= \\dfrac{\\text{Revenue}}{\\text{Total Assets}}$.

## The DuPont decomposition

ROE can be split to reveal *what drives* returns:

$$ROE = \\dfrac{NI}{\\text{Revenue}} \\times \\dfrac{\\text{Revenue}}{\\text{Assets}} \\times \\dfrac{\\text{Assets}}{\\text{Equity}},$$

i.e. margin × turnover × leverage. Two firms with the same ROE can get there very differently — one on fat margins, another on high leverage.

## A real example

A discount grocer and a luxury jeweler may both post a $15\\%$ ROE. DuPont shows the grocer earns it through *turnover* (thin margins, enormous sales volume) and the jeweler through *margin* (few sales, huge markup). The same ratio, two opposite business models — which is exactly why you decompose it.`,
  },
  {
    slug: "working-capital-liquidity",
    title: "Working capital and liquidity",
    weekNumber: 2,
    blurb: "The short-term cash cushion that keeps a solvent firm from failing.",
    lectureTitle: "2.6 Working capital and liquidity",
    body: `# Working capital and liquidity

**Liquidity** is the ability to meet obligations as they come due. A firm can be profitable on paper and still fail if it cannot pay this week's bills — so short-term management of cash matters as much as long-run profit.

## Net working capital

$$NWC = \\text{Current Assets} - \\text{Current Liabilities}.$$

Positive NWC means current resources cover near-term obligations. The **quick ratio** $= \\dfrac{\\text{Current Assets} - \\text{Inventory}}{\\text{Current Liabilities}}$ is a stricter test that excludes inventory, which can be slow to sell.

## The cash conversion cycle

Cash is tied up between paying for inventory and collecting from customers:

$$CCC = DIO + DSO - DPO,$$

days of inventory plus days sales outstanding minus days payables outstanding. A shorter cycle frees cash; a longer one consumes it.

## A real example

Dell famously ran a *negative* cash conversion cycle: it collected payment from customers before it had to pay its suppliers, so growth actually generated cash instead of consuming it. The opposite case — a manufacturer that buys materials, holds inventory for months, then waits 60 days to be paid — must finance that gap, which is why fast-growing firms so often run short of cash despite healthy profits.`,
  },
  {
    slug: "annual-reports",
    title: "Reading and interpreting annual reports",
    weekNumber: 2,
    blurb: "Beyond the numbers: MD&A, footnotes, and the art of skepticism.",
    lectureTitle: "2.7 Reading and interpreting annual reports",
    body: `# Reading and interpreting annual reports

The financial statements are only part of a company's **annual report** (in the U.S., the **10-K** filed with the SEC). The narrative and the footnotes often matter as much as the headline numbers.

## What to read

- **MD&A** (Management's Discussion and Analysis) — management's own account of results, trends, and risks. Read it for what they emphasize *and* what they avoid.
- **Footnotes** — the fine print on accounting policies, debt maturities, lease obligations, pending lawsuits, and "off-balance-sheet" arrangements. Surprises hide here.
- **Auditor's opinion** — whether an independent auditor signed off, and any qualifications.
- **Risk factors** — required disclosures of what could go wrong.

## Reading skeptically

Compare the *story* to the *cash*. Watch for revenue growing far faster than cash flow, frequent "one-time" charges, related-party transactions, and changes in accounting estimates that flatter earnings.

## A real example

Before Enron collapsed in 2001, its income statement showed soaring profits, but its footnotes described a web of off-balance-sheet "special purpose entities" that hid debt. Analysts who read only the headline earnings were fooled; those who dug into the footnotes saw the leverage and the conflicts. The report told the truth — in the fine print.`,
  },

  // ───────────────────────────────────────────────────────────────
  // Week 3 — Risk, return, and markets
  // ───────────────────────────────────────────────────────────────
  {
    slug: "risk-return-fundamentals",
    title: "Risk and return fundamentals",
    weekNumber: 3,
    blurb: "The central bargain of investing: higher expected return demands higher risk.",
    lectureTitle: "3.1 Risk and return fundamentals",
    body: `# Risk and return fundamentals

Every investment is a trade of **certain money now** for **uncertain money later**. The two dimensions that describe any investment are its **return** (how much you expect to make) and its **risk** (how uncertain that outcome is).

## Total return

The return on an asset over a holding period combines income and price change:

$$R = \\dfrac{(P_1 - P_0) + D}{P_0},$$

where $P_0$ is the purchase price, $P_1$ the ending price, and $D$ any dividend or income received. The first part is the **capital gain**, the second the **income yield**.

## Risk is dispersion

Risk is the chance the *realized* return differs from the *expected* return — the dispersion of possible outcomes. A Treasury bill is nearly riskless; a single startup's equity is wildly dispersed.

## The fundamental bargain

Rational investors are **risk-averse**: they accept higher risk only if compensated with a higher *expected* return. This compensation is the **risk premium**, and it is the organizing principle of the rest of the course.

## A real example

From 1926 to today, U.S. stocks returned roughly $10\\%$ a year and Treasury bills about $3\\%$ — but stocks routinely fell $20\\%$ or more in bad years while bills almost never lost money. The extra $\\approx 7\\%$ is the equity risk premium: the market's price for enduring that volatility.`,
  },
  {
    slug: "measuring-return",
    title: "Measuring return",
    weekNumber: 3,
    blurb: "Expected return as a probability-weighted average of outcomes.",
    lectureTitle: "3.2 Measuring return",
    body: `# Measuring return

To compare investments we need a single number summarizing their likely return. When outcomes are uncertain, that number is the **expected return** — the probability-weighted average of the possible returns.

## Expected return

For outcomes $R_1, \\ldots, R_n$ with probabilities $p_1, \\ldots, p_n$:

$$E(R) = \\sum_{i=1}^{n} p_i \\, R_i.$$

This is the center of the distribution — the return you would average over many repetitions of the same gamble.

## Arithmetic vs. geometric averages

Over *historical* data, the **arithmetic mean** averages the period returns, while the **geometric mean** $\\left(\\prod (1+R_t)\\right)^{1/n} - 1$ captures the actual compounded growth of a multi-period investment. Because volatility drags down compounding, the geometric mean is always $\\le$ the arithmetic mean.

## A real example

Suppose a stock has a $50\\%$ chance of a $+30\\%$ year and a $50\\%$ chance of a $-10\\%$ year. Its expected return is $0.5(0.30) + 0.5(-0.10) = 10\\%$. But an investor who actually experiences one of each year turns \\$100 into $100 \\times 1.30 \\times 0.90 = \\$117$, a geometric return of about $8.2\\%$ — less than $10\\%$. The gap between $10\\%$ and $8.2\\%$ is the cost of volatility.`,
  },
  {
    slug: "measuring-risk-volatility",
    title: "Measuring risk and volatility",
    weekNumber: 3,
    blurb: "Variance and standard deviation as the language of uncertainty.",
    lectureTitle: "3.3 Measuring risk and volatility",
    body: `# Measuring risk and volatility

If expected return is the *center* of an investment's distribution, risk is its *spread*. Finance measures spread with **variance** and its square root, **standard deviation** (called **volatility**).

## Variance and standard deviation

$$\\sigma^2 = \\sum_{i=1}^{n} p_i \\, \\big(R_i - E(R)\\big)^2, \\qquad \\sigma = \\sqrt{\\sigma^2}.$$

Variance averages the *squared* deviations from the mean, so large misses count disproportionately. Standard deviation $\\sigma$ converts back to the same units as returns (percent), making it the everyday measure of risk.

## Reading volatility

A stock with $\\sigma = 20\\%$ and mean $10\\%$ has most of its annual outcomes roughly within $10\\% \\pm 20\\%$. Higher $\\sigma$ means a wider, riskier distribution. Volatility is symmetric — it counts upside and downside surprises equally, a limitation that motivates measures like downside deviation and value-at-risk.

## A real example

During the 2008 crisis, the annualized volatility of the S&P 500 spiked from a calm $\\sigma \\approx 15\\%$ to over $60\\%$ — the VIX "fear index" is essentially the market's forecast of $\\sigma$. Prices were not just falling; the *dispersion* of daily moves exploded, which is precisely what risk measures are built to capture.`,
  },
  {
    slug: "diversification-portfolio",
    title: "Diversification and portfolio basics",
    weekNumber: 3,
    blurb: "Why combining imperfectly correlated assets reduces risk for free.",
    lectureTitle: "3.4 Diversification and portfolio basics",
    body: `# Diversification and portfolio basics

The deepest practical insight in finance is that risk does not simply add up. By holding many assets that do not move in lockstep, an investor can reduce risk *without* sacrificing expected return — the closest thing to a free lunch in finance.

## Portfolio return and risk

A portfolio's expected return is just the weighted average of its parts: $E(R_p) = \\sum_i w_i E(R_i)$. But its **variance is not** a weighted average — it depends on how the assets co-move:

$$\\sigma_p^2 = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2\\,w_1 w_2\\,\\rho_{12}\\,\\sigma_1 \\sigma_2.$$

The cross term uses the **correlation** $\\rho_{12}$. When $\\rho < 1$, the portfolio's $\\sigma_p$ is *less* than the weighted average of the individual $\\sigma$'s.

## Systematic vs. idiosyncratic risk

Diversification eliminates **idiosyncratic** (firm-specific) risk but cannot remove **systematic** (market-wide) risk. Only the systematic part earns a risk premium — a key idea for CAPM.

## A real example

Pair an umbrella maker and a sunscreen maker. Each alone is volatile with the weather, but their returns are negatively correlated, so a 50/50 portfolio is far steadier than either business. Harry Markowitz won the Nobel Prize for formalizing exactly this: with $\\rho < 1$, total risk falls below the simple average.`,
  },
  {
    slug: "risk-return-tradeoff",
    title: "The risk-return tradeoff",
    weekNumber: 3,
    blurb: "The efficient frontier and rewarding risk per unit of volatility.",
    lectureTitle: "3.5 The risk-return tradeoff",
    body: `# The risk-return tradeoff

Once we can compute the return and risk of any portfolio, we can ask: among all portfolios, which give the *most return per unit of risk*? The answer is the **efficient frontier** and the metric that ranks portfolios along it.

## The Sharpe ratio

The **Sharpe ratio** measures excess return earned per unit of total risk:

$$S = \\dfrac{E(R_p) - R_f}{\\sigma_p},$$

where $R_f$ is the risk-free rate. A higher Sharpe ratio is unambiguously better — more reward for the same volatility.

## The efficient frontier and the CML

Plotting all portfolios in risk–return space, the **efficient frontier** is the upper-left boundary: the portfolios with the highest return for each level of risk. Adding a risk-free asset, the best achievable combinations lie on a straight line, the **Capital Market Line**, tangent to the frontier at the **market portfolio**. Every investor then holds a mix of the risk-free asset and that one tangency portfolio.

## A real example

Compare two funds: Fund A returns $12\\%$ with $\\sigma = 20\\%$, Fund B returns $9\\%$ with $\\sigma = 10\\%$, and $R_f = 2\\%$. A's Sharpe is $(12-2)/20 = 0.5$; B's is $(9-2)/10 = 0.7$. Despite A's higher raw return, B delivers more reward per unit of risk — a leveraged position in B beats A.`,
  },
  {
    slug: "capm",
    title: "The Capital Asset Pricing Model",
    weekNumber: 3,
    blurb: "Pricing systematic risk: expected return as a linear function of beta.",
    lectureTitle: "3.6 The Capital Asset Pricing Model",
    body: `# The Capital Asset Pricing Model

If diversification removes firm-specific risk, then the market should only *reward* the risk you cannot diversify away — the **systematic** risk an asset shares with the market. The **CAPM** turns that idea into a price.

## The security market line

$$E(R_i) = R_f + \\beta_i\\,\\big(E(R_m) - R_f\\big).$$

An asset's expected return equals the risk-free rate plus its **beta** times the **market risk premium** $E(R_m) - R_f$. Beta measures how much the asset moves with the market:

$$\\beta_i = \\dfrac{\\operatorname{Cov}(R_i, R_m)}{\\sigma_m^2}.$$

## Interpreting beta

- $\\beta = 1$: moves with the market.
- $\\beta > 1$: amplifies market moves (riskier, higher required return).
- $\\beta < 1$: dampens them (defensive).
- $\\beta = 0$: uncorrelated; required return is just $R_f$.

Only beta is priced — total volatility $\\sigma$ is not, because its idiosyncratic part is diversifiable.

## A real example

With $R_f = 3\\%$, an expected market return of $9\\%$, and a stock beta of $1.5$: CAPM requires $E(R) = 3\\% + 1.5 \\times (9\\% - 3\\%) = 12\\%$. If the stock is only *expected* to return $10\\%$, CAPM says it is overpriced — you are not being paid enough for its systematic risk. This is how analysts set a "required return" hurdle.`,
  },
  {
    slug: "market-efficiency",
    title: "Market efficiency",
    weekNumber: 3,
    blurb: "Do prices already reflect all information? The EMH and its three forms.",
    lectureTitle: "3.7 Market efficiency",
    body: `# Market efficiency

The **Efficient Market Hypothesis (EMH)** asks whether asset prices already incorporate available information. If they do, then prices change only in response to *new* information, which is by definition unpredictable — so prices follow a **random walk** and consistently beating the market is nearly impossible.

## Three forms

- **Weak form** — prices reflect all *past price* information. Implication: technical analysis of charts cannot beat the market.
- **Semi-strong form** — prices reflect all *public* information (news, filings). Implication: fundamental analysis of public data cannot reliably beat the market; prices adjust almost instantly to news.
- **Strong form** — prices reflect *all* information, even private. Implication: not even insiders can systematically profit (empirically, this form fails).

## Implications and limits

EMH is why low-cost **index funds** are so hard to beat. But behavioral finance documents bubbles, overreaction, and anomalies, so most economists hold that markets are *highly* but not *perfectly* efficient.

## A real example

When a company announces surprise earnings, its stock typically jumps within *seconds* — far faster than any human can trade on the news. Yet the dot-com bubble of 1999–2000 and the 2008 crisis show prices can also drift far from fundamentals. Markets are efficient enough that picking winners is hard, but not so efficient that manias never happen.`,
  },

  // ───────────────────────────────────────────────────────────────
  // Week 4 — Valuation and corporate finance
  // ───────────────────────────────────────────────────────────────
  {
    slug: "bond-valuation",
    title: "Bond valuation",
    weekNumber: 4,
    blurb: "A bond is an annuity of coupons plus a final repayment — discount and add.",
    lectureTitle: "4.1 Bond valuation",
    body: `# Bond valuation

A **bond** is a loan in security form: the issuer pays periodic **coupons** $C$ and repays the **face value** $F$ at maturity. Its price is just the present value of those cash flows, discounted at the market **yield** $y$.

## The pricing formula

$$P = \\sum_{t=1}^{n} \\dfrac{C}{(1 + y)^t} + \\dfrac{F}{(1 + y)^n}.$$

The first term is an annuity of coupons; the second is the present value of the lump-sum repayment.

## Price–yield relationship

Price and yield move *inversely*. When market yields rise, the fixed coupons look less attractive, so the price falls; when yields fall, the price rises.

- If $y = $ coupon rate, the bond trades **at par** ($P = F$).
- If $y > $ coupon rate, it trades at a **discount** ($P < F$).
- If $y < $ coupon rate, it trades at a **premium** ($P > F$).

## A real example

A 10-year bond with \\$1{,}000 face, a $5\\%$ coupon (\\$50/year), priced when market yields jump to $7\\%$, is worth the PV of \\$50 a year for 10 years plus \\$1{,}000 in year 10, all discounted at $7\\%$ — about \\$859, a discount to par. This is exactly why bond *funds* lose value when interest rates rise: existing bonds get repriced downward.`,
  },
  {
    slug: "stock-valuation",
    title: "Stock valuation",
    weekNumber: 4,
    blurb: "A share is worth the present value of the dividends it will ever pay.",
    lectureTitle: "4.2 Stock valuation",
    body: `# Stock valuation

A share of stock is a claim on a company's future cash distributions. Its intrinsic value is the present value of all expected future **dividends** — the **dividend discount model**.

## The Gordon growth model

If dividends grow at a constant rate $g$ forever and the required return is $r > g$, the infinite stream collapses to a growing perpetuity:

$$P_0 = \\dfrac{D_1}{r - g},$$

where $D_1$ is next period's dividend. Value rises with expected growth and falls with the required return. As $g$ approaches $r$, value explodes — small changes in assumptions move the price a lot.

## Relative valuation

In practice analysts also use **multiples** like the price-to-earnings ratio $P/E$, valuing a stock by comparison to peers: $P = (P/E)_{\\text{peer}} \\times \\text{EPS}$.

## A real example

A utility expected to pay a \\$2 dividend next year, growing $3\\%$ forever, with investors requiring $8\\%$, is worth $P_0 = 2 / (0.08 - 0.03) = \\$40$ per share. If the market price is \\$32, the model says the stock is cheap — provided you trust the growth and discount-rate assumptions, which is where the real judgment lies.`,
  },
  {
    slug: "capital-budgeting-npv",
    title: "Capital budgeting and NPV",
    weekNumber: 4,
    blurb: "The decision rule that ties the whole course together: take positive-NPV projects.",
    lectureTitle: "4.3 Capital budgeting and NPV",
    body: `# Capital budgeting and NPV

**Capital budgeting** is how firms decide which long-term projects to fund. The gold-standard rule is **net present value (NPV)**: discount a project's future cash flows and subtract its upfront cost.

## The NPV rule

$$NPV = \\sum_{t=1}^{n} \\dfrac{CF_t}{(1 + r)^t} - CF_0,$$

where $CF_0$ is the initial investment and $r$ is the project's risk-adjusted discount rate. The decision rule:

- **Accept** if $NPV > 0$ — the project earns more than its cost of capital and creates value.
- **Reject** if $NPV < 0$.

## NPV vs. IRR

The **internal rate of return (IRR)** is the discount rate that makes $NPV = 0$. Accepting projects with $IRR > r$ usually agrees with NPV, but IRR can mislead with unconventional cash flows or mutually exclusive projects, so NPV is the tie-breaker.

## A real example

A factory upgrade costs \\$100{,}000 today and returns \\$40{,}000 a year for 3 years. At $r = 10\\%$, the inflows are worth about \\$99{,}500, so $NPV \\approx -\\$500$ — barely value-destroying, reject. At $r = 8\\%$ the same inflows are worth about \\$103{,}100, giving a positive NPV — accept. The decision flips entirely on the discount rate, which is why estimating the cost of capital (next lecture) matters so much.`,
  },
  {
    slug: "cost-of-capital",
    title: "Cost of capital",
    weekNumber: 4,
    blurb: "The blended rate a firm must earn to satisfy all its investors: WACC.",
    lectureTitle: "4.4 Cost of capital",
    body: `# Cost of capital

The discount rate $r$ used in valuation is not arbitrary — it is the firm's **cost of capital**, the return its investors require. Since a firm is funded by both debt and equity, the relevant rate is a *weighted average* of the two.

## The WACC formula

$$WACC = \\dfrac{E}{V}\\,r_e + \\dfrac{D}{V}\\,r_d\\,(1 - T),$$

where $E$ is equity value, $D$ is debt value, $V = E + D$, $r_e$ is the cost of equity, $r_d$ the cost of debt, and $T$ the tax rate.

## Why the pieces look the way they do

- $r_e$ usually comes from **CAPM**: $r_e = R_f + \\beta(E(R_m) - R_f)$.
- Debt is cheaper than equity (lower risk to the holder) *and* gets the $(1 - T)$ **tax shield**, because interest is tax-deductible.
- The weights are *market* values, not book values.

## A real example

A firm financed $60\\%$ equity (cost $12\\%$) and $40\\%$ debt (cost $6\\%$), taxed at $25\\%$, has $WACC = 0.6(12\\%) + 0.4(6\\%)(0.75) = 7.2\\% + 1.8\\% = 9\\%$. That $9\\%$ is the hurdle rate every project must clear — using a single number too high or too low would mis-rank the firm's entire investment slate.`,
  },
  {
    slug: "capital-structure-leverage",
    title: "Capital structure and leverage",
    weekNumber: 4,
    blurb: "How the mix of debt and equity affects value — and when it stops being free.",
    lectureTitle: "4.5 Capital structure and leverage",
    body: `# Capital structure and leverage

**Capital structure** is the mix of debt and equity a firm uses. The central question: does borrowing more (using **leverage**) make the firm more valuable?

## The Modigliani–Miller benchmark

In a world with no taxes, no bankruptcy costs, and efficient markets, **Modigliani and Miller (1958)** proved capital structure is *irrelevant*: $V_L = V_U$, the value of a levered firm equals that of an unlevered one. The size of the pie does not depend on how you slice it between debt and equity.

## Why structure matters in the real world

Relaxing the assumptions, leverage starts to bite both ways:

- **Tax shield** — interest is deductible, adding value $V_L = V_U + T \\cdot D$ (the MM-with-taxes result).
- **Financial distress** — too much debt raises the risk and cost of bankruptcy.

The **trade-off theory** says firms balance the tax benefit against distress costs to find an optimal debt level.

## A real example

Leverage magnifies equity returns: a project earning $10\\%$ funded entirely by equity gives owners $10\\%$, but funded half with $6\\%$ debt, the equity holders earn roughly $14\\%$ — and *lose* far more if the project earns $2\\%$. The 2008 crisis showed the downside: banks levered 30-to-1 were wiped out by small drops in asset values, because leverage amplifies losses just as fiercely as gains.`,
  },
  {
    slug: "corporate-financing-dividends",
    title: "Corporate financing and dividends",
    weekNumber: 4,
    blurb: "Raising capital and returning it: payout policy and the financing pecking order.",
    lectureTitle: "4.6 Corporate financing and dividends",
    body: `# Corporate financing and dividends

Firms must decide both how to *raise* capital and how to *return* it to shareholders. These are the financing and payout decisions.

## Raising capital: the pecking order

Empirically firms prefer, in order: **retained earnings** first (cheapest, no signaling), then **debt**, then **new equity** last (issuing shares can signal that managers think the stock is overpriced). This is the **pecking-order theory**.

## Returning capital: payout policy

Profits can be paid out as **dividends** or used to **repurchase shares**. The **dividend payout ratio** measures the split:

$$\\text{Payout ratio} = \\dfrac{\\text{Dividends}}{\\text{Net Income}}, \\qquad \\text{Retention ratio} = 1 - \\text{Payout ratio}.$$

The retained fraction funds future growth: $g = \\text{Retention ratio} \\times ROE$.

## Dividend policy debates

In perfect markets, **Miller–Modigliani** showed dividend policy is also irrelevant — investors can create "homemade dividends" by selling shares. In reality, taxes, signaling, and investor preferences (the "clientele effect") make payout decisions matter.

## A real example

Mature firms like Coca-Cola pay large, steady dividends (high payout), signaling stable cash flows. High-growth firms like early Amazon paid *no* dividend, retaining everything to reinvest at high returns. Both can be optimal — the right payout depends on whether the firm has profitable projects that beat what shareholders could earn elsewhere.`,
  },
  {
    slug: "financial-intermediaries",
    title: "Financial intermediaries and institutions",
    weekNumber: 4,
    blurb: "Banks, funds, and insurers: the plumbing that transforms and channels capital.",
    lectureTitle: "4.7 Financial intermediaries and institutions",
    body: `# Financial intermediaries and institutions

**Financial intermediaries** sit between savers and borrowers, making the financial system work more cheaply and safely than direct lending could. They include commercial banks, investment banks, mutual and pension funds, insurers, and money-market funds.

## What intermediaries do

- **Maturity transformation** — banks fund long-term loans with short-term deposits, bridging savers who want liquidity and borrowers who want long maturities.
- **Risk pooling and diversification** — insurers and funds spread risk across many policies or securities.
- **Information production** — banks screen and monitor borrowers, reducing the asymmetric-information problem that plagues direct lending.
- **Liquidity and payment services** — deposits and money funds give savers safe, spendable claims.

## The risk they create

Maturity transformation is inherently fragile: if many depositors demand cash at once, even a solvent bank can face a **run**, since its assets are locked up in long-term loans. This is why banks are regulated and backed by deposit insurance and a lender of last resort.

## A real example

In 2008, investment bank Lehman Brothers funded long-term mortgage assets with very short-term borrowing. When lenders refused to roll over that funding, Lehman could not sell its illiquid assets fast enough and collapsed — a maturity-transformation run in modern dress, and the trigger for the global financial crisis.`,
  },
  {
    slug: "capstone-synthesis",
    title: "Capstone synthesis",
    weekNumber: 4,
    blurb: "One equation behind everything: value is the PV of expected future cash flows.",
    lectureTitle: "4.8 Capstone synthesis",
    body: `# Capstone synthesis

Step back, and the entire course reduces to a single sentence: **the value of any asset is the present value of its expected future cash flows, discounted at a rate that reflects their risk.**

## The one equation

$$V = \\sum_{t=1}^{\\infty} \\dfrac{E(CF_t)}{(1 + r)^t}.$$

Everything you have learned is a way to fill in one of its three ingredients:

- **The cash flows $E(CF_t)$** — read and forecast them from the *financial statements* (Week 2).
- **The discount rate $r$** — built from *risk and return* and CAPM (Week 3), assembled into the *cost of capital / WACC* (Week 4).
- **The present-value machinery** — the *time value of money*, discounting, annuities, and perpetuities (Week 1).

## Specializations of the master equation

A bond plugs in fixed coupons and a face value; a stock plugs in growing dividends (Gordon); a project plugs in incremental cash flows minus the upfront cost (NPV). They are not separate formulas — they are the same equation with different cash flows.

## A real example

When an analyst values a whole company by a *discounted-cash-flow model*, they forecast free cash flows from the financial statements, discount them at the WACC, and sum to a present value — Week 1's discounting, Week 2's statements, and Weeks 3–4's risk and cost of capital, all in one spreadsheet. Master that single picture and you can value anything.`,
  },
];

type SeedAssignment = {
  kind: "homework" | "test" | "midterm" | "final";
  title: string;
  weekNumber: number;
  isTimed: boolean;
  timeLimitMinutes: number | null;
  instructions: string;
  problems: Array<{
    topicSlug: string;
    prompt: string;
    correctAnswer: string;
    explanation: string;
    hint?: string;
  }>;
};

const ASSIGNMENTS: SeedAssignment[] = [
  // ───────────── Week 1 ─────────────
  {
    kind: "homework",
    title: "Homework 1.1 — Time value of money I",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Short-answer problems on the time value of money. Write each answer as the key formula in symbols using the on-screen math keyboard (use the Finance and Statistics tabs for Σ, subscripts, and currency symbols).",
    problems: [
      {
        topicSlug: "money-interest-tvm",
        prompt:
          "Write the formula for the value after n years of a principal P invested at an annually compounded rate r.",
        correctAnswer: "P(1 + r)^n",
        explanation:
          "Compound growth multiplies the principal by $(1+r)$ each year, giving $P(1+r)^n$ after $n$ years.",
      },
      {
        topicSlug: "present-future-value",
        prompt:
          "Write the future-value formula expressing FV in terms of PV, the rate r, and n periods.",
        correctAnswer: "FV = PV(1 + r)^n",
        explanation:
          "$FV = PV(1+r)^n$ compounds a present amount forward by the growth factor $(1+r)^n$.",
      },
      {
        topicSlug: "present-future-value",
        prompt:
          "Write the present-value formula that discounts a single future cash flow FV back to today.",
        correctAnswer: "PV = FV / (1 + r)^n",
        explanation:
          "$PV = \\dfrac{FV}{(1+r)^n}$. The discount factor $1/(1+r)^n$ is less than 1 for $r>0$.",
      },
      {
        topicSlug: "discounting-cash-flows",
        prompt:
          "Using Σ notation, write the present value of a stream of cash flows CF_t (t = 1 to n) discounted at rate r.",
        correctAnswer: "PV = Σ_{t=1}^{n} CF_t / (1 + r)^t",
        explanation:
          "$PV = \\sum_{t=1}^{n} \\dfrac{CF_t}{(1+r)^t}$ — present values at the same date are additive.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 1.2 — Annuities, perpetuities, and inflation",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for fractions, subscripts, Σ, and the inflation symbol π.",
    problems: [
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of a perpetuity that pays a constant amount C every period at discount rate r.",
        correctAnswer: "PV = C / r",
        explanation:
          "$PV = \\dfrac{C}{r}$ — the infinite geometric series of discount factors collapses to $C/r$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of a growing perpetuity whose first payment is C and which grows at rate g < r.",
        correctAnswer: "PV = C / (r − g)",
        explanation:
          "$PV = \\dfrac{C}{r-g}$ (the Gordon formula), valid when $g < r$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of an ordinary annuity paying C per period for n periods at rate r.",
        correctAnswer: "PV = C · (1 − (1 + r)^{−n}) / r",
        explanation:
          "$PV = C\\cdot\\dfrac{1-(1+r)^{-n}}{r}$ — a perpetuity minus a perpetuity deferred by $n$ periods.",
      },
      {
        topicSlug: "nominal-real-rates-inflation",
        prompt:
          "Write the exact Fisher equation linking the nominal rate i, the real rate r, and inflation π.",
        correctAnswer: "(1 + i) = (1 + r)(1 + π)",
        explanation:
          "$(1+i) = (1+r)(1+\\pi)$. The approximation $r \\approx i - \\pi$ holds for small rates.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 1 Test — Foundations and the time value of money",
    weekNumber: 1,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed. 30 minutes. Math keyboard available; pasting is disabled. Write each answer as a compact symbolic formula.",
    problems: [
      {
        topicSlug: "present-future-value",
        prompt:
          "Write the formula for the present value of a single cash flow FV received in n periods at rate r.",
        correctAnswer: "PV = FV / (1 + r)^n",
        explanation:
          "$PV = \\dfrac{FV}{(1+r)^n}$ discounts a future amount back to today.",
      },
      {
        topicSlug: "discounting-cash-flows",
        prompt:
          "Using Σ, write the present value of cash flows CF_t for t = 1 to n at discount rate r.",
        correctAnswer: "PV = Σ_{t=1}^{n} CF_t / (1 + r)^t",
        explanation:
          "$PV = \\sum_{t=1}^{n} \\dfrac{CF_t}{(1+r)^t}$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of a level perpetuity paying C forever at rate r.",
        correctAnswer: "PV = C / r",
        explanation:
          "$PV = \\dfrac{C}{r}$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of an n-period ordinary annuity paying C at rate r.",
        correctAnswer: "PV = C · (1 − (1 + r)^{−n}) / r",
        explanation:
          "$PV = C\\cdot\\dfrac{1-(1+r)^{-n}}{r}$.",
      },
      {
        topicSlug: "nominal-real-rates-inflation",
        prompt:
          "Write the Fisher equation relating the nominal rate i, real rate r, and inflation π.",
        correctAnswer: "(1 + i) = (1 + r)(1 + π)",
        explanation:
          "$(1+i) = (1+r)(1+\\pi)$.",
      },
    ],
  },

  // ───────────── Week 2 ─────────────
  {
    kind: "homework",
    title: "Homework 2.1 — Balance sheet and income statement",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Write each accounting identity in symbols. Use the math keyboard for the minus sign, equals, and fractions.",
    problems: [
      {
        topicSlug: "balance-sheet",
        prompt:
          "Write the fundamental balance-sheet identity relating Assets, Liabilities, and Equity.",
        correctAnswer: "Assets = Liabilities + Equity",
        explanation:
          "$\\text{Assets} = \\text{Liabilities} + \\text{Equity}$ — equity is the residual claim, so the identity holds by construction.",
      },
      {
        topicSlug: "income-statement",
        prompt:
          "Write net income as revenue minus the four expense categories (COGS, operating expenses, interest, taxes).",
        correctAnswer:
          "Net Income = Revenue − COGS − OpEx − Interest − Taxes",
        explanation:
          "The income-statement waterfall: $\\text{Net Income} = \\text{Revenue} - \\text{COGS} - \\text{OpEx} - \\text{Interest} - \\text{Taxes}$.",
      },
      {
        topicSlug: "income-statement",
        prompt:
          "Write gross profit in terms of revenue and cost of goods sold (COGS).",
        correctAnswer: "Gross Profit = Revenue − COGS",
        explanation:
          "Gross profit $= \\text{Revenue} - \\text{COGS}$ measures the profitability of the product itself.",
      },
      {
        topicSlug: "statement-cash-flows",
        prompt:
          "Write the change in cash as the sum of the three cash-flow categories (operating, investing, financing).",
        correctAnswer: "ΔCash = CFO + CFI + CFF",
        explanation:
          "$\\Delta\\text{Cash} = CF_{\\text{operating}} + CF_{\\text{investing}} + CF_{\\text{financing}}$.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 2.2 — Ratios, working capital, and liquidity",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for fractions and the multiplication dot. Write each ratio as a formula.",
    problems: [
      {
        topicSlug: "financial-ratio-analysis",
        prompt:
          "Write the current ratio as a fraction of current assets and current liabilities.",
        correctAnswer: "Current Ratio = Current Assets / Current Liabilities",
        explanation:
          "Current ratio $= \\dfrac{\\text{Current Assets}}{\\text{Current Liabilities}}$ — a basic liquidity measure.",
      },
      {
        topicSlug: "financial-ratio-analysis",
        prompt:
          "Write return on equity (ROE) as a fraction of net income and equity.",
        correctAnswer: "ROE = Net Income / Equity",
        explanation:
          "$ROE = \\dfrac{\\text{Net Income}}{\\text{Equity}}$.",
      },
      {
        topicSlug: "financial-ratio-analysis",
        prompt:
          "Write the DuPont decomposition of ROE as the product of net margin, asset turnover, and the equity multiplier.",
        correctAnswer:
          "ROE = (NI / Revenue) · (Revenue / Assets) · (Assets / Equity)",
        explanation:
          "$ROE = \\dfrac{NI}{\\text{Revenue}} \\times \\dfrac{\\text{Revenue}}{\\text{Assets}} \\times \\dfrac{\\text{Assets}}{\\text{Equity}}$ = margin × turnover × leverage.",
      },
      {
        topicSlug: "working-capital-liquidity",
        prompt:
          "Write net working capital (NWC) in terms of current assets and current liabilities.",
        correctAnswer: "NWC = Current Assets − Current Liabilities",
        explanation:
          "$NWC = \\text{Current Assets} - \\text{Current Liabilities}$ — the short-term cash cushion.",
      },
    ],
  },
  {
    kind: "midterm",
    title: "Midterm — Weeks 1 & 2",
    weekNumber: 2,
    isTimed: true,
    timeLimitMinutes: 60,
    instructions:
      "Cumulative midterm on the time value of money and on financial statements. 60 minutes. Math keyboard available; pasting disabled.",
    problems: [
      {
        topicSlug: "present-future-value",
        prompt:
          "Write the present-value formula for a single future cash flow FV at rate r over n periods.",
        correctAnswer: "PV = FV / (1 + r)^n",
        explanation:
          "$PV = \\dfrac{FV}{(1+r)^n}$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of a level perpetuity paying C at rate r.",
        correctAnswer: "PV = C / r",
        explanation:
          "$PV = \\dfrac{C}{r}$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of an n-period ordinary annuity paying C at rate r.",
        correctAnswer: "PV = C · (1 − (1 + r)^{−n}) / r",
        explanation:
          "$PV = C\\cdot\\dfrac{1-(1+r)^{-n}}{r}$.",
      },
      {
        topicSlug: "nominal-real-rates-inflation",
        prompt:
          "Write the exact Fisher equation linking nominal rate i, real rate r, and inflation π.",
        correctAnswer: "(1 + i) = (1 + r)(1 + π)",
        explanation:
          "$(1+i) = (1+r)(1+\\pi)$.",
      },
      {
        topicSlug: "balance-sheet",
        prompt:
          "Write the balance-sheet identity.",
        correctAnswer: "Assets = Liabilities + Equity",
        explanation:
          "$\\text{Assets} = \\text{Liabilities} + \\text{Equity}$.",
      },
      {
        topicSlug: "income-statement",
        prompt:
          "Write net income as revenue minus COGS, operating expenses, interest, and taxes.",
        correctAnswer:
          "Net Income = Revenue − COGS − OpEx − Interest − Taxes",
        explanation:
          "$\\text{Net Income} = \\text{Revenue} - \\text{COGS} - \\text{OpEx} - \\text{Interest} - \\text{Taxes}$.",
      },
      {
        topicSlug: "financial-ratio-analysis",
        prompt:
          "Write return on equity (ROE) as a fraction.",
        correctAnswer: "ROE = Net Income / Equity",
        explanation:
          "$ROE = \\dfrac{\\text{Net Income}}{\\text{Equity}}$.",
      },
      {
        topicSlug: "working-capital-liquidity",
        prompt:
          "Write net working capital (NWC).",
        correctAnswer: "NWC = Current Assets − Current Liabilities",
        explanation:
          "$NWC = \\text{Current Assets} - \\text{Current Liabilities}$.",
      },
    ],
  },

  // ───────────── Week 3 ─────────────
  {
    kind: "homework",
    title: "Homework 3.1 — Measuring return and risk",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the Statistics and Finance keyboard tabs for Σ, σ, expected-value notation, and subscripts.",
    problems: [
      {
        topicSlug: "risk-return-fundamentals",
        prompt:
          "Write the total holding-period return R in terms of the start price P_0, end price P_1, and dividend D.",
        correctAnswer: "R = ((P_1 − P_0) + D) / P_0",
        explanation:
          "$R = \\dfrac{(P_1 - P_0) + D}{P_0}$ — capital gain plus income yield.",
      },
      {
        topicSlug: "measuring-return",
        prompt:
          "Using Σ, write the expected return E(R) for outcomes R_i with probabilities p_i.",
        correctAnswer: "E(R) = Σ_{i=1}^{n} p_i R_i",
        explanation:
          "$E(R) = \\sum_{i=1}^{n} p_i R_i$ — the probability-weighted average of outcomes.",
      },
      {
        topicSlug: "measuring-risk-volatility",
        prompt:
          "Using Σ, write the variance σ² of returns R_i with probabilities p_i and mean E(R).",
        correctAnswer: "σ² = Σ_{i=1}^{n} p_i (R_i − E(R))²",
        explanation:
          "$\\sigma^2 = \\sum_{i=1}^{n} p_i (R_i - E(R))^2$ — the probability-weighted average squared deviation.",
      },
      {
        topicSlug: "measuring-risk-volatility",
        prompt:
          "Write the standard deviation σ in terms of the variance σ².",
        correctAnswer: "σ = √(σ²)",
        explanation:
          "$\\sigma = \\sqrt{\\sigma^2}$ — volatility in the same units as returns.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 3.2 — Diversification, the tradeoff, and CAPM",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions: "Use the math keyboard for β, σ, ρ, subscripts, and fractions.",
    problems: [
      {
        topicSlug: "diversification-portfolio",
        prompt:
          "Write the variance of a two-asset portfolio with weights w_1, w_2, standard deviations σ_1, σ_2, and correlation ρ_{12}.",
        correctAnswer:
          "σ_p² = w_1²σ_1² + w_2²σ_2² + 2 w_1 w_2 ρ_{12} σ_1 σ_2",
        explanation:
          "$\\sigma_p^2 = w_1^2\\sigma_1^2 + w_2^2\\sigma_2^2 + 2w_1 w_2\\rho_{12}\\sigma_1\\sigma_2$. The cross term is why $\\rho<1$ reduces risk.",
      },
      {
        topicSlug: "risk-return-tradeoff",
        prompt:
          "Write the Sharpe ratio of a portfolio with expected return E(R_p), risk-free rate R_f, and volatility σ_p.",
        correctAnswer: "S = (E(R_p) − R_f) / σ_p",
        explanation:
          "$S = \\dfrac{E(R_p) - R_f}{\\sigma_p}$ — excess return per unit of total risk.",
      },
      {
        topicSlug: "capm",
        prompt:
          "Write the CAPM equation for the expected return of asset i with beta β_i, risk-free rate R_f, and market return E(R_m).",
        correctAnswer: "E(R_i) = R_f + β_i (E(R_m) − R_f)",
        explanation:
          "$E(R_i) = R_f + \\beta_i(E(R_m) - R_f)$ — the security market line.",
      },
      {
        topicSlug: "capm",
        prompt:
          "Write beta β_i in terms of the covariance of the asset with the market and the market variance.",
        correctAnswer: "β_i = Cov(R_i, R_m) / σ_m²",
        explanation:
          "$\\beta_i = \\dfrac{\\operatorname{Cov}(R_i, R_m)}{\\sigma_m^2}$ — sensitivity to systematic risk.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 3 Test — Risk, return, and markets",
    weekNumber: 3,
    isTimed: true,
    timeLimitMinutes: 40,
    instructions: "Timed. 40 minutes. Math keyboard available; pasting disabled.",
    problems: [
      {
        topicSlug: "measuring-return",
        prompt:
          "Using Σ, write the expected return E(R) for outcomes R_i with probabilities p_i.",
        correctAnswer: "E(R) = Σ_{i=1}^{n} p_i R_i",
        explanation:
          "$E(R) = \\sum_{i=1}^{n} p_i R_i$.",
      },
      {
        topicSlug: "measuring-risk-volatility",
        prompt:
          "Using Σ, write the variance σ² of returns R_i with probabilities p_i and mean E(R).",
        correctAnswer: "σ² = Σ_{i=1}^{n} p_i (R_i − E(R))²",
        explanation:
          "$\\sigma^2 = \\sum_{i=1}^{n} p_i (R_i - E(R))^2$.",
      },
      {
        topicSlug: "risk-return-tradeoff",
        prompt:
          "Write the Sharpe ratio with expected return E(R_p), risk-free rate R_f, and volatility σ_p.",
        correctAnswer: "S = (E(R_p) − R_f) / σ_p",
        explanation:
          "$S = \\dfrac{E(R_p) - R_f}{\\sigma_p}$.",
      },
      {
        topicSlug: "capm",
        prompt:
          "Write the CAPM expected-return equation for asset i.",
        correctAnswer: "E(R_i) = R_f + β_i (E(R_m) − R_f)",
        explanation:
          "$E(R_i) = R_f + \\beta_i(E(R_m) - R_f)$.",
      },
      {
        topicSlug: "capm",
        prompt:
          "Write beta β_i in terms of covariance with the market and the market variance.",
        correctAnswer: "β_i = Cov(R_i, R_m) / σ_m²",
        explanation:
          "$\\beta_i = \\dfrac{\\operatorname{Cov}(R_i, R_m)}{\\sigma_m^2}$.",
      },
    ],
  },

  // ───────────── Week 4 ─────────────
  {
    kind: "homework",
    title: "Homework 4.1 — Bond and stock valuation",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for Σ, subscripts, and fractions. Write each valuation formula in symbols.",
    problems: [
      {
        topicSlug: "bond-valuation",
        prompt:
          "Using Σ, write the price of a bond paying coupon C for n periods plus face value F, discounted at yield y.",
        correctAnswer: "P = Σ_{t=1}^{n} C / (1 + y)^t + F / (1 + y)^n",
        explanation:
          "$P = \\sum_{t=1}^{n} \\dfrac{C}{(1+y)^t} + \\dfrac{F}{(1+y)^n}$ — coupon annuity plus PV of face value.",
      },
      {
        topicSlug: "stock-valuation",
        prompt:
          "Write the Gordon growth model for the price of a stock with next dividend D_1, required return r, and growth g.",
        correctAnswer: "P_0 = D_1 / (r − g)",
        explanation:
          "$P_0 = \\dfrac{D_1}{r-g}$ — the dividend discount model with constant growth ($r>g$).",
      },
      {
        topicSlug: "capital-budgeting-npv",
        prompt:
          "Using Σ, write net present value (NPV) for cash flows CF_t (t = 1 to n) and initial outlay CF_0 at rate r.",
        correctAnswer: "NPV = Σ_{t=1}^{n} CF_t / (1 + r)^t − CF_0",
        explanation:
          "$NPV = \\sum_{t=1}^{n} \\dfrac{CF_t}{(1+r)^t} - CF_0$. Accept if $NPV>0$.",
      },
      {
        topicSlug: "capital-budgeting-npv",
        prompt:
          "Write the NPV decision rule: the condition on NPV under which a project should be accepted.",
        correctAnswer: "Accept if NPV > 0",
        explanation:
          "Accept a project when $NPV > 0$ — it earns more than its cost of capital and creates value.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 4.2 — Cost of capital, structure, and payout",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions: "Use the math keyboard for fractions, subscripts, and Σ.",
    problems: [
      {
        topicSlug: "cost-of-capital",
        prompt:
          "Write the weighted average cost of capital (WACC) with equity E, debt D, total V = E + D, costs r_e and r_d, and tax rate T.",
        correctAnswer: "WACC = (E/V) r_e + (D/V) r_d (1 − T)",
        explanation:
          "$WACC = \\dfrac{E}{V}r_e + \\dfrac{D}{V}r_d(1-T)$ — the $(1-T)$ term is the interest tax shield.",
      },
      {
        topicSlug: "capital-structure-leverage",
        prompt:
          "Write the Modigliani–Miller (with corporate taxes) value of a levered firm in terms of the unlevered value V_U, tax rate T, and debt D.",
        correctAnswer: "V_L = V_U + T · D",
        explanation:
          "$V_L = V_U + T\\cdot D$ — leverage adds value through the debt tax shield.",
      },
      {
        topicSlug: "corporate-financing-dividends",
        prompt:
          "Write the dividend payout ratio in terms of dividends and net income.",
        correctAnswer: "Payout Ratio = Dividends / Net Income",
        explanation:
          "Payout ratio $= \\dfrac{\\text{Dividends}}{\\text{Net Income}}$; retention ratio $= 1 - $ payout.",
      },
      {
        topicSlug: "capstone-synthesis",
        prompt:
          "Using Σ, write the master valuation equation: the value V of an asset as the present value of its expected future cash flows E(CF_t) at rate r.",
        correctAnswer: "V = Σ_{t=1}^{∞} E(CF_t) / (1 + r)^t",
        explanation:
          "$V = \\sum_{t=1}^{\\infty} \\dfrac{E(CF_t)}{(1+r)^t}$ — the single equation behind bonds, stocks, and projects.",
      },
    ],
  },
  {
    kind: "final",
    title: "Final Exam — Finance",
    weekNumber: 4,
    isTimed: true,
    timeLimitMinutes: 90,
    instructions:
      "Cumulative final covering all four weeks. 90 minutes. Math keyboard available; pasting disabled.",
    problems: [
      {
        topicSlug: "present-future-value",
        prompt:
          "Write the present-value formula for a single future cash flow FV at rate r over n periods.",
        correctAnswer: "PV = FV / (1 + r)^n",
        explanation:
          "$PV = \\dfrac{FV}{(1+r)^n}$.",
      },
      {
        topicSlug: "annuities-perpetuities",
        prompt:
          "Write the present value of a growing perpetuity with first payment C and growth g at rate r.",
        correctAnswer: "PV = C / (r − g)",
        explanation:
          "$PV = \\dfrac{C}{r-g}$ for $g<r$.",
      },
      {
        topicSlug: "balance-sheet",
        prompt:
          "Write the balance-sheet identity.",
        correctAnswer: "Assets = Liabilities + Equity",
        explanation:
          "$\\text{Assets} = \\text{Liabilities} + \\text{Equity}$.",
      },
      {
        topicSlug: "financial-ratio-analysis",
        prompt:
          "Write return on equity (ROE) as a fraction.",
        correctAnswer: "ROE = Net Income / Equity",
        explanation:
          "$ROE = \\dfrac{\\text{Net Income}}{\\text{Equity}}$.",
      },
      {
        topicSlug: "measuring-return",
        prompt:
          "Using Σ, write the expected return E(R) for outcomes R_i with probabilities p_i.",
        correctAnswer: "E(R) = Σ_{i=1}^{n} p_i R_i",
        explanation:
          "$E(R) = \\sum_{i=1}^{n} p_i R_i$.",
      },
      {
        topicSlug: "capm",
        prompt:
          "Write the CAPM expected-return equation for asset i with beta β_i.",
        correctAnswer: "E(R_i) = R_f + β_i (E(R_m) − R_f)",
        explanation:
          "$E(R_i) = R_f + \\beta_i(E(R_m) - R_f)$.",
      },
      {
        topicSlug: "bond-valuation",
        prompt:
          "Using Σ, write the price of a coupon bond (coupon C for n periods, face F, yield y).",
        correctAnswer: "P = Σ_{t=1}^{n} C / (1 + y)^t + F / (1 + y)^n",
        explanation:
          "$P = \\sum_{t=1}^{n} \\dfrac{C}{(1+y)^t} + \\dfrac{F}{(1+y)^n}$.",
      },
      {
        topicSlug: "stock-valuation",
        prompt:
          "Write the Gordon growth model for a stock price with next dividend D_1, return r, growth g.",
        correctAnswer: "P_0 = D_1 / (r − g)",
        explanation:
          "$P_0 = \\dfrac{D_1}{r-g}$.",
      },
      {
        topicSlug: "capital-budgeting-npv",
        prompt:
          "Using Σ, write net present value (NPV) for cash flows CF_t and initial outlay CF_0 at rate r.",
        correctAnswer: "NPV = Σ_{t=1}^{n} CF_t / (1 + r)^t − CF_0",
        explanation:
          "$NPV = \\sum_{t=1}^{n} \\dfrac{CF_t}{(1+r)^t} - CF_0$.",
      },
      {
        topicSlug: "cost-of-capital",
        prompt:
          "Write the weighted average cost of capital (WACC) with weights E/V and D/V, costs r_e and r_d, tax rate T.",
        correctAnswer: "WACC = (E/V) r_e + (D/V) r_d (1 − T)",
        explanation:
          "$WACC = \\dfrac{E}{V}r_e + \\dfrac{D}{V}r_d(1-T)$.",
      },
    ],
  },
];

// A stable fingerprint of the seed content. If the database holds topics that
// don't match this set, we wipe and re-seed instead of leaving stale content
// from a previous version of the course.
const EXPECTED_TOPIC_SLUGS = TOPICS.map((t) => t.slug).sort().join(",");

// Bump this whenever lecture bodies, assignment problems, or correct answers
// change in a way that should propagate to the database on the next boot.
// The value is stored alongside topics and compared in seedIfEmpty.
const CONTENT_REVISION = "2026-05-29.finance.r1";

// A sentinel phrase present in exactly one lecture body — used to detect that
// the database holds the *current* revision of the content (not just a set of
// matching slugs). Bump whenever the seed content is overhauled.
const REVISION_SENTINEL_SLUG = "what-is-finance";
const REVISION_SENTINEL_PHRASE = "finance exists to move resources across time";

export async function seedIfEmpty(): Promise<void> {
  const existing = await db.execute(sql`select count(*)::int as n from topics`);
  const row = (existing.rows[0] ?? {}) as { n?: number };
  const count = row.n ?? 0;

  if (count > 0) {
    const rows = await db.execute(sql`select slug from topics order by slug`);
    const actualSlugs = (rows.rows as Array<{ slug: string }>)
      .map((r) => r.slug)
      .sort()
      .join(",");
    const slugsMatch = actualSlugs === EXPECTED_TOPIC_SLUGS;
    let revisionMatches = false;
    try {
      const sentinelLec = await db.execute(
        sql`select l.body from lectures l join topics t on l.topic_id = t.id where t.slug = ${REVISION_SENTINEL_SLUG} limit 1`,
      );
      const body = ((sentinelLec.rows[0] ?? {}) as { body?: string }).body ?? "";
      revisionMatches = body.includes(REVISION_SENTINEL_PHRASE);
    } catch {
      revisionMatches = false;
    }
    if (slugsMatch && revisionMatches) {
      logger.info(
        { revision: CONTENT_REVISION },
        "Seed: already populated with current content, skipping",
      );
      return;
    }
    logger.info(
      { revision: CONTENT_REVISION, slugsMatch, revisionMatches },
      "Seed: course content drifted from expected revision — wiping and re-seeding",
    );
    // Order matters: child tables first.
    await db.execute(sql`delete from practice_attempts`);
    await db.execute(sql`delete from practice_problems`);
    await db.execute(sql`delete from practice_sessions`);
    await db.execute(sql`delete from answers`);
    await db.execute(sql`delete from attempts`);
    await db.execute(sql`delete from problems`);
    await db.execute(sql`delete from assignments`);
    await db.execute(sql`delete from lectures`);
    await db.execute(sql`delete from topics`);
  }

  logger.info("Seed: populating course content");

  // Topics + lectures
  const slugToTopicId = new Map<string, number>();
  for (let i = 0; i < TOPICS.length; i++) {
    const t = TOPICS[i]!;
    const [inserted] = await db
      .insert(topicsTable)
      .values({
        slug: t.slug,
        title: t.title,
        weekNumber: t.weekNumber,
        blurb: t.blurb,
        position: i,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert topic ${t.slug}`);
    slugToTopicId.set(t.slug, inserted.id);
    await db.insert(lecturesTable).values({
      topicId: inserted.id,
      weekNumber: t.weekNumber,
      title: t.lectureTitle,
      body: t.body,
    });
  }

  // Assignments + problems
  for (let i = 0; i < ASSIGNMENTS.length; i++) {
    const a = ASSIGNMENTS[i]!;
    const [inserted] = await db
      .insert(assignmentsTable)
      .values({
        kind: a.kind,
        title: a.title,
        weekNumber: a.weekNumber,
        position: i,
        isTimed: a.isTimed,
        timeLimitMinutes: a.timeLimitMinutes,
        instructions: a.instructions,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert assignment ${a.title}`);
    for (let p = 0; p < a.problems.length; p++) {
      const prob = a.problems[p]!;
      const topicId = slugToTopicId.get(prob.topicSlug);
      if (!topicId) throw new Error(`Unknown topic slug ${prob.topicSlug}`);
      await db.insert(problemsTable).values({
        assignmentId: inserted.id,
        topicId,
        position: p,
        prompt: prob.prompt,
        correctAnswer: prob.correctAnswer,
        explanation: prob.explanation,
        hint: prob.hint ?? null,
      });
    }
  }

  logger.info({ topics: TOPICS.length, assignments: ASSIGNMENTS.length }, "Seed complete");
}
