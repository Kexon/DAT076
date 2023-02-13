import './App.css';
import NavBar from './components/NavBar';

function App() {
  /*
   * The container class sets the max-width of an element to match the min-width of
   * the current breakpoint. This is useful if you’d prefer to design for a
   * fixed set of screen sizes instead of trying to accommodate a fully fluid viewport.
   */
  return (
    <div className="">
      <NavBar />
    </div>
  );
}

export default App;
