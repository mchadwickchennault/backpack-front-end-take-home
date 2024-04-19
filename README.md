# Here Goes Nothing

I have reached the end of the time I have set asside for this project.

To run the project:
* `npm install`
* `npm run dev`

To run the tests:
* `npm run test`

# Design Notes
At the heart of my design is the `src/hooks/useBankAccounts.tsx` custom hook. This handles all interactions with the API. Doing this allows me to easily test all of my api interactions without being forced to go through the components interface. It makes for fast, easy testing. This also allows me to inject the custom hook into my component structure so that components are much easier to test as well. You will see examples of this in the tests. I was not able to test everything I wanted to but hopefully what and how I tested should give you some insight into where my head is at.

For styling I used Sass with imported variables so that styling changes can be made within a few files without the need to touch all of the component's Sass files. In addition, I used the React Material UI design system for layout, buttons, and the transactions table. This gave me a lot of out of the box functionality such as responsiveness, ADA compliance, and a full featured table component that allowed my table to have sorting and filtering features without any effort on my part. There is some additional tweaking that needs to be done to set up the all of the responsiveness features, but the site looks okay on a mobile interface as is (using Chrome's mobile simulator).

For the visual design I went with clean and easy to read. I don't see it as a final design, but a great base to begin iteration.
