<script lang="ts">
  export let columns: string[] = [];
</script>

<tr>
  {#each columns as column}
    <td>{column}</td>
  {/each}
</tr>

<style>
  td {
    padding: 0.8rem 1.2rem;
  }
  tr:nth-child(even) {
    background-color: var(--color-accent);
  }
</style>
