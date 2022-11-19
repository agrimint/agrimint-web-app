import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const decodeJwt = async (token) => {
  // TODO: We should have a shared secret
  const decodedToken = jwt.decode(token, { algorithms: ['HS512']});
  return decodedToken;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        countryCode: { label: "Country code", type: "text", placeholder: "234" },
        phoneNumber: { label: "Phone number", type: "text", placeholder: "1234567890" },
        secret: { label: "Secret", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // console.log('test');
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        const res = await fetch("http://46.101.210.143:8081/api/v1/user/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
  
        if (user) {
          // The API returns the accessToken, we need to decode the user details
          let decodedToken;
          try {
            decodedToken = await decodeJwt(user.accessToken);
          }
          catch (err) {
            console.log('ERROR', err);
          }
          console.log(decodedToken);
          if (decodedToken) {
            let decodedUser = decodedToken.user;
            return decodedUser;
          } else {
            // Something's wrong with the decoding, error
            return null;
          }
        } else {
          // Error
          return null;
        }
      }
    })
  ],
  // These are just for debug purposes, to be removed
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('=== Sign in callback ===');
      console.log(user.accessToken);
      return true;
    },
    async session({ session, user, token }) {
      console.log('=== Session callback ===');
      console.log(session);
      console.log(user, token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('=== JWT callback ===');
      console.log(user, token);
      return token;
    },
    async register(name, countryCode, phoneNumber, secret, otp) {
      try
      {
        let query = `${process.env.REACT_APP_API_URL}register`;
        let options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          method: 'POST',
          body: JSON.stringify({
            username: values.username,
            password: values.password,
            firstName: values.firstName
          }),
          credentials: 'include',
        };
          await prisma.users.create({
              data: {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password
              }
          })
          return true;
      }
      catch (err)
      {
          console.error("Failed to register user. Error", err);
          return false;
      }
    },
  //   async credentials(user, acount, profile) {
  //     console.log('=== Credentials callback ===');
  //     return Promise.resolve(true)
  //   },
  },
  session: {
    jwt: true,
  },
  // jwt: {
  //   secret: "secret",
  //   encryption: true
  // },
  // logger: {
  //   error(code, metadata) {
  //     log.error(code, metadata)
  //   },
  //   warn(code) {
  //     log.warn(code)
  //   },
  //   debug(code, metadata) {
  //     log.debug(code, metadata)
  //   }
  // }
});