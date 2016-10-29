var landing = require('./landing.pageObject'),
	EC = protractor.ExpectedConditions;

describe('Landing Display', function(){

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
		//text says it'll load in 10-20
		browser.wait(EC.invisibilityOf(landing.loadingText), 25000);
		browser.wait(EC.visibilityOf(landing.readyText), 25000);
		expect(landing.readyText.getText()).toEqual('Continue to the Crunchinator');
	});
});