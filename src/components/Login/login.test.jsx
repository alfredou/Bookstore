import {it, expect, vi} from "vitest";
import { render, fireEvent, screen, getByText} from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";


const NewLoginForm = ()=>{
    return(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    )
}

it("checks if it shows the texts", ()=>{
    render(<NewLoginForm/>)
    const loginUsernameText = screen.getByText("Username")
    const loginPasswordText = screen.getByText("Password")
    const loginCreate = screen.getByText("Create account")
    const loginButton = screen.getByText("Login")
    expect(loginUsernameText).toBeInTheDocument()
    expect(loginPasswordText).toBeInTheDocument()
    expect(loginCreate).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
})

it('types in the username input', async () => {
    render(<NewLoginForm />);
    const usernameInput = screen.getByPlaceholderText("Jhon Doe")
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    expect(usernameInput.value.length).toBe(3);
  });
  
  it('types in the password input', async () => {
    render(<NewLoginForm />);
    const usernameInput = screen.getByPlaceholderText("Password")
    fireEvent.change(usernameInput, { target: { value: 'abc' } });
    expect(usernameInput.value.length).toBe(3);
  });

