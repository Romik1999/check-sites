import React from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const Home = () => {

    const {status, data, error, isFetching} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const {data} = await axios.get(
                '/api/sites',
            )
            return data
        },
    })

    return (
        <div className="home">
            <h1>Home</h1>
            <div>
                <h1>Sites</h1>
                <div>
                    {status === 'pending' ? (
                        'Loading...'
                    ) : status === 'error' ? (
                        <span>Error: {error.message}</span>
                    ) : (
                        <>
                            <table>
                                {data.item.data.map((site) => (
                                    <tr key={site.id}>
                                        <td>{site.name}</td>
                                        <td>{site.url}</td>
                                        <td>{site.active}</td>
                                    </tr>
                                ))}
                            </table>
                            <div>{isFetching ? 'Background Updating...' : ' '}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
