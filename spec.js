var pageObject = require('pageObject.js');

describe('Landing Display', function(){

	beforeAll(function() {
		browser.get('http://crunchinator.com/#/crunchinator');
		expect((landingDiv).isDisplayed()).toBe(true);
	});

	it('should display header and videos', function(){
		expect((landingHeader).isDisplayed()).toBe(true);
		expect((landingVideos).isDisplayed()).toBe(true);
	});

	it('should show Cruchinator link when page loaded', function(){
		expect((loadingText).isDisplayed()).toBe(true);
		browser.wait(expect((loadingText).isDisplayed()).toBe(false), 25000);
		expect((readyText).isDisplayed()).toBe(true);
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





