import './App.css';
import React,{useState, useEffect} from 'react'
function App() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=react&tags=story"
  )
  const [loading, setLoading] = useState('true')

  //fetchnews

  const fetchNews = () =>{
    setLoading(true);
    fetch(url).then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false))).catch(error => console.log(error))
  }
  useEffect(() => {
    fetchNews();
  }, [url])

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = e =>{
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}&tags=story`)
  }
  const showloading = () => (loading ? <h2> Loading...</h2> : "")
const showNews = () =>(
  news.map((result, index) => (
    <div key = {index}>
      
      <h3>
        {result.title}
      </h3>
      <a href={result.url} target="_blank">Article Link</a>
   
    </div>
    
  ))
)
  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value= {searchQuery} onChange={handleChange}/>
      <button>Search</button>
    </form>
  )

  return (
    <div className="App">
      <h1>Search Engine</h1>
      {showloading()}
      {searchForm()}
      {showNews()}

    </div>
  );
}

export default App;
