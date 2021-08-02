
import './App.css'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { UserProvider } from './context/userContex'
import LandingPage from './pages/LandingPage'
import TodoRoutes from './components/TodoRoutes'
import useLocalStorage from './hooks/useLocalStorage'
function App () {
  const { localStorageToken } = useLocalStorage('loginToken')
  const getToken = localStorageToken
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path='/' render={() => getToken?.token ? <Redirect to='/app' /> : <LandingPage />} />
          <Route path='*'>
            <TodoRoutes />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  )
}

export default App
