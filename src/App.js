import {useEffect, useState} from 'react';

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [dollors, setDollors] = useState(0);

    const onChange = (e) => setDollors(unused => Number(e.target.value));

    console.log("rendered.");

    useEffect(
        () => {
            fetch("https://api.coinpaprika.com/v1/tickers")
                .then(response => response.json())
                .then(json => {
                    setCoins(unused => json);
                    setLoading(false);
                })
        },
        []
    );

    return (
        <div>
            <h1>The Coins! {!loading && <span>({coins.length})</span>}</h1>
            {loading && <strong>Loading...</strong>}
            <div>
                <input type="number" value={dollors} onChange={onChange}/>
                <span>dollars</span>
            </div>
            <ul>
                {coins.map(coin => (
                    <li key={coin.id}>
                        {coin.name}
                        ({coin.symbol}): {coin.quotes.USD.price.toFixed(3)} USD
                        {dollors > 0 && (
                            <span> - {(dollors / coin.quotes.USD.price).toFixed(6)} {coin.symbol}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
