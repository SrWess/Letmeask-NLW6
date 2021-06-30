import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../components/atoms/button';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
// import '../styles/config'

import { database } from '../services/firebase';

import { Image } from '../components/atoms/image';
import { Title } from '../components/atoms/title';
import { Text } from '../components/atoms/text';
import { Input } from '../components/atoms/input';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <Image
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <Title>Crie salas de Q&amp;A ao-vivo</Title>
        <Text className="subtitle">Tire as dúvidas da sua audiência em tempo-real</Text>
      </aside>

      <main>
        <div className="main-content">
          <Image className="logo" src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova Sala</h2>
          <form onSubmit={handleCreateRoom}>
            <Input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>

          <Text>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </Text>
        </div>
      </main>
    </div>
  );
}
