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
    this.foundingSVG = element(by.css('[chart-title="Founding Date"] .foreground'));

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
    	},
    	'funding' : ['Seed', 'Series A'],
    	// 'investmentsPathSamples': ['M0,290L1.54308041666422,290L2.9866072580597804', '290L207.5173536147023,290L209.0106572437322,290L210.5537376603964', '290L2.9866072580597804,290L1.54308041666422,290L0,290Z'],
    	// 'foundingPathSamples':['M0,290L12.348717692678713,290L24.663695719530434', '290L295.76191063940325,290L295.76191063940325', '290L24.663695719530434,290L12.348717692678713,290L0,290Z']
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

    	// if (result.changedWidget !== 'funding') {
    	// 	checkList(this.fundingList, result.funding);
    	// };

    	// if (result.changedWidget !== 'investments') {
    	// 	checkPath(this.investmentsSVG, result.investmentsPathSamples);
    	// };

    	// if (result.changedWidget !== 'founding') {
    	// 	checkPath(this.foundingSVG, result.foundingPathSamples);
    	// };

    	function checkList(elArr, expected) {
    		elArr.then(function(listItems){
    			expect(listItems.length).toEqual(expected.length);
    			for (var i=0; i<expected.length; i++) {
    				expect(listItems[i].getText()).toEqual(expected[i]);
    			};
    		});
    	};

    	// function checkPath(el, pathSamples) {
    	// 	pathSamples.forEach(function(path){
	    // 		expect(el.getAttribute('d')).toContain(path);
    	// 	});
    	// };

    	// function checkRectPath(el, ) {
    	// 	//check the path of the rect(s) that have a fill
    	// }

    }.bind(this);
}

module.exports = WidgetsPage;