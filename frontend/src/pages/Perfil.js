// src/pages/Perfil.js
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/authService';
import styled from 'styled-components';

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error al cargar el perfil del usuario');
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <PerfilContainer>
      <Header>
        <ProfilePicture src="url_de_la_foto" alt="Foto de Perfil" />
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
          <EditButton>Editar Perfil</EditButton>
        </UserInfo>
      </Header>

      <Section>
        <SectionTitle>Información Básica</SectionTitle>
        <InfoRow>
          <InfoLabel>Correo:</InfoLabel>
          <InfoValue>{user.email}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Teléfono:</InfoLabel>
          <InfoValue>{user.phone}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>RUT:</InfoLabel>
          <InfoValue>{user.rut}-{user.dv}</InfoValue>
        </InfoRow>
      </Section>

      <Section>
        <SectionTitle>Cambio de Contraseña</SectionTitle>
        <ChangePasswordButton>Cambiar Contraseña</ChangePasswordButton>
      </Section>

      <Section>
        <SectionTitle>Gestión de Notificaciones</SectionTitle>
        <NotificationToggle>
          <input type="checkbox" checked={true} />
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

const ChangePasswordButton = styled.button`
  background-color: #006400;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #004c33;
  }
`;

const NotificationToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default Perfil;