import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/atoms/button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import { useRoom } from '../hooks/useRoom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import conversationImg from '../assets/images/empty-questions.svg';

import '../styles/room.scss';
import { database } from '../services/firebase';
// import { useAuth } from '../hooks/useAuth';

import { Image } from '../components/atoms/image';
import { Title } from '../components/atoms/title';
import { Text } from '../components/atoms/text';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  // const { user } = useAuth();

  const { questions, title, ownerId } = useRoom(roomId);
  const isAuthenticated = localStorage.getItem('Authenticated');

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/*');
    }
  }, []);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Image className="logo" src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <Title>Sala {title}</Title>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>

        {questions.length === 0 ? (
          <div className="empty-state">
            <Image src={conversationImg} alt="Balões de conversas" />
            <h3>Nenhuma pergunta por aqui...</h3>
            <Text>
              Compartilhe o código desta sala para começar receber perguntas!
            </Text>
          </div>
        ) : (
          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover Pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
