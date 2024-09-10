import React, { ReactNode, FC } from 'react';
import './App.scss';

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export const Provider: React.FC<Props> = ({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

export const App: FC = () => {
  return (
    <div className="starter">
      <Provider onClick={() => ({})}>TodoList</Provider>
    </div>
  );
};
