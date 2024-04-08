import {useState, useEffect} from 'react';
import './App.css';
//useParams
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import Search from './Search';
import List from './List';
import SortingComponent from './Rankings';

function App() {

	const [books, setBooks] = useState([]);

	useEffect(() => {
		fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=lkA5enon02EGDcxWlr2SGKtvGYIg4COI")
		//book reviewsas
		//fetch("https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=lkA5enon02EGDcxWlr2SGKtvGYIg4COI")
		.then(response => {
			if(response.ok) 
				return response.json();

				throw new Error("Failed to fetch API Call");
			})
			.then(data => {
				setBooks(data.results.books);
			})
			.catch(error => {
				console.log(error);
			})
	}, [])


  return (
    <div className="container">
      <header>
		<h1>Header</h1>
      </header>

	  <BrowserRouter>
		<nav>
			<Link to="/">Home</Link> | {" "}
			<Link to="Search">Search</Link> | {" "}
			<Link to="Rankings">Rankings</Link> | {" "}
			<Link to="List">List</Link>
		</nav>
		
		<section>
			<Routes>
				<Route path="/" element={<Homepage books={books}/>} />
				<Route path="/Search" element={<Search books={books} />} />
				<Route path="/Rankings" element={<SortingComponent books={books}/>} />
				<Route path="/List" element={<List />} />
			</Routes>
		</section>
	  </BrowserRouter>

	  {/* 
	  <footer>
		<p>Copyright</p>
  	  </footer> */}
    </div>
  );
}

export default App;