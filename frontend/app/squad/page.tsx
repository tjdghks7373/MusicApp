"use client";
import { useEffect, useState } from "react";

interface Player {
  back_number: string;
  name: string;
  age: string;
  nation: string;
  position: string;
}

export default function SquadPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://arsenal-cy44.onrender.com/api/players") // http://127.0.0.1:8000/api/players
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data.players].sort(
          (a, b) => parseInt(a.back_number) - parseInt(b.back_number),
        );
        setPlayers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 로드 실패:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>Arsenal 선수단 (등번호 순)</h1>
      {players.map((player: Player) => (
        <div key={player.back_number}>
          {player.back_number}: {player.name} : {player.age}
        </div>
      ))}
    </div>
  );
}
