"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types";
import Image from "next/image";
import Pagination from './Pagination'
import AdvocateTable from "./Table";
import Loading from "./Loading";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [advCount, setAdvCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/advocates?initial=true`).then((response) => {
      response.json().then((jsonResponse) => {
        setIsLoading(false);
        setAdvocates(jsonResponse.data);
        setAdvCount(jsonResponse.data.length);
        setTotalCount(jsonResponse.totalCount);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`/api/advocates?page=${page}&search=${debouncedSearchTerm}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setAdvCount(jsonResponse.data.length);
      });
    });
  }, [page, debouncedSearchTerm]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    setSearchTerm("");
    setPage(0);
  };


  return (
    <main style={{ margin: "24px" }}>
      <header className="flex items-center gap-1">
        <Image src='/favicon.ico' alt='Solace Logo as letter S' width={50} height={50} />
        <h1 className="text-2xl font-bold text-green-900">olace Advocates</h1>
      </header>
      {isLoading && <Loading />}
      <section className="flex flex-col gap-2">
        <label htmlFor="search-term" className="text-green-900 text-xl">Search</label>
        <input id="search-term" value={searchTerm} className="border border-green-900 p-2 rounded" onChange={onChange} />
      </section>
        <p className="text-green-900 text-lg">Showing {advCount} advocate{advCount !== 1 ? 's' : ''} out of {totalCount}</p>
        <button className="bg-green-900 text-white px-4 py-2 rounded" onClick={onClick}>Reset Your Search</button>
        <Pagination searchTerm={searchTerm} page={page} setPage={setPage} totalCount={totalCount} advCount={advCount}/>
        <AdvocateTable advocates={advocates} />
        <Pagination searchTerm={searchTerm} page={page} setPage={setPage} totalCount={totalCount} advCount={advCount} />
    </main>
  );
}
