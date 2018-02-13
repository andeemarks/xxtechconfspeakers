var _ = require('underscore');

class AppHelper {
  isDataCompliantWithSchema(confs, confsSchema) {
      var Ajv = require('ajv');
      var schemaValidator = new Ajv();
      schemaValidator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

      return schemaValidator.validate(confsSchema, confs);
  }

  selectYearAndDiversity(conference) { 
    return _.pick(conference, 'year', 'diversityPercentage'); 
  }

  sortByYear(conferences, confName) {
    return {name: confName, history: _.sortBy(_.map(conferences, this.selectYearAndDiversity), 'year')};
  }

  completeMissingFields(confs) {
    for (var i = 0; i < confs.length; i += 1) {
      confs[i]['numberOfMen'] = confs[i].totalSpeakers - confs[i].numberOfWomen;
      confs[i]['diversityPercentage'] = confs[i].numberOfWomen / confs[i].totalSpeakers
    }

    return confs;
  }

  augmentConfData(confs) {
    var augmentedConfs = this.completeMissingFields(confs);

    // add historical diversity for conference
    this.confsByName = _.groupBy(augmentedConfs, "name");
    this.confsHistory = _.map(this.confsByName, this.sortByYear, this);

    this.confsWithHistory = augmentedConfs.map(function(currentConf) {
      return Object.assign(currentConf, {history: _.find(this.confsHistory, function(conf) {
        return conf.name == currentConf.name;
      }).history}
    )}, this);

    // console.log(this.confsWithHistory);
    return this.confsWithHistory;
  }
}

export default AppHelper;