<style lang="scss">
	main {
		position: relative;
		/* max-width: 56em; */
		background-color: white;
		/*padding: 2em;*/
		/*margin: 0 auto;*/
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
</style>
<script>
import Nav from '../components/Nav.svelte';
</script>

<Nav></Nav>
<main>
	<slot></slot>
</main>
