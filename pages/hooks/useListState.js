import axios from 'axios';
import { useEffect, useState } from 'react';


const ListState = (props) => {
    const [isFetching, setIsFetching] = useState(true);
    const [stateOptions, setOptions] = useState({
        options: [],
        all: []
    });

    useEffect(() => {
        setIsFetching(true);
        axios
            .get('/api/address/state')
            .then((response) => {
                let options = response.data.data
                    .sort((a, b) => {
                        if (a.stateName < b.stateName) { return -1; }
                        if (a.stateName > b.stateName) { return 1; }
                        return 0;
                    })
                    .map((e) => { return { value: e.stateName, id: e._id } })
                let all = response.data.data
                setOptions({
                    options,
                    all
                });
            })
            .catch((err) => {
                setState([]);
                console.log(err)
            })
    }, []);

    return [stateOptions, isFetching];
}

export default ListState;

