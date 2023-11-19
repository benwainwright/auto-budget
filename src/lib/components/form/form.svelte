<script lang="ts">
  import { Button } from "$lib/components";
  export let action: string | undefined = undefined;
  const attributes = action ? { action } : {};
</script>

<form {...attributes} method="POST" class="card">
  <slot />
  <footer>
    <Button primary type="submit">Submit</Button>
  </footer>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  footer {
    margin-top: 1rem;
  }
</style>
