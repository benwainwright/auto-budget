<script lang="ts">
  import { SectionHeading } from "$lib/components";
  export let heading: string | undefined = undefined;
  export let subHeading: string | undefined = undefined;
</script>

<section>
  {#if heading}
    <SectionHeading text={heading} subHeader={subHeading} />
  {/if}
  <slot />
</section>
