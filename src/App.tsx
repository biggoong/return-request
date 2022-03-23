/** TODO: For Minimizing MUI bundle size visit https://mui.com/guides/minimizing-bundle-size/#option-2 */

import React, { useEffect, useState, useCallback } from 'react';
import { Table } from './components/Table';
import { CreateRequest, IFormValues } from './components/CreateRequest';
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
