<script lang="ts">
  export let name: string;
  export let label: string;
  export let placeholder = "";
</script>

<label for={name}>{label}</label>
<textarea {name} {placeholder}></textarea>
