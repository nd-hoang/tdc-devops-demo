import './App.css';
import Header from './components/Header';
import Banner from './components/Banner';

function App() {
  return (
    <div className="App">
      <Header />
      <Banner title={<>Guicci <br />Kit</>} description={"The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles."}/>
    </div>
  );
}

export default App;
