angular.module('cityGuideKuninganApp.directive', [])

.directive('backImg', function()
{
    return function(scope, element, attrs)
    {
        attrs.$observe('backImg', function(value)
        {
            element.css({
                'background-image': 'url(' + value +')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover',
                'position': 'absolute'
            });
        });
    };
})

.directive('jumpAchor', function()
{
    return function(scope, element, attrs)
    {
        element.bind("click", function(url)
        {
            window.open(''+url+'','_system','location=yes');
            //console.log(url);
            return false;
        });
    };
})

.directive('pembulatanAngka', function()
{
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModelCtrl)
    {
      function roundNumber(val)
      {
        var parsed = parseFloat(val, 10);
        if(parsed !== parsed)
        { return null; } // check for NaN
        var rounded = Math.round(parsed);
        return rounded;
      }
      // Parsers take the view value and convert it to a model value.
      ngModelCtrl.$parsers.push(roundNumber);
   }
  };
})

.directive('pushSearch', function()
{
  return {
    restrict: 'A',
    link: function($scope, $element, $attr)
    {
      var amt, st, header;

      $element.bind('scroll', function(e)
      {
        if(!header)
        {
          header = document.getElementById('search-bar');
        }

        st = e.detail.scrollTop;
        if(st < 0)
        {
          header.style.webkitTransform = 'translate3d(0, 0px, 0)';
        }
        else
        {
          header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
        }
      });
    }
  }
})