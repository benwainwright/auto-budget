<script>
  import { Form, InputField, ParagraphText, Section } from "$lib/components";
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

<Section heading="Login">
  {#if form?.state === "Success"}
    <ParagraphText
      >Registration successful! Redirecting to home page...</ParagraphText
    >
  {:else}
    <ParagraphText
      >Already have an account? <a href="/register">Register</a></ParagraphText
    >
    <Form>
      <InputField name="username" label="Username" />
      <InputField name="password" label="Password" type="password" />
    </Form>
  {/if}
</Section>
