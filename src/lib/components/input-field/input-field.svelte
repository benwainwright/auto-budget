<script lang="ts">
  import { Field } from "../field";

  export let name: string;
  export let label: string;
  export let type = "text";
  export let placeholder = "";
</script>

<Field {name} {label}>
  <input class="field" {type} {name} id={name} {placeholder} />
</Field>

<style>
  .field {
    padding: 0.8rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-text-secondary);
  }
</style>
