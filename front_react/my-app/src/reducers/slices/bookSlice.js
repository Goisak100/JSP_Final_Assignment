import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: 'book',
    initialState: {
      name: '',
      author: '',
      translator: '',
      publisher: '',
      publicationDate: '',
      price: 0,
      url: '',
      path: '',
    },
    reducers: {
      setName: (state, action) => {
        state.name = action.payload.name;
      },
      setAuthor: (state, action) => {
        state.author = action.payload.author;
      },
      setTranslator: (state, action) => {
        state.translator = action.payload.translator;
      },
      setPublisher: (state, action) => {
        state.publisher = action.payload.publisher;
      },
      setPublicationDate: (state, action) => {
        state.publicationDate = action.payload.publicationDate;
      },
      setPrice: (state, action) => {
        state.price = action.payload.price;
      },
      setURL: (state, action) => {
        state.url = action.payload.url;
      },
      setPath: (state, action) => {
        state.path = action.payload.path;
      },
    },
  });

export const { name, author, translator, publisher, publicationDate, price, url, path } = bookSlice.actions;
export default bookSlice; 