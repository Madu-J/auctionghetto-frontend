import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import { useCurrentUser } from './contexts/CurrentUserContext';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import UsernameForm from './pages/auctioneers/UsernameForm';
import UserPasswordForm from './pages/auctioneers/UserPasswordForm';
import AuctionsList from './pages/auctions/AuctionsList';
import AuctionPage from './pages/auctions/AuctionPage';
import AuctionEditForm from './pages/auctions/AuctionEditForm';
import AuctioneerEditForm from './pages/auctioneers/AuctioneerEditForm';
import AuctioneerPage from './pages/auctioneers/AuctioneerPage';
import AuctionCreateForm from './pages/auctions/AuctionCreateForm';
import NotFound from './components/NotFound';

// App function
function App() {
  const currentUser = useCurrentUser();
  const auctioneer_id = currentUser?.auctioneer_id || "";

  return (
    <div className="styles.App">
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
        <Route 
          exact 
          path="/" 
          render={() => (
          <AuctionsList message="No result found, adjust keyword serach."
          /> 
        )} 
        />
        <Route 
          exact 
          path="/feed" 
          render={() => (
            <AuctionsList message="No result found, adjust keyword serach or follow a user."
            filter={`owner__followed__owner__auctioneer=${auctioneer_id}&`} 
        /> 
        )} 
        />
        <Route 
          exact 
          path="/bookmarks" 
          render={() => (
            <AuctionsList
                message="No results found, adjust the search"
                filter={`bookmarks__owner__auctioneer=${auctioneer_id}&ordering=-bookmarks__created_at&`}
              />
          )}
        />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/auctions/create" render={() => <AuctionCreateForm />} />
          <Route exact path="/auctions/:id" render={() => <AuctionPage />} />
          <Route exact path="/auctions/:id/edit" render={() => <AuctionEditForm />} />
          <Route exact path="/auctioneers/:id" render={() => <AuctioneerPage />} />
          <Route
            exact
            path="/auctioneers/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/auctioneers/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/auctioneers/:id/edit"
            render={() => <AuctioneerEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;