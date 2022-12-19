import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { selectUser } from '../../store/auth-slice';

type PrivateRouteProps = {
  children: JSX.Element;
}
export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = !!useSelector(selectUser);

  return (
    isAuth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
