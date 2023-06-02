<script>
	import InitialYearPicker from './InitialYearPicker.svelte';
	import GameLoop from './GameLoop.svelte';

	import {counter} from './store';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if $counter.gamePhase == 0}
		<InitialYearPicker />
	{/if}
	{#if $counter.gamePhase == 1}
		<GameLoop/>
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
