
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");


var streetStr=$('#street').val();
var cityStr=$('#city').val();

//  a full address
var address= streetStr + ',' + cityStr;

// it's jus  a fun heading
$greeting.text('So,you want to live at' + address +'?');

var streetviewUrl='http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address+ '';
$body.append('<img class="bgimg" src=" ' + streetviewUrl+ ' ">');


//NYTimes AJAX request goes HERE
var nytimesUrl='https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr+ '&sort=newest&api-key=c30b32b9b8ea48b1abd2a35b273c9f9f'

//pass url and anynomous function
$.getJSON (nytimesUrl, function(data){
articles=data.response.docs;
for(var i=0; i<articles.length; i++ ){

var article=articles[i];
$nytElem.append('<li class="article">' + '<a href=" '+article.web_url + '">'+ article.headline.main+'</a>'
                  + '<p>'+ article.snippet + '</p>'+ '</li>') ;

};



}).error(function(e){
$nytHeaderElem.text('New York Times Articles could not be loaded');

});


//wikipedia AJAX request goes HERE
var wikiUrl='https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr+ '&format=json&callback=wikiCallback';

var wikiRequestTimeout=setTimeout(function(){
$wikiElem.text("failed to get Wikipedia resources");},8000);

//ajax request object
$.ajax({
        
        url:wikiUrl,
        dataType:"jsonp",
        //json:"callback"
        success:function(response){

            var articleList=response[1];
         
            //iterate through object response[1]
            for(var i=0 ; i<articleList.length;i++){
              articleStr=articleList[i];
              var url = 'http://en.wikipedia.org/wiki/'+articleStr;
              $wikiElem.append('<li><a href=" ' + url+ ' ">'+ articleStr+'</a></li>');

            };

            clearTimeout(wikiRequestTimeout);
        }




});


    return false;
};

$('#form-container').submit(loadData);
