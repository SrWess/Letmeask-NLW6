import { useHistory } from 'react-router-dom';

import { Button } from '../components/atoms/button';

import notFoundImg from '../assets/images/404.svg';

import '../styles/not-found.scss';

export function NotFound() {
  const history = useHistory();

  return (
    <div id="page-not-found">
      <img src={notFoundImg} alt="Erro 404 - Não encontrado" />
      <h1>Oops... Não encontramos essa página</h1>
        <p>
          A página que você está procurando pode ter sido removida ou está
          temporariamente indisponível, não se preocupe já estamos verificando.
        </p>
        <Button type="button" onClick={() => history.push('/')}>Retornar à Home</Button>
    </div>
  );
}
