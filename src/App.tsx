import React, { useEffect, useState, useCallback } from 'react';
import { Table } from './componentes/Table';
import { CreateRequest } from './componentes/CreateRequest';
import { fetchRequests } from './api';
import './App.css';

function App() {
  const handleFetch = async () => {
    try {
      await fetchRequests();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h3>Your return requests</h3>
        <CreateRequest />
      </header>

      <section>
        <Table />
      </section>
    </div>
  );
}

export default App;
