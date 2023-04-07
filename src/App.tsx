import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/molecules/Header";
import PageTitle from "./components/molecules/PageTitle";
import EditUser from "./views/EditUser";
import MainPage from "./views/MainPage";
import NewUser from "./views/NewUser";
import NotFound from "./views/NotFound";
import styles from '../../desafio-uol/src/App.module.css'

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <PageTitle title="Painel de clientes" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/newuser" element={<NewUser />} />
          <Route path="/edit/:id" element={<EditUser />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
