"use client";
import React, { useEffect, useState } from "react";
import BookCart from "./component/BookCart";
import "./globals.css";
import Addbook from "./pages/Addbook/page";
import Link from "next/link";
import {nanoid} from "nanoid"

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
  custom_id:string
  Description: string;
  new: boolean;
}

export let handlepublicationyear = (ob: any) => {
  let a = ob.PublicationYear.toString().split("");
  let date = a.slice(0, 4).join("");
  let month = a.slice(4, 6).join("");
  let year = a.slice(6, 8).join("");
  let exact = date +"-"+ month +"-"+ year;
  ob["PublicationYear"] = exact;
  return ob;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  let [Initial, setInitial] = useState<InitialData>({
    _id: "",
    Title: "",
    Author: "",
    PublicationYear: "",
    Isbn: "",
    custom_id:nanoid(32),
    Description: "",
    new: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [display,setDisplay] = useState(false)
  let handledelete = async (book:any) => {
    setDisplay(!display);
    console.log(book);
    try {
      let data = await fetch(`http://localhost:8080/books/${book._id}`, {
        method: "DELETE",
      });
      let response = await data.json();
      response = response.data;
    } catch (e) {
      console.log("error", e);
    }
  };
 
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
        const response = await fetch("http://localhost:8080/books");
        let data = await response.json();
        console.log(data.message);
        data = data.message;
        const output = data.map((el: any) => {
          return handlepublicationyear(el);
        });
        setBooks(output);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


    fetchData();
  },[display,Initial]);
 

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
            {books.length!=0 ?<div className="book-list">
              {books.map((book) => (
                <BookCart handleedit={handleedit} handledelete={handledelete}  key={book._id} book={book} />
              ))}
            </div>:<h1 style={{textAlign:'center'}} >No Books Present</h1>}
          </div>
        </div>
      ) : (
        <Addbook Initial={Initial} closeModal={closeModal} />
      )}
    </div>
  );
}
