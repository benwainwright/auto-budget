<script>
  export let data;
</script>

<nav>
  <ul>
    <li><strong>Auto Budget</strong></li>
  </ul>
  <ul>
    {#if data.loggedIn}
      <li><a href="">Logout</a></li>
    {:else}
      <li><a href="/login">Logout</a></li>
      <li><a href="/register">Register</a></li>
    {/if}
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<h1>Auto Budget...</h1>
<slot />
