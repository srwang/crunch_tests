var WidgetsPage = function () {
	//SELECTORS
    this.header  = element(by.className('status'));
    this.logo = element(by.className('logo'));
    this.socialLinks = element(by.className('share'));
    this.amountCounter = element(by.className('amount-counter'));
    this.companiesCounter = element(by.cssContainingText('li', ' Companies')).$('span');
    this.investorsCounter = element(by.cssContainingText('li', ' Investors')).$('span');
    this.allWidgets = element.all(by.className('drag-contain')).all(by.className('ss-active-child'));
    this.companiesSearch = element(by.css('[chart-title="Companies"] input'));
    this.companiesDropdown = element(by.css('[chart-title="Companies"] .dropdown-menu'));
    this.companiesList = element.all(by.css('[chart-title="Companies"] .list-item'));
    this.filterName = element(by.className('filter_name'));
    this.loadText = element(by.css('h2.loading'));
    this.investorsList = element.all(by.css('[chart-title="Investors"] .list-item'));
    this.ipoPath = element(by.css('path[fill="#0096ed"]'));
    this.acqPath = element(by.css('path[fill="#36b0f1"]'));
    this.deadpooledPath = element(by.css('path[fill="#caeafc"]'));
    this.activePath = element(by.css('path[fill="#8acff7"]'));

    //DATA TO VALIDATE
    this.widgetTitles = ['Companies', 'Company HQ', 'Investors', 'Company Status', 'Funding: Round Name', 'Investments', 'Funding: Total Funding', 'Funding: Any Round', 'Funding: Latest Round', 'Categories', 'Acquisition Date', 'Acquisition Price', 'Founding Date', 'IPO Date', 'IPO Raise'];

    //searching companies
    this.compSearchTerm = '1000';
    this.compExpectedResult = element(by.cssContainingText('li', '1000memories'));
    this.selectedCompany = '1000memories';

    this.compSearchResult = {
    	'changedWidget' : 'company',
    	'investors' : ['Caterina Fake', 'Chris Sacca', 'FLOODGATE', 'Felicis Ventures', 'Founder Collective', 'Greylock Partners', 'Keith Rabois', 'Paul Buchheit', 'Ron Conway', 'Y Combinator'],
    	'hqSVG' : element(by.css('[chart-title="Company HQ"] path:nth-child(5)')),
    	'status' : {
    		'IPOed': null,
    		'acquired':'M0,130A130,130 0 1,1 0,-130A130,130 0 1,1 0,130Z', 
    		'deadpooled': null, 
    		'active': null
    	}
    }

    //HELPER FUNCTIONS
    this.checkLoadText = function(){
    	//check "crunching" text
    	expect((this.loadText).isDisplayed()).toBe(true);
		browser.sleep(1500);
		expect((this.logo).isDisplayed()).toBe(true);
    }
    
    this.checkWidgetResults = function(result){  
		//scans widgets for expected data
    	if (result.changedWidget !== 'company') {
	    	this.companiesList.then(function(listItems){
	    		expect(listItems.length).toEqual(result.companies.length);
	    		for (var i=0; i<result.companies.length; i++) {
	    			expect(listItems[i].getText()).toEqual(result.companies[i]);
	    		};
	    	});
    	};

    	if (result.changedWidget !== 'hq') {
	    	expect(result.hqSVG.getAttribute('fill')).toEqual('#0095ea');
    	};

    	if (result.changedWidget !== 'investor') {
			this.investorsList.then(function(listItems){
				expect(listItems.length).toEqual(result.investors.length);
				for (var i=0; i<result.investors.length; i++) {
					expect(listItems[i].getText()).toEqual(result.investors[i]);
				};
			});
    	};

    	if (result.changedWidget !== 'status') {

    		function checkStatus (el, type) {
    			if (result.status[type]) expect(el.getAttribute('d')).toEqual(result.status[type]);
    		}
    		checkStatus(this.ipoPath, 'IPOed');
    		checkStatus(this.acqPath, 'acquired');
    		checkStatus(this.deadpooledPath, 'deadpooled');
    		checkStatus(this.activePath, 'active');
    	}

    }.bind(this);
}

module.exports = WidgetsPage;