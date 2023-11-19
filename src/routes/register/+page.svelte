<script lang="ts">
  import {
    Button,
    Form,
    HiddenField,
    InputField,
    ParagraphText,
    Section,
  } from "$lib/components";
  import { onMount } from "svelte";
  import type { ActionData } from "./$types";
  export let form: ActionData;

  onMount(() => {
    if (form?.state === "Success") {
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  });
</script>

<Section heading="Register">
  {#if form?.state === "Success"}
    <ParagraphText
      >Registration successful! Redirecting to login page...</ParagraphText
    >
  {:else if form?.state === "VerifyCode"}
    <Form action="/register?/verify">
      <HiddenField name="username" value={form.username ?? ""} />
      <InputField name="code" label="Code" />
      <Button type="submit">Submit</Button>
    </Form>
  {:else}
    <Form action="/register?/start">
      <InputField name="username" label="Username" />
      <InputField name="email" label="Email" type="email" />
      <InputField name="password" label="Password" type="password" />
      <InputField
        name="verifyPassword"
        label="Verify Password"
        type="password"
      />
    </Form>
  {/if}
</Section>
