import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';

function HeroDetail() {
  const { key } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`https://overfast-api.tekrop.fr/heroes/${key}`);
        const data = await res.json();
        setHero(data);
      } catch (err) {
        console.error('Failed to fetch hero', err);
      }
    };

    fetchHero();
  }, [key]);

  if (!hero) return <p>Loading...</p>;

  return (
    <div className="detail-view">
      <div className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/">About</Link></li>
        </ul>
      </div>

      <div className="hero-content">
        <h1>{hero.name}</h1>
        <img src={hero.portrait} alt={hero.name} />
        <p><strong>Location:</strong> {hero.location || "Unknown"}</p>
        <p><strong>Age:</strong> {hero.age || "Unknown"}</p>
        <p><strong>Birthday:</strong> {hero.birthday || "Unknown"}</p>
        <p><strong>Description:</strong> {hero.description || "N/A"}</p>
      </div>
    </div>
  );
}

export default HeroDetail;
