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
      name: "Credentials",
      credentials: {
        countryCode: { label: "Country code", type: "text", placeholder: "234" },
        phoneNumber: { label: "Phone number", type: "text", placeholder: "1234567890" },
        secret: { label: "Secret", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "user/login", {
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
            return decodedToken.user;
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
  callbacks: {
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    jwt: true,
  },
});