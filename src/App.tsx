import React, { useEffect, useState, useCallback } from 'react';
import { Table } from './componentes/Table';
import { CreateRequest, IFormValues } from './componentes/CreateRequest';
import { fetchRequests } from './api';
import './App.css';

function App() {
  const [requests, setRequests] = useState<IFormValues[]>();

  const handleFetch = async () => {
    try {
      const res = await fetchRequests();

      setRequests(res);
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
        <CreateRequest onRefresh={handleFetch}/>
      </header>

      <section>
        <Table data={requests}/>
      </section>
    </div>
  );
}

export default App;
