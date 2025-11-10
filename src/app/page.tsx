"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types";
import Image from "next/image";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.filter(s => s.toLowerCase().includes(searchTerm)).length > 0 ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {

    setFilteredAdvocates(advocates);
  };
  const greenCell = "px-6 py-4 bg-green-900 dark:text-white border-b border-white";
  const whiteCell = "px-6 py-4";
  const headerCell = "px-6 py-4 sticky top-0"

  return (
    <main style={{ margin: "24px" }}>
      <div className="flex items-center gap-1">
        <Image src='/favicon.ico' alt='Solace Logo' width={50} height={50} />
        <h1 className="text-2xl font-bold text-green-900">olace Advocates</h1>
      </div>
      <br />
      <br />
      <div>
        <p className="text-green-900 text-xl">Search</p>
        <input className="border border-green-900 p-2 rounded" onChange={onChange} />
        <br />
        <button className="bg-green-900 text-white px-4 py-2 rounded" onClick={onClick}>Reset Your Search</button>
      </div>
      <br />
      <br />
      <table className="table-auto w-full align-top text-left rtl:text-right">
        <thead className="bg-green-900 px-6 py-4 text-white dark:bg-green-900  sticky top-0">
          <tr className="px-6 py-4 font-medium text-green-900 whitespace-nowrap bg-green-900 dark:text-white dark:bg-green-900 sticky top-0">
            <td className={headerCell}>First Name</td>
            <td className={headerCell}>Last Name</td>
            <td className={headerCell}>City</td>
            <td className={headerCell}>Degree</td>
            <td className={headerCell}>Specialties</td>
            <td className={headerCell}>Years of Experience</td>
            <td className={headerCell}>Phone Number</td>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate, idx:number) => {
            if(advocate) {
              const phoneNumReadable = advocate.phoneNumber ? advocate.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A';
            return (
              <tr key={advocate.lastName + idx} className="px-6 py-4 font-medium text-green-900 whitespace-nowrap align-top border-b border-green-900">
                <td className={whiteCell}>{advocate.firstName}</td>
                <td className={greenCell}>{advocate.lastName}</td>
                <td className={whiteCell}>{advocate.city}</td>
                <td className={greenCell}>{advocate.degree}</td>
                <td className={`${whiteCell} text-xs`}>
                  {advocate.specialties.map((s: string, i: number) => (
                    <div key={s + i}>*{s}</div>
                  ))}
                </td>
                <td className={greenCell}>{advocate.yearsOfExperience}</td>
                <td className={whiteCell}>{phoneNumReadable}</td>
              </tr>
            );
          }})}
        </tbody>
      </table>
    </main>
  );
}
