<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let primary: boolean | undefined = undefined;
  const attributes = type ? { type } : {};
  const finalAttributes = primary
    ? { ...attributes, class: "primary" }
    : attributes;
</script>

<button class="button" {...finalAttributes}><slot /></button>

<style>
  button {
    padding: 0.8rem 1.8rem;
    font-weight: bold;
    font-size: 1.2rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-text-secondary);
    background-color: white;
  }

  button.primary {
    color: white;
    border: 0;
    background-color: var(--color-link);
  }
</style>
