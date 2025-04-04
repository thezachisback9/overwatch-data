import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [randomHero, setRandomHero] = useState(null);
  const [search, setSearch] = useState("");
  const [filtered2, setFiltered2] = useState([]);
 
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch('https://overfast-api.tekrop.fr/heroes');
        const data = await response.json();

        const numHeroes = 10;
        const heroArr = [];
        while (heroArr.length < numHeroes) {
          const ran = Math.floor(Math.random() * data.length);
          if (!heroArr.includes(data[ran])) {
            heroArr.push(data[ran]);
          }
        }
        setRandomHero(heroArr);
        setFiltered2(heroArr);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchHeroes();
  }, []);
  
  const filtered = randomHero ? randomHero.filter((hero) => (hero.name.toLowerCase()).includes(search.toLowerCase()) ): [];

  


  function numDPS(){
    if (!randomHero) return 0;
    let count = 0;
    for (let i = 0; i < filtered2.length; i++){
      if (filtered2[i].role === "damage"){
        count++;
      }
    }
    return count;
  }

  function numTank(){
    if (!randomHero) return 0;
    let count = 0;
    for (let i = 0; i < filtered2.length; i++){
      if (filtered2[i].role === "tank"){
        count++;
      }
    }
    return count;
  }

  function numSupp(){
    if (!randomHero) return 0;
    let count = 0;
    for (let i = 0; i < filtered2.length; i++){
      if (filtered2[i].role === "support"){
        count++;
      }
    }
    return count;
  }

  function showAll(){
    setFiltered2(filtered);
  }

  function showDPS(){
      setFiltered2(filtered.filter(hero => hero.role === "damage"))
}
function showTank(){
  setFiltered2(filtered.filter(hero => hero.role === "tank"))
  console.log(filtered2);
}
function showSupp(){
  setFiltered2(filtered.filter(hero => hero.role === "support"))
}

const handleSearchChange = (e) => {
  const newSearch = e.target.value;
  setSearch(newSearch);
  
  setFiltered2(randomHero ? randomHero.filter((hero) => hero.name.toLowerCase().includes(newSearch.toLowerCase())) : []);
};

  return (
    <div>
      <h1>RANDOM OVERWATCH HEROES</h1>
      <input
        type="text"
        placeholder="Search heroes..."
        value={search}
        onChange={handleSearchChange}
      />
      
      <button onClick = {showDPS}>Show only damage</button>
      <button onClick = {showTank}>Show only tank</button>
      <button onClick = {showSupp}>Show only support</button>
      <button onClick = {showAll}>Show all</button>

      {filtered2 && filtered2.length > 0 ? (
        <div>
          <h2>Number of heroes shown: {filtered2.length}</h2>
          <h4>Number of damage heroes shown: {numDPS()}</h4>
          <h4>Number of tank heroes shown: {numTank()}</h4>
          <h4>Number of support heroes shown: {numSupp()}</h4>
        <div className = "cont">
            <div className = "name">
            <h1>Name</h1>
            {filtered2.map((hero, index) => (
            <div>
            <h4>{hero.name}</h4>
            <p>-----------------------</p>
            </div>
            ))}
          </div>
          
          <div className = "role">
            <h1>Role</h1>
            {filtered2.map((hero, index) => (
            <div>
            <h4>{hero.role}</h4>
            <p>-----------------------------</p>
            </div>
            ))}
          </div>
  
          <div className = "pic">
            <h1>Portrait</h1>
            {filtered2.map((hero, index) => (
              <div>
              <img
            src={hero.portrait} 
            alt={hero.name}
          />
              <p>-------------------------</p>
              </div>
            
            ))}
            
          </div>
          

        
            </div>
        </div>
      ) : (
        <p>Loading hero...</p>
      )}
    </div>
  );
}

export default App;
