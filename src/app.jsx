import { useState } from "preact/hooks";

export function App() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState("");
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async (event) => {
        event.preventDefault();
        setLoading(true);
        const res = await fetch('https://api.api-ninjas.com/v1/nutrition?query=' + query, {
            headers: {
                "X-Api-Key": "BINJ/CQwYIxHBUlJLf/FlA==evNm07bEu32LFWIx"
            }
        });
        const nutrition = await res.json();
        console.log(nutrition);
        setResults([nutrition[0].name, nutrition[0].serving_size_g, nutrition[0].calories]);
        setLoading(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setTotal(total + parseInt(count));
    }

	return (
        <div className="text-xl bg-gray-700 min-h-screen p-6">
            <div className="text-4xl text-emerald-400 font-bold pb-10">Calorie Counter</div>
            <div className="text-white font-bold">Your total calories today: <span className="text-emerald-400">{total}</span></div>
            <div className="w-full flex flex-col justify-center items-center pt-14">   
            <div className="text-white font-bold  w-[500px]">
                Please enter your consumed calories
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="outline-none text-gray-700"></input>
                    <button type="submit" className="bg-emerald-400 text-base rounded mt-4">Add</button>
                </form>
                
            </div>
            <div className="text-emerald-400 font-bold w-[500px] flex justify-center p-10">OR</div>
            <div className="text-white font-bold flex flex-col w-[500px]">
                Search for your food
                <form className="flex flex-col" onSubmit={fetchData}>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="outline-none text-gray-700"></input>
                    <button type="submit" className="bg-emerald-400 text-base rounded mt-4">Search</button>
                </form>
                {loading ? <div className="mt-5">Loading</div> : <div>{results ? <div className="mt-5">{results[0]}, {results[1]}g, {results[2]} Calories</div> : <div></div>}</div>}
                
            </div>
            </div>
        </div>
    );
}
