import React, { useState, useEffect } from "react";
//import withContext from '../ContextAPI/Context_HOC';
//import { AppContext } from '../ContextAPI/ContextProvider';
import { withRouter } from "react-router-dom";

function withAuth(WrappedComponent) {
  //   const Auth = new AuthService('http://localhost:3000');

  function AuthWrapped(props) {
    const [user, setUser] = useState(undefined);
    console.log(props);
    useEffect(
      () => {
        const abortContoroller = new AbortController();
        //const signal = abortContoroller.signal
        //   if (!Auth.loggedIn() && props.location.pathname !== '/createbos' && props.location.pathname !== '/forgot') {
        //     //signal
        //     props.history.replace('/login');
        //   } else {
        //     try {
        //     //  signal
        //       const profile = Auth.getDecodedToken();
        //       setUser(profile);
        //     } catch (err) {
        //       Auth.logout();
        //       props.history.replace('/login');
        //     }
        //   }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return function cleanup() {
          abortContoroller.abort();
        };
      },
      [
        // props.history,props.location.pathname
      ]
    );
    // abortContorollerglob.abort()
    return <WrappedComponent history={props.history} user={user} />;
  }
  return withRouter(AuthWrapped);
}
export default withAuth;
