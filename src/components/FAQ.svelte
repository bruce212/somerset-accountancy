<script lang="ts">
  interface Item {
    q: string;
    a: string;
  }

  let { items }: { items: Item[] } = $props();
  let openIndex = $state<number | null>(0);

  const toggle = (i: number) => {
    openIndex = openIndex === i ? null : i;
  };
</script>

<div class="faq">
  {#each items as item, i}
    <div class="faq-item" class:open={openIndex === i}>
      <button class="faq-q" onclick={() => toggle(i)} aria-expanded={openIndex === i}>
        <span>{item.q}</span>
        <span class="chev" aria-hidden="true">+</span>
      </button>
      {#if openIndex === i}
        <div class="faq-a">{item.a}</div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .faq {
    border-top: 1px solid var(--colour-border);
  }

  .faq-item {
    border-bottom: 1px solid var(--colour-border);
  }

  .faq-q {
    width: 100%;
    background: transparent;
    border: none;
    text-align: left;
    padding: 1.25rem 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--colour-ink);
    font-family: var(--font-serif);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .chev {
    font-size: 1.5rem;
    color: var(--colour-accent);
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .open .chev {
    transform: rotate(45deg);
  }

  .faq-a {
    padding: 0 0 1.25rem;
    color: var(--colour-ink-soft);
    line-height: 1.6;
    max-width: 60ch;
  }
</style>
