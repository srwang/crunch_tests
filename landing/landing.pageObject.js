var LandingPage = function() {
    this.landingDiv = element(by.className('initializing'));
    this.landingHeader = element(by.className('initializing')).$('.header-text');
    this.landingVideos = element(by.css('video.ng-scope'));
    this.loadingText = element(by.css('[ng-show="!initiated"].loading'));
    this.readyText = element(by.className('movealong'));
}

module.exports = LandingPage;