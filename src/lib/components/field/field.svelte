<script lang="ts">
  export let name: string;
  export let label: string;
</script>

<div>
  <label for={name}>{label}</label>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin: 0 0 0.4rem 0;
  }
</style>
