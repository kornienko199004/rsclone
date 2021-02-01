import React from 'react';
import './shortcutList.scss';
import { connect } from 'react-redux';

const ShortcutsList = () => (
  <div className="shortcut-container">
    выфвыф
  </div>
);

const mapStateToProps = (state: any) => ({
  shortcuts: state.shortcuts,
});

export default connect(mapStateToProps)(ShortcutsList);
