import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';

function App(props) {
  const [banners, setBanners] = useState([]);

  // React Hook
  useEffect(() => {
    fetch("http://localhost:3003/banners").then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data);
      setBanners(data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      {banners.map((banner) => {
        return <Banner title={banner.title} description={banner.description} image={banner.image} />
      })}
      {/* <Banner title={<>Guicci <br />Kit</>} description={"The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles."}/> */}
    </div>
  );
}

export default App;
