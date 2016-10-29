var landing = require('../landing/landing.pageObject'),
	widgets = require('./widgets.pageObject'),
	EC = protractor.ExpectedConditions;

describe('Widgets Display', function(){

	beforeEach(function(){
		browser.get(browser.baseUrl);
		//test would otherwise wait for polling intervals in app to complete 
		browser.ignoreSynchronization = true;
		browser.wait(EC.visibilityOf(landing.readyText), browser.params.pageLoadTimeout);
		browser.ignoreSynchronization = false;

		landing.readyText.click();
		browser.sleep(1000);
		expect((widgets.header).isDisplayed()).toBe(true);
	});

	describe('Header', function(){

		it('should have prepopulated data', function(){
			expect((widgets.logo).isDisplayed()).toBe(true);
			expect((widgets.socialLinks).isDisplayed()).toBe(true);
			expect((widgets.amountCounter).isDisplayed()).toBe(true);

			expect((widgets.companiesCounter).getText()).toEqual(widgets.companyCount);
			expect((widgets.investorsCounter).getText()).toEqual(widgets.investorsCount);
		});

		// it('should persist on scroll', function(){
		// 	browser.executeScript('window.scrollTo(0,2000);');
		// 	widgets.header.getLocation().then(function(loc){
		// 		expect(loc.x).toBe(0);
		// 		expect(loc.y).toBe(0);
		// 	})
		// });
	});

	//async callback error
	//get beforeEach to run once before describe block?

}); 
