import { useState } from "react";

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1> <br />
    </>
  );
};

const BookContent = ({ name, description }) => {
  return (
    <>
      {/* <button>{text}</button>
      <h2>Books</h2>
      {bookToShow.map((book) => (
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
      ))} */}
      <div>
        <p>
          <strong>{name}</strong>
        </p>
        <p>{description}</p>
        <hr />
      </div>
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
      favorite: true,
    },
    {
      id: 2,
      name: "Sapiens",
      description: "history of humans from ancient to modern",
      favorite: false,
    },
    {
      id: 3,
      name: "Django for API",
      description: "talks about how to use django with REST API...",
      favorite: true,
    },
  ]);
  // const [newBook, setNewBook] = useState('')
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const bookToShow = showAll
    ? books
    : books.filter((book) => book.favorite === true);

  const handelSearch = () => {
    const newbook = setSearch
      ? books.filter((book) => book.name).includes(search)
      : books;
    setBooks(newbook);
  };

  console.log(handelSearch);

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
      id: String(books.length + 1),
      name: nameInput,
      description: descInput,
      favorite: Math.random() < 0.5,
    };

    setBooks(books.concat(book));
    setNameInput("");
    setDescInput("");
  };

  const handelShowButton = () => {};

  return (
    <>
      <Header header="PAPER-POP" />
      Search : <input />
      <form onSubmit={addBook}>
        Name: <input value={nameInput} onChange={handelNameInputChange} />{" "}
        <br /> <br />
        Description :{" "}
        <textarea value={descInput} onChange={handelDescInputChange} />
        <br /> <br />
        <button>Create Book</button>
      </form>
      {/* <BookContent
        bookToShow={bookToShow}
        name="Name"
        description="Description"
      /> */}
      <h2>Books</h2>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Important" : "All"}
      </button>
      {bookToShow.map((book) => (
        <BookContent
          key={book.id}
          name={book.name}
          description={book.description}
        />
      ))}
      <Footer footer="2025 - All right reserved" />
    </>
  );
}

export default App;
