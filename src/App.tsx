import React from 'react';
import './App.scss';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = React.memo(({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
));

export const App: React.FC = () => {
  return (
    <div className="starter">
      <Provider onClick={() => ({})}>TodoList</Provider>
    </div>
  );
};
