import { useState, useCallback } from 'react';

export const useRedirect = () => {

	const [deleteProfile, setDeleteProfile] = useState(false);
	const [registration, setRegistration] = useState(false);

	const registartionRedirect = useCallback(() => {
		setRegistration(true);
	});

	const profileRedirect = useCallback(() => {
		setDeleteProfile(true);
	});

	const afterRedirect = useCallback(() => {
		setRegistration(false);
		setDeleteProfile(false);
	});

	return { 
		registartionRedirect,
		profileRedirect,
		afterRedirect, 
		deleteProfile, 
		registration
	};
}