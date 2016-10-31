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
    this.fundingList = element.all(by.css('[chart-title="Funding: Round Name"] .list-item'));
    this.investmentsSVG = element(by.css('[chart-title="Investments"] .foreground'));
    this.totalFundingSVG = element(by.css('[chart-title="Funding: Total Funding"] .foreground'));
    this.anyRoundFundingSVG = element(by.css('[chart-title="Funding: Any Round"] .foreground'));
    this.lastestRoundFundingSVG = element(by.css('[chart-title="Funding: Latest Round"] .foreground'));
    this.acqDateSVG = element(by.css('[chart-title="Acquisition Date"] .foreground'));
    this.acqPriceSVG = element(by.css('[chart-title="Acquisition Price"] .foreground'));
    this.foundingSVG = element(by.css('[chart-title="Founding Date"] .foreground'));
    this.ipoDateSVG = element(by.css('[chart-title="IPO Date"] .foreground'));
    this.ipoRaiseSVG = element(by.css('[chart-title="IPO Raise"] .foreground'));
    this.categoriesList = element.all(by.css('[chart-title="Categories"] .list-item'));

    //DATA TO VALIDATE
    this.widgetTitles = ['Companies', 'Company HQ', 'Investors', 'Company Status', 'Funding: Round Name', 'Investments', 'Funding: Total Funding', 'Funding: Any Round', 'Funding: Latest Round', 'Categories', 'Acquisition Date', 'Acquisition Price', 'Founding Date', 'IPO Date', 'IPO Raise'];

    //searching companies
    this.compSearchTerm = '1000';
    this.compExpectedResult = element(by.cssContainingText('li', '1000memories'));
    this.compCountResult = '20526';
    this.invCountResult = '10';
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
    	},
    	'funding' : ['Seed', 'Series A'],
    	'investments' : true,
    	'total funding' : true,
    	'any round funding' : true,
    	'latest round funding' : true,
    	'categories' : ['Consumer Web'],
    	'acquisition date' : true,
    	'acquisition price' : false,
    	'founding date' : true,
    	'ipo date' : false,
    	'ipo raise' : false
    }

    //HELPER FUNCTIONS
    this.checkLoadText = function(){
    	//check "crunching" text
    	expect((this.loadText).isDisplayed()).toBe(true);
		browser.sleep(1500);
		expect((this.logo).isDisplayed()).toBe(true);
    }

    this.checkHeaderInfo = function(comp, inv) {
    	expect((this.companiesCounter).getText()).toEqual(comp);
    	expect((this.investorsCounter).getText()).toEqual(inv);
    }
    
    this.checkWidgetResults = function(result){  
		//scans widgets for expected data
    	if (result.changedWidget !== 'company') {
    		checkList(this.companiesList, result.companies);
    	};

    	if (result.changedWidget !== 'hq') {
	    	expect(result.hqSVG.getAttribute('fill')).toEqual('#0095ea');
    	};

    	if (result.changedWidget !== 'investor') {
    		checkList(this.investorsList, result.investors);
    	};

    	if (result.changedWidget !== 'status') {

    		function checkStatus (el, type) {
    			if (result.status[type]) expect(el.getAttribute('d')).toEqual(result.status[type]);
    		};
    		checkStatus(this.ipoPath, 'IPOed');
    		checkStatus(this.acqPath, 'acquired');
    		checkStatus(this.deadpooledPath, 'deadpooled');
    		checkStatus(this.activePath, 'active');
    	};

    	if (result.changedWidget !== 'funding') {
    		checkList(this.fundingList, result.funding);
    	};

    	if(result.changedWidget !== 'investments') {
    		checkSVG(this.investmentsSVG, 'investments');
    	};

    	if(result.changedWidget !== 'total funding') {
    		checkSVG(this.totalFundingSVG, 'total funding');
    	};

    	if(result.changedWidget !== 'any round funding') {
    		checkSVG(this.anyRoundFundingSVG, 'any round funding');
    	};

    	if(result.changedWidget !== 'latest round funding') {
    		checkSVG(this.lastestRoundFundingSVG, 'latest round funding');
    	};

    	if (result.changedWidget !== 'categories') {
    		checkList(this.categoriesList, result.categories);
    	};

    	if (result.changedWidget !== 'acquisition date') {
    		checkSVG(this.acqDateSVG, 'acquisition date');
    	};

    	if (result.changedWidget !== 'acquisition price') {
    		checkSVG(this.acqPriceSVG, 'acquisition price');
    	};

    	if (result.changedWidget !== 'founding date') {
    		checkSVG(this.foundingSVG, 'founding date');
    	};

    	if (result.changedWidget !== 'ipo date') {
    		checkSVG(this.ipoDateSVG, 'ipo date');
    	};

    	if (result.changedWidget !== 'ipo raise') {
    		checkSVG(this.ipoRaiseSVG, 'ipo raise');
    	};

    	function checkList(elArr, expected) {
    		elArr.then(function(listItems){
    			expect(listItems.length).toEqual(expected.length);
    			for (var i=0; i<expected.length; i++) {
    				expect(listItems[i].getText()).toEqual(expected[i]);
    			};
    		});
    	};

    	function checkSVG(el, type) {
    		//specific paths for SVG are slightly diff each time page loads
    		if (result.status[type] === true) {
    			expect(el.isDisplayed()).toBe(true);
    		} else {
    			expect(el.isDisplayed()).toBe(false);
    		}
    	}

    }.bind(this);
}

module.exports = WidgetsPage;