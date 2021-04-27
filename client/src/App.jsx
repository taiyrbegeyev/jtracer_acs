import PropTypes from 'prop-types';
import React from 'react';
import { withNamespaces } from 'react-i18next';

App.propTypes = {
  t: PropTypes.func.isRequired
};

function App({ t }) {
  return (
    <div>
      <p>{t('Welcome to React')}</p>
    </div>
  );
}

export default withNamespaces()(App);
