<script lang="ts">
	import {counter} from './store';

	let EARLIEST_PLAYABLE_YEAR = 2020;
	let numYears = (2023 - EARLIEST_PLAYABLE_YEAR) + 1;
	let years = [...Array(numYears).keys()].map( i =>  ({
		id: i,
		year: EARLIEST_PLAYABLE_YEAR + i
	}));
	let selected = years[0];

	function handleSubmit() {
		counter.beginGame(selected.year);
	}
</script>

<div>
	<h1>Hello Ape. Welcome to the present.</h1>
	<h2>What year do you want to go back to?</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<select bind:value={selected}>
			{#each years as element}
				<option value={element}>
					{element.year}
				</option>
			{/each}
		</select>

		<br /><br/>
		<button type=submit>🚀 Blast off!</button>
	</form>
</div>