angular.module('cityGuideKuninganApp.directive', ['base64'])

.filter('thousandSuffix', function ()
{
    return function (input, decimals)
    {
      var exp, rounded,
        suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

      if(window.isNaN(input))
      {
        return null;
      }

      if(input < 1000)
      {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    }
})


.filter('ribuAwalan', function ()
{
    return function (input, decimals)
    {
      var exp, rounded,
        suffixes = [' ribu', ' juta', ' milyar', ' trilyun'];

      if(window.isNaN(input))
      {
        return null;
      }

      if(input < 1000)
      {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    }
})


.filter('jumpUrl',function()
{
  return function (input) {
    return jumpLocation(input)
  }
})


.filter('urlNews', ['$base64', function ($base64)
{
    return function (input) {
        var input = input.replace(/(.*)\&url\=(.*)/,'$2');
        return $base64.encode(input);
    };
}])


.filter('encode64', ['$base64', function ($base64)
{
    return function (input)
    {
        return $base64.encode(input);
    };
}])


.filter('decode64', ['$base64', function ($base64)
{
    return function (input)
    {
        return $base64.decode(input);
    };
}])


.filter('imgNews', function()
{
  return function (input,replacement)
  {
    var imgRegex = /(.+)(<img[\s]src\=\")(\/\/[a-zA-Z0-9 \/\?\=\:\._-]+)(\")(.+)/;
    var imgRegex2 = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/;

    if (imgRegex.test(input))
    {
      return input.replace(imgRegex,'$3').replace('\/\/','http:\/\/')
    }
    else if(imgRegex2.test(input))
    {
      return input.match(/src="([^"]*)"/i)[1]
    }
    else
    {
      var result = !replacement ? 'img/no-img.gif' : replacement;
      return result;
    }
  }
})



.filter('GetDomainFromGuid', function()
{
  return function (input,replacement)
  {
    var imgRegex = /(.*)cluster\=(htt(p|ps)\:\/\/[a-zA-Z0-9 \/\?\=\:\._-]+)/;

    if (imgRegex.test(input))
    {
      input = input.replace(imgRegex,'$2').replace('\/\/','http:\/\/');
      input = input.replace(/(www\.)/i, "");

      if( !input.replace(/(www\.)/i, "") )
      {
        input = 'http://' + input;
      }

      var reg = /:\/\/(.[^/]+)/;
      return input.match(reg)[1];
    }
    else
    {
      return input;
    }
  }
})



.filter('pubDateConvert', function ()
{
  return function (value)
  {
    return new Date(value).toLocaleString();
  }
})


.filter('ImageBLmedium', function()
{
  return function (input,replacement)
  {
    var imgRegex = /\/small\//;

    if (imgRegex.test(input))
    {
      return input.replace(imgRegex,'\/medium\/')
    }
    else
    {
      var result = !replacement ? 'img/no-img.gif' : replacement;
      return result;
    }
  }
})



.filter('WuIconChange', function()
{
  return function (input,replacement)
  {
    var imgRegex = /\/k\//;

    if (imgRegex.test(input))
    {
      return input.replace(imgRegex,'\/'+replacement+'\/')
    }
    else
    {
      return input;
    }
  }
})


.filter('range', function()
{
  return function(input, from, total)
  {
    from = from ? parseInt(from) : 0;

    total = parseInt(total + from);

    for (var i = from; i < total; i++)
      input.push(i);
    return input;
  };
})


.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
})