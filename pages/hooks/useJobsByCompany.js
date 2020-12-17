import axios from 'axios';
import { useEffect, useState } from 'react';

const useJobsByCompany = (header, reload, setReload) => {
    console.log('relodad', reload);
    const [isFetching, setIsFetching] = useState(true);
    const [jobsByCompany, setOptions] = useState([])

    useEffect(() => {
        setIsFetching(true);
        axios
            .get('/api/company/jobs/private', header)
            .then((response) => {
                let options = response.data.data;
                options = options.map((opt) => {
                    opt.active = opt.isActive;
                    return opt;
                });
                setOptions(options);
                setIsFetching(false);
            })
            .catch((err) => {
                setOptions([]);
                console.log(err)
            })
    }, [reload]);

    return [jobsByCompany, isFetching];
}

export default useJobsByCompany;

