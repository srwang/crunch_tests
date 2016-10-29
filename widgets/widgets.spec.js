var landing = require('../landing/landing.pageObject'),
	widgets = require('./widgets.pageObject'),
	EC = protractor.ExpectedConditions;

describe('Crunchinator Widgets Display', function(){
	beforeEach(function(){
		browser.get(browser.baseUrl);
		browser.wait(EC.visibilityOf(landing.readyText), 25000);
		landing.readyText.click();
		//expect header displayed
	});

})