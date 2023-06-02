<script>
	import InitialYearPicker from './InitialYearPicker.svelte';
	import {counter} from './store';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#if $counter.gamePhase == 0}
		<h1>Hello Ape. Welcome to the present.</h1>
		<h2>What year do you want to go back to?</h2>
		<InitialYearPicker />
	{/if}
	{#if $counter.gamePhase == 1}
		<h1>Year: {$counter.year}</h1>
		<h1>Net worth: {$counter.cash}</h1>
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
