import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

const decodeJwt = async (token) => {
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
          console.log("User:", user);
          let decodedToken;
          try {
            decodedToken = await decodeJwt(user.accessToken);
          } catch (err) {
            console.log('ERROR', err);
          }
          console.log("Decoded token:", decodedToken);
          if (decodedToken) {
            let userObject = {
              name: decodedToken.user.name,
              data: {...user,
                countryCode: decodedToken.user.countryCode,
                phoneNumber: decodedToken.user.phoneNumber
              }
            };
            console.log('userObject', userObject);
            return userObject;
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
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user.countryCode = token.countryCode;
      session.user.phoneNumber = token.phoneNumber;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        return {
          ...token,
          countryCode: user.data.countryCode,
          phoneNumber: user.data.phoneNumber,
          accessToken: user.data.accessToken,
          refreshToken: user.data.refreshToken,
        };
      }
      return token;
    }  
  },
});