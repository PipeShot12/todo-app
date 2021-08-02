import { Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { useUser } from '../context/userContex'
import Login from '../pages/LoginPage/index'
import NotFound from '../pages/NotFoundPage'
import Register from '../pages/RegisterPage'
import Todo from '../pages/TodoApp/'

export default function TodoApp () {
  const { localStorageToken, saveTemporalToken } = useUser()
  const { token } = localStorageToken || saveTemporalToken
  return (
    <Switch>
      <Route path='/sign-in' render={() => token ? <Redirect to='/app' /> : <Login />} />
      <Route path='/sign-up' render={() => token ? <Redirect to='/app' /> : <Register />} />
      <Route path='/app' render={() => token ? <Todo /> : <Redirect to='/' />} />
      <Route component={NotFound} />
    </Switch>
  )
}
