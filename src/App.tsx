import Contacts from "./components/Contacts/Contacts";
import Header from "./components/Header/Header";
import ContactActions from "./components/ContactActions/ContactActions";
import { store } from "./services/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <ContactActions />
      <Contacts />
    </Provider>
  );
}

export default App;
