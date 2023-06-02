<script lang="ts">
	import { POLYGON_API_KEY } from './config';
    import {counter} from './store';

    let ticker = `AAPL`;
    let isLoadingData  = false;
    let tickerData;
    let day = 1;

    function handleSubmit() {
        isLoadingData = true;
        const date = new Date(Date.UTC($counter.year, $counter.month, day));
        const dateString = date.toISOString().split('T')[0];
        fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dateString}/${dateString}?adjusted=true&sort=asc&limit=120&apiKey=${POLYGON_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                tickerData = json;

                if(tickerData.resultsCount == 0) {
                    day++;
                }
                isLoadingData = false;
            }).catch(error => {
                console.log(error);
                return [];
            });
    }

    function buy() {
        const high = tickerData.results[0].h;
        const fillPrice = Math.ceil(high * 100) / 100 ;
        const shares = Math.floor($counter.cash / fillPrice);
        const cost = shares * fillPrice;
        console.log(shares);
        counter.deductBalance(cost);
    }
</script>
<div>
	<h1>Year: {$counter.year}</h1>
    <h1>Month: {$counter.month}</h1>
    <h1>Day: {day}</h1>

    <h1>Net worth: {$counter.cash}</h1>

    <form class="content" on:submit|preventDefault={handleSubmit}>
        <label>Stock Ticker</label>
        <input type="text" bind:value={ticker} disabled={isLoadingData}/>
        {#if ticker}
            <button type=submit disabled={isLoadingData}>🚀 Lookup</button>
        {/if}
        {#if isLoadingData}
            <div class="loader"></div> 
        {/if}
        {#if !!tickerData }
            {#if tickerData.results && tickerData.results.length > 0}
            <dl>
                <dt>Ticker</dt>
                <dd>{tickerData.ticker}</dd>
                <dt>High</dt>
                <dd>{tickerData.results[0].h}</dd>
                <dt>Low</dt>
                <dd>{tickerData.results[0].l}</dd>
            </dl>
            <button on:click={buy}>Buy</button>
            {:else}
                Was not a trading day. Incremented day, now try again.
            {/if}
        {/if}
      </form>
</div>

<style>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>