import { useState, useEffect } from 'react';
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import './App.css';

function Home() {
  const [randomHero, setRandomHero] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered2, setFiltered2] = useState([]);
  const [expandedHero, setExpandedHero] = useState(null);

  const heroes = ["ana", "ashe", "baptiste", "bastion", "brigitte", "cassidy", "dva", "doomfist", "echo", "freja", "genji", "hazard", "hanzo", "illari", "junker-queen", "junkrat", "juno", "kiriko", "lifeweaver", "lucio", "mauga", "mei", "mercy", "moira", "orisa", "pharah", "ramattra", "reaper", "reinhardt", "roadhog", "sigma", "sojourn", "soldier-76", "sombra", "symmetra", "torbjorn", "tracer", "venture", "widowmaker", "winston", "wrecking-ball", "zarya", "zenyatta"];

  useEffect(() => {
    const fetchHeroes = async () => {
      const selected = new Set();
      const heroArr = [];

      while (heroArr.length < 10) {
        const randomNum = Math.floor(Math.random() * heroes.length);
        const key = heroes[randomNum];
        if (selected.has(key)) continue;

        try {
          const response = await fetch(`https://overfast-api.tekrop.fr/heroes/${key}`);
          if (!response.ok) continue;
          const data = await response.json();
          data.key = key;
          heroArr.push(data);
          selected.add(key);
        } catch (error) {
          console.error("Error fetching hero:", key, error);
        }
      }

      setRandomHero(heroArr);
      setFiltered2(heroArr);
    };

    fetchHeroes();
  }, []);

  const filtered = randomHero.filter((hero) =>
    hero.name.toLowerCase().includes(search.toLowerCase())
  );

  function numDPS() {
    return filtered2.filter(h => h.role === "damage").length;
  }
  function numTank() {
    return filtered2.filter(h => h.role === "tank").length;
  }
  function numSupp() {
    return filtered2.filter(h => h.role === "support").length;
  }

  function showAll() {
    setFiltered2(filtered);
  }
  function showDPS() {
    setFiltered2(filtered.filter(hero => hero.role === "damage"));
  }
  function showTank() {
    setFiltered2(filtered.filter(hero => hero.role === "tank"));
  }
  function showSupp() {
    setFiltered2(filtered.filter(hero => hero.role === "support"));
  }

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setFiltered2(randomHero.filter((hero) =>
      hero.name.toLowerCase().includes(newSearch.toLowerCase())
    ));
  };

  const roleData = [
    { role: 'Damage', count: numDPS() },
    { role: 'Tank', count: numTank() },
    { role: 'Support', count: numSupp() },
  ];

  // Average age by role
  const ageSums = {
    damage: { totalAge: 0, count: 0 },
    tank: { totalAge: 0, count: 0 },
    support: { totalAge: 0, count: 0 },
  };

  filtered2.forEach(hero => {
    const role = hero.role;
    if (hero.age && ageSums[role]) {
      ageSums[role].totalAge += hero.age;
      ageSums[role].count += 1;
    }
  });

  const avgAgeData = Object.entries(ageSums).map(([role, stats]) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    averageAge: stats.count ? (stats.totalAge / stats.count).toFixed(1) : 0,
  }));

  return (
    <div>
      <h1>RANDOM OVERWATCH HEROES</h1>
      <h5>click names for more info</h5>
      <input
        type="text"
        placeholder="Search heroes..."
        value={search}
        onChange={handleSearchChange}
      />
      <button onClick={showDPS}>Show only damage</button>
      <button onClick={showTank}>Show only tank</button>
      <button onClick={showSupp}>Show only support</button>
      <button onClick={showAll}>Show all</button>

      <h3>Heroes by Role</h3>
      <BarChart width={300} height={200} data={roleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <h3>Average Age by Role</h3>
      <BarChart width={400} height={300} data={avgAgeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="averageAge" fill="#ffa07a" />
      </BarChart>

      {filtered2 && filtered2.length > 0 ? (
        <div>
          <h2>Number of heroes shown: {filtered2.length}</h2>
          <h4>Number of damage heroes shown: {numDPS()}</h4>
          <h4>Number of tank heroes shown: {numTank()}</h4>
          <h4>Number of support heroes shown: {numSupp()}</h4>

          <div className="cont">
            {filtered2.map((hero) => (
              <div key={hero.name} className="hero-card">
                <Link to={`/heroes/${hero.key}`}>
                  <h4>{hero.name}</h4>
                </Link>
                <img src={hero.portrait} alt={hero.name} />
                {expandedHero === hero.name && (
                  <div className="extra">
                    <p><strong>Location:</strong> {hero.location || "Unknown"}</p>
                    <p><strong>Age:</strong> {hero.age || "Unknown"}</p>
                    <p><strong>Birthday:</strong> {hero.birthday || "Unknown"}</p>
                  </div>
                )}
                <p>-----------------------</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading hero...</p>
      )}
    </div>
  );
}

export default Home;
