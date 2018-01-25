import React from 'react';
import s from './Header.css';

export default class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <div className={`mdl-layout-title ${s.title}`} to="/">
            female speakers @ tech conferences
          </div>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }

}
