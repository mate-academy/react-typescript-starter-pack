import React, { useState } from 'react';
import './SearchBar.scss';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

type Props = {
  setCurrentCategory: (gotCategory: string) => void;
  setQueryFromBar: (gotCategory: string) => void;
};

export const SearchBar: React.FC<Props> = (props) => {
  const { setCurrentCategory, setQueryFromBar } = props;

  const [query, setQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  setQueryFromBar(query.toLowerCase());

  return (
    <div className="input-bar">
      <div className="logo-bar">
        <a href="/" className="logo-bar__article">
          Week News
        </a>
      </div>

      <div className="input-group">
        <button type="submit" className="btn btn-outline-secondary btn--bar">
          <img
            src="https://image.flaticon.com/icons/svg/49/49116.svg"
            alt="search"
            className="magnifier"
          />
        </button>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="form-control "
          placeholder="Enter"
        />
      </div>

      <div className="burger">
        <BurgerMenu setCurrentCategory={setCurrentCategory} />
      </div>
    </div>
  );
};
