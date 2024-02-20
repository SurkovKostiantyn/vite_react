import Nav from './components/Nav';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Field from './components/Field';

function App() {

  return (
    <>
        <Nav/>
        <MainContent/>
        <Welcome name={"Діма"} lastname={"Приймак"}/>
        <Field label={"Введіть текст"} placeholder={"..."}/>
        <Footer/>
    </>
  )
}

export default App;
