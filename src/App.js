import { useState } from 'react';
import Board from './components/board/Board'
import Endspiel from './components/endspiel/Endspiel'

function App() {
  const [end, setEnd] = useState(false)
  // if (end) {
  //   return (
  //     <div className='App'>
  //       hello, world
  //     </div>
  //   )
  // }
  return (
    <div className="App">
      <Board setEnd={setEnd} />
    </div>
  );
}

export default App;
