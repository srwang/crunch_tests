var page = require('./pageObject'),
	EC = protractor.ExpectedConditions;

describe('Landing Display', function(){

	beforeEach(function() {
		browser.get(browser.baseUrl);
		expect((page.landingDiv).isDisplayed()).toBe(true);
	});

	it('should display header and videos', function(){
		expect((page.landingHeader).isDisplayed()).toBe(true);
		expect((page.landingVideos).isDisplayed()).toBe(true);
	});

	it('should show Cruchinator link when page loaded', function(){
		expect((page.loadingText).isPresent()).toBe(true); //not finding displayed? 
		//text says it'll load in 10-20
		browser.wait(EC.invisibilityOf(page.loadingText), 25000);
		browser.wait(EC.visibilityOf(page.readyText), 25000);
	});
});



// describe('Crunchinator Widgets Display', function(){

	// beforeEach(function(){
	// 	browser.get('http://crunchinator.com/#/crunchinator');
	// 	browser.wait(expect((readyText).isDisplayed()).toBe(true), 25000);
	// 	readyText.click();
	// 	//expect header displayed
	// });

	//it('header should persist on page scroll')

// });





