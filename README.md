- So this is a regular react typescript project
- I tried to use the bare minimum for this
- I lot of the hard work were handler by tanstack table for sorting or filtering but there are some edge case where I needed to use custom fct to handle both
- I was using heavily @tanstack/react-table since a table is the simplest way to display data to sort them and filter them
- All of my state are client state but in real case senario we would be having server state and client state for both sort and filter
- I could use the url to save the filter state but it is easier to do it inside a variable and I don’t have to deserialize the url


- small bug in the filter by customer name : it only work on lowercase I forgot to add toLowerCase for the field input too ( or in the comparaison fct)
