import { useHistory } from 'react-router-dom';

import { Button } from '../components/atoms/button';

import notFoundImg from '../assets/images/404.svg';

import '../styles/not-found.scss';

import { Title } from '../components/atoms/title';
import { Image } from '../components/atoms/image';
import { Text } from '../components/atoms/text';

export function NotFound() {
  const history = useHistory();

  return (
    <div id="page-not-found">
      <Image src={notFoundImg} alt="Erro 404 - Não encontrado" />
      <Title>Oops... Não encontramos essa página</Title>
        <Text>
          A página que você está procurando pode ter sido removida ou está
          temporariamente indisponível, não se preocupe já estamos verificando.
        </Text>
        <Button type="button" onClick={() => history.push('/')}>Retornar à Home</Button>
    </div>
  );
}
