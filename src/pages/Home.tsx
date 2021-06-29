import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/atoms/button';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import loginIconImg from '../assets/images/login-icon.svg';

import '../styles/auth.scss';
import { database } from '../services/firebase';
import { Input } from '../components/atoms/input';
import { Image } from '../components/atoms/image';
import { Title } from '../components/atoms/title';
import { Subtitle } from '../components/atoms/subtitle';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <Image
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <Title>Crie salas de Q&amp;A ao-vivo</Title>
        <Subtitle>Tire as dúvidas da sua audiência em tempo-real</Subtitle>
      </aside>

      <main>
        <div className="main-content">
          <Image src={logoImg} alt="Letmeask" />
          <Button className="create-room" onClick={handleCreateRoom}>
            <Image src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <Input
              type=""
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <Image src={loginIconImg} alt="Entrar na sala" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
