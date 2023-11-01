import React from 'react';
import './Button.css';
//para hoy cambiar el nombre del dominio y arreglar los estilos de la tabla de ordenes
const STYLES = ['btn--blue', 'btn--red', 'btn--test'];

const SIZES = ['btn--medium', 'btn--small', 'btn--large'];

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button