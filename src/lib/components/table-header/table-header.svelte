<script lang="ts">
  export let columns: string[] = [];
</script>

<thead>
  <tr>
    {#each columns as column}
      <th>{column}</th>
    {/each}
  </tr>
</thead>

<style>
  tr {
    border-radius: var(--border-radius);
  }

  th {
    background-color: var(--color-table);
    color: white;
    padding: 1.2rem 1.2rem;
  }
</style>
