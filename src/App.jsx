import Nav from './components/Nav'; // import Nav component
import MainContent from './components/MainContent'; // import MainContent component
import Footer from './components/Footer'; // import Footer component
import Welcome from './components/Welcome'; // import Welcome component
import Chat from './components/Chat.jsx'; // import Chat component
import List from './components/List.jsx'; // import List component

function App() {
  return (
    <>
        <Nav/>
        <MainContent/>
        <Welcome name={"Текст, що завжди видно"} lastname={"Текст, який не видно"}/>
        <Chat label={"Введіть текст"} placeholder={"..."}/>
        <List/>
        <Footer/>
    </>
  )
}

export default App;
