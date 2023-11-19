<script>
  import { onMount } from "svelte";
  /** @type {import('./$types').ActionData} */
  export let form;

  onMount(() => {
    if (form?.state === "Success") {
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  });
</script>

<h2>Login</h2>

{#if form?.state === "Success"}
  <p>Registration successful! Redirecting to home page...</p>
{:else}
  <p>Already have an account? <a href="/register">Register</a></p>

  <form method="POST">
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" />
    </div>
    <button type="submit">Submit</button>
  </form>
{/if}
