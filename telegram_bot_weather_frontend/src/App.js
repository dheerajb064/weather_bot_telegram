import Account from "./components/account";
import Header from "./components/header";
import Setting from "./components/setting";
import {BrowserRouter , Routes , Route} from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Account />}/>
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
