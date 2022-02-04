// Debugging:
// https://github.com/gladly-team/next-firebase-auth/issues/419
// From:
// https://github.com/alex-knyazev/next-firebase-auth/blob/97c9e1bc5bc7476d6110d441e4fc6fc92e99b63f/example/pages/profile.js

import React, { useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import firebase from 'firebase/app'
import Header from '../components/Header'
import FullPageLoader from '../components/FullPageLoader'

const styles = {
  content: {
    padding: 32,
  },
}

const Profile = () => {
  const AuthUser = useAuthUser()
  const [email, setEmail] = useState(AuthUser.email)

  useEffect(() => {
    if (!email && AuthUser.email) {
      setEmail(AuthUser.email)
    }
  }, [AuthUser, email])

  async function onClick() {
    await firebase.auth().currentUser.updateEmail(email)
  }

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <p>Your email is {AuthUser.email}</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <button aria-label="Save" type="button" onClick={onClick}>
          Save
        </button>
      </div>
    </div>
  )
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: FullPageLoader,
})(Profile)
