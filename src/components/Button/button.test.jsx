import {it, expect, vi} from 'vitest'
import { render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
//ver video de testing de webdevsimplified guardado y luego ver el de tdd de midudev
const spy = vi.fn()

it('Button has to be in the document', ()=>{
  const buttonText = 'Click Me';
  const buttonStyle = 'btn--red';
  const buttonSize = 'btn--large';

  // Act
 render(
    <Button
      type={"submit"}
      onClick={()=>{}}
      buttonStyle={buttonStyle}
      buttonSize={buttonSize}
    >
      {buttonText}
    </Button>
  );
  
  const button = screen.getByText(buttonText)
  expect(button).toBeInTheDocument()
});

it('Button component renders with props', async () => {
  // Arrange
  const buttonText = 'Click Me';
  const buttonStyle = 'btn--red';
  const buttonSize = 'btn--large';

  // Act
 render(
    <Button
      type={"submit"}
      onClick={()=>{}}
      buttonStyle={buttonStyle}
      buttonSize={buttonSize}
    >
      {buttonText}
    </Button>
  );
  const button = screen.getByText(buttonText);

  // Assert
  expect(button).not.toBe(null);
  expect(button).toHaveClass(buttonStyle);
  expect(button).toHaveClass(buttonSize);
});

it("check if button is clickable", async ()=>{
  const buttonText = 'Click Me';
  const buttonStyle = 'btn--red';
  const buttonSize = 'btn--large';

      render(<Button
      type={"submit"}
      onClick={spy}
      buttonStyle={buttonStyle}
      buttonSize={buttonSize}
    >
      {buttonText}
    </Button>)  
    
    const button = screen.getByText(buttonText)
    fireEvent.click(button)
    expect(spy).toHaveBeenCalledTimes(1)
});
