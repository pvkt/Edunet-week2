# Edunet-week2
backend API 

# Code Contains
1. created a POST API for adding products (POST REQUEST)
	parameters =  ( title , price, description, category, image , rating, discount, offerprice, reviews )
2. created a GET API to retrieve all product information from databse (GET REQUEST)
3. created a SIGNUP API (POST REQUEST)
		parameters = ( name, father name, dob, branch , roll no, section, address, mobile no, password  (createdAt) )
4. created SIGNIN API to login using rollno/email and password (POST REQUEST)
5. created PROFILE page API (GET REQUEST)
6. created LOGOUT API (POST REQUEST)


# install the following Dependencies
1. npm install express-session
2. npm install bcryptjs
3. npm install mongoose
4. npm install express
5. npm i bootstrap@5.3.3
6. npm install -g nodemon


# Changes to do
in the index.js change the mongodb url


# command to run the code
nodemon .\index.js    

Note:
we are using the nodemon because whenever there is any changes done in the code & save the code , nodemon will restart the server

