<script lang="ts">
	import {counter} from './store';

	let EARLIEST_PLAYABLE_YEAR = 2020;
	let numYears = (2023 - EARLIEST_PLAYABLE_YEAR) + 1;
	let years = [...Array(numYears).keys()].map( i =>  ({
		id: i,
		year: EARLIEST_PLAYABLE_YEAR + i
	}));
	let selected = years[0];

	let months = [
		{id: 0, month: 'January'},
		{id: 1, month: 'February'},
		{id: 2, month: 'March'},
		{id: 3, month: 'April'},
		{id: 4, month: 'May'},
		{id: 5, month: 'June'},
		{id: 6, month: 'July'},
		{id: 7, month: 'August'},
		{id: 8, month: 'September'},
		{id: 9, month: 'October'},
		{id: 10, month: 'November'},
		{id: 11, month: 'December'},
	];
	let selectedMonth = months[0];

	function handleSubmit() {
		counter.beginGame(selected.year, selectedMonth.id);
	}
</script>

<div>
	<h1>Hello Ape. </h1>
	<h2>Where do you want to respawn?</h2>

	<form on:submit|preventDefault={handleSubmit}>
		<select bind:value={selected}>
			{#each years as element}
				<option value={element}>
					{element.year}
				</option>
			{/each}
		</select>

		<select bind:value={selectedMonth}>
			{#each months as element}
				<option value={element}>
					{element.month}
				</option>
			{/each}
		</select>
		
		<br /><br/>
		<button type=submit>🤞 YOLO!</button>
	</form>
</div>