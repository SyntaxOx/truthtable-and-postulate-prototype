import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './topics/Home';
import Identity from './topics/Identity';
import Inverse from './topics/Inverse';
import Commutative from './topics/Commutative';
import Associative from './topics/Associative';
import DeMorgan from './topics/DeMorgan';
import Distributive from './topics/Distributive';
import TruthTable from './topics/TruthTable';

function App() {
  return (
    <Router  basename="/truthtable-and-postulate-prototype">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-table" element={<TruthTable />} />
        <Route path="/Identity" element={<Identity />} />
        <Route path="/Inverse" element={<Inverse />} />
        <Route path="/Commutative" element={<Commutative />} />
        <Route path="/Associative" element={<Associative />} />
        <Route path="/DeMorgan" element={<DeMorgan />} />
        <Route path="/Distributive" element={<Distributive />} />
      </Routes>
    </Router>
  );
}

export default App;
