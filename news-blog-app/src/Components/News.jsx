import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calender from "./Calender";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";

import axios from "axios";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = () => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("general");

  const[searchInput, setSearchInput] = useState("");
  const[searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&country=in&apikey=c10af51d011db6e337ef1cd56299775d`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&country=in&apikey=9c404c552f6102517c9c531e4d8475da`;

      }

      const response = await axios.get(url);
      const fetchedNews = response.data.articles;
      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
      console.log(news);
    };

    fetchNews();
  }, [selectedCategory, searchQuery])

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput)
    setSearchInput("")
  }

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form
          onSubmit={handleSearch}>
            <input type="text" placeholder="Search News..." value=    {searchInput} onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="userImg" />
            <p>Mary's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className="nav-link">
                Bookmark <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline">
              <img src={headline.image || noImg} lt={headline.title} />
              <h2 className="headline-title">
                {headline.title}{" "}
                <i className="fa-regular fa-bookmark bookmark"></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item">
                <img src={article.image || noImg} alt="article-title" />
                <h3>
                  {article.title}
                  <i className="fa-regular fa-bookmark bookmark"></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="my-blogs">My Blogs</div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">Footer</footer>
    </div>
  );
};

export default News;
