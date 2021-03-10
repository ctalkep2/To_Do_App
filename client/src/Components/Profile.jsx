import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import Loader from './Loader';

import {
  ProfileCSS,
  UploadContainer,
  Descriptons,
  InputProfileCss
 } from '../styles/Profile.css';
import { NavBar } from '../styles/NavBar.css';

function Profile() {

  const { loading, request, error } = useHttp();
  const { messageHandler, message, color } = useMessage();
	const auth = useContext(AuthContext);

  const [profile, setProfile] = useState({});
  const [change, setChange] = useState({
    name: '',
    lastName: ''
  });

  const [dataHasLoad, setDataHasLoad] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [imageErr, setImageErr] = useState('');

  useEffect(() => {
    
    async function getProfileData() {
      const response = await request('/api/profile', 'GET', null, {
        autorization: `Bearer ${auth.token}`
      });

      if (response) {
        setProfile(response);
        setDataHasLoad(true);
      }

      if (response && response.imagePath.length > 0) {
        setImagePath(response.imagePath);
      }

      if (error) {
        auth.logout()
      }

    }

    getProfileData();
  }, [request, auth, error]);

  useEffect(() => {

  }, [imageErr]);

	const logoutHadler = () => {
		auth.logout();
	}

  const changeHadler = event => {

    setChange({ ...change, [event.target.name]: event.target.value });

  }

  const fetchData = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(
        e.target.action, 
      {
        method: 'PUT',
        body: new FormData(e.target), 
        headers: {      
          autorization: `Bearer ${auth.token}`
        }
      });

      let response = await data.json();

      if (data) setImagePath(response.path);

      if (response.error) {
        setImageErr('Ошибка при загрузке фотограции');

        setTimeout(() => {setImageErr('')}, 5000)
      }

    } catch(e) {

    }
  }

  const deleteImage = async () => {
    const data = await request(
      '/api/profile/deleteImage', 
      'PUT', 
      null,
      {
        autorization: `Bearer ${auth.token}`
      }
    );

    if (data) setImagePath('');
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
      auth.profileRedirect();

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
      {dataHasLoad ?
        <ProfileCSS
          path={imagePath}
        >
          {imagePath ?
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px'
          }}>
            <div className="profileImage"></div>
            <button
              style={{marginTop: '20px'}}
              className="btn-profile"
              onClick={deleteImage}
              disabled={loading}
            >Delete</button>           
          </div>
          :
          <UploadContainer
            id="upload-container"
            action="/api/profile/upload"
            method="POST"
            enctype="multipart/form-data"
            onSubmit={fetchData}
            >            
            <div className="add-img"></div>
            <div className="add-input">
              {imageErr ? <p style={{color: 'tomato'}}>{imageErr}</p> : <></>}                                 
              <label htmlFor="file-input">Загрузите фото</label>
              <span className="extensions">( .jpeg .jpg .png )</span>
              <span className="drag-and-drop">или перетащите его сюда</span>              
              <input 
                id="file-input" 
                type="file" 
                name="file"
              />
            </div>
            <button
              className="btn-profile"
              disabled={loading}
            >Отправить фотографию</button>
          </UploadContainer>
          }
          <div>
            <Descriptons>
              <div>Имя:</div>
              <div>{profile.name}</div>
            </Descriptons>
            <InputProfileCss>
              <input 
                name="name"
                onChange={changeHadler}
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
                name="lastName"
                onChange={changeHadler}
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
            className="btn-profile"
            onClick={profileUpdate}
            disabled={loading}
          >
            Сохранить
          </button>
          <button
            className="btn-profile"
            onClick={profileDelete}
            disabled={loading}
          >
            Удалить профиль
          </button>
        </ProfileCSS>
        :
        <div
          style={{
            position: 'absolute',
            width: '100%',
            top: '50%'
          }}
        >
          <Loader />
        </div>
      }
    </div>
  );
}

export default Profile;