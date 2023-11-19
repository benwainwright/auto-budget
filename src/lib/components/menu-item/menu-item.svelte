<script lang="ts">
  export let href: string;
</script>

<a class="button" {href}><slot /></a>

<style>
  a {
    font-weight: normal;
    color: #4a4949;
  }
</style>
