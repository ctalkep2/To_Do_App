import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import {
  ProfileCSS,
  Descriptons,
  InputProfileCss
 } from '../styles/Profile.css';
import { NavBar } from '../styles/NavBar.css';

function Profile() {

  const { loading, request, error } = useHttp();
	const auth = useContext(AuthContext);

  const [profile, setProfile] = useState({});
  const [change, setChange] = useState({
    name: '',
    lastName: ''
  });

  useEffect(() => {
    
    async function getProfileData() {
      const response = await request('/api/profile', 'GET', null, {
        autorization: `Bearer ${auth.token}`
      });
      
      if (response) setProfile(response);
      if (error) {
        auth.logout()
      }

    }

    getProfileData();
  }, [request, auth, error]);

	const logoutHadler = () => {
		auth.logout();
	}

  const changeHadler = event => {

    setChange({ ...change, [event.target.name]: event.target.value });

  }

  const profileUpdate = async () => {

    try {

      const data = await request('/api/profile/change', 'POST', {...change}, {
        autorization: `Bearer ${auth.token}`
      });

      setProfile(data);

    } catch(e) {

    }

  }

  const profileDelete = async () => {

    try {

      await request('/api/profile/delete', 'DELETE', null, {
        autorization: `Bearer ${auth.token}`
      });

      auth.logout();

    } catch(e) {

    }

  } 

  return (
    <div>
      <NavBar>
        <button
        	onClick = {logoutHadler}
        >
        	Logout
        </button>
        <NavLink to="/">
        	Return to tasks
        </NavLink>
      </NavBar>
      <ProfileCSS>
        <div style={{padding: '20px'}}>
          <img src="/img/profile-icon.jpg" alt="profile_img" />
        </div>
        <div>
          <Descriptons>
            <div>Имя:</div>
            <div>{profile.name}</div>
          </Descriptons>
          <InputProfileCss>
            <input 
              name = "name"
              onChange = {changeHadler}
            />
          </InputProfileCss>
        </div>
        <div>
          <Descriptons>
            <div>Фамилия:</div>
            <div>{profile.lastName}</div>
          </Descriptons>
          <InputProfileCss>
            <input 
              name = "lastName"
              onChange = {changeHadler}
            />
          </InputProfileCss>
        </div>
        <div>
          <Descriptons>
            <div>Email:</div>
            <div>{profile.email}</div>
          </Descriptons>  
        </div>
        <button
          onClick = {profileUpdate}
          disabled = {loading}
        >
          Сохранить
        </button>
        <button
          onClick = {profileDelete}
          disabled = {loading}
        >
          Удалить профиль
        </button>
      </ProfileCSS>
    </div>
  );
}

export default Profile;