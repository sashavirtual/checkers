import { useState } from 'react';
import Board from './components/board/Board'
import Endspiel from './components/endspiel/Endspiel'

function App() {
  const [firstClick, setFirstClick] = useState(false)

  return (
    <div className="App">
      <Board setFirstClick={setFirstClick} firstClick={firstClick} />
    </div>
  );
}
export default App;
