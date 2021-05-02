import axios from 'axios';
import { useEffect, useState } from 'react';


const ListState = (props) => {
    const [isFetching, setIsFetching] = useState(true);
    const [driverList, setDriverList] = useState([]);

    function fetchDriversData() {
        return axios.get(`/api/user/driver-list`)
            .then(({ data }) => {
                let drivers = data.data;
                setDriverList(drivers);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsFetching(false);
            });
    }

    useEffect(() => {
        fetchDriversData();
    }, []);

    return [driverList, isFetching];
}

export default ListState;

