# OAuth2

OAuth2 is the leading authorization standard for web applications and APIs.

## Terms

grant type
- OAuth2 offers multipe grant types (also called flows) for diverse authentication scenarios.
- The most common grant type is 'authorization code'.

authorization server
- authorizes an application to do something in context of a user.

token url
- The URL issuing the access token in return of an valid authorization code.
- To get an access token we call this URL with the authorization code and other query parameters .

resource owner
- the owner of a protected resource

resource
- the protected resource

client_id
- app/service identifier; should not be too easy to guess.
- issued after creation of a new service/app.

client_secret
- must be kept confidential!
- The secret should never leave the backend!

redirect_url
- URL the authorization server will redirect the user to after successfull authorization
- The URL should use https to be secure because the url also contains the authorization code

state parameter
- random string we add to the authorize url to protect the client from csrf attacks.
- The redirect url will contain the state parameter.
- Verifying the state parameter in the redirect url we can be sure the url was not modified.

access token
- used to make requests against protected API endpoints
- Typically sent in the Authorization Header in form of a JWT (Json Web Token)
- has a limited validity
- says nothing about who the user is
- should be treated as opaque string. It has no significant meaning to the app other than being able to use it to make API requests.

id token
- identifies the user
- contains information about the user e.g. name, email
- JWT format

refresh token
- used to get a fresh access token
- have a longer validity than access tokens.

authorize URL
- web page where the user has to login first.
- After successfull login the user can authorize the request made from the client application

local storage
- the most common place to store acces tokens on the client side

user info endpoint
- API endpoint to find out the user identity
- requests with valid access token typically return the users name and other profile data.

scope
- used to limit app's access to protected data
- Rather than granting full access we can use multiple scopes to get fine grained resource protection
- scope is not the same as the internal permissions system of an API.
- example scopes: profile, read-posts, edit-address

