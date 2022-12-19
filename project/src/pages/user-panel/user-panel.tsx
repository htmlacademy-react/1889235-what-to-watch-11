import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { logout, selectUser } from '../../store/auth-slice';
import { AppDispatch } from '../../store/store';

export default function UserPanel(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogoutSubmit = () => { dispatch(logout()); };
  const user = useSelector(selectUser);

  return (user
    ?
    <ul className="user-block">
      < li className="user-block__item" >
        <div className="user-block__avatar">
          <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li >
      <li className="user-block__item">
        <div className="user-block__link"
          onClick={handleLogoutSubmit}
        >Sign out
        </div>
      </li>
    </ul >
    :
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.Login} className="user-block__link">Log in</Link>
      </li>
    </ul>
  );
}
