"use client";
import React, { useState } from "react";
import "./Addbook.css";

interface FormData {
  Title: string;
  Author: string;
  PublicationYear: any;
  Isbn: string;
  Description: string;
}
interface InitialData {
  _id: string;
  Title: string;
  Author: string;
  PublicationYear: any;
  Isbn: string;
  Description: string;
  new: boolean;
}

interface ChildProps {
  closeModal: () => void;
  Initial: InitialData;
}

function Addbook({ closeModal, Initial }: ChildProps) {
  const [formData, setFormData] = useState<FormData>({
    Title: Initial.Title,
    Author: Initial.Author,
    PublicationYear: Initial.PublicationYear,
    Isbn: Initial.Isbn,
    Description: Initial.Description,
  });

  const [validation, setValidation] = useState<{
    Title: boolean;
    Author: boolean;
    PublicationYear: boolean;
    Isbn: boolean;
  }>({
    Title: false,
    Author: false,
    PublicationYear: false,
    Isbn: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    console.log(value, typeof value);

    setFormData({ ...formData, [name]: value });
    if (validation.Title && name == "Title")
      setValidation({ ...validation, Title: false });
    if (validation.PublicationYear && name == "PublicationYear")
      setValidation({ ...validation, PublicationYear: false });
    if (validation.Author && name == "Author")
      setValidation({ ...validation, Author: false });
    if (validation.Isbn && name == "Isbn")
      setValidation({ ...validation, Isbn: false });
  };

  const handleSubmit = () => {
    let obj = {
      Title: false,
      Author: false,
      PublicationYear: false,
      Isbn: false,
    };
    let a = formData.Isbn;

    if (
      formData.PublicationYear == "" ||
      formData.Title == "" ||
      formData.Author == "" ||
      a == "" ||
      a.length < 10
    ) {
      if (formData.PublicationYear == "") obj.PublicationYear = true;
      if (formData.Author == "") obj.Author = true;
      if (formData.Title == "") obj.Title = true;
      if (a == "" || a.length < 10) obj.Isbn = true;
      setValidation(obj);
      return;
    }
    let d_output = { ...formData };
    d_output["PublicationYear"] = () => {
      let a = formData.PublicationYear;
      let changed_data = a.split("-").join("");
      changed_data = Number(changed_data);
      return changed_data;
    };

    console.log(formData);
    if (Initial.new) {
      fetch("http://localhost:8080/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d_output),
      })
        .then((res) => res.json())
        .then((res) => {
          let data = res.data;
          console.log(data, "---", res);
        })
        .catch((e) => {
          alert("Error Book Not saved");
          console.log(e);
        });
    } else {
      fetch(`http://localhost:8080/books/${Initial._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d_output),
      })
        .then((res) => res.json())
        .then((res) => {
          let data = res.data;
          console.log(data, "---", res);
        })
        .catch((e) => {
          alert("Error Book Not saved");
          console.log(e);
        });
    }

    closeModal();
  };

  return (
    <div className="modalContainer">
      <div className="modal">
        <h2>Book Details</h2>
        <form>
          <div className="form-gr">
            <label>Title:</label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
            />
          </div>
          {validation.Title && <p className="error">Title is mandatory</p>}
          <div className="form-gr">
            <label>Author:</label>
            <input
              type="text"
              name="Author"
              value={formData.Author}
              onChange={handleChange}
            />
          </div>
          {validation.Author && (
            <p className="error">Author Name is mandatory.</p>
          )}
          <div className="form-gr">
            <label>Publication Year:</label>
            <input type="date" name="PublicationYear" onChange={handleChange} />
          </div>
          {validation.PublicationYear && (
            <p className="error">Publication Year is mandatory.</p>
          )}
          <div className="form-gr">
            <label>ISBN:</label>
            <input
              type="text"
              name="Isbn"
              value={formData.Isbn}
              onChange={handleChange}
            />
          </div>
          {validation.Isbn && (
            <p className="error">Isbn should have length 10.</p>
          )}
          <div className="form-gr">
            <label>Description:</label>
            <textarea
              name="Description"
              value={formData.Description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button className="button" type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="button" type="button" onClick={closeModal}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addbook;
function e(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}
