<script lang="ts">
  let name = $state("");
  let email = $state("");
  let company = $state("");
  let service = $state("");
  let message = $state("");
  let submitted = $state(false);
  let error = $state<string | null>(null);

  const services = [
    "Annual accounts",
    "Tax returns",
    "Bookkeeping & VAT",
    "Payroll",
    "Company secretarial",
    "Business advice",
    "Fee protection insurance",
    "Cloud accounting",
    "Other",
  ];

  function handleSubmit(e: Event) {
    e.preventDefault();
    error = null;

    if (!name.trim() || !email.trim() || !message.trim()) {
      error = "Please fill in your name, email and a brief message.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = "Please enter a valid email address.";
      return;
    }

    // Static site: this is a demo handler. Wire up to a form service
    // (Formspree, Netlify Forms, Cloudflare Pages function, etc.) before going live.
    submitted = true;
  }
</script>

{#if submitted}
  <div class="success">
    <h3>Thanks, {name.split(" ")[0]}.</h3>
    <p>
      Your enquiry has been received. A member of our team will be in touch within one working day.
    </p>
  </div>
{:else}
  <form onsubmit={handleSubmit} novalidate>
    <div class="row">
      <label>
        Full name
        <input type="text" bind:value={name} autocomplete="name" required />
      </label>
      <label>
        Email
        <input type="email" bind:value={email} autocomplete="email" required />
      </label>
    </div>

    <div class="row">
      <label>
        Company (optional)
        <input type="text" bind:value={company} autocomplete="organization" />
      </label>
      <label>
        Service of interest
        <select bind:value={service}>
          <option value="">Select…</option>
          {#each services as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
      </label>
    </div>

    <label>
      How can we help?
      <textarea rows="5" bind:value={message} required></textarea>
    </label>

    {#if error}
      <p class="error" role="alert">{error}</p>
    {/if}

    <button type="submit" class="button button-primary">Send enquiry</button>
    <p class="privacy">
      We respect your privacy. Your details will only be used to respond to your enquiry.
    </p>
  </form>
{/if}

<style>
  form {
    display: grid;
    gap: 1.25rem;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--colour-ink);
  }

  input,
  select,
  textarea {
    font: inherit;
    font-weight: 400;
    padding: 0.7rem 0.85rem;
    border: 1px solid var(--colour-border);
    border-radius: var(--radius);
    background: var(--colour-surface);
    color: var(--colour-ink);
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--colour-accent);
    outline-offset: 1px;
    border-color: transparent;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .error {
    color: #b00020;
    font-size: 0.9rem;
    margin: 0;
  }

  .privacy {
    font-size: 0.8rem;
    color: var(--colour-ink-soft);
    margin: 0;
  }

  .success {
    background: var(--colour-surface);
    border-left: 4px solid var(--colour-accent);
    padding: 1.5rem;
    border-radius: var(--radius);
  }

  button[type="submit"] {
    justify-self: start;
  }

  @media (max-width: 600px) {
    .row {
      grid-template-columns: 1fr;
    }
  }
</style>
