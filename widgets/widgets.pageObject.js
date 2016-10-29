var pageObject = {
    header : element(by.className('status')),
    logo: element(by.className('logo')),
    socialLinks: element(by.className('share')),
    amountCounter: element(by.className('amount-counter')),
    companiesCounter: element(by.cssContainingText('li', ' Companies')).$('span'),
    investorsCounter: element(by.cssContainingText('li', ' Investors')).$('span'),
    companyCount: '20526',
    investorsCount: '11775'
}

module.exports = pageObject;