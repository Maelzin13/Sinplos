import { FormattedMessage } from 'react-intl';
import { BookTwoTone } from '@ant-design/icons';
const icons = {
  BookTwoTone
};

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const DipopPage = {
  id: 'Dipop',
  title: <FormattedMessage id="Dipop" />,
  type: 'group',
  url: '/Dipop',
  icon: icons.BookTwoTone
};

export default DipopPage;
