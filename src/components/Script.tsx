import React, { useEffect } from 'react';

const Script = () => {
// $region make comment
    const example = async () => {
        const wait = (duration: number) => {
            return new Promise(resolve => {
                setTimeout(resolve, duration);
            })
        };

        const getUser = async (id: number) => {
            await wait(2000)
            if (id === 2) {
                throw new Error("404 - User does not exist")
            }
            const renderData = { id, name: "riaz" }
            return renderData
        }

        function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
            return promise
                .then(data => {
                    return [undefined, data] as [undefined, T]
                })
                .catch(error => {
                    return [error]
                })
        }

        const [error, user] = await catchError(getUser(1));

        if (error) {
            console.log("There was an error :", error.message)
        } else {
            console.log(user)
        }
    }
 
    useEffect(() => {
        example()
    }, [])

    // try {
    //     user = await getUser(2)
    //     // console.log(user)
    // } catch (error) {

    //     console.log("there was an error", error.message);
    // }

    // const user = await (getUser(1))

    return (
        <div>
            <h1>example variation of try & catch</h1>
            <input type="text"
            onChange={(x)=>{
                console.log(x.target.value)
            }}
            />
        </div>
    );
};

export default Script;