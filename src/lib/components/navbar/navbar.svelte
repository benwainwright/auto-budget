<script lang="ts">
  import { MenuItem } from "$lib/components";
  export let loggedIn: boolean;
</script>

<header>
  <nav>
    <p class="brand">Auto Budget</p>
    <div>
      <MenuItem href="/">Home</MenuItem>
      {#if loggedIn}
        <MenuItem href="/payments">Payments</MenuItem>
        <MenuItem href="/payments">Payments</MenuItem>
        <MenuItem href="#">Logout</MenuItem>
      {:else}
        <MenuItem href="/login">Login</MenuItem>
        <MenuItem href="/register">Register</MenuItem>
      {/if}
    </div>
  </nav>
</header>

<style>
  header {
    border-bottom: 1px solid var(--color-bg-secondary);
  }
  nav div {
    display: flex;
    gap: 1rem;
  }
  nav {
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    padding: 4rem;
  }
  .brand {
    flex-grow: 2;
  }
</style>
