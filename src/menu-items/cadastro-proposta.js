// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const cadastroProposta = {
  id: 'cadastro-proposta',
  title: <FormattedMessage id="cadastro-proposta" />,
  type: 'group',
  url: '/cadastro-proposta'
  // icon: icons.ChromeOutlined
};

export default cadastroProposta;
