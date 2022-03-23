#GitHub Search User Feature

Web App is live here: [Search User On GitHub](https://searcghuserongithub.netlify.app)

A reimplementation of GitHub Search user feature

using the following API endpoint to fetch data from

>GET https://api.github.com/search/users?q=example

Documentation: https://developer.github.com/v3/search/ 

Reimplemented by Vlad Solokha
Created by Vlad Solokha

Here are all the places where I received guidance, help, code snippets from

- great favicon generator app https://favicon.io/favicon-generator/ 
- css reset used in index.css https://meyerweb.com/eric/tools/css/reset/
- best flexbox guide https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- used fonts.google.com for fonts imported in App.css
- react documentation https://reactjs.org/docs/
- react beta documentation https://beta.reactjs.org/
- web app documentation https://developer.mozilla.org/en-US/
- pagination requirements and help https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Pagination
- why to not use a table? due to accessibility and there are better ways https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics
- ran into a huge fetching bug and used various sources to fix. Mainly - https://www.robinwieruch.de/react-hooks-fetch-data/ 
- to get followers number or stars number one can get length of array in the followers_url property. However, displaying those results will require an API request for each user and user authentication, therefore it would only be a beneficial feature for authenticated searches. An alternative would be to only fetch the information on hovering over or clicking on a user's name. Which I have included in the code. Once authentication is established, users can click on more info and a card of more information about the user will appear. Such as followers, stars, etc. As for now clicking on the resulting user's name or avatar will take the user to a new tab of information about the result. 
  --Note: on the last point, I actually just made it work. The results display only when client clicks on more info. Then it displays more information about the user. Whatever I said in the last point was showing an error because I was trying to display all the user's info at once. So I looked up the docs and they said this: https://docs.github.com/en/rest/reference/users#get-a-user
- for pagination I used this resource https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
- It even looks great on mobile with responsive layout => Mobile First! 


-There are 3 branches I worked in. Search: first branch to design the search component. It didn't work so well because I was having issues with App communicating with Search. Next, debug-search contained more fixes of search component and it's also where I began implementing the Results component. The last branch, pagination, I did the most work in. I styled components, connected pagination to the app via a hook and separate pagination component. It is the one I merged to main for the final product. 

-Last branch feature/simple-pagination removed the buggy page changes and replaced with simple forward / back buttons to paginate through results. Made some elements more mobile friendly. Page size has 100 results instead of 10, but number can be changed with per_page variable. 
