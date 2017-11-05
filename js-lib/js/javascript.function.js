function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function jumpLocation(url){
  url = encodeURI(url);
  window.open(url, '_blank', 'location=yes');
  return false;
}

function ratingColor(v)
{
  //v = parseInt(v);

  if(v > 0)
  {
    if(v <= 4.9)
    {
      return 'bg-gray-light';
    }
    else if(v >= 5 && v <= 7)
    {
      return 'bg-energized';
    }
    else if(v >= 7.1)
    {
      return 'bg-balanced';
    }
    else
    {
      return 'bg-gray-light';
    }
  }
}