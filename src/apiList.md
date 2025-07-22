# DevTinder APIs

# AuthRouter
POST /signup
Post /login
Post /logout

# profileRouter
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

# connectionRuestRouter
<!-- POST /request/send/interested/:userId
POST /request/send/ignored/:userId -->    # POST/request/:send/:userId


<!-- POST /request/review/accepted/:requestId
POST /request/review/rejected/:requestId -->  # POST/request/:review/:requestId

# userRouter
GET /user/requests/received
GET /user/connections
GET /user/feed-Gets you the profiles of other users on  platform

status:ignore,interested,accepted,rejected


    "emailId":"trump@gmail.com",
    "password":"Trumpi@123"