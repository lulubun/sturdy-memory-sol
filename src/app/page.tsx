"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types";
import Image from "next/image";
import Pagination from './Pagination'
import AdvocateTable from "./Table";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [advCount, setAdvCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);


  useEffect(() => {
    fetch(`/api/advocates?initial=true`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setAdvCount(jsonResponse.data.length);
        setTotalCount(jsonResponse.totalCount);
      });
    });
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  useEffect(() => {
    fetch(`/api/advocates?page=${page}&search=${debouncedSearchTerm}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setAdvCount(jsonResponse.data.length);
      });
    });
  }, [page, debouncedSearchTerm]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    setSearchTerm("");
    setPage(0);
  };


  return (
    <main style={{ margin: "24px" }}>
      <div className="flex items-center gap-1">
        <Image src='/favicon.ico' alt='Solace Logo' width={50} height={50} />
        <h1 className="text-2xl font-bold text-green-900">olace Advocates</h1>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="search-term" className="text-green-900 text-xl">Search</label>
        <input id="search-term" value={searchTerm} className="border border-green-900 p-2 rounded" onChange={onChange} />
      </div>
      <p className="text-green-900 text-lg">Showing {advCount} advocate{advCount !== 1 ? 's' : ''} out of {totalCount}</p>
      <button className="bg-green-900 text-white px-4 py-2 rounded" onClick={onClick}>Reset Your Search</button>
      <Pagination page={page} setPage={setPage} totalCount={totalCount} />
      <AdvocateTable advocates={advocates} />
      <Pagination page={page} setPage={setPage} totalCount={totalCount} />
    </main>
  );
}
