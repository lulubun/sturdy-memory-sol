I probably went over the 2 hour limit, it's a bad habit of mine to get into the code and not pay attention to what time it is but I don't think I went too far over that time limit.

I don't consider myself a designer by any means but with more time I would definitely try to make the UI/UX better. I added some simple things to make the table easier to read but I still think it's kind of ugly and there's a lot that could be improved upon in making it prettier, making it easier to navigate, and even making it interactive with more time

I considered really re-doing the backend but I realized I was going over time and rather than rewrite the API to have separate get requests, I just hacked two kinds together and didn't optimize the filtering.

Another improvement would be to change up the search for optimization and rather than searching the whole DB by general search term, split up search by specific columns - locations, keep general search for first name/last name, and if specialties are a standardized set, make them into a type and make the DB indexed by specialty or even if the specialties aren't guaranteed to be standardized, you could still limit the search by specialty vs name for some query optimization.

I'd want to make the client-side table sortable by column

I'd spend some time adding more seed data that overlapped with existing records (same first name, last name, city, etc) to verify pagination and search results are working as expected with more data.

I'm still relatively new to tailwind but I'd try to do some more cleanup of the classes so they aren't so long

I'd add tests. Normally, I would just ask copilot to write me some and then spend some time debugging them or making sure they're relevant to what actually needs to be tested but I got too into the search and pagination part and I'm out of time :(