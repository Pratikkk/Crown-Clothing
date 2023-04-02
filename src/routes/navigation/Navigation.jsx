import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase-utils';
import { UserContext } from '../../contexts/UserContext';
import './navigation.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setCurrentUser(null);
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              {' '}
              SIGN OUT{' '}
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SiGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
