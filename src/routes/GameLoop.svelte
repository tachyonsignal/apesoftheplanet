<script lang="ts">
	import { POLYGON_API_KEY } from './config';
    import {counter} from './store';

    let ticker = `AAPL`;
    let isLoadingData  = false;
    let tickerData;
    let day = 1;

    let isWeekend;

    $: {
        const dayofWeek= (new Date(Date.UTC($counter.year, $counter.month, day))).getDay();
        isWeekend = dayofWeek == 0 || dayofWeek == 6;
    }

    function handleSubmit() {
        isLoadingData = true;
        const date = new Date(Date.UTC($counter.year, $counter.month, day));
        const dateString = date.toISOString().split('T')[0];
        fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dateString}/${dateString}?adjusted=true&sort=asc&limit=120&apiKey=${POLYGON_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                tickerData = json;

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
        counter.deductBalance(cost);
        counter.setPosition({
            ticker: tickerData.ticker,
            shares: shares
        });
        counter.stepMonth();
        day = 1;


        tickerData = undefined;
    }

    function close() {
        const low = tickerData.results[0].l;
        const fillPrice = Math.floor(low * 100 ) / 100;
        const proceeds = $counter.position.shares * fillPrice;
        console.log(proceeds)
        counter.debitBalance(proceeds);
        counter.closePosition();
        counter.stepMonth();
        day = 1;

        tickerData = undefined;
    }

    function nextMonth() {
        tickerData = undefined;
        counter.stepMonth();
        day = 1;
    }

    function nextDay() {
        tickerData = undefined;
        day++;
    }
</script>
<div>
	<h1>{$counter.year}/{$counter.month + 1}/{day}</h1>
    <h1>Day of week: {isWeekend ? 'Weekend' : 'Weekday'}</h1>

    <h1>Cash: ${$counter.cash}</h1>
    {#if $counter.position}
        <h1>Position: {$counter.position.ticker} x {$counter.position.shares} </h1>
    {/if}

 
      <form on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <legend>Trade</legend>
            {#if isWeekend}
                Market is closed on weekend.
            {:else}
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
                        {#if $counter.position}
                            <button on:click={close}>Close Position</button>
                        {:else}
                            <button on:click={buy}>Buy</button> 
                        {/if}
                    {:else}
                        <br />
                            Was not a trading day. 
                        {/if}
                    {/if}
            {/if}
        </fieldset>
      </form>

      <br /><br />
      <button on:click={nextMonth}>Skip to next Month</button>
      <button on:click={nextDay}>Skip to next day</button>
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