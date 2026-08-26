// Static course data extracted from seed.ts
// Used by the prerender script to generate static HTML for each lecture/week URL.
// IDs are assigned at DB-seed time; this file stores the canonical content keyed by (weekNumber, position).

export const WEEK_META = {
  1: {
    title: "Week 1 — Foundations and the time value of money",
    summary:
      "What finance is and why it exists; the financial system and markets; money, interest, and the time value of money; present and future value; discounting cash flows; annuities and perpetuities; nominal vs. real rates and inflation.",
    metaDescription:
      "Build a practical finance foundation: learn why money moves across time, calculate present and future value, and discount cash flows, annuities, and inflation.",
  },
  2: {
    title: "Week 2 — Financial statements and analysis",
    summary:
      "An overview of the financial statements; the balance sheet; the income statement; the statement of cash flows; financial ratio analysis; working capital and liquidity; reading annual reports.",
    metaDescription:
      "Learn to read the three financial statements, connect a firm's numbers, use ratios to assess performance, and evaluate liquidity in real annual reports.",
  },
  3: {
    title: "Week 3 — Risk, return, and markets",
    summary:
      "Risk and return fundamentals; measuring return; measuring risk and volatility; diversification and portfolios; the risk–return tradeoff; the Capital Asset Pricing Model; market efficiency.",
    metaDescription:
      "Understand investment risk and return, measure volatility, diversify portfolios, apply CAPM, and test how efficiently markets reflect information.",
  },
  4: {
    title: "Week 4 — Valuation and corporate finance",
    summary:
      "Bond valuation; stock valuation; capital budgeting and NPV; the cost of capital; capital structure and leverage; corporate financing and dividends; financial intermediaries; a capstone synthesis.",
    metaDescription:
      "Learn to value bonds, stocks, and projects with NPV, estimate WACC, understand leverage and payouts, and connect every topic through corporate finance.",
  },
};

// Topics in seed insertion order. DB lecture IDs are assigned sequentially starting from 1.
export const TOPICS = [
  // Week 1
  {
    slug: "what-is-finance",
    weekNumber: 1,
    blurb: "Finance exists to move resources across time and states of the world.",
    metaDescription:
      "Finance allocates scarce resources across time and uncertainty. Learn the core investment, financing, and risk questions that anchor every finance decision.",
    lectureTitle: "1.1 What finance is and why it exists",
    body: `Finance is the study of how people and organizations allocate scarce resources across time under uncertainty. At its root, finance exists to move resources across time: to let someone who has money now but will need it later store value, and to let someone who needs money now but will have it later borrow against the future.

Surplus and deficit units: The economy is full of surplus units (savers with more cash than current uses) and deficit units (borrowers, firms, governments with profitable uses but not enough cash). Finance is the machinery that channels funds from the first group to the second — and prices that transfer through an interest rate or an expected return.

The three core questions every finance decision is one of three: Investment — which real or financial assets should we hold? Financing — how should we pay for them? Risk — how do we measure and bear the uncertainty involved?

A real example: In a farming village, a farmer needs seed and tools in the spring but earns nothing until the autumn harvest. A lender with idle grain advances it now in exchange for more grain at harvest. That single transaction is finance in miniature: value moved from autumn to spring, priced by interest, and exposed to the risk that the harvest fails. Everything from a credit card to a sovereign bond is a more elaborate version of the farmer and the lender.`,
  },
  {
    slug: "financial-system-markets",
    weekNumber: 1,
    blurb: "How savings reach borrowers: markets, intermediaries, primary vs. secondary.",
    metaDescription:
      "Follow savings from lenders to borrowers through markets and intermediaries, and distinguish primary from secondary markets to understand capital pricing.",
    lectureTitle: "1.2 The financial system and markets",
    body: `The financial system is the network of markets, institutions, and instruments that connects savers to borrowers. Funds can flow two ways: directly, when a borrower issues a security straight to investors, or indirectly, through a financial intermediary such as a bank that takes deposits and makes loans.

Markets by maturity and by stage: Money markets trade short-term debt (maturity under one year): Treasury bills, commercial paper. Capital markets trade long-term claims: bonds and stocks. Primary markets are where a security is first sold and the issuer receives the cash (an IPO, a new bond issue). Secondary markets are where existing securities change hands between investors (the NYSE, Nasdaq). The issuer gets no new money, but secondary trading provides the liquidity that makes anyone willing to buy in the primary market.

Why markets matter: Markets perform price discovery, provide liquidity, and reduce the search and information costs of finding a counterparty. A deep secondary market lowers the return investors demand, which lowers the cost of capital for firms.

A real example: When a company like Airbnb "goes public," it sells new shares once, in the primary market, and pockets the proceeds. Every trade of those shares afterward happens in the secondary market between investors; Airbnb receives none of that cash, but the constant trading is exactly what made the IPO buyers willing to pay up front.`,
  },
  {
    slug: "money-interest-tvm",
    weekNumber: 1,
    blurb: "A dollar today is worth more than a dollar tomorrow — and interest is the price.",
    metaDescription:
      "Learn why a dollar today is worth more than one tomorrow, and use interest to compare cash flows across time—the foundation for every valuation.",
    lectureTitle: "1.3 Money, interest, and the time value of money",
    body: `The single most important idea in finance is the time value of money: a dollar today is worth more than a dollar tomorrow, because a dollar today can be invested to earn interest, and because the future is uncertain.

Interest as the price of time: An interest rate r is the rent paid for the use of money over a period. If you lend $100 for a year at r = 5%, you get back $105. The $5 compensates the lender for deferring consumption, for expected inflation, and for risk.

Simple vs. compound interest: Simple interest pays only on the original principal: after n years, P(1 + rn). Compound interest pays interest on previously earned interest: after n years, P(1+r)^n. The difference is explosive over long horizons — this is the engine behind every retirement account.

A real example: $1,000 invested at 8% becomes $1,080 after one year. Left for 30 years it becomes approximately $10,063 — over ten times the principal. The extra $6,663 is interest earned on interest. Compounding is why starting to save early beats saving more later.`,
  },
  {
    slug: "present-future-value",
    weekNumber: 1,
    blurb: "The two master formulas that move a single cash flow through time.",
    metaDescription:
      "Master present-value and future-value formulas to translate a single cash flow through time and build intuition for what money is worth today.",
    lectureTitle: "1.4 Present value and future value",
    body: `Two formulas translate a single cash flow between today and the future at a rate r per period over n periods.

Future value: FV = PV × (1 + r)^n. This compounds a present amount forward. The factor (1+r)^n is the growth multiplier.

Present value: PV = FV / (1 + r)^n. This discounts a future amount back to today. The factor 1/(1+r)^n is the discount factor, always less than 1 for r > 0 — it tells you how much a future dollar is worth now. The rate r used to discount is the discount rate or opportunity cost of capital.

They are inverses: FV and PV are the same equation read in two directions. Given any three of PV, FV, r, n, you can solve for the fourth. Solving for r gives the implied return; solving for n gives the time to reach a goal.

A real example: A parent wants $50,000 for a child's college in 18 years and can earn 6%. How much to set aside today? PV = 50,000 / (1.06)^18 ≈ $17,500. Conversely, that $17,500 grows to $50,000 over 18 years. Present and future value are the round trip.`,
  },
  {
    slug: "discounting-cash-flows",
    weekNumber: 1,
    blurb: "Valuing a stream of cash flows as the sum of their present values.",
    metaDescription:
      "Learn to discount each expected cash flow and add its present values to value projects and investments, building a core skill in finance.",
    lectureTitle: "1.5 Discounting cash flows",
    body: `Most assets pay not a single amount but a stream of cash flows over time. The value of any asset is the sum of the present values of all the cash flows it produces — this is discounted cash flow (DCF) valuation, the foundation of essentially all of finance.

The master equation: For cash flows CF_1, CF_2, ..., CF_n at the end of each period, discounted at rate r: PV = sum of CF_t / (1 + r)^t from t=1 to n. Each future dollar is pulled back to today by its own discount factor, and the present values are simply added — present values at the same date are additive.

What the inputs mean: The CF_t are expected cash flows. The rate r reflects the riskiness of those cash flows: riskier streams are discounted at higher rates, lowering their value.

A real example: A small print shop is offered a machine that will generate $10,000 a year for 3 years. At a discount rate of 10%, the cash flows are worth approximately $24,868 today — not $30,000. If the machine costs less than $24,868, buying it creates value. That comparison is the seed of NPV.`,
  },
  {
    slug: "annuities-perpetuities",
    weekNumber: 1,
    blurb: "Closed-form shortcuts for level streams — finite and forever.",
    metaDescription:
      "Calculate the value of level cash-flow streams with annuity and perpetuity formulas, then recognize when each shortcut fits real finance problems.",
    lectureTitle: "1.6 Annuities and perpetuities",
    body: `Some cash-flow streams are regular enough to have closed-form present values, so you never have to discount term by term.

Perpetuity: A perpetuity pays a constant amount C every period forever. The present value is PV = C / r. A growing perpetuity, whose payment grows at rate g < r each period, is worth PV = C / (r - g) (the Gordon formula, reused for stocks in week 4).

Annuity: An annuity pays C for a finite n periods. PV = C × [1 - (1 + r)^(-n)] / r. This one formula prices mortgages, car loans, bonds' coupon streams, and retirement payouts.

A real example: British consols, issued in the 18th century, were government bonds that paid a fixed coupon forever — a literal perpetuity. A consol paying $3 a year when rates were 5% was worth 3 / 0.05 = $60. A 30-year mortgage is the opposite case: a fixed monthly payment for 360 months, and the annuity formula is exactly what a lender solves to set the payment so that PV equals the loan amount.`,
  },
  {
    slug: "nominal-real-rates-inflation",
    weekNumber: 1,
    blurb: "Separating the growth of money from the growth of purchasing power.",
    metaDescription:
      "Separate nominal growth from real purchasing power, adjust rates for inflation, and compare money received at different times more accurately.",
    lectureTitle: "1.7 Nominal vs. real rates and inflation",
    body: `Interest rates come in two flavors. The nominal rate i is the stated rate — what your account literally pays. The real rate r is the rate after stripping out inflation π — the growth in your actual purchasing power.

The Fisher equation: (1 + i) = (1 + r)(1 + π). Rearranged, r = (1 + i)/(1 + π) - 1. For small rates this is approximated by r ≈ i - π.

Why it matters: If your savings earn a nominal 3% but inflation is 4%, your real return is about -1%: you have more dollars but they buy less. Discounting nominal cash flows requires a nominal rate; discounting real (inflation-adjusted) cash flows requires a real rate — mixing the two is one of the most common valuation errors.

A real example: In the 1970s, U.S. savers earning 6% on deposits felt prosperous, but inflation ran above 10%. The Fisher equation gives a real rate near -4% — savers were quietly losing purchasing power every year. Borrowers with fixed-rate loans, meanwhile, repaid in cheaper dollars and came out ahead.`,
  },

  // Week 2
  {
    slug: "financial-statements-overview",
    weekNumber: 2,
    blurb: "The three statements that describe a firm, and how they connect.",
    metaDescription:
      "See how the balance sheet, income statement, and cash-flow statement describe a firm's performance, position, and financial health together.",
    lectureTitle: "2.1 Financial statements overview",
    body: `A firm's financial reality is captured by three core statements plus the accompanying notes. Together they answer: what does the firm own and owe, did it make money, and where did the cash go?

The three statements: Balance sheet — a snapshot at one instant: assets, liabilities, equity. Income statement — a flow over a period: revenues minus expenses equals profit. Statement of cash flows — a flow over a period reconciling actual cash in and out.

Accrual vs. cash: Statements are prepared on an accrual basis: revenue is recorded when earned and expenses when incurred, not when cash changes hands. This is why a profitable firm can still run out of cash — and why the cash-flow statement exists as a reality check on the income statement.

How they link: Net income from the income statement flows into retained earnings on the balance sheet and is the starting line of the cash-flow statement.

A real example: Amazon reported years of thin or negative net income while generating large operating cash flows, because it expensed heavy investment immediately on the income statement while collecting cash from customers before paying suppliers. Reading only the income statement would have badly misjudged the business.`,
  },
  {
    slug: "balance-sheet",
    weekNumber: 2,
    blurb: "Assets = Liabilities + Equity — the identity that must always hold.",
    metaDescription:
      "Use Assets = Liabilities + Equity to read a balance sheet, trace what a firm owns and owes, and assess how it is financed over time.",
    lectureTitle: "2.2 The balance sheet",
    body: `The balance sheet lists what a firm owns and how it was financed, at a single point in time. It is governed by one identity that can never be violated: Assets = Liabilities + Equity.

The three blocks: Assets — resources the firm controls: cash, receivables, inventory (current), plus property, plant, and equipment (long-term). Liabilities — claims of outsiders: payables, short-term debt (current), long-term debt (non-current). Equity — the residual claim of owners: paid-in capital plus accumulated retained earnings.

Why it balances: Equity is defined as Assets − Liabilities, so the identity holds by construction. Every transaction touches at least two accounts to keep both sides equal — the basis of double-entry bookkeeping.

A real example: If a startup buys a $30,000 delivery van with $10,000 of its own cash and a $20,000 loan, assets rise by $30,000 (the van) but fall $10,000 (cash), a net $20,000; liabilities rise $20,000 (the loan); equity is unchanged. Both sides still balance.`,
  },
  {
    slug: "income-statement",
    weekNumber: 2,
    blurb: "From top-line revenue down to bottom-line net income.",
    metaDescription:
      "Read an income statement from revenue to net income, and connect operating performance, margins, and profitability to business decisions.",
    lectureTitle: "2.3 The income statement",
    body: `The income statement (or profit-and-loss statement) measures performance over a period by subtracting expenses from revenues to arrive at profit. It is read top to bottom, peeling away categories of cost.

The waterfall: Net Income = Revenue - COGS - Operating Expenses - Interest - Taxes. The intermediate subtotals each tell a story: Gross profit = Revenue - COGS — profitability of the product itself. Operating income (EBIT) = Gross profit - OpEx — profitability of the core business, before financing and taxes. Net income — the bottom line left for shareholders, after interest and taxes.

Earnings vs. cash: Net income includes non-cash charges like depreciation and is built on accrual timing, so it is an opinion about profitability, not a count of cash.

A real example: A coffee shop with $500,000 revenue, $200,000 cost of beans and supplies, $150,000 of rent and wages, $20,000 interest, and $40,000 taxes has net income of $90,000. Its gross margin of 60% reveals the product economics independently of how big the rent bill happens to be.`,
  },
  {
    slug: "statement-cash-flows",
    weekNumber: 2,
    blurb: "Where the cash actually came from and went: operations, investing, financing.",
    metaDescription:
      "Trace cash from operations, investing, and financing to explain why profit and cash differ and evaluate how a firm funds its activities.",
    lectureTitle: "2.4 The statement of cash flows",
    body: `The statement of cash flows tracks actual cash, undoing the accrual assumptions of the income statement. It sorts every cash movement into three buckets whose total equals the change in the cash balance.

The three activities: Operating (CFO) — cash from running the business: collections from customers, payments to suppliers and employees. Starts from net income and adds back non-cash items like depreciation. Investing (CFI) — cash spent on or received from long-term assets: buying equipment (capex), acquisitions, asset sales. Usually negative for a growing firm. Financing (CFF) — cash exchanged with capital providers: issuing or repaying debt, issuing stock, paying dividends.

Why it is the truth-teller: Net income can be managed; cash is harder to fake. A firm reporting rising profits but falling operating cash flow is a classic warning sign.

A real example: A fast-growing software startup can show negative net income yet positive operating cash flow, because customers prepay annual subscriptions (cash in now) while big non-cash stock-based-compensation charges depress reported profit.`,
  },
  {
    slug: "financial-ratio-analysis",
    weekNumber: 2,
    blurb: "Turning raw statements into comparable measures of health and performance.",
    metaDescription:
      "Turn raw financial statements into ratios for profitability, efficiency, leverage, and liquidity, making firms easier to compare and evaluate.",
    lectureTitle: "2.5 Financial ratio analysis",
    body: `Raw numbers are hard to compare across firms of different sizes; ratios normalize them. They fall into four families: liquidity, leverage, profitability, and efficiency.

Key ratios: Liquidity — Current ratio = Current Assets / Current Liabilities. Leverage — Debt-to-equity = Total Debt / Equity. Profitability — Return on equity ROE = Net Income / Equity; net margin = Net Income / Revenue. Efficiency — Asset turnover = Revenue / Total Assets.

The DuPont decomposition: ROE can be split to reveal what drives returns: ROE = (NI/Revenue) × (Revenue/Assets) × (Assets/Equity), i.e. margin × turnover × leverage. Two firms with the same ROE can get there very differently — one on fat margins, another on high leverage.

A real example: A discount grocer and a luxury jeweler may both post a 15% ROE. DuPont shows the grocer earns it through turnover (thin margins, enormous sales volume) and the jeweler through margin (few sales, huge markup). The same ratio, two opposite business models.`,
  },
  {
    slug: "working-capital-liquidity",
    weekNumber: 2,
    blurb: "The short-term cash cushion that keeps a solvent firm from failing.",
    metaDescription:
      "Understand working capital and liquidity, measure a firm's short-term cushion, and spot how cash pressure can threaten a solvent business.",
    lectureTitle: "2.6 Working capital and liquidity",
    body: `Liquidity is the ability to meet obligations as they come due. A firm can be profitable on paper and still fail if it cannot pay this week's bills — so short-term management of cash matters as much as long-run profit.

Net working capital: NWC = Current Assets - Current Liabilities. Positive NWC means current resources cover near-term obligations. The quick ratio = (Current Assets - Inventory) / Current Liabilities is a stricter test that excludes inventory, which can be slow to sell.

The cash conversion cycle: Cash is tied up between paying for inventory and collecting from customers: CCC = Days Inventory Outstanding + Days Sales Outstanding - Days Payables Outstanding. A shorter cycle frees cash; a longer one consumes it.

A real example: Dell famously ran a negative cash conversion cycle: it collected payment from customers before it had to pay its suppliers, so growth actually generated cash instead of consuming it. The opposite case — a manufacturer that buys materials, holds inventory for months, then waits 60 days to be paid — must finance that gap, which is why fast-growing firms so often run short of cash despite healthy profits.`,
  },
  {
    slug: "annual-reports",
    weekNumber: 2,
    blurb: "Beyond the numbers: MD&A, footnotes, and the art of skepticism.",
    metaDescription:
      "Read annual reports with healthy skepticism by using MD&A and footnotes to uncover context, assumptions, and risks behind headline numbers.",
    lectureTitle: "2.7 Reading and interpreting annual reports",
    body: `The financial statements are only part of a company's annual report (in the U.S., the 10-K filed with the SEC). The narrative and the footnotes often matter as much as the headline numbers.

What to read: MD&A (Management's Discussion and Analysis) — management's own account of results, trends, and risks. Footnotes — the fine print on accounting policies, debt maturities, lease obligations, pending lawsuits, and off-balance-sheet arrangements. Surprises hide here. Auditor's opinion — whether an independent auditor signed off, and any qualifications. Risk factors — required disclosures of what could go wrong.

Reading skeptically: Compare the story to the cash. Watch for revenue growing far faster than cash flow, frequent "one-time" charges, related-party transactions, and changes in accounting estimates that flatter earnings.

A real example: Before Enron collapsed in 2001, its income statement showed soaring profits, but its footnotes described a web of off-balance-sheet special purpose entities that hid debt. Analysts who read only the headline earnings were fooled; those who dug into the footnotes saw the leverage and the conflicts.`,
  },

  // Week 3
  {
    slug: "risk-return-fundamentals",
    weekNumber: 3,
    blurb: "The central bargain of investing: higher expected return demands higher risk.",
    metaDescription:
      "Learn the risk–return bargain in investing: higher expected returns require uncertainty, so risk must be measured before it can be managed.",
    lectureTitle: "3.1 Risk and return fundamentals",
    body: `Every investment is a trade of certain money now for uncertain money later. The two dimensions that describe any investment are its return (how much you expect to make) and its risk (how uncertain that outcome is).

Total return: The return on an asset over a holding period combines income and price change: R = (P1 - P0 + D) / P0, where P0 is the purchase price, P1 the ending price, and D any dividend or income received. The first part is the capital gain, the second the income yield.

Risk is dispersion: Risk is the chance the realized return differs from the expected return — the dispersion of possible outcomes. A Treasury bill is nearly riskless; a single startup's equity is wildly dispersed.

The fundamental bargain: Rational investors are risk-averse: they accept higher risk only if compensated with a higher expected return. This compensation is the risk premium, and it is the organizing principle of the rest of the course.

A real example: From 1926 to today, U.S. stocks returned roughly 10% a year and Treasury bills about 3% — but stocks routinely fell 20% or more in bad years while bills almost never lost money. The extra ~7% is the equity risk premium.`,
  },
  {
    slug: "measuring-return",
    weekNumber: 3,
    blurb: "Expected return as a probability-weighted average of outcomes.",
    metaDescription:
      "Calculate expected return as a probability-weighted outcome and use scenarios to make investment decisions more explicit and disciplined.",
    lectureTitle: "3.2 Measuring return",
    body: `To compare investments we need a single number summarizing their likely return. When outcomes are uncertain, that number is the expected return — the probability-weighted average of the possible returns.

Expected return: For outcomes R_1, ..., R_n with probabilities p_1, ..., p_n: E(R) = sum of p_i × R_i. This is the center of the distribution — the return you would average over many repetitions of the same gamble.

Arithmetic vs. geometric averages: Over historical data, the arithmetic mean averages the period returns, while the geometric mean captures the actual compounded growth of a multi-period investment. Because volatility drags down compounding, the geometric mean is always ≤ the arithmetic mean.

A real example: Suppose a stock has a 50% chance of a +30% year and a 50% chance of a -10% year. Its expected return is 0.5(0.30) + 0.5(-0.10) = 10%. But an investor who actually experiences one of each year turns $100 into $117, a geometric return of about 8.2% — less than 10%. The gap is the cost of volatility.`,
  },
  {
    slug: "measuring-risk-volatility",
    weekNumber: 3,
    blurb: "Variance and standard deviation as the language of uncertainty.",
    metaDescription:
      "Measure investment uncertainty with variance and standard deviation, turning volatile outcomes into evidence for risk and return analysis.",
    lectureTitle: "3.3 Measuring risk and volatility",
    body: `If expected return is the center of an investment's distribution, risk is its spread. Finance measures spread with variance and its square root, standard deviation (called volatility).

Variance and standard deviation: Variance = sum of p_i × (R_i - E(R))^2. Standard deviation σ = sqrt(variance). Variance averages the squared deviations from the mean, so large misses count disproportionately. Standard deviation converts back to the same units as returns (percent), making it the everyday measure of risk.

Reading volatility: A stock with σ = 20% and mean 10% has most of its annual outcomes roughly within 10% ± 20%. Higher σ means a wider, riskier distribution. Volatility is symmetric — it counts upside and downside surprises equally.

A real example: During the 2008 crisis, the annualized volatility of the S&P 500 spiked from a calm σ ≈ 15% to over 60% — the VIX "fear index" is essentially the market's forecast of σ. Prices were not just falling; the dispersion of daily moves exploded.`,
  },
  {
    slug: "diversification-portfolio",
    weekNumber: 3,
    blurb: "Why combining imperfectly correlated assets reduces risk for free.",
    metaDescription:
      "Build diversified portfolios by combining imperfectly correlated assets, reducing avoidable risk without automatically sacrificing expected return.",
    lectureTitle: "3.4 Diversification and portfolio basics",
    body: `The deepest practical insight in finance is that risk does not simply add up. By holding many assets that do not move in lockstep, an investor can reduce risk without sacrificing expected return — the closest thing to a free lunch in finance.

Portfolio return and risk: A portfolio's expected return is just the weighted average of its parts: E(R_p) = sum of w_i × E(R_i). But its variance is not a weighted average — it depends on how the assets co-move. When correlation ρ < 1, the portfolio's standard deviation is less than the weighted average of the individual standard deviations.

Systematic vs. idiosyncratic risk: Diversification eliminates idiosyncratic (firm-specific) risk but cannot remove systematic (market-wide) risk. Only the systematic part earns a risk premium — a key idea for CAPM.

A real example: Pair an umbrella maker and a sunscreen maker. Each alone is volatile with the weather, but their returns are negatively correlated, so a 50/50 portfolio is far steadier than either business. Harry Markowitz won the Nobel Prize for formalizing exactly this.`,
  },
  {
    slug: "risk-return-tradeoff",
    weekNumber: 3,
    blurb: "The efficient frontier and rewarding risk per unit of volatility.",
    metaDescription:
      "Use the efficient frontier to compare portfolios and understand how investors are rewarded for each unit of volatility they accept.",
    lectureTitle: "3.5 The risk-return tradeoff",
    body: `Once we can compute the return and risk of any portfolio, we can ask: among all portfolios, which give the most return per unit of risk? The answer is the efficient frontier and the metric that ranks portfolios along it.

The Sharpe ratio: The Sharpe ratio measures excess return earned per unit of total risk: S = (E(R_p) - R_f) / σ_p, where R_f is the risk-free rate. A higher Sharpe ratio is unambiguously better — more reward for the same volatility.

The efficient frontier and the CML: Plotting all portfolios in risk–return space, the efficient frontier is the upper-left boundary: the portfolios with the highest return for each level of risk. Adding a risk-free asset, the best achievable combinations lie on a straight line, the Capital Market Line, tangent to the frontier at the market portfolio.

A real example: Compare two funds: Fund A returns 12% with σ = 20%, Fund B returns 9% with σ = 10%, and R_f = 2%. A's Sharpe is 0.5; B's is 0.7. Despite A's higher raw return, B delivers more reward per unit of risk.`,
  },
  {
    slug: "capm",
    weekNumber: 3,
    blurb: "Pricing systematic risk: expected return as a linear function of beta.",
    metaDescription:
      "Apply CAPM to price systematic risk, interpret beta, and estimate the return investors require for bearing market exposure.",
    lectureTitle: "3.6 The Capital Asset Pricing Model",
    body: `If diversification removes firm-specific risk, then the market should only reward the risk you cannot diversify away — the systematic risk an asset shares with the market. The CAPM turns that idea into a price.

The security market line: E(R_i) = R_f + β_i × (E(R_m) - R_f). An asset's expected return equals the risk-free rate plus its beta times the market risk premium E(R_m) - R_f. Beta measures how much the asset moves with the market: β = Cov(R_i, R_m) / σ_m^2.

Interpreting beta: β = 1: moves with the market. β > 1: amplifies market moves (riskier, higher required return). β < 1: dampens them (defensive). β = 0: uncorrelated; required return is just R_f. Only beta is priced — total volatility σ is not, because its idiosyncratic part is diversifiable.

A real example: With R_f = 3%, an expected market return of 9%, and a stock beta of 1.5: CAPM requires E(R) = 3% + 1.5 × (9% - 3%) = 12%. If the stock is only expected to return 10%, CAPM says it is overpriced.`,
  },
  {
    slug: "market-efficiency",
    weekNumber: 3,
    blurb: "Do prices already reflect all information? The EMH and its three forms.",
    metaDescription:
      "Explore the efficient-market hypothesis and its three forms to assess whether prices reflect public information and what that means for investors.",
    lectureTitle: "3.7 Market efficiency",
    body: `The Efficient Market Hypothesis (EMH) asks whether asset prices already incorporate available information. If they do, then prices change only in response to new information, which is by definition unpredictable — so prices follow a random walk and consistently beating the market is nearly impossible.

Three forms: Weak form — prices reflect all past price information. Implication: technical analysis of charts cannot beat the market. Semi-strong form — prices reflect all public information (news, filings). Implication: fundamental analysis of public data cannot reliably beat the market; prices adjust almost instantly to news. Strong form — prices reflect all information, even private. Implication: not even insiders can systematically profit (empirically, this form fails).

Implications and limits: EMH is why low-cost index funds are so hard to beat. But behavioral finance documents bubbles, overreaction, and anomalies, so most economists hold that markets are highly but not perfectly efficient.

A real example: When a company announces surprise earnings, its stock typically jumps within seconds. Yet the dot-com bubble of 1999–2000 and the 2008 crisis show prices can also drift far from fundamentals.`,
  },

  // Week 4
  {
    slug: "bond-valuation",
    weekNumber: 4,
    blurb: "A bond is an annuity of coupons plus a final repayment — discount and add.",
    metaDescription:
      "Value a bond by discounting its coupon annuity and final repayment, then see how rates, time, and cash flows move its price.",
    lectureTitle: "4.1 Bond valuation",
    body: `A bond is a loan in security form: the issuer pays periodic coupons C and repays the face value F at maturity. Its price is just the present value of those cash flows, discounted at the market yield y.

The pricing formula: P = sum of C/(1+y)^t from t=1 to n, plus F/(1+y)^n. The first term is an annuity of coupons; the second is the present value of the lump-sum repayment.

Price–yield relationship: Price and yield move inversely. When market yields rise, the fixed coupons look less attractive, so the price falls; when yields fall, the price rises. If y = coupon rate, the bond trades at par (P = F). If y > coupon rate, it trades at a discount (P < F). If y < coupon rate, it trades at a premium (P > F).

A real example: A 10-year bond with $1,000 face, a 5% coupon ($50/year), priced when market yields jump to 7%, is worth about $859, a discount to par. This is exactly why bond funds lose value when interest rates rise: existing bonds get repriced downward.`,
  },
  {
    slug: "stock-valuation",
    weekNumber: 4,
    blurb: "A share is worth the present value of the dividends it will ever pay.",
    metaDescription:
      "Value a stock from the present value of future dividends and connect dividend growth assumptions to the price an investor should pay.",
    lectureTitle: "4.2 Stock valuation",
    body: `A share of stock is a claim on a company's future cash distributions. Its intrinsic value is the present value of all expected future dividends — the dividend discount model.

The Gordon growth model: If dividends grow at a constant rate g forever and the required return is r > g, the infinite stream collapses to a growing perpetuity: P_0 = D_1 / (r - g), where D_1 is next period's dividend. Value rises with expected growth and falls with the required return.

Relative valuation: In practice analysts also use multiples like the price-to-earnings ratio P/E, valuing a stock by comparison to peers: P = (P/E)_peer × EPS.

A real example: A utility expected to pay a $2 dividend next year, growing 3% forever, with investors requiring 8%, is worth P_0 = 2 / (0.08 - 0.03) = $40 per share. If the market price is $32, the model says the stock is cheap — provided you trust the growth and discount-rate assumptions, which is where the real judgment lies.`,
  },
  {
    slug: "capital-budgeting-npv",
    weekNumber: 4,
    blurb: "The decision rule that ties the whole course together: take positive-NPV projects.",
    metaDescription:
      "Use NPV and incremental cash flows to choose value-creating projects, making capital budgeting the decision rule that ties the course together.",
    lectureTitle: "4.3 Capital budgeting and NPV",
    body: `Capital budgeting is how firms decide which long-term projects to fund. The gold-standard rule is net present value (NPV): discount a project's future cash flows and subtract its upfront cost.

The NPV rule: NPV = sum of CF_t/(1+r)^t from t=1 to n, minus CF_0, where CF_0 is the initial investment and r is the project's risk-adjusted discount rate. Accept if NPV > 0 — the project earns more than its cost of capital and creates value. Reject if NPV < 0.

NPV vs. IRR: The internal rate of return (IRR) is the discount rate that makes NPV = 0. Accepting projects with IRR > r usually agrees with NPV, but IRR can mislead with unconventional cash flows or mutually exclusive projects, so NPV is the tie-breaker.

A real example: A factory upgrade costs $100,000 today and returns $40,000 a year for 3 years. At r = 10%, the inflows are worth about $99,500, so NPV ≈ -$500 — barely value-destroying, reject. At r = 8% the same inflows are worth about $103,100, giving a positive NPV — accept. The decision flips entirely on the discount rate.`,
  },
  {
    slug: "cost-of-capital",
    weekNumber: 4,
    blurb: "The blended rate a firm must earn to satisfy all its investors: WACC.",
    metaDescription:
      "Estimate WACC as the blended return required by debt and equity investors, then use it as a hurdle rate for corporate decisions.",
    lectureTitle: "4.4 Cost of capital",
    body: `The discount rate r used in valuation is not arbitrary — it is the firm's cost of capital, the return its investors require. Since a firm is funded by both debt and equity, the relevant rate is a weighted average of the two.

The WACC formula: WACC = (E/V) × r_e + (D/V) × r_d × (1 - T), where E is equity value, D is debt value, V = E + D, r_e is the cost of equity, r_d the cost of debt, and T the tax rate.

Why the pieces look the way they do: r_e usually comes from CAPM: r_e = R_f + β(E(R_m) - R_f). Debt is cheaper than equity and gets the (1 - T) tax shield, because interest is tax-deductible. The weights are market values, not book values.

A real example: A firm financed 60% equity (cost 12%) and 40% debt (cost 6%), taxed at 25%, has WACC = 0.6(12%) + 0.4(6%)(0.75) = 7.2% + 1.8% = 9%. That 9% is the hurdle rate every project must clear.`,
  },
  {
    slug: "capital-structure-leverage",
    weekNumber: 4,
    blurb: "How the mix of debt and equity affects value — and when it stops being free.",
    metaDescription:
      "Understand how debt and equity shape value, returns, and financial risk, and learn when leverage stops helping a firm's owners.",
    lectureTitle: "4.5 Capital structure and leverage",
    body: `Capital structure is the mix of debt and equity a firm uses. The central question: does borrowing more (using leverage) make the firm more valuable?

The Modigliani–Miller benchmark: In a world with no taxes, no bankruptcy costs, and efficient markets, Modigliani and Miller (1958) proved capital structure is irrelevant: the value of a levered firm equals that of an unlevered one. The size of the pie does not depend on how you slice it between debt and equity.

Why structure matters in the real world: Tax shield — interest is deductible, adding value V_L = V_U + T × D (the MM-with-taxes result). Financial distress — too much debt raises the risk and cost of bankruptcy. The trade-off theory says firms balance the tax benefit against distress costs to find an optimal debt level.

A real example: Leverage magnifies equity returns: a project earning 10% funded entirely by equity gives owners 10%, but funded half with 6% debt, the equity holders earn roughly 14% — and lose far more if the project earns 2%. The 2008 crisis showed the downside: banks levered 30-to-1 were wiped out by small drops in asset values.`,
  },
  {
    slug: "corporate-financing-dividends",
    weekNumber: 4,
    blurb: "Raising capital and returning it: payout policy and the financing pecking order.",
    metaDescription:
      "Compare how firms raise capital and return it to investors, including dividends, buybacks, and the pecking order of financing choices.",
    lectureTitle: "4.6 Corporate financing and dividends",
    body: `Firms must decide both how to raise capital and how to return it to shareholders. These are the financing and payout decisions.

Raising capital: the pecking order: Empirically firms prefer, in order: retained earnings first (cheapest, no signaling), then debt, then new equity last (issuing shares can signal that managers think the stock is overpriced). This is the pecking-order theory.

Returning capital: payout policy: Profits can be paid out as dividends or used to repurchase shares. The dividend payout ratio = Dividends / Net Income. The retained fraction funds future growth: g = retention ratio × ROE.

Dividend policy debates: In perfect markets, Miller–Modigliani showed dividend policy is also irrelevant. In reality, taxes, signaling, and investor preferences make payout decisions matter.

A real example: Mature firms like Coca-Cola pay large, steady dividends, signaling stable cash flows. High-growth firms like early Amazon paid no dividend, retaining everything to reinvest at high returns. Both can be optimal — the right payout depends on whether the firm has profitable projects that beat what shareholders could earn elsewhere.`,
  },
  {
    slug: "financial-intermediaries",
    weekNumber: 4,
    blurb: "Banks, funds, and insurers: the plumbing that transforms and channels capital.",
    metaDescription:
      "Learn how banks, funds, insurers, and other intermediaries channel capital, pool risk, transform maturities, and support the financial system.",
    lectureTitle: "4.7 Financial intermediaries and institutions",
    body: `Financial intermediaries sit between savers and borrowers, making the financial system work more cheaply and safely than direct lending could. They include commercial banks, investment banks, mutual and pension funds, insurers, and money-market funds.

What intermediaries do: Maturity transformation — banks fund long-term loans with short-term deposits, bridging savers who want liquidity and borrowers who want long maturities. Risk pooling and diversification — insurers and funds spread risk across many policies or securities. Information production — banks screen and monitor borrowers, reducing the asymmetric-information problem that plagues direct lending. Liquidity and payment services — deposits and money funds give savers safe, spendable claims.

The risk they create: Maturity transformation is inherently fragile: if many depositors demand cash at once, even a solvent bank can face a run. This is why banks are regulated and backed by deposit insurance and a lender of last resort.

A real example: In 2008, investment bank Lehman Brothers funded long-term mortgage assets with very short-term borrowing. When lenders refused to roll over that funding, Lehman could not sell its illiquid assets fast enough and collapsed — the trigger for the global financial crisis.`,
  },
  {
    slug: "capstone-synthesis",
    weekNumber: 4,
    blurb: "One equation behind everything: value is the PV of expected future cash flows.",
    metaDescription:
      "Synthesize the course around one idea: asset value is discounted expected cash flow, connecting statements, risk, rates, and valuation.",
    lectureTitle: "4.8 Capstone synthesis",
    body: `Step back, and the entire course reduces to a single sentence: the value of any asset is the present value of its expected future cash flows, discounted at a rate that reflects their risk.

The one equation: V = sum of E(CF_t) / (1 + r)^t from t=1 to infinity. Everything you have learned is a way to fill in one of its three ingredients: The cash flows E(CF_t) — read and forecast them from the financial statements (Week 2). The discount rate r — built from risk and return and CAPM (Week 3), assembled into the cost of capital / WACC (Week 4). The present-value machinery — the time value of money, discounting, annuities, and perpetuities (Week 1).

Specializations of the master equation: A bond plugs in fixed coupons and a face value; a stock plugs in growing dividends (Gordon); a project plugs in incremental cash flows minus the upfront cost (NPV). They are not separate formulas — they are the same equation with different cash flows.

A real example: When an analyst values a whole company by a discounted-cash-flow model, they forecast free cash flows from the financial statements, discount them at the WACC, and sum to a present value — Week 1's discounting, Week 2's statements, and Weeks 3–4's risk and cost of capital, all in one spreadsheet. Master that single picture and you can value anything.`,
  },
];
