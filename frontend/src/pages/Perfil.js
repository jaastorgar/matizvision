// src/pages/Perfil.js
import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/authService';
import styled from 'styled-components';

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setEditedUser(userData);
        setNotificationsEnabled(userData.notificationsEnabled || false);
      } catch (error) {
        console.error('Error al cargar el perfil del usuario');
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleNotificationChange = (e) => {
    setNotificationsEnabled(e.target.checked);
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserProfile(editedUser);
      setUser(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar los cambios del perfil');
    }
  };

  const handleFileChange = (e) => {
    // const file = e.target.files[0];
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <PerfilContainer>
      <Header>
        <ProfilePicture src="url_de_la_foto" alt="Foto de Perfil" />
        {isEditing ? (
          <input type="file" onChange={handleFileChange} />
        ) : null}
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
          {!isEditing && <EditButton onClick={handleEditClick}>Editar Perfil</EditButton>}
        </UserInfo>
      </Header>

      <Section>
        <SectionTitle>Información Básica</SectionTitle>
        <InfoRow>
          <InfoLabel>Correo:</InfoLabel>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          ) : (
            <InfoValue>{user.email}</InfoValue>
          )}
        </InfoRow>
        <InfoRow>
          <InfoLabel>Teléfono:</InfoLabel>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
            />
          ) : (
            <InfoValue>{user.phone}</InfoValue>
          )}
        </InfoRow>
      </Section>

      {isEditing && (
        <SaveButton onClick={handleSaveChanges}>Guardar Cambios</SaveButton>
      )}

      <Section>
        <SectionTitle>Gestión de Notificaciones</SectionTitle>
        <NotificationToggle>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationChange}
          />
          <label>Recibir Notificaciones</label>
        </NotificationToggle>
      </Section>
    </PerfilContainer>
  );
};

// Estilos de Perfil
const PerfilContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  color: #006400;
`;

const UserEmail = styled.p`
  color: #333;
`;

const EditButton = styled.button`
  background-color: #006400;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #004c33;
  }
`;

const SaveButton = styled.button`
  background-color: #006400;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #004c33;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const SectionTitle = styled.h3`
  color: #006400;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InfoLabel = styled.span`
  font-weight: bold;
`;

const InfoValue = styled.span`
  color: #555;
`;

const NotificationToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default Perfil;