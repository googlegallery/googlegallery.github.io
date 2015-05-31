/* Your code starts here */

var app = {};

app.init = function() {

    var loadData = function(){
        
        console.log('Called loadData.');

		$.getJSON( "data/artworks.json", function(data) {
			console.log(data);
			processData(data);
			// var tags = [];

			// $( "<ul/>", {
			// "class": "my-new-list",
			// html: items.join( "" )
			// }).appendTo( "body" );
		});     	
    }

    // Splitting the tags
    var processData = function(data){

        console.log('Called processData.');

		$.each(data, function(key, val) {
			var tags = data[key]['tags'].split(',');
			tags.forEach(function(item, index, array){
				tags[index] = tags[index].trim();
			});
			data[key]['tags'] = tags;
			artworks.push(data[key]);
		});
		console.log(artworks);
		aggregateTags();
    }

    var aggregateTags = function(){

        console.log('Called aggregateTags.');

    	artworks.forEach(function(item, index, array){
    		// console.log(item);
    		item['tags'].forEach(function(item, index, array){
    			// console.log(item);
                if(availableTags.indexOf(item) < 0){
                    availableTags.push(item);
                }
    		});
    	});
    	console.log(availableTags);
        attachEvents();        
    }

    var attachEvents = function(){

        console.log('Called attachEvents.');

        $('#search-box').autocomplete({
            source: availableTags,
            select: function(event, ui){
                console.log(ui.item.value);
                queryDb(ui.item.value);
            }
        }); 

        $('#search-bt').off('click').on('click', function(){
            // console.log($('#search-box').val());
            queryDb($('#search-box').val());
        });

        $('#about-bt').off('click').on('click', function(){
            aboutPage();
        });
    }

    var queryDb = function(query){

        console.log('Called queryDb.');

        var results = [];
        artworks.forEach(function(item, index, array){
            if(item['tags'].indexOf(query) > -1){
                console.log(item);
                results.push(item);
            }
        });
        appendResults(results);
    }

    var appendResults = function(results){

        console.log('Called appendResults.');
        console.log(results);

        $('#container').empty();
        // $('#container').append('<p>Results</p>');
        results.forEach(function(item, index, array){
            var resultDiv = $('<div class="result"></div>');
            // var title = $('<h1><a href="' + item['url'] + '">' + item['title'] + '</a></h1>');
            var title = $('<h1><a href="' + item['url'] + '" target="_blank">' + item['title'] + '</a></h1>');
            var url = $('<div class="url">' + item['url'] + '</div>');
            var description = $('<div class="description">' + shortenDescription(item['description']) + '</div>');

            $(resultDiv).append(title)
                        .append(url)
                        .append(description)
                        .appendTo('#container');
        });

    }

    var shortenDescription = function(description){
        if(description.length > 230){
            description = description.substring(0, 230);
            description = description.substring(0, description.lastIndexOf(' ')) + '...';
        }
        return description;
    }

    var aboutPage = function(){
        $('#container').empty();
        var about = $('<div class="about"></div>').appendTo('#container');
               $(about).append("<h1>About</h1>")
                       .append("<p><b>Google Gallery</b> is an online exhibition of artworks about Google. To explore the gallery, just start typing something into the search box. If you're not sure about what you're looking for, typing \"google\" will show all works in the collection.</p>")
                       .append("<h2>The Exhibition</h2>")
                       .append("<p>With more than a billion user per month, Google's ubiquitous online presence has made it into the subject of many artworks since throughout the past years. As the public view of the company changed from positive to critical, artists have responded to Google in different ways as well.</p>")
                       .append("<p>The Secret Lives of numbers, from 2002, reflects an optimistic view of the search engine and the web as a whole. Search results are used as a way to illuminate cultural aspects that would not be accessible without the contributions of millions of people searching everyday. The Newsmap uses the Google News aggregator, and also reflects this positive view of the web as an unparalleled source of knowledge.</p>")
                       .append("<p>Image Atlas, by Aaron Swartz and Taryn Simon, also uses the search engine to reveal cultural facts, but its goals are less optimistic and sometimes opposed to those first works. Its purpose is less to reveal the true image associated with each word on different countries and more to point out the biases in the Google Images algorithm, As stated by Swarts when presenting the project, \"these sort of neutral tools like Facebook and Google and so on, which claim to present an almost unmediated view of the world, through statistics and algorithms and analyses, in fact are programmed and are programming us. So we wanted to find a way to visualize that, to expose some of the value judgments that get made.\"<sup> 1</sup></p>")
                       .append("<p>As the company expands its products and presence online, the skepticism towards it becomes increasingly present in the art world, . The notion that its smallest decisions might be highly influential in the way we think turn the optimistic view into critical examination. In \"Google Art, or How to Hack Google\" an online exhibition from 2007 by arts organisation Rhizome, curator Ana Otero states that \"search engines shape knowledge, modulate web traffic, and contribute to the creation of new semantics and meanings.\"<sup> 2</sup></p>")
                       .append("<p>Some works influenced by this view are critical, others are more direct in fighting the company. Google Will Eat Itself tries to game Google's ad system, generating money through a network of websites and giving it back to its users. Postcards from Google Earth turns the flaws of the system into uncanny landscapes, commenting on models of representation. Google Poetics plays with the absurd in the search engine's autocomplete feature.</p>")
                       .append("<p>More recent projects about Google seen to accept it as a cultural trait in itself, abandoning both the enthusiastic and the critical tone of previous works. Google Image Quiz and Google Feud, for example, reverse-engineer the search engine to turn it into a guessing game. Responding to the increasing problem of preserving digital culture, some projects are dedicated to archive the content we generate through Google. Search by Image and I'm Google are endless sequences of Google Images that perpetuate an unique path through search queries. The Google Book turns the digital archive into a physical form, building a dictionary out of image searches.</p>")
                       .append("<p>This change to offline works might be explained by the maturity of the web as a mass medium. As net artist Olia Lialina explains \"Web artists and net artists are doing work about the medium, but, as soon as it stops being new – when it a matures, when it becomes a mass medium, it becomes very difficult to have a close connection with it. (...) many net artists went OFFLINE at that time to make works 'about the internet and the web' from the outside, in order to keep a distance, to keep the relationship alive.\"<sup> 3</sup></p>")
                       .append("<p>Google's existence in our lives seen far from an end. Quite the opposite, its products might be tangibly present in a near future of wearables, robots and artificial intelligence. New artworks commenting on those issues will certainly appear as the company expands its omnipresence to the physical world.</p>")
                       .append('<h3><a href="http://gianordoli.com">Gabriel Gianordoli</a>, Spring 2015.</h3>')
                       .append('<p class="references">1. \"Aaron Swartz’s Art: What Does Your Google Image Search Look Like in Other Countries? | Motherboard.\" 2015. Accessed May 14. http://motherboard.vice. com/blog/aaron-swartzs-art.</p>')
                       .append('<p class="references">2. \"OFFLINE ART: New2 Opening Speech by Olia Lialina at Aram Bartholl Blog.\" 2015. Accessed May 14. http://datenform.de/blog/ offline-art-opening-speech-by-olia-lialina/.</p>')
                       .append('<p class="references">3. \"The Rhizome Archive | Google Art, or How to Hack Google.\" 2015. Accessed May 14. http://archive.rhizome.org/exhibition/googleshow/.</p>');

    }

    // init
    var artworks = [];   
    var availableTags = [];
    loadData();  
};

app.init();