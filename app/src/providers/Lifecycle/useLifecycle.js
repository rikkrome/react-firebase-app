import {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import {useDispatch, useSelector} from '../Store';
import useProfileActions from '../Profile/useProfileActions';

const useLifecycle = () => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);
	const auth = useSelector((state) => state.auth);
	const [initialized, setInitialized] = useState(false);
	const profileActions = useProfileActions();

	// This will always run on boot.
	// is the user Authorized.
	useEffect(() => {
		if (auth.initialized && !initialized) {
			setInitialized(true);
		}
	}, [auth.initialized, initialized]);

	// init load. Things that need to load when the user is Authorized.
	useEffect(() => {
		if (auth.isAuthorized && !profile.initialized) {
			profileActions.initialize();
		}
	}, [auth.isAuthorized, profile, profileActions]);

	// Auth listener.
	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			dispatch({type: 'AUTH_INIT', payload: {initialized: true, isAuthorized: !!user}});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [initialized];
};

export default useLifecycle;
