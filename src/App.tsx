import React, { useState, useEffect } from 'react';
import './App.scss';
import { SearchBar } from './components/SearchBar/SearchBar';
import { getData } from './api/api';

export const App: React.FC = () => {
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    getData(currentCategory).then(response => {
      setArticleData(response.response.results);
      setArticles(response.response.results);
    });
  }, [currentCategory]);

  const sortedByDate = () => {
    const sorted = [...articleData].sort((article1: Article, article2: Article) => {
      return (
        article1.webPublicationDate.localeCompare(article2.webPublicationDate)
      );
    });

    return sorted;
  };

  const sortedArticles = sortedByDate();

  useEffect(() => {
    const filtered = sortedArticles.filter(article => {
      if (query.length === 0) {
        return (
          article.webTitle?.includes(' ')
        );
      }

      return (
        article.webTitle?.includes(query)
      );
    });

    setArticles(filtered);
  }, [query]);

  const renderArticleCard = (article: Article) => {
    const createdDateYear = new Date(article.webPublicationDate);
    const dateToday = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const daysAgo = Math.floor(+(dateToday.getTime() - +createdDateYear.getTime()) / oneDay);

    return (
      <div className="col" key={article.id}>
        <div className="card h-100">
          <div dangerouslySetInnerHTML={{ __html: `${article.fields?.main}` }} className="card-img-top"></div>
          <div className="card-body">
            <h5 className="card-title">{article.webTitle}</h5>
            <p className="card-text card-text--small-card">{article.fields?.bodyText}</p>
            <div className="article-details">
              <div className="article-details__body">
                <p className="article-details__text">{`Created ${daysAgo} days ago`}</p>
              </div>
              <a href="/" className="article-link">
                <p className="article-link__text">Read more</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav className="menu">
        <div className="container">
          <SearchBar
            setCurrentCategory={setCurrentCategory}
            setQueryFromBar={setQuery}
          />
        </div>
      </nav>

      <header>
        <div className="container">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body card-body--head-article">
                  <h5 className="card-title mb-27 card-title--head-title">Always intreating news!</h5>
                  <p className="card-text mb-30">Look at these amazing world actions!</p>
                  <div className="card-inner">
                    <p className="card-text card-text--bot">Last updated 3 mins ago</p>
                    <p className="card-date">Last updated 3 mins ago</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <img src="images/header.jpg" className="img-fluid rounded-start" alt="img"></img>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-30">
            {articles?.map(renderArticleCard)}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="logo-footer logo-bar--rights">
            <a href="/" className="logo-bar__article">
              Week News&nbsp;
            </a>
            <p className="footer-copyright">2021 copyright all rights reserved</p>
          </div>
        </div>
      </footer>
      <div className="starter">
      </div>
    </>
  );
};
