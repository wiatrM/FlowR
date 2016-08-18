// auth.controllers

// jesli chodzi o loopbacka
// to powiem Ci tak:
//     satellizer bedzie defaultowo słał do /auth/login i /auth/register
// a my bedziemy mieli inaczej
// jak to musimy sie zgadac (ja wystawiam API endpointy w tym moim module loopback-satellizer
// cos w stylu /api/users/login - default login (tak jak jest teraz)
// tylko kwestia dodania endpointow do logowania by facebook itp
// np /api/auth/facebook - POST logowania by facebook
// /api/auth/google bezie google (o ile chcemy je miec)
// ale na razie zrob tylko logowanie emailem / haslem
// i ustaw satellizera zeby słał to do /api/users/login

