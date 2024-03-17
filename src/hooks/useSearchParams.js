import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useSearchParams(setSearchQuery) {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryParam = searchParams.get('query');
        if (queryParam) {
            const decodedQueryParam = decodeURIComponent(queryParam);
            setSearchQuery(decodedQueryParam);
        } else {
            setSearchQuery('');
        }
    }, [location.search, setSearchQuery]);
}

export default useSearchParams;
