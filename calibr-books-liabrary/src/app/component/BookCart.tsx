"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import "./bookcart.css";
interface Book {
  _id: string;
  Title: string;
  Author: string;
  PublicationYear: string;
  Isbn: string;
  Description: string;
}

interface Props {
  book: Book;
  handleedit: any;
  handledelete:any;
}

const BookCart = ({ book, handleedit, handledelete}: Props) => {
  
  

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
  };


  return (
    <div className="book-card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCItZ8a5B3G4NgpKvsk6zzkkkmXRB4y1umcTBNsPKu8MFGaUhKT80m5rcsGDjFqnCGLs&usqp=CAU" />
      <h2>Title: {book.Title}</h2>
      <p>Author: {book.Author}</p>
      <p>Publication Year: {book.PublicationYear}</p>
      <p>Isbn: {book.Isbn}</p>
      <p>Description: {book.Description.split(" ").splice(0, 2).join(" ")}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={()=>handledelete(book)}
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
