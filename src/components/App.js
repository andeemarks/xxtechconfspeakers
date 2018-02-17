import styles from './App.css';

import React from 'react';
import PropTypes from 'prop-types';

import Legend from './Legend';
import Header from './Header';
import Callouts from './Callouts';
import Footer from './Footer';
import Charts from './Charts';
import ConfList from './ConfList';
import confs from './confs.json';
import confsSchema from './confs-schema.json';
import { title, html } from './index.md';
import AppHelper from './AppHelper';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.helper = new AppHelper();

    if (this.helper.isDataCompliantWithSchema(confs, confsSchema)) {
      this.state = {confs:this.helper.augmentConfData(confs)};
    } else {
      this.state = [];
    }

    this.options = {};
  }

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="style.css"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"></link>
          <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>        
        </head>
        <body>

          <div className={styles.body}>
            <Header />
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <Callouts confs={this.state.confs} />
            {/* <Charts confs={this.state.confs} /> */}
            <ConfList confs={this.state.confs} />
            <br/>
            <Legend />
            <Footer />
          </div>
        </body>
      </html>
    );
  }

}

App.propTypes = {
  title: PropTypes.string
};
