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

		it('should be able to drag and drop', function(){

			//selenium is moving dragged element beneath the others
			// browser.actions().dragAndDrop(widgets.companiesTitle, widgets.hqWidget).perform();

			// widgets.allWidgets.then(function(el){ //check positions switched
			// 	expect(el[0]).toEqual(widgets.hqWidget);
			// 	expect(el[1]).toEqual(widgets.companiesWidgets);
			// });

		});

	});

	describe('Companies', function(){

		it('should handle one search filter', function(){
			//send in sample search term
			widgets.companiesSearch.sendKeys(widgets.compSearchTerm);
			expect((widgets.companiesDropdown).isDisplayed()).toBe(true);
			expect((widgets.compExpectedResult).isDisplayed()).toBe(true);
			widgets.compExpectedResult.click();
			//check "crunching" text
			widgets.checkLoadText();
			widgets.checkHeaderInfo(widgets.compCountResult, widgets.invCountResult);
			expect((widgets.filterName).getText()).toEqual(widgets.selectedCompany);
			//see if data changed across widgets 
			widgets.checkWidgetResults(widgets.compSearchResult);
		});
	});
}); 
