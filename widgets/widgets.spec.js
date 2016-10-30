var LandingPage = require('../landing/landing.pageObject'),
	WidgetsPage = require('./widgets.pageObject');
	
describe('Widgets Display', function(){
	var landing = new LandingPage(),
		widgets = new WidgetsPage(),
		EC = protractor.ExpectedConditions;

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

			expect((widgets.companiesCounter).getText()).not.toEqual('');
			expect((widgets.investorsCounter).getText()).not.toEqual('');
		});

		it('should persist on scroll', function(){
			widgets.header.getLocation().then(function(startLoc){
				browser.executeScript('window.scrollTo(0,1500);');

				widgets.header.getLocation().then(function(endLoc){
					expect(endLoc.y).toEqual(1500 + startLoc.y);
				});
			});
		});
	});

	describe('Widgets', function(){

		it('expected widgets should appear on page', function(){

			widgets.allWidgets.then(function(elements){
				expect(elements.length).toEqual(15);
			});

			widgets.widgetTitles.forEach(function(title){
				expect(element(by.cssContainingText('.ss-active-child h3.ng-binding', title)).isDisplayed()).toBe(true);
			});
		});

		it('"Companies" should handle one search filter', function(){
			//send in sample search term
			widgets.companiesSearch.sendKeys(widgets.compSearchTerm);
			expect((widgets.companiesDropdown).isDisplayed()).toBe(true);
			expect((widgets.compExpectedResult).isDisplayed()).toBe(true);
			widgets.compExpectedResult.click();
			//check "crunching" text
			expect((widgets.loadText).isDisplayed()).toBe(true);
			expect((widgets.filterName).getText()).toEqual(widgets.selectedCompany);
			browser.sleep(1500);
			expect((widgets.logo).isDisplayed()).toBe(true);

			widgets.checkWidgetResults(widgets.compSearchResult);


			//data has changed across several widgets
			//make sure things revert when you click "X"
		});

	})

	//async callback error
	//before all?
}); 
