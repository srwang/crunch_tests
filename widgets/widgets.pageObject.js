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
    this.filterName = element(by.className('filter_name'));
    this.loadText = element(by.css('h2.loading'));
    this.investorsList = element.all(by.css('[chart-title="Investors"] .list-item'));

    //DATA TO VALIDATE
    this.widgetTitles = ['Companies', 'Company HQ', 'Investors', 'Company Status', 'Funding: Round Name', 'Investments', 'Funding: Total Funding', 'Funding: Any Round', 'Funding: Latest Round', 'Categories', 'Acquisition Date', 'Acquisition Price', 'Founding Date', 'IPO Date', 'IPO Raise'];

    //searching companies (one term)
    this.compSearchTerm = '1000';
    this.compExpectedResult = element(by.cssContainingText('li', '1000 Corks'));
    this.selectedCompany = '1000 Corks';

    this.compSearchResult = {
    	'investorCount' : 1,
    	'investorName' : 'Start-Up Chile',
    	'hqSVG' : element(by.css('[chart-title="Company HQ"] path:nth-child(38)'))
    }

    //HELPER FUNCTIONS
    this.checkWidgetResults = function(result){ //scans widgets for expected data 

    	//company HQ
    	expect(result.hqSVG.getAttribute('fill')).toEqual('#0095ea');
		//investors
		this.investorsList.then(function(listItems){
			expect(listItems.length).toEqual(result.investorCount);
			expect(listItems[0].getText()).toEqual(result.investorName);
		});

    }.bind(this);
}

module.exports = WidgetsPage;