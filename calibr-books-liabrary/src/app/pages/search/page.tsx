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
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = async () => {
    try {
      console.log(query);
      const response = await fetch(`http://localhost:8080/books/search?q=${query}`);
      let data = await response.json();
      console.log(data);
      data = data.data;
      let output = data.map((el: any) => {
        return handlepublicationyear(el);
      });
      setSearchResults(output);
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
          <BookCart key={book._id} book={book} handledelete={undefined} handleedit={undefined} />
        ))}
      </div>
    </div>
  );
};

export default Search;
