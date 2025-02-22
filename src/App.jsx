import { useState } from "react";

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1> <br />
    </>
  );
};

const BookContent = ({ books, name, description }) => {
  return (
    <>
      <h2>Books</h2>
      {books.map((book) => (
        <div key={book.id}>
          <p>
            {" "}
            <strong>{name}</strong>: {book.name}
          </p>
          <p>
            <strong>{description}</strong>: {book.description}
          </p>
          <hr />
        </div>
      ))}
    </>
  );
};

const Footer = ({ footer }) => {
  return (
    <>
      <p>{footer}</p>
    </>
  );
};

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "How Nation Fails",
      description: "the book talks about how naton fails",
    },
    {
      id: 2,
      name: "Sapiens",
      description: "history of humans from ancient to modern",
    },
    {
      id: 3,
      name: "Django for API",
      description: "talks about how to use django with REST API...",
    },
  ]);
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");

  const handelNameInputChange = (event) => {
    console.log(event.target.value);
    setNameInput(event.target.value);
  };

  const handelDescInputChange = (event) => {
    console.log(event.target.value);
    setDescInput(event.target.value);
  };

  const addBook = (event) => {
    event.preventDefault();
    const book = {
      id: books.length + 1,
      name: nameInput,
      description: descInput,
    };

    setBooks(books.concat(book));
    setNameInput("");
    setDescInput("");
  };
  return (
    <>
      <Header header="PAPER-POP" />
      <form onSubmit={addBook}>
        Name: <input value={nameInput} onChange={handelNameInputChange} />{" "}
        <br /> <br />
        Description :{" "}
        <textarea value={descInput} onChange={handelDescInputChange} />
        <br /> <br />
        <button>Create Book</button>
      </form>

      <BookContent books={books} name="Name" description="Description" />
      <Footer footer="2025 - All right reserved" />
    </>
  );
}

export default App;
