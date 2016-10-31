exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
			'landing/landing.spec.js', 
			'widgets/widgets.spec.js'
			],
	multiCapabilities: [{
		//browserName: 'firefox'
	}, {
		browserName: 'chrome'
	}],
	baseUrl: 'http://crunchinator.com/#/crunchinator',
	allScriptsTimeout: 50000,
	params: {
		pageLoadTimeout: 30000 //text says it'll load in 10-20
	}
}