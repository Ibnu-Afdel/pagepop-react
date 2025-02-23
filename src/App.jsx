import { useState } from "react";

const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1> <br />
    </>
  );
};

const BookForm = ({
  addBook,
  nameInput,
  handleNameInputChange,
  descInput,
  handleDescInputChange,
}) => {
  return (
    <>
      <form onSubmit={addBook}>
        Name:{" "}
        <input value={nameInput} onChange={handleNameInputChange} required />{" "}
        <br /> <br />
        Description :{" "}
        <textarea value={descInput} onChange={handleDescInputChange} required />
        <br /> <br />
        <button>Save</button>
      </form>
    </>
  );
};

const FilterSearch = ({ search, handleSearchChange }) => {
  return (
    <>
      Search : <input value={search} onChange={handleSearchChange} />
    </>
  );
};

const HeroThing = ({ title, setShowAll, showAll }) => {
  return (
    <>
      <h2>{title}</h2>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Favorite" : "Show All"}
      </button>
    </>
  );
};

const BookContent = ({
  favorite,
  name,
  description,
  toggleFavoriteOf,
  handelBookDelete,
  handelBookEdit,
}) => {
  const label = favorite ? "make unfavorite" : "make favorite";
  return (
    <>
      <div>
        <p>
          <strong>{name}</strong>
        </p>
        <p>{description}</p>
        <button onClick={toggleFavoriteOf}>{label}</button>
        <button onClick={handelBookDelete}>Delete</button>
        <button onClick={handelBookEdit}>Edit</button>
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
      id: "1",
      name: "How Nation Fails",
      description: "the book talks about how naton fails",
      favorite: true,
    },
    {
      id: "2",
      name: "Sapiens",
      description: "history of humans from ancient to modern",
      favorite: false,
    },
    {
      id: "3",
      name: "Django for API",
      description: "talks about how to use django with REST API...",
      favorite: true,
    },
  ]);

  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [editingId, setEditingId] = useState("");

  const bookToShow = showAll
    ? books
    : books.filter((book) => book.favorite === true);

  const filteredBook = search
    ? bookToShow.filter((book) =>
        book.name.toLocaleLowerCase().includes(search.toLowerCase()),
      )
    : bookToShow;

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleNameInputChange = (event) => {
    console.log(event.target.value);
    setNameInput(event.target.value);
  };

  const handleDescInputChange = (event) => {
    console.log(event.target.value);
    setDescInput(event.target.value);
  };

  const toggleFavoriteOf = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, favorite: !book.favorite } : book,
      ),
    );
  };

  const addBook = (event) => {
    event.preventDefault();
    if (editingId !== "") {
      setBooks(
        books.map((book) =>
          book.id === editingId
            ? { ...book, name: nameInput, description: descInput }
            : book,
        ),
      );
      setEditingId("");
    } else {
      const newBook = {
        id: String(books.length + 1),
        name: nameInput,
        description: descInput,
        favorite: Math.random() < 0.5,
      };

      setBooks(books.concat(newBook));
    }
    setNameInput("");
    setDescInput("");
  };

  const handelBookDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handelBookEdit = (id) => {
    const book = books.find((book) => book.id === id);
    if (!book) return;
    setEditingId(id);
    setNameInput(book.name);
    setDescInput(book.description);
  };

  return (
    <>
      <Header header="PAPER-POP" />
      <FilterSearch search={search} handleSearchChange={handleSearchChange} />
      <BookForm
        addBook={addBook}
        nameInput={nameInput}
        handleNameInputChange={handleNameInputChange}
        descInput={descInput}
        handleDescInputChange={handleDescInputChange}
      />

      <HeroThing title="Books" setShowAll={setShowAll} showAll={showAll} />
      {filteredBook.map((book) => (
        <BookContent
          key={book.id}
          name={book.name}
          description={book.description}
          favorite={book.favorite}
          toggleFavoriteOf={() => toggleFavoriteOf(book.id)}
          handelBookDelete={() => handelBookDelete(book.id)}
          handelBookEdit={() => handelBookEdit(book.id)}
        />
      ))}
      <Footer footer="2025 - All right reserved" />
    </>
  );
}

export default App;
