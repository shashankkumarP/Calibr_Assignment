"use client";
import React, { useContext, useEffect } from "react";
import Link from "next/link";
import "./bookcart.css";
import { DisplayContext } from "../context/Displaycontext";
interface Book {
  _id: string;
  Title: string;
  Author: string;
  PublicationYear: string;
  custom_id: string;
  Isbn: string;
  Description: string;
}

interface Props {
  book: Book;
  handleedit: any;
}

const BookCart = ({ book, handleedit }: Props) => {
  let { handledisplay }: any = useContext(DisplayContext);

  let handledelete = async () => {
    console.log(book);
    let a = book.custom_id;
    try {
      let data = await fetch(`http://localhost:8080/books/${a}`, {
        method: "DELETE",
      });
      let response = await data.json();
      console.log("responst of delete");
      response = response.data;
      handledisplay();
    } catch (e) {
      handledisplay();
      console.log("error", e);
    }
  };

  let HandlingEdit = () => {
    let obj = {
      _id: book._id,
      Title: book.Title,
      Author: book.Author,
      PublicationYear: book.PublicationYear,
      Isbn: book.Isbn,
      Description: book.Description,
      new: false,
    };
    handleedit(obj);
    handledisplay();
  };

  return (
    <div className="book-card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCItZ8a5B3G4NgpKvsk6zzkkkmXRB4y1umcTBNsPKu8MFGaUhKT80m5rcsGDjFqnCGLs&usqp=CAU" />
      <h2>{book.Title}</h2>
      <p>{book.Author}</p>
      <p>{book.PublicationYear}</p>
      <p>{book.Isbn}</p>
      <p>{book.Description.split(" ").splice(0, 2).join(" ")}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={handledelete}
          disabled={handleedit == undefined ? true : false}
        >
          Delete
        </button>
        <button
          onClick={HandlingEdit}
          disabled={handleedit == undefined ? true : false}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default BookCart;
