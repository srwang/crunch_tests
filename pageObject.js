var pageObject = function() {
  this.landingDiv = element(by.className('initializing'));
  this.landingHeader = element(by.className('header-text'));
  this.landingVideos = element(by.css('[ng-if="!shared-results"]'));
  this.loadingText = element(by.css('[ng-show="!initiated"].loading'));
  this.readyText = element(by.className('movealong'));
}

module.exports = pageObject;
