import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Welcome from './components/Welcome';

function App() {

  return (
    <>
        <Nav/>
        <MainContent/>
        <Welcome name={"Діма"} lastname={"Приймак"}/>
        <Footer/>
    </>
  )
}

export default App;
