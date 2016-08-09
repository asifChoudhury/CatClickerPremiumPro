/*

-------
Visuals
-------

The application should display
------------------------------
- a list of cats by name
- an area to display the selected cat
- an admin button
- an admin area with inputs for changing the cat's name, url, and number of clicks
  (hidden by default)


In the cat display area, the following should be displayed
----------------------------------------------------------
- the cat's name
- a picture of the cat
- text showing the number of clicks
- The specifics of the layout do not matter, so style it however you'd like.

-----------
Interaction
-----------
- When a cat name is clicked in the list, the cat display area should update to show
  the data for the selected cat.
- The number of clicks in the cat area should be unique to each cat, and should
  increment when the cat's picture is clicked.
- When the admin button is clicked, the admin area should appear with the inputs
  filled in for the currently-selected cat.
- When the cancel button in the admin area is pressed, the admin area disappears.
- When the save button in the admin area is pressed, the currently-selected cat's
  values update with the values in the admin area, and the admin area disappears.

 */
$(document).ready(function() {
    var model =  {
        currentCat: null,
        cats:[
        {
            name: 'Whiskers',
            clickCount: 0,
            imgSource: 'img/cat.jpg'
        },
        {
            name: 'Snowy',
            clickCount: 0,
            imgSource: 'img/cat-2.jpg'
        },
        {
            name: 'Thunder',
            clickCount: 0,
            imgSource: 'img/cat-3.jpg'
        },
        {
            name: 'Theodore',
            clickCount: 0,
            imgSource: 'img/cat-4.jpg'
        },
        {
            name: 'Tinklebel',
            clickCount: 0,
            imgSource: 'img/cat-5.jpg'
        }]
    };

    var octopus = {
        init: function() {
            model.currentCat = model.cats[0];

            catView.init();
            catListView.init();
            adminArea.init();
        },

        incrementClickCount: function() {
            model.currentCat.clickCount++;
            catView.render();
        },

        getAllCats: function() {
            return model.cats;
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        setCatAttributes: function(nm, ur, cl) {
            var allCats = octopus.getAllCats();

            var cat;

            for(var i = 0; i < cats.length; i++) {
                if(allCats[i].name === model.currentCat.name){
                    allCats[i].name = nm;
                    allCats[i].clickCount = cl;
                    allCats[i].imgSource = ur;

                    cat = allCats[i];
                }
            }
            setCurrentCat(cat);
            catListView.render();
            catView.render();
        }
    };

    var catView = {
        init: function() {
            this.catElem = document.getElementById('cat');
            this.catNameElem = document.getElementById('cat-name');
            this.catCountElem = document.getElementById('cat-count');
            this.catImgElem = document.getElementById('cat-img');

            this.catImgElem.addEventListener('click', function(){
                octopus.incrementClickCount();
            });

            this.render();
        },

        render: function() {
            var currentCat = octopus.getCurrentCat();
            this.catNameElem.textContent = currentCat.name;
            this.catCountElem.textContent = currentCat.clickCount;
            this.catImgElem.src = currentCat.imgSource;
        }
    };

    var catListView = {
        init: function() {
            this.catListElem = document.getElementById('cat-list');

            this.render();
        },
        render: function() {
            var cat, elem;

            var cats  = octopus.getAllCats();

            this.catListElem.innerHTML = '';

            for(i = 0; i < cats.length; i++) {
                cat = cats[i];

                elem = document.createElement('li');
                elem.textContent = cat.name;

                var catCopy = cat;
                elem.addEventListener('click', (function(catCopy) {
                    return function() {
                        octopus.setCurrentCat(catCopy);
                        catView.render();
                    }
                })(cat));

                this.catListElem.appendChild(elem);
            }

        }
    };

    var adminArea = {
        init: function() {
            $('#admin-area').hide();

            $('#admin-button').click(function() {
                $('#name').val(model.currentCat.name);
                $('#url').val(model.currentCat.imgSource);
                $('#clicks').val(model.currentCat.clickCount);

                $('#admin-area').show('slow');
            })

            $('#cancel-button').click(function() {
                $('#admin-area').hide('slow');
            })

            $('#save-button').click(function() {
                var name = $('#name').val();
                var url = $('#url').val();
                var clicks = $('#clicks').val();

                octopus.setCatAttributes(name, url, clicks);
            })
        }
    }


    octopus.init();
});