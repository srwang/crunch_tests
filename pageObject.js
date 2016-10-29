var pageObject = {
    landingDiv : element(by.className('initializing')),
    landingHeader : element(by.className('initializing')).$('.header-text'),
    landingVideos : element(by.css('video.ng-scope')),
    loadingText : element(by.css('[ng-show="!initiated"].loading')),
    readyText : element(by.className('movealong'))
}

module.exports = pageObject;
