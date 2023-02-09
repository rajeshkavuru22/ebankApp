import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const {path, component} = props
  const JwtToken = Cookies.get('jwt_token')
  console.log(JwtToken)
  if (JwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return <Route exact path={path} component={component} />
}

export default ProtectedRoute
