// export new user

export async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
        method: "POST",
        header:{
            "Authorization": `Bearer ${token}`
            // "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName,
        }),
    });

    return await result.json();
}

const operationsDoc = `
query MyQuery {
    users(where: {issuer: {_eq:
    "did:e:}})
    {
        id
        email
        issuer
    }
}`;

function fetchMyQuery() {
    const operationsDoc = 
            `query MyQuery {
                users {
                email
                id
                issuer
            publicAddress
            }
        }`;
    }


function fetchMyQuery() {
    return queryHasuraGQL(operationsDoc, "MyQuery", {});
}

export async function startFetchMyQuery() {
    const { errors , data } = await fetchMyQuery();

    if (errors) {
        // handle those errors like pro
        console.error(errors);
        }
        // do something great with this precious data
        console.log(data)
    }

