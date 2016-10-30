var LandingPage = require('./landing.pageObject');

describe('Landing Display', function(){
	var landing = new LandingPage(),
		EC = protractor.ExpectedConditions;

	beforeEach(function() {
		browser.get(browser.baseUrl);
		expect((landing.landingDiv).isDisplayed()).toBe(true);
	});

	it('should display header and videos', function(){
		expect((landing.landingHeader).isDisplayed()).toBe(true);
		expect((landing.landingVideos).isDisplayed()).toBe(true);
	});

	it('should show Cruchinator link when landing loaded', function(){
		expect((landing.loadingText).isPresent()).toBe(true); //not finding displayed? 
		//test would otherwise wait for polling intervals in app to complete 
		browser.ignoreSynchronization = true;
		browser.wait(EC.invisibilityOf(landing.loadingText), browser.params.pageLoadTimeout); 
		browser.wait(EC.visibilityOf(landing.readyText), browser.params.pageLoadTimeout);
		browser.ignoreSynchronization = false;
	});
});