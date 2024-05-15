import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [state, setState] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4567/page')
      .then((res) => {
        console.log('GET response:', res.data); // Add this line
        setState((prevState) => [...prevState, ...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const posting = () => {
    console.log('Request data:', todo);
    axios
      .post('http://localhost:4567/page', todo)
      .then((res) => {
        console.log('POST response:', res.data);
        setState((prevState) => [...prevState, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    posting();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {Array.isArray(state) && state.length > 0 ? (
        state.map((ele, index) => (
          <div key={index}>
            <p>{typeof ele === 'object' ? ele.tasks : ele}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
