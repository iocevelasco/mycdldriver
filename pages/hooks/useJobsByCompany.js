import axios from 'axios';
import { useEffect, useState } from 'react';

const useJobsByCompany = (header) => {
    const [isFetching, setIsFetching] = useState(true);
    const [jobsByCompany, setOptions] = useState([])

    useEffect(() => {
        setIsFetching(true);
        axios
            .get('/api/company/jobs/private', header)
            .then((response) => {
                let options = response.data.data;
                setOptions(options);
                setIsFetching(false);
            })
            .catch((err) => {
                setOptions([]);
                console.log(err)
            })
    }, []);

    return [jobsByCompany, isFetching];
}

export default useJobsByCompany;

