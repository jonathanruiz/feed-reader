/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", () => {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", () => {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("no empty urls", () => {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].url).toBeDefined();
          expect(allFeeds[i].url).not.toBe(false);
        }
      });

      it("no empty names", () => {
        for (let i = 0; i < allFeeds.length; i++) {
          expect(allFeeds[i].name).toBeDefined();
          expect(allFeeds[i].name).not.toBe(false);
        }
      });
    });

    describe("The menu", () => {
      const body = document.querySelector("body");
      const menu = document.querySelector(".menu-icon-link");

      it("menu hidden", () => {
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      it("menu changes", () => {
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(false);

        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });
    });

    describe("Initial Entries", () => {
      const feed = $(".feed .entry").children;

      beforeEach(done => {
        loadFeed(0, done);
      });

      it("completes loadFeed", () => {
        expect(feed.length > 0).toBe(true);
      });
    });

    describe("New Feed Selection", () => {
      let firstFeed;
      let secondFeed;

      beforeEach(done => {
        loadFeed(0, () => {
          firstFeed = document.querySelector(".entry").innerText;

          loadFeed(1, () => {
            secondFeed = document.querySelector(".entry").innerText;
            done();
          });
        });
      });

      it("content changes", () => {
        expect(firstFeed === secondFeed).toBe(false);
      });
    });
  })()
);
