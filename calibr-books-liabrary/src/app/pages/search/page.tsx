"use client";
import React, { useEffect, useRef, useState } from "react";
import BookCart from "../../component/BookCart";
import Link from "next/link";
import "./search.css";
import { handlepublicationyear } from "@/app/page";

interface Book {
  _id: string;
  Title: string;
  Author: string;
  PublicationYear: string;
  Isbn: string;
  Description: string;
}

const Search = () => {
  const [query, setQuery] = useState<any>("");
  const [searchResults, setSearchResults] = useState<Book[]>([
    {
      _id: "3434",
      Title: "sd",
      Author: "df",
      PublicationYear: "12-01-1995",
      Isbn: "123",
      Description: "dfdfdsfd dfdfd a dfds df",
    },
    {
      _id: "34434",
      Title: "sd",
      Author: "df",
      PublicationYear: "12-01-1995",
      Isbn: "3d3e",
      Description: "df",
    },
    {
      _id: "34dfd434",
      Title: "sd",
      Author: "df",
      PublicationYear: "12-01-1995",
      Isbn: "3f",
      Description: "df dfd dfa fdfd adf",
    },
  ]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:9200?q=${query}`);
      let data = await response.json();
      data = data.data;
      let ouput = data.map((el: any) => {
        return handlepublicationyear(el);
      });
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    let timer: any;
    if (query) {
      timer = setTimeout(() => {
        handleSearch();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [query]);

  // function setQuery(value:any) {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div>
      <div className="heading">
        <Link href="/">
          <button>Home Page</button>
        </Link>
        <h1>Search Books</h1>
      </div>

      <div className="search-bar">
        <input
          className="search"
          type="text"
          placeholder="Search by title, author, or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div></div>
      </div>
      <div className="search-results">
        {searchResults.map((book) => (
          <BookCart key={book._id} book={book} handleedit={undefined} />
        ))}
      </div>
    </div>
  );
};

export default Search;
