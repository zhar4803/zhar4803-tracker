# zhar4803-tracker
# VIDEOTOME

Hi! Welcome to VIDEOTOME. This is a simple lightweight tool for logging and rating films, with a stylish and simple design. As it currently stands the app is sadly a pretty barebones take of my initial design, with most of the more exciting features like multiple lists and auto-filling the form from an API call missing due to time constraints, but I'm very happy with what I've ended up with.

This documentation will describe each section in detail in terms of design and technical concerns, with a discussion of what I'd hoped to initially implement.

## MAIN PAGE

I found the main database page to be very easy to implement by building on the initial code examples outlined in the tutorial. The HTML is essentially unchanged aside from the addition of the navbar to the top of the page and the submission form being confined to the modal tag so it appears hidden by default. The JS was a little more difficult and required me to follow the pattern provided for the week 12 tutorial to get my 'sticker' and star rating icon images to load via the parcel @import method, then assigning the correct image with a switch case, but it all follows the same principle of using appendchild to add additional elements to each list entry based on data submitted to the form.

Beyond that, it's all CSS. The main database is a list, with each entry styled into little boxes to match the design in my wireframe, then arranged in rows of five via the flexbox styling. To make sure my icons consistently appear in the correct spot each entry uses the grid styling and then displaces the icons a bit more with transforms. Also, you can now mouse over elements and have them do a little transform where they get brighter and move up slightly. I think it looks really nice and almost exactly matches my mockups!

### MOBILE LAYOUT

The Mobile layout was also very simple to implement, just requiring a bit of css to narrow the page to the correct width, narrow the spaces between entries, and reduce the number of entries in each row to three from five.

### PAST AND FUTURE ITERATIONS

I was able to get everything up and running to the level you see now very quickly and did not require any substantial iterations beyond the work of getting the icon images to display correctly. However, further work will be necessary to implement my original idea outlined in my mockups of pulling poster images for an API call. 

There is nothing in the current code to support this, because I could never get any of it to work, but if the user eventually gets the ability to upload images then I think the best way to implement it would be to have an if statement in the displaytasks function to check if an image is uploaded and then, if there is one, alter the CSS, setting the backgroundimage styling for the database entry as the image, and then setting the opacity to 0 for the entry's text and icons. That way, you could then set the opacity to 100 for the :hover state so the user could view more information if they wished by mousing over.

My original design called for a second database tracking a 'watchlist' for films the user wants to watch later. I think this would be quite easy to configure, by just having both lists in the html but only one show up at a time via the CSS, then adding a button to switch between sheets. To make this second list compelling, there should also be some sort of sorting and filtering functions to help the user choose a film, and even possibly a shuffle feature to make the choice for them. 

## SUBMISSION FORM

The basic functionality of this form was extremely easy to implement with the new modal tag and a bit of code from Web Dev Simplified. The default behaviour of a centrally-positioned modal with dimmed background is pretty much exactly what I wanted. Very little JS was required, beyond the simple little check in there to recolour the submission button. The only substantive design changes have to do with me reigning in the scope, as I had to remove the option to choose which list to put the entry into, and I also chose to remove the 'original language' field when I realised the API call wouldn't work, so I might as well make it a little less cluttered.

Then I had to start doing the CSS and the trouble started. It turns out that the relatively simple design I came up with has tons of ways for things to get misaligned and look really awful, and I had to spend a few days fixing it all up. I blame this for my not having time to put in most of my cooler features. I just forgot how finnicky this stuff can get. I was, however, able to find a really nice pure CSS solution to a slick star rating widget with half-stars. The implementation is a bit hacky, since I had to make a new webfont to get my custom icons to show up, but I think it looks pretty great!

### MOBILE LAYOUT

Getting everything into the mobile layout only confounded by CSS woes, but I was able to get it looking pretty nice and very close to my mockups by changing the flexbox orientation to vertical, so form labels show up just above entry fields, and then translating all the elements that got weirdly shoved around when I did that. Probably pretty sloppy, but it looks nice!

### PAST AND FUTURE ITERATIONS

Aside from the constant battle with CSS the form did not require any substantive iterations, beyond a bit of extra time to get my submission button and star ratings to look decent. Implementing my full planned feature of an API call to auto-fill the form, however, will require a fair bit more work. I've found an API called TMDB that seems to be very well suited for this purpose (https://www.themoviedb.org/), which I've used to help inform the design for my form by taking their list of film genres, as well as numerous libraries for implementing searchbars with auto-complete, but I haven't even tried putting any of that stuff in so I don't know how hard it'd be to pull off.

## DATABASE ENTRY MODAL

Clicking on a database entry on the main page opens a second modal, implemented in the same way as the first. In terms of JS, the modal auto-populates with the correct information from local storage by building out an innerhtml string, in a way similar to how entries are displayed on the main page, but with a series of if checks to omit empty fields from the submission form.

Getting the CSS right was just as bad as the submission form, sadly. I tried to make the structure of the generated code similar enough to the submission form so I could apply the same styling, as the forms are very similar, but it never worked for some reason and I had to go in and manually fix everything. It looks pretty good but not as close to the form as I'd like, and I've probably done it in a pretty sloppy way. Oh well.

### MOBILE LAYOUT 

This is probably the worst part of the whole thing. I was able to rearrange everything by changing the flexbox to vertical, same as the form, and it's all pretty neat, but nothing has ever looked right and entries appear to load inconsistently depending on how much information is on them, and even how far down the entry is on the page. 

### PAST AND FUTURE ITERATIONS

This modal also did not require any substantial iterations beyond the implementation of the star rating icons, adapted from how they work on the main page. As far as future development goes, it would probably be best to just start again with the CSS to see if you can get it looking nice without all the weird hacky stuff I had to implement. However, implementing the full API call functionality would probably be easier than the rest of the page, as all you'd need to do is reassign the background-image style for the image placeholder div.

## COMPATIBILITY

This should all just run from the basic setup introduced in the tutorial, with the exception of a bit of extra stuff needing to be done to parcel to follow the 'Importing Images in JS with Parcel' suggested pattern from week 13 (https://piazza.com/class/ldrz9ne3wpj4eb/post/76). I think I just had to run the install parcel command a second time and add "@parcel/transformer-sass": "^2.8.3", to  "devDependencies" in package.json.