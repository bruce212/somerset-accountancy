<script lang="ts">
  // 2024/25 UK income tax bands (England, Wales & NI) — illustrative only.
  let income = $state(45000);

  const personalAllowance = 12570;
  const basicLimit = 50270;
  const higherLimit = 125140;

  let allowance = $derived.by(() => {
    if (income <= 100000) return personalAllowance;
    const reduction = Math.floor((income - 100000) / 2);
    return Math.max(0, personalAllowance - reduction);
  });

  let taxable = $derived(Math.max(0, income - allowance));

  let breakdown = $derived.by(() => {
    let remaining = taxable;
    const basicBand = Math.max(0, Math.min(remaining, basicLimit - personalAllowance));
    remaining -= basicBand;
    const higherBand = Math.max(0, Math.min(remaining, higherLimit - basicLimit));
    remaining -= higherBand;
    const additionalBand = Math.max(0, remaining);
    return {
      basic: basicBand * 0.2,
      higher: higherBand * 0.4,
      additional: additionalBand * 0.45,
    };
  });

  let totalTax = $derived(breakdown.basic + breakdown.higher + breakdown.additional);
  let takeHome = $derived(income - totalTax);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

  const contactUrl = `${import.meta.env.BASE_URL}contact`;
</script>

<div class="estimator">
  <div class="input-row">
    <label for="income">Gross annual income</label>
    <div class="input-wrap">
      <span class="prefix">£</span>
      <input id="income" type="number" min="0" step="500" bind:value={income} />
    </div>
    <input
      type="range"
      min="0"
      max="200000"
      step="500"
      bind:value={income}
      aria-label="Adjust income"
    />
  </div>

  <div class="results">
    <div class="result-card highlight">
      <span class="label">Estimated take-home</span>
      <strong>{fmt(takeHome)}</strong>
    </div>
    <div class="result-card">
      <span class="label">Estimated income tax</span>
      <strong>{fmt(totalTax)}</strong>
    </div>
    <div class="result-card">
      <span class="label">Personal allowance</span>
      <strong>{fmt(allowance)}</strong>
    </div>
  </div>

  <details>
    <summary>Band breakdown</summary>
    <ul>
      <li><span>Basic rate (20%)</span><span>{fmt(breakdown.basic)}</span></li>
      <li><span>Higher rate (40%)</span><span>{fmt(breakdown.higher)}</span></li>
      <li><span>Additional rate (45%)</span><span>{fmt(breakdown.additional)}</span></li>
    </ul>
  </details>

  <p class="disclaimer">
    Indicative figures based on 2024/25 England, Wales &amp; NI bands. Excludes National Insurance,
    student loans, pension contributions, and Scottish rates. For a tailored calculation,
    <a href={contactUrl}>speak to one of our advisors</a>.
  </p>
</div>

<style>
  .estimator {
    background: var(--colour-surface);
    border: 1px solid var(--colour-border);
    border-radius: var(--radius);
    padding: 2rem;
    box-shadow: var(--shadow);
  }

  .input-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem 1rem;
    align-items: center;
    margin-bottom: 1.75rem;
  }

  label {
    font-weight: 600;
    color: var(--colour-ink);
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .prefix {
    position: absolute;
    left: 0.75rem;
    color: var(--colour-ink-soft);
  }

  input[type="number"] {
    width: 100%;
    padding: 0.6rem 0.6rem 0.6rem 1.6rem;
    font-size: 1rem;
    border: 1px solid var(--colour-border);
    border-radius: var(--radius);
    font-family: inherit;
  }

  input[type="range"] {
    grid-column: 1 / -1;
    accent-color: var(--colour-accent);
  }

  .results {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .result-card {
    background: var(--colour-bg);
    border-radius: var(--radius);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .result-card.highlight {
    background: var(--colour-ink);
    color: #fff;
  }

  .result-card .label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.7;
  }

  .result-card strong {
    font-family: var(--font-serif);
    font-size: 1.4rem;
  }

  details {
    border-top: 1px solid var(--colour-border);
    padding-top: 1rem;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--colour-ink);
  }

  details ul {
    list-style: none;
    padding: 0;
    margin: 0.75rem 0 0;
  }

  details li {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px dashed var(--colour-border);
    color: var(--colour-ink-soft);
  }

  .disclaimer {
    margin-top: 1.25rem;
    font-size: 0.8rem;
    color: var(--colour-ink-soft);
  }

  @media (max-width: 600px) {
    .results {
      grid-template-columns: 1fr;
    }
    .input-row {
      grid-template-columns: 1fr;
    }
  }
</style>
