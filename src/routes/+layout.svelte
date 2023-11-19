<script lang="ts">
  import { Navbar } from "$lib/components";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<header>
  <Navbar loggedIn={data.loggedIn} />
</header>
<main>
  <slot />
</main>

<style>
  main {
    max-width: 30rem;
    margin: 0 auto;
    overflow: hidden;
  }
</style>
