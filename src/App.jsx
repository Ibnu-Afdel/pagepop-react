import { useState } from "react";

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1> <br />
    </>
  );
};

const BookContent = ({ favorite, name, description }) => {
  const label = favorite ? "make unfavorite" : "make favorite";
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
        <button>{label}</button>
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

  const filteredBook = search
    ? bookToShow.filter((book) =>
        book.name.toLocaleLowerCase().includes(search.toLowerCase())
      )
    : bookToShow;

  const handelSearchChange = (event) => {
    setSearch(event.target.value);
  };

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

  // const handelShowButton = () => {
  //   setShowAll(!showAll);
  // };

  return (
    <>
      <Header header="PAPER-POP" />
      Search : <input value={search} onChange={handelSearchChange} />
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
        {showAll ? "Show Favorite" : "Show All"}
      </button>
      {filteredBook.map((book) => (
        <BookContent
          key={book.id}
          name={book.name}
          description={book.description}
          favorite={book.favorite}
        />
      ))}
      <Footer footer="2025 - All right reserved" />
    </>
  );
}

export default App;
