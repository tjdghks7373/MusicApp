"use client";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

interface Music {
  trackId: number;
  title: string;
  artist: string;
  album: string;
  image: string;
}

// 스타일 정의
const Container = styled.main`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const MusicItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  list-style: none;
`;

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Music[]>([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://musicapp-5rdg.onrender.com/search?q=${query}`,
      );
      const data = await res.json();

      console.log("서버 응답 데이터:", data); // F12 콘솔에서 데이터 확인

      if (data && data.results) {
        setResults(data.results);
      } else {
        console.warn("데이터가 비어있습니다:", data);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  return (
    <Container>
      <h1>🎵 음악 검색</h1>
      <SearchBox>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>검색</button>
      </SearchBox>

      <ul>
        {results.map((music: Music, index: number) => (
          // trackId와 index를 조합하여 고유성을 더 확실히 보장합니다.
          <MusicItem key={`${music.trackId}-${index}`}>
            <Image src={music.image} alt={music.title} width={50} height={50} />
            <div>
              <h3>{music.title}</h3>
              <p>{music.artist}</p>
            </div>
          </MusicItem>
        ))}
      </ul>
    </Container>
  );
}
