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
- work on filter, pagination, looks! 


