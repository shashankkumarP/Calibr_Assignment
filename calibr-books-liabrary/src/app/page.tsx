"use client";
import React, { useEffect, useState } from "react";
import BookCart from "./component/BookCart";
import "./globals.css";
import Addbook from "./pages/Addbook/page";
import Link from "next/link";

interface Book {
  _id: string;
  Title: string;
  Author: string;
  PublicationYear: string;
  Isbn: string;
  Description: string;
}

interface InitialData {
  _id: string;
  Title: string;
  Author: string;
  PublicationYear: string;
  Isbn: string;
  Description: string;
  new: boolean;
}

export let handlepublicationyear = (ob: any) => {
  let a = ob.PublicationYear.toString().split("");
  let date = a.slice(0, 2).join("");
  let month = a.slice(2, 4).join("");
  let year = a.slice(4, 7).join("");
  let exact = date + month + year;
  ob["PublicationYear"] = exact;
  return ob;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([
    {
      _id: "3434",
      Title: "sd",
      Author: "df",
      PublicationYear: `12-01-2023`,
      Isbn: "dfd",
      Description: "dfdfdsfd dfdfd a dfds df",
    },
    {
      _id: "34434",
      Title: "sd",
      Author: "df",
      PublicationYear: `12-01-2023`,
      Isbn: "dfdd",
      Description: "df",
    },
    {
      _id: "34dfd434",
      Title: "sd",
      Author: "df",
      PublicationYear: `12-01-2023`,
      Isbn: "dfddsd",
      Description: "df dfd dfa fdfd adf",
    },
    {
      _id: "344ff34",
      Title: "sd",
      Author: "df",
      PublicationYear: `12-01-2023`,
      Isbn: "dfdfdd",
      Description: "df",
    },
  ]);
  let [Initial, setInitial] = useState<InitialData>({
    _id: "",
    Title: "",
    Author: "",
    PublicationYear: "",
    Isbn: "",
    Description: "",
    new: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  let handleedit = (data: InitialData) => {
    setInitial(data);
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080");
        let data = await response.json();
        console.log(data);
        data = data.data;
        const output = data.map((el: any) => {
          return handlepublicationyear(el);
        });
        setBooks(output);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // fetchData();
  }, []);

  return (
    <div>
      {!isModalOpen ? (
        <div>
          <h1 style={{ textAlign: "center" }}>Bookstore</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button onClick={openModal} disabled={isModalOpen}>
              Add Book
            </button>

            <Link href="/pages/search">
              <button>Search Book</button>
            </Link>
          </div>
          <div>
            <div className="book-list">
              {books.map((book) => (
                <BookCart handleedit={handleedit} key={book._id} book={book} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Addbook Initial={Initial} closeModal={closeModal} />
      )}
    </div>
  );
}
