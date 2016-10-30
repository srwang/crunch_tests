var WidgetsPage = function () {
    this.header  = element(by.className('status'));
    this.logo = element(by.className('logo'));
    this.socialLinks = element(by.className('share'));
    this.amountCounter = element(by.className('amount-counter'));
    this.companiesCounter = element(by.cssContainingText('li', ' Companies')).$('span');
    this.investorsCounter = element(by.cssContainingText('li', ' Investors')).$('span');
    this.allWidgets = element.all(by.className('drag-contain')).all(by.className('ss-active-child'));

    this.widgetTitles = ['Companies', 'Company HQ', 'Investors', 'Company Status', 'Funding: Round Name', 'Investments', 'Funding: Total Funding', 'Funding: Any Round', 'Funding: Latest Round', 'Categories', 'Acquisition Date', 'Acquisition Price', 'Founding Date', 'IPO Date', 'IPO Raise'];

    this.checkSearch = function(){
    	
    }
}

module.exports = WidgetsPage;