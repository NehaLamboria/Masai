🔐 Authentication = "Who are you?"

It confirms your identity.
It's the process of verifying who a user is.

Usually done via:
Username + password
OTP
Biometrics (fingerprint, face ID)
OAuth (Login with Google/Facebook, etc.)

Eexample:
Showing your ID card at the airport check-in. You’re proving who you are.

🔓 Authorization = "What are you allowed to do?"

It defines what you can access or do.
Happens after authentication.
Determines what actions or resources a user is allowed to access.

Example: Can the user:
View the dashboard?
Edit a post?
Delete a user?

Example:
After check-in, your boarding pass says which flight and seat you're allowed to access. That's authorization.

Summary Table:
Feature	Authentication	Authorization
Purpose	Verify identity	Grant access based on identity
Question	"Who are you?"	"What can you do?"
Happens when	Before authorization	After authentication
Controlled by	You (user credentials)	System (permissions, roles, rules)
Example	Login with email/password	Accessing admin panel (if you're admin)
Outcome	Success = You're a valid user	Success = You have permission
