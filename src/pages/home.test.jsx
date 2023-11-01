import {it, expect, vi, beforeAll, beforeEach} from "vitest"
import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import "@testing-library/jest-dom"
import { Home } from "./Home";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { BookContextProvider } from "../context/DataBooksContext";
import axios from "axios";
import data from "./newBooks";
import booklist from "./booklist"
 
const NewHome = ()=>{
  return(
   <BrowserRouter>
       <AuthContextProvider>
          <BookContextProvider>
                <Home/>
          </BookContextProvider>
         </AuthContextProvider>
   </BrowserRouter>
  )
}


it("Check if the button search works", ()=>{
   const spy = vi.fn()
   render(<NewHome/>)
   const inputSearch = screen.getByPlaceholderText('Search your book')
   const buttonSearch = screen.getByTitle('loupe')
   buttonSearch.addEventListener("click", spy)
   
   fireEvent.change(inputSearch, {target: {value: "mongdb"}})
   fireEvent.click(buttonSearch)
   expect(spy).toHaveBeenCalledTimes(1)
});

it("Check if the home page calls the 20 newbooks", async ()=>{
   vi.spyOn(axios, 'get').mockResolvedValueOnce({ok: true, json: async () => data.books})
   render(<NewHome/>);
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('https://api.itbook.store/1.0/new')
})
it("Check if the first book is being rendered", async ()=>{
  vi.spyOn(axios, "get").mockResolvedValue({ data: data}) 
  render(<NewHome/>)
  expect(axios.get).toHaveBeenCalled(1)
  expect(axios.get).toHaveBeenCalledWith('https://api.itbook.store/1.0/new')
  
  await waitFor(async ()=>{
      const newBooksElement = await screen.findByTestId("newbooks-0")
      expect(newBooksElement).toBeInTheDocument()
  })
})

it("Check if the last book is being rendered", async ()=>{
   vi.spyOn(axios, "get").mockResolvedValue({ data: data}) 
   render(<NewHome/>)
   expect(axios.get).toHaveBeenCalled(1)
   expect(axios.get).toHaveBeenCalledWith('https://api.itbook.store/1.0/new')
   
   await waitFor(async ()=>{
       const newBooksElement = await screen.findByTestId("newbooks-19")
       expect(newBooksElement).toBeInTheDocument()
   })
 })

it("Check if the all the newBooks are rendered in total 20", async ()=>{
   axios.get = await vi.fn(()=> Promise.resolve({data}))
    //vi.spyOn(axios, "get").mockResolvedValue({ data: data });
    render(<NewHome/>);
    expect(axios.get).toHaveBeenCalledTimes(1) 
    expect(axios.get).toHaveBeenCalledWith('https://api.itbook.store/1.0/new')
    //investigar sobre la libreria de mockAdapter leer la documentacion de los mocks en vitest
    await waitFor(async () => {
      const newBooksElements = await screen.findAllByTestId(/newbooks/i);
      expect(newBooksElements.length).toBe(data.books.length);
    });
})

it("Check if it calls the 10 books for the searched book title", async ()=>{
   //const spy = vi.fn()
   axios.get = vi.fn(()=> Promise.resolve({data: booklist.books}))
   render(<NewHome/>)
   const inputSearch = screen.getByPlaceholderText('Search your book')
   const loupeButton = screen.getByTitle('loupe');
   //inputSearch.addEventListener("click", spy)
   fireEvent.change(inputSearch, {target: {value: "mongodb"}})
   fireEvent.click(loupeButton) 
   //expect(spy).toHaveBeenCalledTimes(1)
   expect(axios.get).toHaveBeenCalledWith('https://api.itbook.store/1.0/search/mongodb/1')
   

/*
    await waitFor(()=>{
         const searchedBooks = screen.getAllByTestId(/booklist/i);
         expect(searchedBooks.length).toBe(10)
   }, {timeout: 3000})*/
});