<script>
  import { onMount } from "svelte";
  /** @type {import('./$types').ActionData} */
  export let form;

  onMount(() => {
    if (form?.state === "Success") {
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  });
</script>

<h2>Register</h2>

{#if form?.state === "Success"}
  <p>Registration successful! Redirecting to login page...</p>
{:else if form?.state === "VerifyCode"}
  <form method="POST" action="/register?/verify">
    <input type="hidden" name="username" value={form.username} />
    <div>
      <label for="code">Code</label>
      <input type="text" name="code" />
    </div>
    <button type="submit">Submit</button>
  </form>
{:else}
  <form method="POST" action="/register?/start">
    <div>
      <label for="username">Username</label>
      <input type="text" name="username" />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" />
    </div>
    <div>
      <label for="verifyPassword">Verify Password</label>
      <input type="password" name="verifyPassword" />
    </div>
    <button type="submit">Submit</button>
  </form>
{/if}
