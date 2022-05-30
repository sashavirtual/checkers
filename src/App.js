import { useState } from 'react';
import Board from './components/board/Board'
import Endspiel from './components/endspiel/Endspiel'

function App() {
  const [firstClick, setFirstClick] = useState(false)

  return (
    <div className="App">
      {
        firstClick ?
          <Board />
          :
          <button className='newGame' onClick={() => setFirstClick(true)}>
            Start the game!
          </button>

      }
    </div>
  );
}
export default App;
