<script lang="ts">
  import type { PageData } from "./$types";
  import { Section, Table, TableHeader, TableRow } from "$lib/components";

  export let data: PageData;

  export let payments = data.payments;
</script>

<Section heading="Payments">
  <Table>
    <TableHeader columns={["Name", "Amount", "When"]} />
    <tbody>
      {#each payments as payment}
        <TableRow columns={[payment.name, payment.amount, payment.when]} />
      {/each}
    </tbody>
  </Table>
</Section>
