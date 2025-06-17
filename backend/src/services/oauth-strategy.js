import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../../prisma/client.js";
import 'dotenv/config'


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL_DEV}${process.env.GOOGLE_CALLBACK_URL}`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const found = await prisma.user.findUnique({
            where: {
                email: profile.emails[0].value
            }
        })
        
        if(found) {
            const { id, name, email, role  } = found
            return done(null, {id, name, email, role})
        }

        const newUser = await prisma.user.create({
            data: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: "CUSTOMER",
            }
        })

        return done(null, {id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role})
    } catch (error) {
        return done(error, null)
    }
}))