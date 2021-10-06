import React, { useState } from 'react';
import './BurgerMenu.scss';
import classNames from 'classnames';

type Props = {
  setCurrentCategory: (category: string) => void;
};

export const BurgerMenu: React.FC<Props> = (props) => {
  const { setCurrentCategory } = props;

  const [clicked, setClicked] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');

  const showMenu = () => {
    setClicked(!clicked);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;

    setSelectedCategory(id);
  };

  setCurrentCategory(selectedCategory);

  const handleKeyPress = () => {

  };

  return (
    <div className="burger-menu">

      {!clicked || (
        <>
          <div className="burger-menu__catagories">
            <div className="drop">Categories</div>
            <div className="dropdown-content">
              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="sport"
              >
                Sport
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="politics"
              >
                Politics
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="worlds"
              >
                Worlds
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="science"
              >
                Science
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="covid"
              >
                Covid
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="religion"
              >
                Religion
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="business"
              >
                Business
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="category"
                id="health"
              >
                Health
              </button>

            </div>
          </div>

          <button
            className="burger-menu__trend"
            type="button"
            onClick={handleClick}
            id="trending"
          >
            ⚡️ Trending news
          </button>
        </>
      )}

      <div
        role="button"
        onClick={showMenu}
        className={classNames('burger-icon', { change: clicked })}
        tabIndex={0}
        onKeyPress={handleKeyPress}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  );
};
