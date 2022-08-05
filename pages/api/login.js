import { magicAdmin } from "../../lib/magic";

export default async function login(req, res) {
    if (req.method === "POST") {
    try{
        // check format ใน server ว่าส่งมายังไง
        const auth = req.headers.authorization;
        const didToken = auth ? auth.substr(7) : "";
        console.log({ didToken });
        
        // invole magic
        const metadata =  await magicAdmin.users.getMetadataByToken(didToken)
        console.log( { metadata })

        //create jwt
        const token = jwt.sign({
            ...metadata,
            iat : Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 7 * 7 * 24 * 60 * 60 ),
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles":["user","admin"],
                "x-hasura-default-role": "user",
                "x-hasura-org-id": `${metadata.issuer}`,

            },
        }, process.env.JWT_SECRET_API);
        console.log({ token })
        res.send({ done: true })
    } catch(error) {
        console.error("Something went wrong logging in", error);
        res.status(500).send({ done: false});
    }
    } else {
        res.send({ done : false });
    }
}
