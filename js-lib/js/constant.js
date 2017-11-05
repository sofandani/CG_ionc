angular.module(
	'cityGuideKuninganApp.constant',
	[
		'angular-cache',
        'angular-md5',
        'base64'
	]
)

.constant('blkey',
{
    user: '775335',
    token: 'wnFfeo4fDro5jaqRvan'
})

/*.provider('bar', ['blkey', function(foo)
{
	this.data = {
		message: foo.message + ' World!'
	}

	this.$get = function()
	{
		return this.data;
	}
}])*/