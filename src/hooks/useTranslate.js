import { useTranslation } from 'react-i18next';

const SomeComponent = () => {
  const { t } = useTranslation();

  return <div>{t('welcome_message')}</div>;
};
