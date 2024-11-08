import { useEffect, useState } from 'react'
import '../weather.css'
function Home(){
    
    const [weather, setWeather]= useState(null)
    const [inputvalue, setInputValue] = useState('')
    const [searchData, setSearchData] = useState(null)  
    const [error, setError] = useState(null);
    

    const handleInputChange = (e)=>{
        setInputValue(e.target.value)
    }
    const handleSearch = ()=>{
        if(inputvalue.trim){
            setSearchData(inputvalue)
            setError(null)
        } else {
            setError("Please enter a city name.");
        }
    }
    useEffect(()=>{
        if (searchData) {
            fetchData(searchData);
        }
    },[searchData])
    async function fetchData(city) {
         const apiKey = import.meta.env.VITE_API_KEY;
        try{
            const apiResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
            const response = await apiResponse.json()
            if(response){
                setWeather(response)
                
            }else{
                setWeather(null)
            }
        }catch(err){
            console.log('There was a problem', err)
            setWeather(null)
        }
    }
    
    
    function currentDay () {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date()
        const dayOfTheWeek = days[currentDate.getDay()]
        return dayOfTheWeek
    }  
    
    return(
        
        <div className="main">
            <div className="search-bar">
                <input type="search" name="search" value={inputvalue} onChange={handleInputChange} id="searchBar" placeholder='Search ...'/>
                <span className="material-symbols-outlined" onClick={handleSearch}>
                    search
                </span>
            </div>
            <div className="container">
                
                {!weather  ? <h1>Weather App</h1>
                :<div className='hero'>
                <div className="left">
                    <div className="left__top-left">
                        <h1>{weather?.location?.name}</h1>
                        <h3>{currentDay()}</h3>
                        <p>{weather?.location?.localtime}</p>
                        <p>wind: { weather.current.wind_kph} kph</p>
                        <p><span className="material-symbols-outlined">
                            water_drop
                            </span>{weather?.current?.humidity}%
                        </p>
                    </div>
                    <div className="left__mid">
                        <img src={weather.current.condition.icon} alt="" />
                        <p>{weather?.current?.temp_c}<span style={{fontSize:20}}>°C</span></p>
                    </div>
                </div>
                <div className="left__foot">
                    <strong>{weather?.current?.condition?.text}</strong>
                </div>
                </div>}
                
              
                
                
                <div className="right">
                    <ul>
                        <li> Mon <span className="material-symbols-outlined">sunny</span> 22</li>
                        <li> Tues <span className="material-symbols-outlined">cloud</span> 22</li>
                        <li> Thurs <span className="material-symbols-outlined">ac_unit</span> 22</li>
                        <li> Fri <span className="material-symbols-outlined">rainy</span> 22</li>
                        <li> Sat <span className="material-symbols-outlined">air</span> 22</li>
                    </ul>
                </div>           
            </div>
        </div>
            
    )
}
export default Home;