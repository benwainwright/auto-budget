<script lang="ts">
  import { HeadingTwo } from "$lib/components";

  export let text: string;
  export let subHeader: string | undefined = undefined;
</script>

<header>
  <HeadingTwo>{text}</HeadingTwo>
  {#if subHeader}
    <p>{subHeader}</p>
  {/if}
</header>
