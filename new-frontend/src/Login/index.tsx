import * as React from 'react'
import { Mutation, MutationFn, FetchResult } from 'react-apollo'
import { DataProxy } from 'apollo-cache'

import loginMutation from './LoginMutation'
import CurrentUserQuery from '../CurrentUser/Query'
import * as styles from './Login.module.scss'

interface SuccessfulLoginData {
  __typename: string,
  email: string,
  token: string
}

interface FailedLoginData {
  __typename: string,
  error: string,
}

type LoginData = SuccessfulLoginData | FailedLoginData

interface LoginMutationData {
  login: LoginData
}

class LoginMutation extends Mutation<LoginMutationData, {}> {}

type LoginProps = {
  history: {
    push: Function
  }
}

type LoginState = {
  email: string,
  password: string,
  failed: boolean,
  error: string,
}


class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: '',
    password: '',
    failed: false,
    error: ''
  }

  handleSuccessfulLogin(store: DataProxy, login: SuccessfulLoginData) {
    const currentUserData = {
      currentUser: {
        __typename: 'LoginResult',
        email: login.email
      }
    }

    store.writeQuery({ query: CurrentUserQuery, data: currentUserData })

    window.localStorage.setItem('auth-token', login.token)

    this.props.history.push("/")
  }

  handleFailedLogin(login: FailedLoginData) {
    this.setState({failed: true, error: login.error})
  }

  handleLoginResult = (
    store: DataProxy,
    data: LoginMutationData | undefined,
  ) => {
    if (data) {
      if ((data.login as FailedLoginData).error) {
        this.handleFailedLogin((data.login as FailedLoginData))
      } else {
        this.handleSuccessfulLogin(store, (data.login as SuccessfulLoginData))
      }
    }
  }

  submit(loginMutation: MutationFn<LoginMutationData>) {
    this.setState({failed: false})
    const {email, password} = this.state
    loginMutation({
      variables: { email, password },
      update: (store, data) => { this.handleLoginResult(store, data.data)}
    })
  }

  renderError() {
    if (this.state.failed) {
      return (
        <span className={styles.error}>{this.state.error}</span>
      )
    }
  }

  render() {
    return (
      <LoginMutation mutation={loginMutation}>
        {(login, { data }) => (
          <div className="row">
            <div className="main col-md-7">
              <div className="col-md-6">
                <h1>Login</h1>
                <form
                  // class methods are preferred for neatness and testing purposes e.g. handleSubmit =
                  onSubmit={e => {
                    e.preventDefault()
                    this.submit(login)
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </div>
                  <div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                    {this.renderError()}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </LoginMutation>
    )
  }
}

export default Login
