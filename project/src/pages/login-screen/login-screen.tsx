import { Helmet } from 'react-helmet-async';
import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth-slice';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AppDispatch } from '../../store/store';
import Logo from '../../components/logo/logo';

const defaultUser = {
  'email': 'Oliver.conner@gmail.com',
  'password': '12345678'
};

export default function LoginScreen(): JSX.Element {
  const [formState, setFormState] = useState(defaultUser);

  function handleFieldChange({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  }
  const dispatch = useDispatch<AppDispatch>();
  const handleLoginSubmit = () => { dispatch(login(formState)); };

  return (
    <div className="user-page">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="email" id="user-email"
                onChange={handleFieldChange}
                value={formState.email}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="password" id="user-password"
                onChange={handleFieldChange}
                value={formState.password}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <Link to={AppRoute.Root} className="sign-in__btn"
              onClick={handleLoginSubmit}
            >Sign in
            </Link>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo />
        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
