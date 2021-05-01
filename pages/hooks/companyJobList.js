import axios from 'axios';
import { useEffect, useState } from 'react';


const ListJob = (props) => {
    const [isFetching, setIsFetching] = useState(true);
    const [jobList, setJobList] = useState([]);

    function fetchJobsData() {
        return axios.post(`/api/company/jobs/myjobs`)
            .then(({ data }) => {
                let jobs = data.data;

                let options = data.data
                .sort((a, b) => {
                    if (a.job.title < b.job.title) { return -1; }
                    if (a.job.title > b.job.title) { return 1; }
                    return 0;
                    })
                    .map((e) => { 
                        const name = e.job.title;
                        return { value: name, id: e.job._id } 
                    })
                
                setJobList(options);

            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsFetching(false);
            });
    }

    useEffect(() => {
        fetchJobsData();
    }, []);

    return jobList;
}

export default ListJob;

