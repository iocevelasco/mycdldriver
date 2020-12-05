import axios from 'axios';
import { useEffect, useState } from 'react';


const stateList = (props) => {
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        restClient
            .get('/user')
            .then((response) => {
                const { sites, carriers } = response.data.user;
                const services = carriers.reduce((prev, act) => {
                    let _services = act.services.map(serv => {
                        return { ...serv, carrier_id: act.id }
                    })
                    prev = [...prev, ..._services];
                    return prev;
                }, []);
                setConfiguration({ sites, carriers, services });
                setIsFetching(false);
            });
    }, []);

    return [configuration, isFetching];

}

export default stateList
