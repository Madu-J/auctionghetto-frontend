import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import { useCurrentUser } from './contexts/CurrentUserContext';
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";


function App() {
  const currentUser = useCurrentUser();
  const auctioneer_id = currentUser?.auctioneer_id || "";

  return (
    <div className="styles.App">
      <NavBar />
      <Container className={styles.App}>
        <Switch>
        <Route 
          exact 
          path="/" 
          render={() => (
          <AuctionList message="No result found, adjust keyword serach."
          /> 
        )} 
        />
        <Route 
          exact 
          path="/feed" 
          render={() => (
            <AuctionList message="No result found, adjust keyword serach or follow a user."
            filter={`owner__followed__owner__auctioneer=${auctioneer_id}&`} 
        /> 
        )} 
        />
        <Route 
          exact 
          path="/signup" 
          render={() => (
            <AuctionList
                message="No results found, adjust the search keyword or save a car."
                filter={`bookmark__owner__auctioneer=${auctioneer_id}&ordering=-bookmark__created_at&`}
              />
          )}
        />
          <Route exact path="/signin" component={SignInForm} />
          <Route exact path="/signup" component={SignUpForm} />
          <Route exact path="/autotraders/create" render={() => <AuctionCreateForm />} />
          <Route exact path="/autotraders/:id" render={() => <AuctionPage />} />
          <Route exact path="/auction/:id/edit" render={() => <AuctionEditForm />} />
          <Route exact path="/auctioneer/:id" render={() => <AuctioneerPage />} />
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
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;