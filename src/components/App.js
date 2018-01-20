import styles from './App.css';

import React, { Component } from 'react';

import Legend from './Legend';
import Header from './Header';
import Callouts from './Callouts';
import Footer from './Footer';
import ConfList from './ConfList';
import confs from './confs.json';
import confsSchema from './confs-schema.json';
import _ from 'underscore';
import { title, html } from './index.md';

var Ajv = require('ajv');

export default class App extends Component {

  constructor(props) {
    super(props);

    var ajv = new Ajv();
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
    var isSchemaValid = ajv.validate(confsSchema, confs);
    if (!isSchemaValid) console.log(ajv.errorsText());

    this.options = {};
    this.state = {confs:this.augmentConfData()};
  }

  selectYearAndDiversity(conference, key) { 
    return _.pick(conference, 'year', 'diversityPercentage'); 
  };

  sortByYear(conferences, confName, list) {
    return {name: confName, history: _.sortBy(_.map(conferences, this.selectYearAndDiversity), 'year')};
  };

  augmentConfData() {
    for (var i = 0; i < confs.length; i += 1) {
      confs[i]['numberOfMen'] = confs[i].totalSpeakers - confs[i].numberOfWomen;
      confs[i]['diversityPercentage'] = confs[i].numberOfWomen / confs[i].totalSpeakers * 100
    }

    // add historical diversity for conference
    this.confsByName = _.groupBy(confs, "name");
    this.confsHistory = _.map(this.confsByName, this.sortByYear, this);

    this.confsWithHistory = confs.map(function(currentConf, index, allConfs) {
      return Object.assign(currentConf, {history: _.find(this.confsHistory, function(conf) {
        return conf.name == currentConf.name;
      }).history}
    )}, this);

    // console.log(this.confsWithHistory);
    return this.confsWithHistory;
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
            <ConfList confs={this.state.confs} />
            <br/>
            <Legend />
            <Footer />
          </div>
        </body>
      </html>
    );
  }

};
