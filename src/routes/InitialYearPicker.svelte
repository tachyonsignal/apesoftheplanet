<script lang="ts">
	import {counter} from './store';

	let numYears = (2023 - 1970) + 1;
	let years = [...Array(numYears).keys()].map( i =>  ({
		id: i,
		year: 1970 + i
	}));
	let selected = years[0];

	function handleSubmit() {
		counter.beginGame(selected.year);
	}
</script>

<div>
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