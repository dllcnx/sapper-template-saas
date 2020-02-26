<script>
  import Nav from "../components/Nav.svelte";
  export let segment;
</script>

<style lang="scss">
  @import "../style/global.scss";   // 引入全局样式

  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
