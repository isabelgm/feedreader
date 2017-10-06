/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined,
         * and that the URL is not empty.
         */
         it('have a URL', function(){
           allFeeds.forEach(function(feed){
             expect(feed.url).toBeDefined;
             expect(feed.url).not.toBe('');
           });
         });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('have a name', function(){
           allFeeds.forEach(function(feed){
             expect(feed.name).toBeDefined;
             expect(feed.name).not.toBe('');
           });
         });
    });

    describe('The menu', function(){

      /* This test ensures the menu element is
       * hidden by default.
       */
        it('is hidden by default', function(){
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });

       /* This test ensures the menu changes
        * visibility when the menu icon is clicked. It has
        * two expectations: does the menu display when clicked
        * and does it hide when clicked again.
        */

        it('changes visibility when the menu icon is clicked', function(){
          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(false);

          $('.menu-icon-link').click();
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function(){

      /* This test ensures that when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * loadFeed() is asynchronous so we use beforeEach and done.
       */

       beforeEach(function(done){
          loadFeed(0, function(){
            done();
          });
       });

       it('have at least a single entry', function(){
         expect($('.feed .entry').length).toBeGreaterThan(0);
       });
    });


    describe('New Feed Selection', function(){

      /* This test ensures that when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       */

       var content,
           newContent;

       /* loads initial content with feed id of 0 */
       beforeEach(function(done){
          loadFeed(0, function(){
            content = $('.feed').html();
            loadFeed(1, function(){
              newContent = $('.feed').html();
              done();
            });
          });
       });

       /* changes the id of the feed from 0 to 1 to test if content changes */
       it('changes content', function(){
         expect(content).not.toEqual(newContent);
       });
    });
}());
